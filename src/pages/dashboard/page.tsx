'use client';
import UIText from "../../utilities/testResource";
import { useData } from "../../utilities/useData";
import { DashboardLayout } from "../../layout/page";
import AdminDashboard from "../../pages/admin/dashboard/page";
import GetStarted from "./getStarted";
import TrialPeriod from "./trialPeriod";
import AccountStatus from "./accountStatus";
import QuickStats from "./quickStats";

const Dashboard = () => {
    const { darkMode } = useData();

    // Safely get and parse user data from localStorage
    let parsed = null;
    if (typeof window !== "undefined") {
        const storedData = localStorage.getItem("userDetails");
        if (storedData) {
            parsed = JSON.parse(storedData);
        }
    }

    const userRole = parsed?.user?.role || "user";

    return (
        <>
            <DashboardLayout>
                <div
                    className={`flex-1 box-border min-h-screen transition-colors duration-300
                    ${darkMode ? "bg-[#1E1E1E] text-gray-100" : "bg-white text-[#0A0A04]"}`}
                >
                    <h1
                        className={`text-xl md:text-2xl lg:text-4xl xl:text-5xl mb-10 font-semibold
                        ${darkMode ? "text-gray-100" : "text-[#0A0A04]"}`}
                    >
                        {UIText.dashboard.trial_period.welcome}
                    </h1>

                    {userRole !== "admin" ? (
                        <>
                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
                                <TrialPeriod />
                                <AccountStatus />
                                <QuickStats />
                            </div>

                            {/* Getting Started */}
                            <GetStarted />
                        </>
                    ) : (
                        <AdminDashboard />
                    )}
                </div>
            </DashboardLayout>
        </>
    );
};

export default Dashboard;