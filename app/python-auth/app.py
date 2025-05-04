from flask import Flask, request, jsonify, session, render_template, redirect, url_for
from flask_cors import CORS
import os
from dotenv import load_dotenv
import pymongo
import base64
import cv2
import numpy as np
from PIL import Image
import io
import logging
from datetime import datetime

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.secret_key = 'your-secret-key-here'
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['UPLOAD_FOLDER'] = 'static/uploads'

# Create uploads directory if it doesn't exist
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Enable CORS for all routes
CORS(app, resources={r"/*": {"origins": "*"}})

# MongoDB connection
MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017')
client = pymongo.MongoClient(MONGO_URI)
db = client.learnwise
users_collection = db.users
        
def process_webcam_image(image_data, email):
    try:
        # Remove the data URL prefix
        if ',' in image_data:
            image_data = image_data.split(',')[1]
        
        # Convert base64 to bytes
        image_bytes = base64.b64decode(image_data)
        
        # Convert to numpy array
        nparr = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        # Convert to grayscale for face detection
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
        # Load the cascade
        cascade_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'haarcascade_frontalface_default.xml')
        face_cascade = cv2.CascadeClassifier(cascade_path)
        
        # Face detection parameters
        minimum_neighbors = 4
        min_object_size = (50, 50)
        
        # Detect faces
        faces = face_cascade.detectMultiScale(
            gray,
            scaleFactor=1.1,
            minNeighbors=minimum_neighbors,
            minSize=min_object_size
        )
        
        if len(faces) == 0:
            return None, "No face detected in the image. Make sure your face is visible in the camera with proper lighting."
            
        # Get the largest face
        (x, y, w, h) = max(faces, key=lambda f: f[2] * f[3])
        
        # Add some padding around the face
        padding = 20
        x = max(0, x - padding)
        y = max(0, y - padding)
        w = min(img.shape[1] - x, w + 2 * padding)
        h = min(img.shape[0] - y, h + 2 * padding)
        
        # Crop the face
        face_img = img[y:y+h, x:x+w]
        
        # Generate filename
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        filename = f"{email}_{timestamp}.jpg"
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        
        # Save the face image
        cv2.imwrite(filepath, face_img)
        
        return filename, None
        
    except Exception as e:
        logger.error(f"Error processing webcam image: {str(e)}")
        return None, str(e)
    
@app.route('/')
def index():
    # logger.debug('Accessing root endpoint')
    # return jsonify({'message': 'Welcome to LearnWise API'})
    if 'user' in session:
        return redirect(url_for('dashboard'))
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        if 'user' in session:
            return redirect(url_for('dashboard'))
        return render_template('login.html')
    # logger.debug('Accessing login endpoint')
    if request.method == 'POST':
        try:
            if request.is_json:
                data = request.get_json()
            else:
                data = request.form
            logger.debug(f'Login request data: {data}')
            
            email = data.get('email')
            password = data.get('password')

            if not email or not password:
                return jsonify({'error': 'Email and password are required'}), 400

            # Find user in MongoDB
            user = users_collection.find_one({'email': email})
            
            if not user:
                return jsonify({'error': 'User not found'}), 404
                
            if user['password'] != password:
                return jsonify({'error': 'Invalid password'}), 401
                
            # Set session
            session['user'] = email
                
            return jsonify({
                'message': 'Login successful',
                'user': {
                    'email': user['email'],
                    'name': user['name'],
                    'photo': user.get('photo')
                }
            })
            
        except Exception as e:
            logger.error(f'Login error: {str(e)}')
            return jsonify({'error': str(e)}), 500
    # else:
    #     return jsonify({'message': 'Login endpoint'})

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'GET':
        if 'user' in session:
            return redirect(url_for('dashboard'))
        return render_template('signup.html')
    # logger.debug('Accessing signup endpoint')
    if request.method == 'POST':
        try:
            if request.is_json:
                data = request.get_json()
            else:
                data = request.form
            logger.debug(f'Signup request data: {data}')
            
            name = data.get('name')
            email = data.get('email')
            password = data.get('password')
            photo_data = data.get('photo')

            if not all([name, email, password, photo_data]):
                return jsonify({'error': 'Name, email, password, and photo are required'}), 400

            # Check if user already exists
            if users_collection.find_one({'email': email}):
                return jsonify({'error': 'User already exists'}), 409

            # Process webcam image
            photo_filename, error = process_webcam_image(photo_data, email)
            if error:
                return jsonify({'error': error}), 400

            # Create new user document
            user_data = {
                'name': name,
                'email': email,
                'password': password,
                'photo': photo_filename
            }

            # Insert into MongoDB
            result = users_collection.insert_one(user_data)
            
            # Set session
            session['user'] = email
            
            return jsonify({
                'message': 'Registration successful',
                'user_id': str(result.inserted_id)
            })
            
        except Exception as e:
            logger.error(f'Signup error: {str(e)}')
            return jsonify({'error': str(e)}), 500
    # else:
    #     return jsonify({'message': 'Signup endpoint'})
