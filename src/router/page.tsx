import React from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "../pages/auth/auth";
import EmailVerification from "../pages/auth/emailVerification";
import ResetPassword from "../pages/auth/resetPassword";
import Dashboard from "../pages/dashboard/page";
import Billing from "../pages/billing/page";
import Download from "../pages/download/page";
import VerifySession from "../pages/billing/verifySession";
import PaymentCancel from "../pages/billing/cancel";
import Setting from "../pages/setting/page";
import NotFound from "../pages/NotFound";

const RouterApp: React.FC = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Auth />} />
                <Route path="/token/:tokenId" element={<EmailVerification />} />
                <Route path="/reset-password/:tokenId" element={<ResetPassword />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/billing" element={<Billing />} />
                <Route path="/download" element={<Download />} />
                <Route path="/success" element={<VerifySession />} />
                <Route path="/cancel" element={<PaymentCancel />} />
                <Route path="/setting" element={<Setting />} />

                {/* 404 route */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default RouterApp;