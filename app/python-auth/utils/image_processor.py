from PIL import Image
import io

def validate_image(image_bytes):
    """
    Validate the image data.
    Returns (is_valid, message) tuple.
    """
    try:
        # Try to open the image
        image = Image.open(io.BytesIO(image_bytes))
        
        # Check image format
        if image.format not in ['JPEG', 'PNG']:
            return False, "Only JPEG and PNG images are supported"
            
        # Check image size (max 5MB)
        if len(image_bytes) > 5 * 1024 * 1024:
            return False, "Image size must be less than 5MB"
            
        # Check image dimensions
        width, height = image.size
        if width < 100 or height < 100:
            return False, "Image dimensions must be at least 100x100 pixels"
            
        return True, "Image is valid"
        
    except Exception as e:
        return False, f"Invalid image: {str(e)}"

def process_image(image_bytes):
    """
    Process the image for storage.
    Returns processed image bytes.
    """
    try:
        # Open the image
        image = Image.open(io.BytesIO(image_bytes))
        
        # Convert to RGB if necessary
        if image.mode != 'RGB':
            image = image.convert('RGB')
            
        # Resize if too large (max 800x800)
        max_size = 800
        if image.width > max_size or image.height > max_size:
            image.thumbnail((max_size, max_size), Image.Resampling.LANCZOS)
            
        # Save as JPEG with quality 85
        output = io.BytesIO()
        image.save(output, format='JPEG', quality=85)
        return output.getvalue()
        
    except Exception as e:
        raise Exception(f"Error processing image: {str(e)}")