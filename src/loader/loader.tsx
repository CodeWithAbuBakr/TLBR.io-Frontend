"use client";
import React from "react";
import "../App.css";
import { Modal } from "../components/ui/modal";
import type { LoaderProps } from "../utilities/type";
import { useData } from "../utilities/useData";

const Loader: React.FC<LoaderProps> = ({ isModalOpen, setIsModalOpen }) => {
    const { darkMode } = useData();

    return (
        <Modal
            isOpen={isModalOpen}
            loader={true}
            onClose={() => setIsModalOpen(false)}
            className={`max-w-md mx-auto p-8 flex flex-col items-center justify-center text-center rounded-2xl shadow-lg 
                ${darkMode ? "bg-neutral-900 text-[#CCCCCC]" : "bg-white text-[#333333]"}`}
        >
            <p
                className={`font-semibold text-lg mb-6 tracking-wide mt-4 
                    ${darkMode ? "text-[#CCCCCC]" : "text-[#333333]"}`}
            >
                Loading, please wait...
            </p>

            <section className="dots-container space-x-2">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </section>
        </Modal>
    );
};

export default Loader;