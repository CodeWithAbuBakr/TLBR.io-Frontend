import React from "react";
import UIText from "../../utilities/testResource";
import CurrentPlan from "./currentPlan";
import Plans from "./plans";
import PaymentHistory from "./paymentHistory";

const Billing: React.FC = () => {
    return (
        <>
            <h1 className="text-md md:text-lg lg:text-xl xl:text-2xl font-semibold text-[#0A0A04] dark:text-[#CCCCCC] mb-1">
                {UIText.billing.title}
            </h1>
            <p className="text-[#666666] dark:text-[#CCCCCC] mb-8">
                {UIText.billing.description}
            </p>

            {/* Current Plan */}
            <CurrentPlan />

            {/* Plans */}
            <Plans />

            {/* Payment History */}
            <PaymentHistory />
        </>
    );
};

export default Billing;
