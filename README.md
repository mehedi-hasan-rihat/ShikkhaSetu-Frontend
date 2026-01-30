# SkillBridge Frontend 🎓

**"Connect with Expert Tutors, Learn Anything"**

A modern, full-stack web application built with Next.js that connects learners with expert tutors. Students can browse tutor profiles, view availability, and book sessions instantly. Tutors can manage their profiles, set availability, and track their teaching sessions.

## 🚀 Features

### Public Features
- Browse and search tutors by subject, rating, and price
- Filter tutors by category
- View detailed tutor profiles with reviews
- Landing page with featured tutors

### Student Features
- Register and login as student
- Book tutoring sessions
- View upcoming and past bookings
- Leave reviews after sessions
- Manage profile

### Tutor Features
- Register and login as tutor
- Create and update tutor profile
- Set availability slots
- View teaching sessions
- See ratings and reviews

### Admin Features
- View all users (students and tutors)
- Manage user status (ban/unban)
- View all bookings
- Manage categories

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks + Context API
- **HTTP Client**: Fetch API
- **Authentication**: JWT (localStorage)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── tutors/            # Tutor listing and details
│   ├── dashboard/         # User dashboard
│   └── admin/             # Admin panel
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── TutorCard.tsx     # Tutor display component
│   └── SearchFilters.tsx # Search and filter component
├── hooks/                # Custom React hooks
│   ├── useAuth.ts        # Authentication hook
│   └── useTutors.ts      # Tutors data hook
├── services/             # API service layer
│   └── api.ts           # API client
├── types/               # TypeScript type definitions
│   └── index.ts        # Core types
├── utils/              # Utility functions
│   ├── index.ts       # Common utilities
│   └── cn.ts         # Class name utility
└── constants/         # Application constants
    └── index.ts      # App-wide constants
```

## 🎨 Design System

### Components
- **Button**: Multiple variants (primary, secondary, outline, ghost, danger)
- **Input**: Form input with label, error, and helper text
- **Card**: Content container with header, content, and footer
- **TutorCard**: Specialized component for displaying tutor information
- **SearchFilters**: Advanced filtering component

### Color Scheme
- Primary: Blue (600, 700)
- Secondary: Gray (100, 200, 300, 600, 700, 900)
- Success: Green (600, 700)
- Warning: Yellow (400, 600)
- Danger: Red (600, 700)

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd shikkha-setu-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Authentication

The app uses JWT-based authentication with role-based access control:

- **Student**: Can browse tutors, book sessions, leave reviews
- **Tutor**: Can manage profile, set availability, view bookings
- **Admin**: Can manage users, view analytics, moderate content

### Demo Accounts
- Student: `student@example.com` / `password`
- Tutor: `tutor@example.com` / `password`
- Admin: `admin@example.com` / `password`

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🧪 Type Safety

Comprehensive TypeScript types ensure type safety across:
- User roles and permissions
- API request/response interfaces
- Component props
- State management
- Form validation

## 🔄 State Management

- **Authentication**: Context API with useAuth hook
- **Data Fetching**: Custom hooks (useTutors, etc.)
- **Form State**: React useState
- **Global State**: Context API where needed

## 🎯 Key Features Implementation

### Search & Filtering
- Real-time search with debouncing
- Multi-criteria filtering (category, rating, price)
- Sorting options (rating, price, experience)
- Pagination support

### Booking System
- Session scheduling
- Status tracking (pending, confirmed, completed, cancelled)
- Payment integration ready
- Review system post-session

### Admin Panel
- User management with status controls
- Platform analytics
- Content moderation tools
- Category management

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables
```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@skillbridge.com or join our Slack channel.

---

Built with ❤️ using Next.js and TypeScript