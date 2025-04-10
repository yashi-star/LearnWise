import { BookCopy, Check, Clapperboard, Download, GanttChartSquare, Infinity, Languages, MonitorPlay, Radio, Star, UsersRound, Video } from "lucide-react";

// Define the Course type/interface
export interface Course {
  id: number;
  title: string;
  subtitle: string;
  description: string; // Detailed description for details page
  instructor: string;
  instructorBio?: string; // Optional instructor bio
  duration: string; // e.g., "9 hours"
  totalLectures: number;
  totalArticles?: number;
  totalDownloads?: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
  enrolled: number; // Number of students/reviews
  image: string;
  previewVideoUrl?: string;
  price: number;
  originalPrice: number;
  isBestseller?: boolean;
  lastUpdated: string; // e.g., "12/2022"
  language: string;
  subtitleLanguages?: string[];
  whatYoullLearn: string[];
  requirements?: string[];
  courseIncludes: {
    icon: React.ElementType;
    text: string;
  }[];
  courseContent: {
    sectionTitle: string;
    lectures: { title: string; duration: string; isPreviewable?: boolean }[];
    totalDuration: string;
    lectureCount: number;
  }[];
  category?: string; // e.g., "Business > Data Science"
}

// Sample course data (expanded to 10 courses with more details for ID 1 & 7)
export const courses: Course[] = [
  {
    id: 1,
    title: "The Complete SQL Bootcamp: Go from Zero to Hero",
    subtitle: "Become an expert at SQL!",
    description: "Learn SQL for data analysis and database management from scratch. Covering PostgreSQL, MySQL, SQL Server, and Oracle Database. Become job-ready with practical exercises and real-world projects.",
    instructor: "Jose Portilla",
    duration: "9 hours",
    totalLectures: 83,
    totalArticles: 14,
    totalDownloads: 13,
    level: "Beginner",
    rating: 4.7,
    enrolled: 917760,
    image: "https://img-c.udemycdn.com/course/750x422/764164_de03_6.jpg",
    previewVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Placeholder
    price: 599,
    originalPrice: 3899,
    isBestseller: true,
    lastUpdated: "12/2022",
    language: "English",
    subtitleLanguages: ["English [Auto]", "Arabic [Auto]", "27 more"],
    whatYoullLearn: [
      "Use SQL to query a database",
      "Use SQL to perform data analysis",
      "Be comfortable putting SQL and PostgreSQL on their resume",
      "Learn to perform GROUP BY statements",
      "Replicate real-world situations and query reports"
    ],
    courseIncludes: [
      { icon: Video, text: "9 hours on-demand video" },
      { icon: BookCopy, text: "14 articles" },
      { icon: Download, text: "13 downloadable resources" },
      { icon: MonitorPlay, text: "Access on mobile and TV" },
      { icon: Infinity, text: "Full lifetime access" },
      { icon: GanttChartSquare, text: "Certificate of completion" },
    ],
    courseContent: [
      {
        sectionTitle: "Course Introduction",
        lectures: [
          { title: "Welcome Message", duration: "00:34" },
          { title: "Introduction", duration: "02:15", isPreviewable: true },
          { title: "Course Curriculum Overview", duration: "01:41" },
          { title: "Overview of Databases", duration: "07:37" },
          { title: "Course FAQs", duration: "01:14" },
          { title: "Windows Installation - PostgreSQL and PgAdmin with Database Setup", duration: "21:09", isPreviewable: true },
          { title: "MacOS Installation - PostgreSQL and PgAdmin with First Query", duration: "23:06" },
          { title: "pgAdmin Overview", duration: "09:44" },
        ],
        totalDuration: "1hr 7min",
        lectureCount: 8,
      },
      {
        sectionTitle: "SQL Statement Fundamentals",
        lectures: [
          { title: "SELECT Statement", duration: "05:12" },
          { title: "SELECT DISTINCT", duration: "03:45" },
          // ... more lectures
        ],
        totalDuration: "1hr 37min",
        lectureCount: 18,
      },
      {
        sectionTitle: "GROUP BY Statements",
        lectures: [
          { title: "Aggregate Functions", duration: "08:20" },
          { title: "GROUP BY Clause", duration: "11:05" },
          // ... more lectures
        ],
        totalDuration: "41min",
        lectureCount: 7,
      },
      {
        sectionTitle: "Assessment Test 1",
        lectures: [
          { title: "Test Instructions", duration: "01:15" },
          { title: "Assessment Questions", duration: "01:00" },
        ],
        totalDuration: "2min",
        lectureCount: 3,
      },
      // ... more sections
    ],
    category: "Business > Business Analytics & Intelligence > SQL",
  },
  {
    id: 2,
    title: "Advanced React Development",
    subtitle: "Master modern React",
    description: "Master React.js by building complex applications with hooks, context API, and more.",
    instructor: "Sarah Johnson",
    duration: "10 weeks",
    totalLectures: 50,
    level: "Intermediate",
    rating: 4.9,
    enrolled: 987,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=500&h=300",
    price: 599,
    originalPrice: 3499,
    lastUpdated: "11/2023",
    language: "English",
    whatYoullLearn: ["Advanced Hooks", "Context API Deep Dive", "Performance Optimization"],
    courseIncludes: [
      { icon: Video, text: "10 hours on-demand video" },
      { icon: MonitorPlay, text: "Access on mobile and TV" },
      { icon: Infinity, text: "Full lifetime access" },
      { icon: GanttChartSquare, text: "Certificate of completion" },
    ],
    courseContent: [], // Simplified for brevity
  },
  {
    id: 3,
    title: "Python for Data Science",
    subtitle: "Learn Python for data analysis",
    description: "Learn Python programming and essential libraries for data analysis and visualization.",
    instructor: "David Chen",
    duration: "12 weeks",
    totalLectures: 100,
    level: "Intermediate",
    rating: 4.7,
    enrolled: 1560,
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&q=80&w=500&h=300",
    price: 549,
    originalPrice: 3199,
    isBestseller: true,
    lastUpdated: "10/2023",
    language: "English",
    whatYoullLearn: ["NumPy", "Pandas", "Matplotlib"],
    courseIncludes: [
      { icon: Video, text: "12 hours on-demand video" },
      { icon: MonitorPlay, text: "Access on mobile and TV" },
      { icon: Infinity, text: "Full lifetime access" },
      { icon: GanttChartSquare, text: "Certificate of completion" },
    ],
    courseContent: [],
  },
  {
    id: 4,
    title: "Mobile App Development with Flutter",
    subtitle: "Build beautiful cross-platform apps",
    description: "Build cross-platform mobile applications with Google's Flutter framework.",
    instructor: "Emily Rodriguez",
    duration: "10 weeks",
    totalLectures: 60,
    level: "Intermediate",
    rating: 4.6,
    enrolled: 876,
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=500&h=300",
    price: 599,
    originalPrice: 3299,
    lastUpdated: "09/2023",
    language: "English",
    whatYoullLearn: ["Dart Programming", "Flutter Widgets", "State Management"],
    courseIncludes: [
      { icon: Video, text: "10 hours on-demand video" },
      { icon: MonitorPlay, text: "Access on mobile and TV" },
      { icon: Infinity, text: "Full lifetime access" },
      { icon: GanttChartSquare, text: "Certificate of completion" },
    ],
    courseContent: [],
  },
  {
    id: 5,
    title: "Mastering Node.js & Express",
    subtitle: "Build scalable backend APIs",
    description: "Build scalable backend applications using Node.js, Express, and MongoDB.",
    instructor: "Michael Brown",
    duration: "9 weeks",
    totalLectures: 70,
    level: "Intermediate",
    rating: 4.8,
    enrolled: 1120,
    image: "https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?auto=format&fit=crop&q=80&w=500&h=300",
    price: 499,
    originalPrice: 2799,
    lastUpdated: "08/2023",
    language: "English",
    whatYoullLearn: ["Node.js Fundamentals", "Express Middleware", "MongoDB Integration"],
     courseIncludes: [
      { icon: Video, text: "9 hours on-demand video" },
      { icon: MonitorPlay, text: "Access on mobile and TV" },
      { icon: Infinity, text: "Full lifetime access" },
      { icon: GanttChartSquare, text: "Certificate of completion" },
    ],
    courseContent: [],
  },
  {
    id: 6,
    title: "Introduction to Cloud Computing (AWS)",
    subtitle: "Understand the AWS Cloud",
    description: "Understand core AWS services and cloud computing concepts.",
    instructor: "Linda Green",
    duration: "6 weeks",
    totalLectures: 40,
    level: "Beginner",
    rating: 4.7,
    enrolled: 2050,
    image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?auto=format&fit=crop&q=80&w=500&h=300",
    price: 399,
    originalPrice: 2499,
    isBestseller: true,
    lastUpdated: "07/2023",
    language: "English",
    whatYoullLearn: ["Core AWS Services", "Cloud Concepts", "EC2 & S3 Basics"],
     courseIncludes: [
      { icon: Video, text: "6 hours on-demand video" },
      { icon: MonitorPlay, text: "Access on mobile and TV" },
      { icon: Infinity, text: "Full lifetime access" },
      { icon: GanttChartSquare, text: "Certificate of completion" },
    ],
    courseContent: [],
  },
  {
    id: 7,
    title: "Complete SQL Bootcamp", // Duplicate title for testing, different ID
    subtitle: "SQL for Beginners",
    description: "Learn SQL for data analysis and database management from scratch.",
    instructor: "Robert Davis",
    duration: "7 weeks",
    totalLectures: 55,
    level: "Beginner",
    rating: 4.9,
    enrolled: 1890,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=500&h=300",
    price: 449,
    originalPrice: 2699,
    lastUpdated: "06/2023",
    language: "English",
    whatYoullLearn: ["SELECT statements", "Database Joins", "Window Functions"],
    courseIncludes: [
      { icon: Video, text: "7 hours on-demand video" },
      { icon: MonitorPlay, text: "Access on mobile and TV" },
      { icon: Infinity, text: "Full lifetime access" },
      { icon: GanttChartSquare, text: "Certificate of completion" },
    ],
    courseContent: [
       {
        sectionTitle: "Basic SQL Commands",
        lectures: [
          { title: "Introduction to SQL", duration: "10:00" },
          { title: "SELECT and FROM", duration: "15:30" },
        ],
        totalDuration: "25min",
        lectureCount: 2,
      },
      {
        sectionTitle: "Filtering Data",
        lectures: [
          { title: "WHERE Clause", duration: "12:00" },
        ],
        totalDuration: "12min",
        lectureCount: 1,
      },
    ],
    category: "Databases > SQL",
  },
  {
    id: 8,
    title: "Advanced CSS and Sass",
    subtitle: "Modern CSS techniques",
    description: "Flexbox, Grid, Animations and Sass - build modern responsive layouts.",
    instructor: "Jessica White",
    duration: "6 weeks",
    totalLectures: 45,
    level: "Intermediate",
    rating: 4.8,
    enrolled: 750,
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=500&h=300",
    price: 499,
    originalPrice: 2999,
    lastUpdated: "05/2023",
    language: "English",
    whatYoullLearn: ["Flexbox Layouts", "CSS Grid", "Sass Variables & Mixins"],
     courseIncludes: [
      { icon: Video, text: "6 hours on-demand video" },
      { icon: MonitorPlay, text: "Access on mobile and TV" },
      { icon: Infinity, text: "Full lifetime access" },
      { icon: GanttChartSquare, text: "Certificate of completion" },
    ],
    courseContent: [],
  },
  {
    id: 9,
    title: "Machine Learning A-Z",
    subtitle: "Learn ML with Python & R",
    description: "Hands-on Python & R programming for practical machine learning applications.",
    instructor: "Dr. Chris Lee",
    duration: "15 weeks",
    totalLectures: 120,
    level: "Advanced",
    rating: 4.7,
    enrolled: 2200,
    image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=500&h=300",
    price: 699,
    originalPrice: 4499,
    isBestseller: true,
    lastUpdated: "04/2023",
    language: "English",
    whatYoullLearn: ["Regression Models", "Classification Algorithms", "Deep Learning Basics"],
     courseIncludes: [
      { icon: Video, text: "15 hours on-demand video" },
      { icon: MonitorPlay, text: "Access on mobile and TV" },
      { icon: Infinity, text: "Full lifetime access" },
      { icon: GanttChartSquare, text: "Certificate of completion" },
    ],
    courseContent: [],
  },
  {
    id: 10,
    title: "UI/UX Design Fundamentals",
    subtitle: "Create user-friendly interfaces",
    description: "Learn the basics of user interface and user experience design principles.",
    instructor: "Amanda Miller",
    duration: "5 weeks",
    totalLectures: 30,
    level: "Beginner",
    rating: 4.9,
    enrolled: 1400,
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=500&h=300",
    price: 399,
    originalPrice: 1999,
    lastUpdated: "03/2023",
    language: "English",
    whatYoullLearn: ["User Research", "Wireframing", "Prototyping Tools"],
     courseIncludes: [
      { icon: Video, text: "5 hours on-demand video" },
      { icon: MonitorPlay, text: "Access on mobile and TV" },
      { icon: Infinity, text: "Full lifetime access" },
      { icon: GanttChartSquare, text: "Certificate of completion" },
    ],
    courseContent: [],
  }
];

