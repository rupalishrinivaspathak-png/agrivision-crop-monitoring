import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashboard/Dashboard";
import About from "../pages/About/About";
import Settings from "../pages/Settings/Settings";


export default function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>


                <Route element={<MainLayout />}>


                    <Route path="/" element={<Home />} />

                    <Route path="/dashboard" element={<Dashboard />} />

                    <Route path="/about" element={<About />} />

                    <Route path="/settings" element={<Settings />} />


                </Route>


            </Routes>

        </BrowserRouter>

    )

}