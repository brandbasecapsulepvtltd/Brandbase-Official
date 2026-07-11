# Brandbase Developer Documentation: Backend API

This document provides a comprehensive overview of the `backend` directory of the Brandbase project, designed for future developers to easily understand the architecture, database models, and setup procedures.

## 1. Project Overview & Architecture

The backend is built using **Node.js** and **Express.js**, serving a RESTful API to both the public-facing Client application and the secured Admin Dashboard.
Data is persisted using **MongoDB** with **Mongoose** as the ODM (Object Data Modeling) library.

### Directory Structure

```text
backend/
├── config/           # Database and third-party service connections
├── controllers/      # Business logic handlers for API routes
├── middleware/       # Express middlewares (Error handling, validation)
├── models/           # Mongoose schemas for MongoDB collections
├── routes/           # API route definitions and endpoint mapping
├── Seeds/            # Scripts to populate initial database data
├── services/         # Complex background logic (e.g., Blog Scheduler)
├── .env              # Environment variables (DO NOT COMMIT)
└── server.js         # Main application entry point
```

## 2. Setup & Environment

To run the backend locally, you need Node.js (v18 or v20 recommended) and a MongoDB connection string.

### Environment Setup (`.env` file)
Create a `.env` file in the root of the `backend` directory with the following keys:

```ini
# Client Application URL (for CORS)
CLIENT_URL=http://localhost:5173

# Database Connection
MONGODB_URI=mongodb+srv://<user>:<password>@cluster...

# Server Port Options
# PORT=5000

# Security Keys
# Used to secure endpoints from unauthorized access
API_KEY=your_public_api_key_here
ADMIN_API_KEY=your_secure_admin_key_here

# Services
# Brevo / Email Credentials
EMAIL_USER=your_email@domain.com
EMAIL_PASS=your_email_app_password

# Gemini AI (For AI Blog Scheduling)
GEMINI_API_KEY=your_gemini_api_key
```

### Starting the Server
```bash
npm install
npm run dev # Starts server with nodemon for hot-reloading
```

## 3. Database Models (Mongoose)

The application relies on several core collections, defined in `backend/models/`.

### Core Entities
*   **`Admin`**: Handles admin user credentials and authentication securely.
*   **`Appointment`**: Stores "Talk to Sales" or consultation booking details (names, dates, consent).
*   **`Blog`**: Stores blog posts, including AI-generated content (title, slug, content, tags, author, SEO metadata).
*   **`HomePage`**: A singleton document storing all CMS data for the main landing page (Hero, Testimonials, Clients, Recent Work).
*   **`Lead`**: Captures user inquiries from contact forms.
*   **`Service` / `ServiceCategory`**: Stores definitions of what services the agency offers, grouped by categories.
*   **`Portfolio`**: Stores case studies and past project details.
*   **`Event` / `CalendarLead`**: Used for managing Google Calendar integration events.
*   **CMS Models**: `AboutSection`, `Policy`, `TopBar`, `Navbar`, `Footer`, `FloatingLatest` - UI configuration stored in DB.

## 4. Authentication & Security

Security is handled via two primary mechanisms:

### API Keys (`apiKeyAuth` middleware in `server.js`)
Most endpoints (except `/` and `/api/health`) require an API key to protect the server from unauthorized programmatic access.
*   Clients must send the `X-API-Key` header with requests.
*   The key is validated against `process.env.API_KEY`.

### Admin JWT Authentication (`authMiddleware.js` & `Admin.js`)
For sensitive operations (like deleting items or managing the CMS via the Admin Dashboard):
*   Admins log in using credentials verified by `authController.js`.
*   A JWT (JSON Web Token) is assigned.
*   The token must be provided as a Bearer token in the `Authorization` header.

---
*Note: This document covers the backend architecture. For specific API endpoint details, please refer to the API Reference Documentation.*
