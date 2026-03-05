# CREC Education Frontend

This is the frontend application for the **CREC Education** platform, built with **React**, **Vite**, and **TypeScript**. It serves both the main CREC institutional site and the specialized ISTMR (Institut des Sciences et Technologies Matteo Ricci) portals, including the FabLab reservation system.

## 🚀 Technologies

*   **Framework**: React 18
*   **Build Tool**: Vite
*   **Language**: TypeScript
*   **Routing**: React Router DOM v6
*   **Styling**: Tailwind CSS, Framer Motion (for animations)
*   **State Management**: React Context, TanStack React Query (for API state)
*   **UI Components**: Radix UI primitives, Lucide React (icons)
*   **Internationalization**: i18next

## 🛡️ Security Features (Hardened)

The frontend implements robust security measures:
*   **Session Management**: JWT tokens are managed entirely via **HttpOnly cookies** set by the backend. `localStorage` is no longer used for sensitive tokens, protecting against XSS attacks.
*   **Axios Configuration**: Global configuration (`withCredentials: true`) ensures secure cookie transmission on every API request.
*   **Server-Side Validation**: The FabLab reservation system no longer relies on client-side mocks or local storage. All subscription statuses are validated directly against the backend via the `/api/admin/fablab/user-subscription-status` endpoint.

## 📦 Project Structure

```text
src/
├── components/       # Reusable UI components (grouped by feature)
├── contexts/         # React Context providers (Auth, Language, Notifications)
├── hooks/            # Custom React hooks and React Query queries
├── lib/              # Core utilities (e.g., Axios instance configuration)
├── pages/            # Page components (Admin, Fablab, Public facing)
├── services/         # API abstraction layer
├── types/            # TypeScript interface definitions
└── locales/          # i18n translation files
```

## ⚙️ Environment Variables

Create a `.env` file in the root directory based on `.env.example`:

```env
VITE_API_URL=http://localhost:8000/api
VITE_STORAGE_URL=http://localhost:8000/storage
```

*Note: In production (e.g., Vercel), these variables must be configured in the project settings.*

## 🛠️ Local Development

1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Start the development server**:
    ```bash
    npm run dev
    ```
3.  **Build for production**:
    ```bash
    npm run build
    ```

## ☁️ Deployment

The application is configured for seamless deployment on **Vercel**. 
*   Ensure the Node.js version in your Vercel project matches the requirements.
*   The build command is `tsc -b && vite build`.
*   The output directory is `dist`.

## 🎨 Design System

The platform utilizes a **Unified Glassmorphism Design System (UGDS)**, defining a premium, modern aesthetic tailored for educational institutions. Key themes include "Deep Navy" and "Gold" accents for the ISTMR sections, emphasizing prestige and excellence.
