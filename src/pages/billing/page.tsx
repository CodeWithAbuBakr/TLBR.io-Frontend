import React from "react";
import UIText from "../../utilities/testResource";
import { DashboardLayout } from "../../layout/page";
import CurrentPlan from "./currentPlan";
import Plans from "./plans";
import PaymentHistory from "./paymentHistory";
import { useData } from "../../utilities/useData";

const Billing: React.FC = () => {
    const { darkMode } = useData();

    return (
        <>
            <DashboardLayout>
                <h1 className={`text-md md:text-lg lg:text-xl xl:text-2xl font-semibold mb-1 
                    ${darkMode ? "text-[#CCCCCC]" : "text-[#0A0A04]"}`}
                >
                    {UIText.billing.title}
                </h1>
                <p className={`${darkMode ? "text-[#CCCCCC]" : "text-[#666666]"} text-sm mb-8`}>
                    {UIText.billing.description}
                </p>

                {/* Current Plan */}
                <CurrentPlan />

                {/* Plans */}
                <Plans />

                {/* Payment History */}
                <PaymentHistory />
            </DashboardLayout>
        </>
    );
};

export default Billing;