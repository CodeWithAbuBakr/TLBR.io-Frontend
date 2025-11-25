'use client';
import { useData } from "../../utilities/useData";
import { DashboardLayout } from "../../layout/page";
import AppToast from "../../toast/toast";
import AdminDashboard from "../../pages/admin/dashboard/page";
import GetStarted from "./getStarted";
import TrialPeriod from "./trialPeriod";
import AccountStatus from "./accountStatus";
import QuickStats from "./quickStats";
import { userDetails } from "../../utilities/getLocalStorageData";

const Dashboard = () => {
    const { darkMode, userData, toastMessage } = useData();

    // Safely get and parse user data from localStorage
    let decryptedUserDetails;
    if (typeof window !== "undefined") {
        decryptedUserDetails = userDetails();
    }

    const userRole = decryptedUserDetails?.user?.role || "user";

    return (
        <>
            <DashboardLayout>
                <div
                    className={`flex-1 box-border min-h-screen transition-colors duration-300
                    ${darkMode ? "bg-[#1E1E1E] text-gray-100" : "bg-white text-[#0A0A04]"}`}
                >
                    <h1
                        className={`text-lg md:text-xl lg:text-3xl xl:text-4xl mb-4 md:mb-6 lg:md-8 xl:mb-10 font-semibold
                        ${darkMode ? "text-gray-100" : "text-[#0A0A04]"}`}>
                        {userData?.user?.name !== undefined
                            ? `Welcome ${userData?.user?.name}`
                            : "Loading..."}
                    </h1>

                    {userRole !== "admin" ? (
                        <>
                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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

            {/* Global Toast */}
            {toastMessage && <AppToast toastMessage={toastMessage} />}
        </>
    );
};

export default Dashboard;