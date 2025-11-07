import React from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "../pages/auth/auth";
import Dashboard from "../pages/dashboard/page";
import EmailVerification from "../pages/auth/emailVerification";
import NotFound from "../pages/NotFound";

const RouterApp: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />

            {/* dynamic token route */}
            <Route path="/token/:tokenId" element={<EmailVerification />} />

            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default RouterApp;