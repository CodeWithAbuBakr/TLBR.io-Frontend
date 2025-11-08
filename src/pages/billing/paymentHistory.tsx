import React from 'react';
import UIText from '../../utilities/testResource';
import { useData } from '../../utilities/useData';
import { paymentHistory } from '../../utilities/data';

const PaymentHistory: React.FC = () => {
    const { darkMode } = useData();

    return (
        <>
            <div className={`rounded-2xl shadow-sm p-6 border transition-colors duration-200 ${darkMode ? 'bg-[#333333] border-gray-700' : 'bg-white border-gray-100'
                }`}>
                <h2 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-[#CCCCCC]' : 'text-[#0A0A04]'
                    }`}>
                    {UIText.billing.payment_history.title}
                </h2>
                <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {UIText.billing.payment_history.description}
                </p>

                {paymentHistory.length === 0 ? (
                    <div className={`text-center text-sm py-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                        {UIText.billing.payment_history.not_found}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left">
                            <thead>
                                <tr className={`border-b transition-colors duration-200 ${darkMode ? 'text-gray-400 border-gray-700' : 'text-gray-500 border-gray-200'
                                    }`}>
                                    <th className="pb-3 font-medium">{UIText.billing.payment_history.table.date}</th>
                                    <th className="pb-3 font-medium">{UIText.billing.payment_history.table.plan}</th>
                                    <th className="pb-3 font-medium">{UIText.billing.payment_history.table.amount}</th>
                                    <th className="pb-3 font-medium">{UIText.billing.payment_history.table.status}</th>
                                    <th className="pb-3 font-medium">{UIText.billing.payment_history.table.invoice}</th>
                                </tr>
                            </thead>
                            <tbody className={`${darkMode ? 'text-[#CCCCCC]' : 'text-gray-700'}`}>
                                {paymentHistory.map((payment, index) => (
                                    <tr
                                        key={index}
                                        className={`border-b last:border-0 transition-colors duration-200 ${darkMode
                                            ? 'border-gray-700 hover:bg-[#444444]'
                                            : 'border-gray-100 hover:bg-gray-50'
                                            }`}
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