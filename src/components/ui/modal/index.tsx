"use client";
import React, { useRef, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import type { ModalProps } from "../../../utilities/type";
import { useData } from "../../../utilities/useData";

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
  loader = true,
  showCloseButton = true,
  isFullscreen = false,
}) => {
  const { darkMode } = useData();
  const modalRef = useRef<HTMLDivElement>(null);

  // Disable background scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const contentClasses = isFullscreen
    ? "w-full h-full"
    : `relative w-full rounded-3xl ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
    }`;

  return (
    <>
      <div className={`fixed inset-0 z-20 flex items-center justify-center overflow-y-auto modal ${darkMode ? "bg-black/60" : ""}`}>
        {/* Backdrop */}
        {!isFullscreen && (
          <div className={`fixed inset-0 backdrop-blur-[32px] ${darkMode ? "bg-gray-800/60" : "bg-gray-400/50"}`} />
        )}

        {/* Modal Content */}
        <div
          ref={modalRef}
          className={`${contentClasses} ${className}`}
          onClick={(e) => e.stopPropagation()}
        >
          {showCloseButton && loader !== true && (
            <button
              onClick={onClose}
              className={`absolute right-3 top-2 z-50 flex h-8 w-8 items-center justify-center rounded-full transition-colors sm:right-6 sm:top-6 sm:h-11 sm:w-11
              ${darkMode
                  ? "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                  : "bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-700"
                }`}
            >
              <IoClose className="text-xl" />
            </button>
          )}
          <div>{children}</div>
        </div>
      </div>
    </>
  );
};