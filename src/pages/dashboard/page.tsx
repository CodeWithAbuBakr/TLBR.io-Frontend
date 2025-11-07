'use client';
import UIText from "../../utilities/testResource";
import { AdminLayout } from "../../layout/page";
import AdminDashboard from "../../pages/admin/dashboard/page";
import GetStarted from "./getStarted";
import TrialPeriod from "./trialPeriod";
import AccountStatus from "./accountStatus";
import QuickStats from "./quickStats";

const Dashboard = () => {
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
            <AdminLayout>
                <div className="flex-1 box-border">
                    <h1 className="text-xl md:text-2xl lg:text-4xl xl:text-5xl mb-10 text-[#0A0A04] dark:text-[#CCCCCC]">
                        {UIText.dashboard.trial_period.welcome}
                    </h1>

                    {userRole !== "admin" ? (
                        <>
                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
                                {/* Trial Period */}
                                <TrialPeriod />

                                {/* Account Status */}
                                <AccountStatus />

                                {/* Quick Stats */}
                                <QuickStats />
                            </div>

                            {/* Getting Started */}
                            <GetStarted />
                        </>
                    ) : (
                        <AdminDashboard />
                    )}
                </div>
            </AdminLayout>
        </>
    );
};

export default Dashboard;