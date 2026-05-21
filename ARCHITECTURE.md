# RoachSwap Architecture Guide 🏗️

Welcome to the RoachSwap codebase! This document is designed to help open-source contributors (especially beginners from GSSoC, SSOC, etc.) understand how the project is structured so you can start contributing quickly without getting lost.

## High-Level Overview
RoachSwap is a standard **MERN** stack application (MongoDB, Express, React, Node.js) with real-time features powered by Socket.io.

The repository is split into two main directories:
1. `/client` - The React frontend (built with Vite and TailwindCSS)
2. `/server` - The Node/Express backend

---

## 💻 1. The Frontend (`/client`)

The frontend is a Single Page Application (SPA) built using React. We use **Vite** as our bundler because it is significantly faster than Create React App.

### Key Folders in `client/src/`

- **`assets/`**: Static images and SVG files (like the Roach Propaganda posters).
- **`components/`**: Reusable UI pieces. 
  - *Example:* `layout/Navbar.jsx` or the `ScreamTicker.jsx`. If you are adding a button or a reusable card, it goes here.
- **`context/`**: React Context API providers for global state management.
  - *`AuthContext.jsx`*: Handles user login, registration, global state for the `user` object, and Axios interceptors for attaching the JWT token to requests.
  - *`SocketContext.jsx`*: Manages the global Socket.io connection for real-time features.
- **`pages/`**: The actual "screens" or "views" of the app.
  - *Example:* `Home.jsx` (the manifesto landing page), `RejectionWall.jsx`, `Anthill.jsx`.
  - Pages usually fetch data from the backend using `axios` and then render `components`.
- **`utils/`**: Helper functions and constants.
  - *`roachCopy.js`*: Contains the standard satirical text and error messages used across the app so we keep the "cockroach" tone consistent.

### Styling
We use **Tailwind CSS**. You will rarely write custom CSS. Most styling is done via utility classes directly in the JSX. 
- *Design System:* Look at `tailwind.config.js` to see our custom brutalist colors (like `roach-ink`, `roach-coral`, `roach-surface`).

---

## ⚙️ 2. The Backend (`/server`)

The backend is an Express REST API that connects to MongoDB via Mongoose.

### Key Folders in `server/`

- **`models/`**: Mongoose schemas. This defines the structure of our database.
  - *Example:* `User.js` defines what data a user has. `Rant.js` defines a rant on the Rejection Wall.
- **`routes/`**: Defines the API endpoints (URLs) and routes them to the correct controller.
  - *Example:* `rantRoutes.js` says that a `GET /` request goes to `getRandomTickerRants`.
- **`controllers/`**: The actual business logic. This is where the database is queried and manipulated.
  - *Example:* `rantController.js` has the logic to fetch rants from MongoDB and return them as JSON.
- **`middleware/`**: Functions that run *before* the controller.
  - *`authMiddleware.js`*: Intercepts requests to check if the user has a valid JWT token. If they don't, it blocks the request.
  - *`shellShield.js`*: Masks a user's real name with their alias if they have the privacy "Shell Shield" activated.
- **`socket/`**: Contains the logic for real-time WebSockets (Socket.io).
  - *`pheromoneSocket.js`*: Manages live chat rooms for the HiveMind feature.

---

## 🛣️ How a Request Works (The Flow)

If you are confused about how the frontend talks to the backend, here is the lifecycle of a typical request (e.g., getting the Scream Ticker rants):

1. **Client (React):** `ScreamTicker.jsx` uses `useEffect` to make an `axios.get('/api/rants/ticker')` request.
2. **Server (Express Route):** `server/routes/rantRoutes.js` receives the `/ticker` request and passes it to the `getRandomTickerRants` controller function.
3. **Server (Controller):** `server/controllers/rantController.js` uses the `Rant` Mongoose model to query the MongoDB database for 5 random rants.
4. **Response:** The controller sends the rants back as JSON.
5. **Client (React):** The `axios` promise resolves, the state is updated, and the React component re-renders to show the text on the screen!

---

## 🪳 Ready to Code?
If you're unsure where to start, look for files in the `client/src/pages` folder to understand how the UI is laid out, or check `server/controllers` to understand the business logic.

Happy scavenging!
