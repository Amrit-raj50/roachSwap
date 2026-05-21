import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { SocketProvider } from "./context/SocketContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import MovementBanner from "./components/movement/MovementBanner";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Anthill from "./pages/Anthill";
import ProjectDetail from "./pages/ProjectDetail";
import MoultMarket from "./pages/MoultMarket";
import HiveMind from "./pages/HiveMind";
import PheromoneBoard from "./pages/PheromoneBoard";
import FrassFund from "./pages/FrassFund";
import ExoResume from "./pages/ExoResume";
import Chitinboard from "./pages/Chitinboard";
import ScrambleMode from "./pages/ScrambleMode";
import Profile from "./pages/Profile";
import MovementProjects from "./pages/MovementProjects";
import Collaborate from "./pages/Collaborate";
import ScrapYard from "./pages/ScrapYard";
import AdminPanel from "./pages/AdminPanel";
import RejectionWall from "./pages/RejectionWall";
import NotFound from "./pages/NotFound";
import ScreamTicker from "./components/ScreamTicker";

export default function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Toaster 
              position="bottom-right"
              toastOptions={{
                className: 'font-mono text-sm border-2 border-roach-ink rounded-none shadow-[2px_2px_0px_0px_rgba(44,44,42,1)]',
                style: {
                  background: '#F1EFE8',
                  color: '#2C2C2A',
                },
              }}
            />
            <MovementBanner />
            <div className="sticky top-0 z-50 flex flex-col w-full">
              <Navbar />
              <ScreamTicker />
            </div>
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/leaderboard" element={<Chitinboard />} />
                <Route path="/scrapyard" element={<ScrapYard />} />
                <Route path="/rejections" element={<RejectionWall />} />
                <Route path="/exoresume/:userId" element={<ExoResume />} />
                <Route path="/movement" element={<MovementProjects />} />
                <Route path="/collaborate" element={<Collaborate />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/anthill" element={<Anthill />} />
                  <Route path="/anthill/:id" element={<ProjectDetail />} />
                  <Route path="/moult" element={<MoultMarket />} />
                  <Route path="/hivemind" element={<HiveMind />} />
                  <Route path="/pheromone" element={<PheromoneBoard />} />
                  <Route path="/frass" element={<FrassFund />} />
                  <Route path="/scramble" element={<ScrambleMode />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/admin" element={<AdminPanel />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </SocketProvider>
    </AuthProvider>
  );
}
