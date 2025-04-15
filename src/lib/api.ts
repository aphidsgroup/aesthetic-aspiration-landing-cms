/**
 * WordPress API integration
 * This file handles fetching data from the WordPress REST API
 */

// API Base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_WP_API_URL || 'http://localhost:8082/wp-json/wp/v2';
const AUTH_URL = import.meta.env.VITE_WP_AUTH_URL || 'http://localhost:8082/wp-json/jwt-auth/v1/token';

// JWT Token Storage
const JWT_TOKEN_KEY = 'wp_jwt_token';

// Types
export interface Course {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  featured_media: number;
  acf: {
    duration: string;
    mode: string;
    certification: string;
    batch_size: number;
    slug: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: {
      source_url: string;
    }[];
  };
}

export interface Testimonial {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  featured_media: number;
  acf: {
    name: string;
    position: string;
    location: string;
    rating: number;
  };
  _embedded?: {
    'wp:featuredmedia'?: {
      source_url: string;
    }[];
  };
}

export interface AuthResponse {
  token: string;
  user_email: string;
  user_nicename: string;
  user_display_name: string;
}

// Utility function to handle API errors
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`API Error: ${response.status} ${response.statusText} ${JSON.stringify(errorData)}`);
  }
  return response.json();
};

// Auth utilities
const getAuthToken = (): string | null => {
  return localStorage.getItem(JWT_TOKEN_KEY);
};

const setAuthToken = (token: string): void => {
  localStorage.setItem(JWT_TOKEN_KEY, token);
};

const clearAuthToken = (): void => {
  localStorage.removeItem(JWT_TOKEN_KEY);
};

const getAuthHeaders = (): HeadersInit => {
  const token = getAuthToken();
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// Fallback data when API fails
const fallbackCourses: Course[] = [
  {
    id: 1,
    title: {
      rendered: 'Diploma in Facial Aesthetic Surgery'
    },
    content: {
      rendered: '<p>Master advanced facial aesthetic procedures including fillers, botulinum toxin, thread lifts, and more.</p>'
    },
    excerpt: {
      rendered: '<p>Master advanced facial aesthetic procedures including fillers, botulinum toxin, thread lifts, and more.</p>'
    },
    featured_media: 0,
    acf: {
      duration: '6 Months',
      mode: 'Offline/Hybrid',
      certification: 'International',
      batch_size: 10,
      slug: 'facial-aesthetic'
    }
  },
  {
    id: 2,
    title: {
      rendered: 'Advanced Cosmetology Certification'
    },
    content: {
      rendered: '<p>Comprehensive training in modern cosmetology techniques, skin care treatments, and client management.</p>'
    },
    excerpt: {
      rendered: '<p>Comprehensive training in modern cosmetology techniques, skin care treatments, and client management.</p>'
    },
    featured_media: 0,
    acf: {
      duration: '4 Months',
      mode: 'Offline',
      certification: 'International',
      batch_size: 12,
      slug: 'advanced-cosmetology'
    }
  }
];

const fallbackTestimonials: Testimonial[] = [
  {
    id: 1,
    title: {
      rendered: 'Dr. Priya Sharma'
    },
    content: {
      rendered: '<p>The hands-on training I received was exceptional. I now run my own successful clinic in Mumbai with clients from across Asia.</p>'
    },
    featured_media: 0,
    acf: {
      name: 'Dr. Priya Sharma',
      position: 'Aesthetic Surgeon',
      location: 'Mumbai',
      rating: 5
    }
  },
  {
    id: 2,
    title: {
      rendered: 'Dr. Raj Malhotra'
    },
    content: {
      rendered: '<p>After completing the Master Program, I secured a position at a prestigious clinic in Dubai.</p>'
    },
    featured_media: 0,
    acf: {
      name: 'Dr. Raj Malhotra',
      position: 'Medical Director',
      location: 'Dubai',
      rating: 5
    }
  }
];

// Main API functions
export const api = {
  /**
   * Authenticate with WordPress
   */
  login: async (username: string, password: string): Promise<AuthResponse> => {
    const response = await fetch(AUTH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    
    const data = await handleResponse(response);
    if (data.token) {
      setAuthToken(data.token);
    }
    return data;
  },
  
  /**
   * Log out by clearing token
   */
  logout: (): void => {
    clearAuthToken();
  },
  
  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    return !!getAuthToken();
  },

  /**
   * Fetches all courses with featured media
   */
  getCourses: async (): Promise<Course[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/courses?_embed=wp:featuredmedia&per_page=100`);
      return await handleResponse(response);
    } catch (error) {
      console.warn('Failed to fetch courses from API, using fallback data', error);
      return fallbackCourses;
    }
  },

  /**
   * Fetches a single course by slug
   */
  getCourseBySlug: async (slug: string): Promise<Course> => {
    try {
      const response = await fetch(`${API_BASE_URL}/courses?slug=${slug}&_embed=wp:featuredmedia`);
      const courses = await handleResponse(response);
      if (!courses || courses.length === 0) {
        throw new Error(`Course with slug "${slug}" not found`);
      }
      return courses[0];
    } catch (error) {
      // Return fallback course if found
      const fallbackCourse = fallbackCourses.find(course => course.acf.slug === slug);
      if (fallbackCourse) {
        return fallbackCourse;
      }
      throw error;
    }
  },
  
  /**
   * Create a new course
   */
  createCourse: async (courseData: Partial<Course>): Promise<Course> => {
    const response = await fetch(`${API_BASE_URL}/courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(courseData),
    });
    return handleResponse(response);
  },
  
  /**
   * Update an existing course
   */
  updateCourse: async (id: number, courseData: Partial<Course>): Promise<Course> => {
    const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(courseData),
    });
    return handleResponse(response);
  },
  
  /**
   * Delete a course
   */
  deleteCourse: async (id: number): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  /**
   * Fetches all testimonials with featured media
   */
  getTestimonials: async (): Promise<Testimonial[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/testimonials?_embed=wp:featuredmedia&per_page=100`);
      return await handleResponse(response);
    } catch (error) {
      console.warn('Failed to fetch testimonials from API, using fallback data', error);
      return fallbackTestimonials;
    }
  },
  
  /**
   * Create a new testimonial
   */
  createTestimonial: async (testimonialData: Partial<Testimonial>): Promise<Testimonial> => {
    const response = await fetch(`${API_BASE_URL}/testimonials`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(testimonialData),
    });
    return handleResponse(response);
  },
  
  /**
   * Update an existing testimonial
   */
  updateTestimonial: async (id: number, testimonialData: Partial<Testimonial>): Promise<Testimonial> => {
    const response = await fetch(`${API_BASE_URL}/testimonials/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(testimonialData),
    });
    return handleResponse(response);
  },
  
  /**
   * Delete a testimonial
   */
  deleteTestimonial: async (id: number): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/testimonials/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  /**
   * Fetches WordPress pages
   */
  getPage: async (slug: string): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/pages?slug=${slug}&_embed=wp:featuredmedia`);
    const pages = await handleResponse(response);
    if (!pages || pages.length === 0) {
      throw new Error(`Page with slug "${slug}" not found`);
    }
    return pages[0];
  },

  /**
   * Fetches WordPress menus
   * Requires WP REST API Menus plugin
   */
  getMenu: async (menuId: number): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/menus/${menuId}`);
    return handleResponse(response);
  },
};

export default api; 