import React from 'react';
import UIText from '../../utilities/testResource';
import { paymentHistory } from '../../utilities/data';

const PaymentHistory: React.FC = () => {
    return (
        <>
            <div className="bg-white dark:bg-[#333333] rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-[#0A0A04] dark:text-[#CCCCCC] mb-2">
                    {UIText.billing.payment_history.title}
                </h2>
                <p className="text-gray-500 text-sm mb-4">
                    {UIText.billing.payment_history.description}
                </p>

                {paymentHistory.length === 0 ? (
                    <div className="text-center text-gray-400 text-sm py-6">
                        {UIText.billing.payment_history.not_found}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left">
                            <thead>
                                <tr className="text-gray-500 border-b border-gray-200 dark:border-gray-700">
                                    <th className="pb-3 font-medium">{UIText.billing.payment_history.table.date}</th>
                                    <th className="pb-3 font-medium">{UIText.billing.payment_history.table.plan}</th>
                                    <th className="pb-3 font-medium">{UIText.billing.payment_history.table.amount}</th>
                                    <th className="pb-3 font-medium">{UIText.billing.payment_history.table.status}</th>
                                    <th className="pb-3 font-medium">{UIText.billing.payment_history.table.invoice}</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700 dark:text-[#CCCCCC]">
                                {paymentHistory.map((payment, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-gray-100 dark:border-gray-700 last:border-0 transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-[#444444]"
                                    >
                                        <td className="py-3">{payment.date}</td>
                                        <td>{payment.plan}</td>
                                        <td>{payment.amount}</td>
                                        <td>
                                            <span
                                                className={`font-medium ${payment.status === "Paid"
                                                    ? "text-green-600"
                                                    : payment.status === "Pending"
                                                        ? "text-yellow-500"
                                                        : "text-red-500"
                                                    }`}
                                            >
                                                {payment.status}
                                            </span>
                                        </td>
                                        <td>
                                            <a
                                                href="#"
                                                className="text-[#FFAB00] hover:underline font-medium"
                                            >
                                                {payment.invoice}
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
};

export default PaymentHistory;