// Popular searches
export const popularSearches = [
  "JavaScript",
  "React.js",
  "Python",
  "Data Science",
  "Machine Learning",
  "Web Development"
];

// Trending searches
export const trendingSearches = [
  "Flutter Development",
  "TypeScript",
  "Cloud Computing",
  "AI Fundamentals",
  "Blockchain",
  "Microsoft Power Apps"
];

// Define the Mentor type/interface
export interface Mentor {
  id: number;
  name: string;
  role: string;
  specialization: string;
  experience: string; // e.g., "10+ years"
  rating: number;
  reviews: number;
  hourlyRate: string; // e.g., "$85"
  availability: string;
  isAvailable: boolean;
  about: string;
  avatar: string;
}

// Sample mentor data
export const mentors: Mentor[] = [
  {
    id: 1,
    name: "Dr. Michael Turner",
    role: "Senior Web Developer",
    specialization: "Frontend Development",
    experience: "10+ years",
    rating: 4.9,
    reviews: 352,
    hourlyRate: "$85",
    availability: "Mon-Fri",
    isAvailable: true,
    about: "Experienced web developer specializing in React and modern JavaScript frameworks. Passionate about teaching and mentoring new developers.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    name: "Emma Williams",
    role: "Data Scientist",
    specialization: "Machine Learning",
    experience: "8 years",
    rating: 4.8,
    reviews: 218,
    hourlyRate: "$95",
    availability: "Weekends",
    isAvailable: false,
    about: "AI researcher with expertise in machine learning algorithms and data visualization. Loves to help students understand complex ML concepts.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    name: "James Anderson",
    role: "Software Architect",
    specialization: "Backend Development",
    experience: "12 years",
    rating: 4.7,
    reviews: 176,
    hourlyRate: "$90",
    availability: "Flexible",
    isAvailable: true,
    about: "Skilled software architect with experience in designing scalable systems. Specializes in Node.js, Python, and cloud infrastructure.",
    avatar: "https://randomuser.me/api/portraits/men/62.jpg"
  },
  {
    id: 4,
    name: "Sophia Martinez",
    role: "Mobile Developer",
    specialization: "iOS/Android Development",
    experience: "7 years",
    rating: 4.9,
    reviews: 143,
    hourlyRate: "$80",
    availability: "Evenings",
    isAvailable: true,
    about: "Passionate mobile developer with expertise in React Native, Flutter, and native app development. Enjoys teaching modern mobile practices.",
    avatar: "https://randomuser.me/api/portraits/women/28.jpg"
  },
  {
    id: 5,
    name: "William Garcia",
    role: "DevOps Engineer",
    specialization: "Cloud Infrastructure (AWS/Azure)",
    experience: "9 years",
    rating: 4.8,
    reviews: 290,
    hourlyRate: "$100",
    availability: "Mon-Thu",
    isAvailable: false,
    about: "Expert in CI/CD pipelines, containerization (Docker, Kubernetes), and cloud automation. Helps teams streamline their deployment processes.",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg"
  },
  {
    id: 6,
    name: "Olivia Rodriguez",
    role: "UX/UI Designer",
    specialization: "User Experience Design",
    experience: "6 years",
    rating: 4.9,
    reviews: 180,
    hourlyRate: "$75",
    availability: "Flexible",
    isAvailable: true,
    about: "Creative UX/UI designer focused on creating intuitive and engaging user interfaces. Proficient in Figma, Sketch, and Adobe XD.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  },
];

// Extract unique specializations for filtering
export const mentorSpecializations = Array.from(new Set(mentors.map(mentor => mentor.specialization))); 