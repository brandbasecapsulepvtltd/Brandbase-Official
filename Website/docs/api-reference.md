# Brandbase API Reference

All requests to the Brandbase API (except `/` and `/api/health`) require an API key to be sent in the headers.

### Authentication Headers
```http
X-API-Key: YOUR_API_KEY
// OR
Authorization: Bearer YOUR_API_KEY
```

---

## 1. Authentication
Endpoints for admin login and token verification.

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Authenticate an admin user and receive a JWT. | API Key |
| `GET` | `/api/auth/verify` | Verify if the current JWT token is valid. | Admin JWT |

---

## 2. Homepage Content
Manage the content displayed on the main landing page.

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/homepage` | Get all homepage data (Hero, services, clients, etc.). | API Key |
| `POST` | `/api/homepage` | Create initial homepage data document. | Admin JWT |
| `PUT` | `/api/homepage` | Overwrite the entire homepage data document. | Admin JWT |
| `PATCH`| `/api/homepage/section/:sectionName`| Update a specific section of the homepage. | Admin JWT |
| `DELETE`| `/api/homepage` | Delete the homepage data document. | Admin JWT |

---

## 3. Services & Categories
Manage the services offered by the agency.

### Categories
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/service-categories` | Get all service categories. | API Key |
| `POST` | `/api/service-categories` | Create a new service category. | Admin JWT |
| `PUT` | `/api/service-categories/:id` | Update a specific category. | Admin JWT |
| `DELETE`| `/api/service-categories/:id` | Delete a specific category. | Admin JWT |

### Services
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/services` | Get all individual services. | API Key |
| `GET` | `/api/services/:category/:slug` | Get a specific service by its category and slug. | API Key |
| `POST` | `/api/services` | Create a new service. | Admin JWT |
| `PUT` | `/api/services/:id` | Update a specific service. | Admin JWT |
| `DELETE`| `/api/services/:id` | Delete a specific service. | Admin JWT |

---

## 4. Leads & Contact
Manage incoming inquiries from website contact forms.

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/leads` | Submit a new lead (Public form submission). | API Key |
| `GET` | `/api/leads` | Retrieve all leads (with optional filtering). | Admin JWT |
| `GET` | `/api/leads/:id` | Get details of a specific lead. | Admin JWT |
| `PUT` | `/api/leads/:id` | Update a lead's status (e.g., mark as read). | Admin JWT |
| `DELETE`| `/api/leads/:id` | Delete a lead. | Admin JWT |
| `GET` | `/api/leads/stats/overview` | Get dashboard statistics for leads. | Admin JWT |
| `GET` | `/api/leads/export/csv` | Export lead data to a CSV file. | Admin JWT |

---

## 5. Appointments & Calendar
Manage "Talk to Sales" bookings and Google Calendar integration.

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/appointments/book` | Submit a new appointment request (Google Calendar sync). | API Key |
| `GET` | `/api/appointments` | Get all booked appointments. | Admin JWT |
| `GET` | `/api/appointments/:id` | Get details of a single appointment. | Admin JWT |
| `PUT` | `/api/appointments/:id/status`| Update appointment status (Pending/Confirmed/Cancelled). | Admin JWT |
| `DELETE`| `/api/appointments/:id` | Delete an appointment record. | Admin JWT |
| `GET` | `/api/appointments/available-slots`| Get available time slots for booking. | API Key |

---

## 6. Blogs
Manage blog posts and AI-generated content.

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/blogs` | Get all published blog posts. | API Key |
| `GET` | `/api/blogs/:slug` | Get a specific blog post by slug. | API Key |
| `POST` | `/api/blogs` | Create a new blog post. | Admin JWT |
| `PUT` | `/api/blogs/:id` | Update an existing blog post. | Admin JWT |
| `DELETE`| `/api/blogs/:id` | Delete a blog post. | Admin JWT |
| `POST` | `/api/blogs/generate` | Trigger AI to generate a blog based on a topic. | Admin JWT |

---

## 7. Portfolios & Work
Manage case studies and past project showcases.

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/portfolios` | Get all portfolio items. | API Key |
| `GET` | `/api/portfolios/:slug` | Get a specific portfolio item by slug. | API Key |
| `POST` | `/api/portfolios` | Create a new portfolio item. | Admin JWT |
| `PUT` | `/api/portfolios/:id` | Update a portfolio item. | Admin JWT |
| `DELETE`| `/api/portfolios/:id` | Delete a portfolio item. | Admin JWT |

---

## 8. Employees / Team
Manage team members displayed on the "About Us" page.

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/employees` | Get all team members. | API Key |
| `POST` | `/api/employees` | Add a new team member. | Admin JWT |
| `PUT` | `/api/employees/:id` | Update a team member's details. | Admin JWT |
| `DELETE`| `/api/employees/:id` | Remove a team member. | Admin JWT |

---

## 9. System & UI Configuration (CMS)
Endpoints used by the Admin Dashboard to manage global UI elements.

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET/PUT`| `/api/about-section` | Manage the "About Us" page layout. | GET: Key, PUT: JWT |
| `GET/PUT`| `/api/policies` | Manage Terms of Service / Privacy Policy. | GET: Key, PUT: JWT |
| `GET/PUT`| `/api/topbar` | Manage the notification top bar. | GET: Key, PUT: JWT |
| `GET/PUT`| `/api/navbar` | Manage navigation links. | GET: Key, PUT: JWT |
| `GET/PUT`| `/api/footer` | Manage footer links and info. | GET: Key, PUT: JWT |
| `GET/PUT`| `/api/floatinglatest`| Manage the floating "Latest News" widget. | GET: Key, PUT: JWT |

---

## 10. Health & Utility

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Check server health, uptime, and DB connection. | None |
| `GET` | `/api/verify-key` | Verify if the provided API key is valid. | API Key |
