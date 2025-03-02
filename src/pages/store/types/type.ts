// Define an enum for course levels
export enum CourseLevel {
    Beginner = 'beginner',
    Intermediate = 'intermediate',
    Advanced = 'advanced',
}

// Define an enum for material types
export enum MaterialType {
    Video = 'video',
    PDF = 'pdf',
    Quiz = 'quiz',
}

// Define the User interface
export interface User {
    _id: string;
    name: string;
    email: string;
    role: 'student' | 'instructor' | 'admin'; // Define user roles
    avatar?: string; // Optional avatar URL
    createdAt?: string; // Optional timestamp
    updatedAt?: string; // Optional timestamp
}

// Define the Course interface
interface CourseMaterial {
    title: string;
    name: string;
    type: string; // e.g., "video", "pdf", "quiz"
    url: string;
}
export interface Course {
    _id: { $oid: string };
    title: string;
    rating: number;
    id: string|number;
    thumbnail: string;
    description: string;
    instructor: { $oid: string };
    enrolledStudents: Array<{ $oid: string }>;
    category: string;
    duration: number;
    level: string;
    price: number;
    isPublished: boolean;
    materials: CourseMaterial[]; // Use `unknown[]` or define a specific type
    purchases: Array<{
        student: { $oid: string };
        purchaseDate: { $date: string };
        amount: number;
        _id: { $oid: string };
        createdAt: { $date: string };
        updatedAt: { $date: string };
    }>;
    createdAt: { $date: string };
    updatedAt: { $date: string };
    slug: string;
    __v: number;
}

// Define the Material interface
export interface Material {
    _id: string;
    title: string;
    url: string;
    type: MaterialType; // Use the enum here
    duration?: number; // Optional duration in minutes (for videos)
    createdAt?: string; // Optional timestamp
    updatedAt?: string; // Optional timestamp
}

// Define the Purchase interface
export interface Purchase {
    _id: string;
    student: string; // User ID
    course: string; // Course ID
    purchaseDate: string;
    amount: number;
    paymentStatus: 'pending' | 'completed' | 'failed'; // Payment status
    createdAt?: string; // Optional timestamp
    updatedAt?: string; // Optional timestamp
}

// Define the Filters interface for course filtering
export interface Filters {
    category: string;
    level: string;
    search: string;
}

// Define the Pagination interface for API responses
export interface Pagination {
    page: number;
    limit: number;
    total: number;
    pages: number;
}

// Define the API Response interface for courses
export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data: T;
    pagination?: Pagination; // Optional pagination data
}

// Define the Enrollment interface
export interface Enrollment {
    _id: string;
    student: string; // User ID
    course: string; // Course ID
    enrolledAt: string;
    progress?: number; // Optional progress percentage
    completed?: boolean; // Optional completion status
    createdAt?: string; // Optional timestamp
    updatedAt?: string; // Optional timestamp
}

// Define the Review interface
export interface Review {
    _id: string;
    student: string; // User ID
    course: string; // Course ID
    rating: number; // Rating out of 5
    comment?: string; // Optional comment
    createdAt?: string; // Optional timestamp
    updatedAt?: string; // Optional timestamp
}