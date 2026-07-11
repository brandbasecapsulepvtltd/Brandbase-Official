# Brandbase Developer Documentation: Client Application

This document provides a comprehensive overview of the `client` directory of the Brandbase project, serving as the public-facing frontend of the application.

## 1. Project Overview & Architecture

The client application is built using **React (JavaScript)** and bundled with **Vite** for fast, modern web development.
Styling is primarily handled via **Tailwind CSS**, and animations are powered by **Framer Motion** to deliver a premium, dynamic user experience.

### Directory Structure (`client/src/`)

```text
client/
├── src/
│   ├── app/          # App initialization, global layout, and routing logic
│   ├── components/   # Reusable UI components (buttons, sections, cards, modals)
│   ├── Data/         # Static fallback data and configuration files
│   ├── hooks/        # Custom React hooks (e.g., useIntersectionObserver)
│   ├── lib/          # Utility libraries and API configurations (e.g., axios setup)
│   ├── pages/        # Top-level route components (Home, About, Services, Blog)
│   └── .env.local    # Local environment variables
```

## 2. Setup & Environment

To run the client application locally, ensure you have Node.js installed.

### Environment Setup (`.env.local` file)
Create a `.env.local` file in the root of the `client` directory:

```ini
# The base URL of the backend API
VITE_API_URL=http://localhost:5000

# Optional: Public API Key if the client needs to talk to protected GET routes
VITE_PUBLIC_API_KEY=your_public_api_key_here
```

### Starting the Development Server
```bash
cd client
npm install
npm run dev # Starts Vite development server (usually on http://localhost:5173)
```

## 3. Core Architecture

### Routing (`react-router-dom`)
The application uses `react-router-dom` for client-side navigation. Typical routes include:
- `/` - Home Page (dynamic content fetched via API)
- `/services` - Services Overview
- `/services/:category/:slug` - Individual Service Detail page
- `/portfolio` - Case Studies / Works
- `/blog` - Blog Overview
- `/blog/:slug` - Individual Blog Post
- `/about` - About Us
- `/contact` - Contact Us (Form Submission)

### State Management & Data Fetching
- **Local State**: Managed via standard React hooks (`useState`, `useReducer`).
- **Data Fetching**: The application heavily relies on **Axios** (configured in `src/lib/` or `src/utils/` depending on recent refactors) to communicate with the Backend API.
- **Dynamic CMS Content**: Pages like the Home page dynamically request their structural data from the backend (e.g., Hero image, Testimonials) so the Admin can customize the site without code changes.

## 4. Key Components and Features

### 4.1 UI Component Hierarchy (`src/components/`)
The `components` directory is large and typically subdivided by feature or page:
- **`Layout/`**: Contains the global `Navbar`, `Footer`, and `TopBar` components.
- **`UI/`**: Reusable base elements (Buttons, Inputs, Cards).
- **`Home/`**: Specific sections exclusively used on the landing page (HeroSection, BrandElevation, Testimonials slider).
- **`Forms/`**: Reusable form components for Contact, Newsletter, and "Talk to Sales" logic.

### 4.2 Form Handling & Leads
Forms (Contact and Appointment/Talk to Sales) gather data and POST it to the respective backend endpoints (`/api/leads` and `/api/appointments/book`).
- **Booking Flow**: The "Talk to Sales" form acts as a multi-step modal, collecting user info, preferred dates/times, and syncing with the backend to create Google Calendar events.

### 4.3 Animation System
- **Framer Motion** is used extensively for scroll-reveal animations, page transitions, and interactive hover effects. Look for components wrapping standard HTML elements with `<motion.div>`.

## 5. Deployment Notes

The client application is configured to be deployed as a static site (using `npm run build`), which generates the optimized HTML/JS/CSS bundle in the `dist` folder. Common hosting platforms for this setup include Netlify, Vercel, or Hostinger.
