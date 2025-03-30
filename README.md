# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



This project is a basic React setup using Vite. It supports hot module replacement (HMR) and includes ESLint rules.

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

Your app will be running at `http://localhost:5173` by default.

---

## 📦 Build for production

To create a production-ready build:

```bash
npm run build
```

This will generate a `dist` folder with your compiled app.

---

## 🌐 Serve the built app locally

You can serve the contents of the `dist` folder using a local static file server like [serve](https://www.npmjs.com/package/serve):

### Option 1: Using `serve`

First, install it globally if you don't already have it:

```bash
npm install -g serve
```

Then run:

```bash
serve -s dist
```

This will serve your app at `http://localhost:3000` by default.

---

## ✨ Features

- 🔐 **Authentication** – Users can sign up and log in securely.
- 📄 **Event Listing** – Pulls event data from the backend and displays it on the "Search Events" page.
- 🔍 **Search Functionality** – Search for events by title.
- 🗺️ **Create Events** – Users can create new events using Mapbox's address autofill for accurate location input.
- ✅ **Mark as Attending** – Users can save events they want to attend.
- 🧾 **View Your Events** – Users can see a list of the events they've created.
- ❌ **Delete Events** – Users can delete events they created.
- 🗺️ **Map View** – See all events displayed as interactive markers on a map using the Mapbox API.
- 🌤️ **Current Weather** – View real-time weather information for your location using the OpenWeather API.

---

## 📚 Useful Links

- [Vite Docs](https://vitejs.dev/)
- [React Docs](https://react.dev/)
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react)
- [SWC](https://swc.rs/)