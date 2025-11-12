"use client";
import React, { useEffect } from "react";
import { useData } from "../../utilities/useData";
import Label from "../../components/ui/input/Label";
import Input from "../../components/ui/input/InputField";
import Checkbox from "../../components/ui/input/Checkbox";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import type { ShowToastProps } from "../../utilities/type";
import UIText from "../../utilities/testResource";
import { registerUser } from "../../services/auth/signup/registerUser";

const SignUpForm: React.FC<ShowToastProps> = ({ onShowToast, setIsModalOpen, setIsLoader }) => {
  const { darkMode, activeForm, showPassword, setShowPassword, isChecked, setIsChecked, fname, setFname,
    lname, setLname, email, setEmail, password, setPassword, passwordStrength, setPasswordStrength } = useData();

  useEffect(() => {
    if (activeForm !== "signin") {
      setIsChecked(false);
    };
  }, [activeForm, setIsChecked]);

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

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fname && !lname && !email && !password) {
      onShowToast("error", "Please fill all the required fields.");
      return;
    } else if (!fname) {
      onShowToast("error", "Please enter your first name.");
      return;
    } else if (!lname) {
      onShowToast("error", "Please enter your last name.");
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
      registerUser(fname, lname, email, password, (error, data) => {
        if (error) {
          console.log("Registration error:", error);
          onShowToast("error", error.message || "An error occurred during registration.");

          setIsLoader(false);
          setIsModalOpen(false);
        } else if (data) {
          console.log("Registration success:", data);
          onShowToast("info", data.message);

          setIsLoader(false);
          setIsModalOpen(false);

          // Clear form
          setFname("");
          setLname("");
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
      <form className="space-y-6" onSubmit={handleSignUp}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <Label>
              {UIText.auth.signUp.f_name}
              <span className="text-error-500">*</span>
            </Label>
            <Input
              type="text"
              id="fname"
              name="fname"
              placeholder="Enter your first name"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              className={`${darkMode
                ? "bg-gray-900 text-white border-gray-700"
                : "bg-white text-gray-900 border-gray-300"
                }`}
            />
          </div>

          <div className="sm:col-span-1">
            <Label>
              {UIText.auth.signUp.l_name}
              <span className="text-error-500">*</span>
            </Label>
            <Input
              type="text"
              id="lname"
              name="lname"
              placeholder="Enter your last name"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              className={`${darkMode
                ? "bg-gray-900 text-white border-gray-700"
                : "bg-white text-gray-900 border-gray-300"
                }`}
            />
          </div>
        </div>

        <div>
          <Label>
            {UIText.auth.signUp.email}
            <span className="text-error-500">*</span>
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`${darkMode
              ? "bg-gray-900 text-white border-gray-700"
              : "bg-white text-gray-900 border-gray-300"
              }`}
          />
        </div>

        <div>
          <Label>
            {UIText.auth.signUp.password}
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
              className={`${darkMode
                ? "bg-gray-900 text-white border-gray-700"
                : "bg-white text-gray-900 border-gray-300"
                }`}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
            >
              {showPassword ? (
                <GoEye
                  className={`${darkMode ? "fill-gray-300 hover:fill-[#ffbc37]" : "fill-gray-500 hover:fill-[#ffbc37]"}`}
                />
              ) : (
                <GoEyeClosed
                  className={`${darkMode ? "fill-gray-300 hover:fill-[#ffbc37]" : "fill-gray-500 hover:fill-[#ffbc37]"}`}
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

        <div className="flex items-center gap-3">
          <Checkbox
            className="w-5 h-5"
            checked={isChecked}
            onChange={setIsChecked}
          />
          <p
            className={`inline-block font-normal ${darkMode ? "text-gray-400" : "text-gray-500"
              }`}
          >
            {UIText.auth.signUp.by_creating_account}{" "}
            <span className={darkMode ? "text-white" : "text-gray-800"}>
              {UIText.auth.signUp.terms_and_conditions}
            </span>{" "}
            {UIText.auth.signUp.and_our}{" "}
            <span className={darkMode ? "text-white" : "text-gray-800"}>
              {UIText.auth.signUp.privacy_policy}
            </span>
          </p>
        </div>

        <button
          type="submit"
          className={`inline-flex items-center justify-center gap-3 py-3 mb-4 w-full text-sm font-normal rounded-full px-7 cursor-pointer transition-colors
        ${darkMode
              ? "bg-[#FFAB00] text-white hover:bg-[#ffbc37]"
              : "bg-[#FFAB00] text-white hover:bg-[#ffbc37]"
            }`}
        >
          {UIText.auth.signUp.button}
        </button>
      </form>
    </>
  );
};

export default SignUpForm;