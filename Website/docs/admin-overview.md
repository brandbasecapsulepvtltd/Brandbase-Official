# Brandbase Developer Documentation: Admin Dashboard (CMS)

This document provides a comprehensive overview of the `admin` directory of the Brandbase project. This application serves as the Content Management System (CMS) for agency staff to manage website content, view leads, and schedule blogs.

## 1. Project Overview & Architecture

The Admin Dashboard is built using React (Vite template) and styled with Tailwind CSS. It is a completely separate application from the main `client` website, ensuring that heavy CMS code and administrative libraries are not shipped to end users.

### Directory Structure (`admin/src/`)

```text
admin/
├── src/
│   ├── App.jsx         # Root component with protected routing logic
│   ├── components/     # Reusable UI components (Sidebar, TopBar)
│   ├── context/        # React Context providers (AuthContext)
│   ├── pages/          # CMS feature pages (Dashboard, AdminHome, Blogs, Leads)
│   ├── utils/          # Utilities, primarily the configured Axios instance
│   └── index.css       # Global Tailwind imports
```

## 2. Setup & Environment

To run the admin dashboard locally, you need Node.js.

### Environment Setup (`.env` file)
Create a `.env` file in the root of the `admin` directory. This tells the admin dashboard where the backend lives and provides the static API Key needed to make requests.

```ini
# The base URL of the backend API
VITE_API_URL=http://localhost:5000

# The API Key required by the backend's apiKeyAuth middleware
VITE_ADMIN_API_KEY=your_secure_admin_key_here
```

### Starting the Development Server
```bash
cd admin
npm install
npm run dev # Starts Vite development server 
```

## 3. Core Architecture & Security

### 3.1 Authentication Flow (`AuthContext.jsx`)
Access to the CMS is strictly controlled.
1. **Login (`/pages/Login.jsx`)**: The user submits credentials to the backend (`/api/auth/login`).
2. **Token Storage**: On success, the backend returns a JWT which is stored securely in `localStorage` as `adminToken`.
3. **Auth Context**: `AuthContext` wraps the application, exposing the current login state and a `logout` function.
4. **Protected Routes (`App.jsx`)**: Custom `ProtectedRoute` components wrap all CMS views. If `!token`, the user is redirected to the `/login` page.

### 3.2 API Integration Strategy (`utils/axios.js`)
The admin app uses a pre-configured Axios instance (`adminAxios`) for all backend communication:
1. **Base URL**: Automatically points to `VITE_API_URL`.
2. **API Key Header**: Automatically injects `X-API-Key` using `VITE_ADMIN_API_KEY`.
3. **Request Interceptor (JWT)**: Automatically grabs the `adminToken` from `localStorage` and injects it as an `Authorization: Bearer <token>` header on every request.
4. **Extended Timeout**: Set to 90 seconds (90000ms) specifically to handle long-running requests like the AI Blog Generator.

## 4. Key CMS Features (Pages)

The `pages/` directory contains the core functionality of the CMS:

*   **`AdminHome.jsx`**: A complex, multi-section manager for the public Landing Page. It loads the `HomePage` singleton document and provides form modals to edit the Hero section, Client logos, Testimonials, and Case Studies. *Note: Data must be saved via explicit Save buttons to trigger the PUT request.*
*   **`Blogs.jsx`**: Lists all published blogs with CRUD capabilities.
*   **`AddGeneratedBlog.jsx`**: Connects to the backend's Gemini AI integration to automatically generate and schedule blog content based on prompts.
*   **`AppointmentsAdmin.jsx`**: A table view of all "Talk to Sales" bookings, allowing admins to mark them as confirmed or cancelled.
*   **`Leads.jsx`**: View inbox inquiries submitted through the contact forms.
*   **`ServicesAdmin.jsx` & `ServiceCategoriesAdmin.jsx`**: Manage the offerings displayed on the website.
*   **`Layout System Config`**: Pages like `FooterAdmin.jsx`, `TopBarAdmin.jsx`, and `NavbarAdmin.jsx` allow dynamic configuration of the site's structural UI.

## 5. Deployment Notes

Like the client application, the admin dashboard is compiled into static assets (`npm run build`). It is typically deployed to a separate subdomain (e.g., `admin.brandbasecapsule.com` or `bcpl-admin.netlify.app`) to isolate it from the main website infrastructure.
