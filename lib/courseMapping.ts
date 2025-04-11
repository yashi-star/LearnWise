/**
 * Course mapping for recommendation engine
 * Maps generic keywords and categories to course IDs
 */

// Map generic topics/categories to course IDs
export const courseKeywordMap: Record<string, number[]> = {
  // Database & SQL
  sql: [1, 7],
  database: [1, 7],
  postgresql: [1, 7],
  mysql: [1, 7],
  "data analysis": [1, 3, 7, 9],

  // Web Development
  react: [2],
  "web development": [2, 8],
  frontend: [2, 8],
  hooks: [2],
  javascript: [2],

  // Python & Data Science
  python: [3, 9],
  "data science": [3, 9],
  numpy: [3],
  pandas: [3],
  "machine learning": [9],
  ai: [9],
  "deep learning": [9],

  // Mobile Development
  mobile: [4],
  flutter: [4],
  "app development": [4],
  "cross platform": [4],
  dart: [4],

  // Backend Development
  node: [5],
  express: [5],
  backend: [5],
  api: [5],
  server: [5],
  mongodb: [5],

  // Cloud Computing
  cloud: [6],
  aws: [6],
  devops: [6],
  "amazon web services": [6],
  s3: [6],
  ec2: [6],

  // CSS & Frontend
  css: [8],
  sass: [8],
  flexbox: [8],
  grid: [8],
  animation: [8],

  // Design
  ui: [10],
  ux: [10],
  design: [10],
  "user experience": [10],
  "user interface": [10],
  wireframe: [10],
  prototype: [10],
};

// Function to find matching courses based on user input
export function findMatchingCourses(userInput: string): number[] {
  const normalizedInput = userInput.toLowerCase().trim();
  const matches: { courseId: number; score: number }[] = [];

  // Calculate score for each keyword match
  for (const [keyword, courseIds] of Object.entries(courseKeywordMap)) {
    if (normalizedInput.includes(keyword)) {
      // Add each course with this keyword
      for (const courseId of courseIds) {
        const existingMatch = matches.find(m => m.courseId === courseId);

        if (existingMatch) {
          // If already in matches, increase score
          existingMatch.score += keyword.length; // Longer keyword = higher score
        } else {
          // Add new match
          matches.push({ courseId, score: keyword.length });
        }
      }
    }
  }

  // Check for partial matches too
  if (matches.length === 0) {
    // Split input into words
    const words = normalizedInput.split(/\s+/);

    for (const [keyword, courseIds] of Object.entries(courseKeywordMap)) {
      // Check if any word from input is similar to a keyword
      for (const word of words) {
        if (
          word.length > 3 &&
          (keyword.includes(word) || word.includes(keyword))
        ) {
          for (const courseId of courseIds) {
            const existingMatch = matches.find(m => m.courseId === courseId);

            if (existingMatch) {
              existingMatch.score += 1; // Lower score for partial matches
            } else {
              matches.push({ courseId, score: 1 });
            }
          }
        }
      }
    }
  }

  // Sort by score and return course IDs
  return matches.sort((a, b) => b.score - a.score).map(match => match.courseId);
}
