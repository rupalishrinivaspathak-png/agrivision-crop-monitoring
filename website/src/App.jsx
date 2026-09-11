import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./pages/Home/Home";
import Mission from "./pages/Mission/Mission";
import Weather from "./pages/Weather/Weather";
import Detection from "./pages/AIDetection/Detection";
import Reports from "./pages/Reports/Reports";
import Gallery from "./pages/Gallery/Gallery";
import Analytics from "./pages/Analytics/Analytics";
import Settings from "./pages/Settings/Settings";
import About from "./pages/About/About";

function ComingSoon({ title }) {
  return (
    <div className="flex items-center justify-center h-[90vh]">
      <div className="bg-[#0f1f30] border border-green-600 rounded-2xl px-10 py-8 text-center shadow-xl">
        <h1 className="text-4xl font-bold text-green-400">{title}</h1>
        <p className="text-gray-400 mt-4">
          This page is under development.
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Home WITHOUT sidebar */}
        <Route path="/" element={<Home />} />

        {/* Mission WITH sidebar */}
        <Route
          path="/mission"
          element={
            <DashboardLayout>
              <Mission />
            </DashboardLayout>
          }
        />

        <Route
          path="/detection"
          element={
            <DashboardLayout>
              <Detection />
            </DashboardLayout>
          }
        />

        <Route
          path="/analytics"
          element={
            <DashboardLayout>
              <Analytics />
            </DashboardLayout>
          }
        />

        <Route
          path="/reports"
          element={
            <DashboardLayout>
              <Reports />
            </DashboardLayout>
          }
        />

        <Route
          path="/weather"
          element={
            <DashboardLayout>
              <Weather />
            </DashboardLayout>
          }
        />

        <Route
          path="/gallery"
          element={
            <DashboardLayout>
              <Gallery />
            </DashboardLayout>
          }
        />

        <Route
          path="/settings"
          element={
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          }
        />

        <Route
          path="/about"
          element={
            <DashboardLayout>
              <About />
            </DashboardLayout>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}