@app.route('/dashboard')
def dashboard():
    if 'user' not in session:
        return redirect(url_for('login'))
    
    user = users_collection.find_one({'email': session['user']})
    if not user:
        session.pop('user', None)
        return redirect(url_for('login'))
    
    return render_template('dashboard.html', user=user)

@app.route('/logout', methods=['GET', 'POST'])
def logout():
    # logger.debug('Accessing logout endpoint')
    session.pop('user', None)
    # return jsonify({'message': 'Logged out successfully'})
    return redirect(url_for('login'))

@app.route('/api/check-auth', methods=['GET'])
def check_auth():
    logger.debug('Accessing check-auth endpoint')
    if 'user' in session:
        user = users_collection.find_one({'email': session['user']})
        if user:
            return jsonify({
                'authenticated': True,
                'user': {
                    'email': user['email'],
                    'name': user['name'],
                    'photo': user.get('photo')
                }
            })
    return jsonify({'authenticated': False}), 401

@app.route('/verify-photo', methods=['POST'])
def verify_photo():
    try:
        data = request.get_json()
        if not data or 'photo' not in data:
            return jsonify({'error': 'No photo data provided'}), 400

        # Process the base64 image
        image_data = data['photo'].split(',')[1]
        image_bytes = base64.b64decode(image_data)
        nparr = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        # Convert to grayscale for face detection
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

        # Load the Haar Cascade classifier
        cascade_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'haarcascade_frontalface_default.xml')
        face_cascade = cv2.CascadeClassifier(cascade_path)

        # Detect faces with more lenient parameters
        faces = face_cascade.detectMultiScale(
            gray,
            scaleFactor=1.1,
            minNeighbors=3,  # Reduced from 5 to 3
            minSize=(50, 50),  # Reduced from 100 to 50
            flags=cv2.CASCADE_SCALE_IMAGE
        )

        app.logger.debug(f"Number of faces detected: {len(faces)}")

        if len(faces) == 0:
            app.logger.debug("No faces detected")
            return jsonify({
                'verified': False,
                'message': 'No face detected. Please ensure your face is clearly visible in the frame.'
            }), 400

        # Get the largest face
        largest_face = max(faces, key=lambda x: x[2] * x[3])
        x, y, w, h = largest_face

        # Check if face is properly centered and sized
        img_height, img_width = img.shape[:2]
        face_center_x = x + w/2
        face_center_y = y + h/2
        img_center_x = img_width/2
        img_center_y = img_height/2

        # Calculate face position relative to image center
        x_offset = abs(face_center_x - img_center_x) / img_width
        y_offset = abs(face_center_y - img_center_y) / img_height

        app.logger.debug(f"Face position - x_offset: {x_offset}, y_offset: {y_offset}")

        # More lenient centering check
        if x_offset > 0.4 or y_offset > 0.4:  # Increased from 0.3 to 0.4
            app.logger.debug("Face not centered")
            return jsonify({
                'verified': False,
                'message': 'Please center your face in the frame.'
            }), 400

        # More lenient size check
        if w < img_width * 0.15 or h < img_height * 0.15:  # Reduced from 0.2 to 0.15
            app.logger.debug("Face too small")
            return jsonify({
                'verified': False,
                'message': 'Please move closer to the camera.'
            }), 400

        # Check for lighting conditions
        face_roi = gray[y:y+h, x:x+w]
        brightness = np.mean(face_roi)
        app.logger.debug(f"Face brightness: {brightness}")

        # More lenient brightness check
        if brightness < 40:  # Reduced from 50 to 40
            app.logger.debug("Image too dark")
            return jsonify({
                'verified': False,
                'message': 'Image is too dark. Please ensure good lighting.'
            }), 400
        elif brightness > 220:  # Increased from 200 to 220
            app.logger.debug("Image too bright")
            return jsonify({
                'verified': False,
                'message': 'Image is too bright. Please reduce lighting.'
            }), 400

        # Check for shadows with more lenient parameters
        face_roi = cv2.GaussianBlur(face_roi, (5, 5), 0)
        edges = cv2.Canny(face_roi, 100, 200)
        edge_density = np.sum(edges) / (w * h)
        app.logger.debug(f"Edge density: {edge_density}")

        # More lenient shadow check
        if edge_density > 0.4:  # Increased from 0.3 to 0.4
            app.logger.debug("Too many shadows")
            return jsonify({
                'verified': False,
                'message': 'Too many shadows detected. Please ensure even lighting.'
            }), 400

        app.logger.debug("Face verification successful")
        return jsonify({
            'verified': True,
            'message': 'Face verification successful!'
        })

    except Exception as e:
        app.logger.error(f"Error in verify_photo: {str(e)}")
        return jsonify({'error': 'Error processing photo'}), 500

@app.errorhandler(404)
def not_found(error):
    logger.debug(f'404 error: {error}')
    return jsonify({'error': 'Not Found', 'message': 'The requested URL was not found on the server'}), 404

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000, threaded=True)
    # Generate SSL context
    # context = ('cert.pem', 'key.pem')  # certificate and key files
    # app.run(
    #     debug=True,
    #     host='0.0.0.0',
    #     port=5000,
    #     threaded=True,
    #     ssl_context=context
    # )