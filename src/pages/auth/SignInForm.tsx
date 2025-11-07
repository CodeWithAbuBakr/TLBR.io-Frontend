"use client";
import React from "react";
import { Link } from "react-router-dom";
import { useData } from "../../utilities/useData";
import Label from "../../components/ui/input/Label";
import Input from "../../components/ui/input/InputField";
import Checkbox from "../../components/ui/input/Checkbox";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import type { ShowToastProps } from "../../utilities/type";
import UIText from "../../utilities/testResource";
import { loginUser } from "../../services/auth/signin/loginUser";

const SignInForm: React.FC<ShowToastProps> = ({ onShowToast, setIsModalOpen, setIsLoader }) => {
  const { darkMode, showPassword, setShowPassword, isChecked, setIsChecked, email, setEmail,
    password, setPassword, passwordStrength, setPasswordStrength, } = useData();

  // Evaluate Password Strength
  const evaluatePasswordStrength = (value: string) => {
    if (!value) {
      setPasswordStrength({ message: "", color: "" });
      return;
    }

    const hasLower = /[a-z]/.test(value);
    const hasUpper = /[A-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecial = /[\W_]/.test(value);
    const passed = [hasLower, hasUpper, hasNumber, hasSpecial].filter(Boolean)
      .length;

    if (value.length < 8 || passed <= 1) {
      setPasswordStrength({
        message: "Password is too weak. Add uppercase, lowercase, numbers, and special characters.",
        color: "text-error-500",
      });
    } else if (passed === 2 || passed === 3) {
      setPasswordStrength({
        message: "Password is acceptable but could be more stronger. Include more diverse characters.",
        color: "text-[#FFAB00]",
      });
    } else if (passed === 4 && value.length >= 8) {
      setPasswordStrength({
        message: "Your password looks secure.",
        color: "text-success-500",
      });
    }
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email && !password) {
      onShowToast("error", "Please fill all the required fields.");
      return;
    } else if (!email) {
      onShowToast("error", "Please enter your email address.");
      return;
    } else if (!password) {
      onShowToast("error", "Please enter your password.");
      return;
    } else if (passwordStrength.message !== "Your password looks secure.") {
      onShowToast("info", "Please use a strong password.");
      return;
    } else {
      setIsLoader(true);
      setIsModalOpen(true);

      // Call the API to authenticate the user
      loginUser(email, password, isChecked, (error, data) => {
        if (error) {
          console.log("Login error:", error);
          onShowToast("error", error.message || "An error occurred during login.");

          setIsLoader(false);
          setIsModalOpen(false);
        } else if (data) {
          console.log("Login success:", data);

          setIsLoader(false);
          onShowToast("info", data.message);

          // Clear form
          setEmail("");
          setPassword("");
          setIsChecked(false);
          setPasswordStrength({ message: "", color: "" });
        }
      });
    }
  };

  return (
    <>
      <form className="space-y-6 mt-8" onSubmit={handleSignIn}>
        <div>
          <Label>
            {UIText.auth.signIn.email}{" "}
            <span className="text-error-500">*</span>
          </Label>
          <Input
            placeholder="info@gmail.com"
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            className={`${darkMode ? "bg-gray-900 text-white border-gray-700" : "bg-white text-gray-900 border-gray-300"
              }`}
          />
        </div>

        <div>
          <Label>
            {UIText.auth.signIn.password}{" "}
            <span className="text-error-500">*</span>
          </Label>
          <div className="relative">
            <Input
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
                evaluatePasswordStrength(e.target.value);
              }}
              className={`${darkMode ? "bg-gray-900 text-white border-gray-700" : "bg-white text-gray-900 border-gray-300"
                }`}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
            >
              {showPassword ? (
                <GoEye
                  className={`${darkMode ? "fill-gray-300" : "fill-gray-500"}`}
                />
              ) : (
                <GoEyeClosed
                  className={`${darkMode ? "fill-gray-300" : "fill-gray-500"}`}
                />
              )}
            </span>
          </div>

          {passwordStrength.message && (
            <p
              className={`mt-1 text-sm 
                ${passwordStrength.color === "text-error-500"
                  ? darkMode
                    ? "text-red-500"
                    : "text-red-600"
                  : passwordStrength.color === "text-[#FFAB00]"
                    ? darkMode
                      ? "text-[#FFD166]"
                      : "text-[#FFAB00]"
                    : passwordStrength.color === "text-success-500"
                      ? darkMode
                        ? "text-green-500"
                        : "text-green-600"
                      : ""
                }`}
            >
              {passwordStrength.message}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Checkbox checked={isChecked} onChange={setIsChecked} />
            <span
              className={`block font-normal text-theme-sm ${darkMode ? "text-gray-400" : "text-gray-700"
                }`}
            >
              {UIText.auth.signIn.keep_me_signed_in}
            </span>
          </div>
          <Link
            to="/reset-password"
            className={`text-sm ${darkMode
              ? "text-[#FFAB00] hover:text-[#ffbc37]"
              : "text-[#FFAB00] hover:text-[#ffbc37]"
              }`}
          >
            {UIText.auth.signIn.forgotPassword}
          </Link>
        </div>

        <button
          type="submit"
          className={`inline-flex items-center justify-center gap-3 py-3 w-full text-sm cursor-pointer font-normal rounded-full px-7 transition-colors
            ${darkMode
              ? "bg-[#FFAB00] text-white hover:bg-[#ffbc37]"
              : "bg-[#FFAB00] text-white hover:bg-[#ffbc37]"
            }`}
        >
          {UIText.auth.signIn.button}
        </button>
      </form>
    </>
  );
};

export default SignInForm;