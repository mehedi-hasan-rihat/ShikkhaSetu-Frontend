export const APP_CONFIG = {
  name: 'SkillBridge',
  description: 'Connect with Expert Tutors, Learn Anything',
  version: '1.0.0',
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  TUTORS: {
    LIST: '/tutors',
    DETAIL: '/tutors/:id',
    UPDATE: '/tutors/:id',
  },
  BOOKINGS: {
    CREATE: '/bookings',
    LIST: '/bookings/user/:userId',
    UPDATE: '/bookings/:id/status',
  },
  REVIEWS: {
    CREATE: '/reviews',
    LIST: '/reviews/tutor/:tutorId',
  },
  CATEGORIES: {
    LIST: '/categories',
  },
  ADMIN: {
    USERS: '/admin/users',
    USER_STATUS: '/admin/users/:id/status',
  },
};

export const USER_ROLES = {
  STUDENT: 'student',
  TUTOR: 'tutor',
  ADMIN: 'admin',
} as const;

export const USER_STATUS = {
  ACTIVE: 'active',
  BANNED: 'banned',
  PENDING: 'pending',
} as const;

export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export const SESSION_STATUS = {
  SCHEDULED: 'scheduled',
  ONGOING: 'ongoing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export const ROUTES = {
  HOME: '/',
  TUTORS: '/tutors',
  TUTOR_DETAIL: '/tutors/:id',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  ADMIN: '/admin',
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  THEME: 'theme',
} as const;