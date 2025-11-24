"use client";
import React from "react";
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
    password, setPassword, setOpenForgotPasswordModel } = useData();

  const handleOpenForgotPasswrodDialog = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setIsLoader(false);
    setIsModalOpen(true);
    setOpenForgotPasswordModel(true);
  };

  const handleSignIn = async (e: React.FormEvent) => {
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
    } else {
      setIsLoader(true);
      setIsModalOpen(true);

      // Call the API to authenticate the user
      await loginUser(email, password, isChecked, (error, data) => {
        if (error) {
          console.log("Login error:", error);
          onShowToast("error", error.message || "An error occurred during login.");

          setIsLoader(false);
          setIsModalOpen(false);
        } else if (data) {
          console.log("Login success:", data);

          setIsLoader(false);
          onShowToast("success", data.message);

          // Clear form
          setEmail("");
          setPassword("");
          setIsChecked(false);
        }
      });
    }
  };

  return (
    <>
      <form className="space-y-6 mt-8" onSubmit={handleSignIn}>
        <div>
          <Label>
            {UIText.auth.signIn.email}
            <span className="text-error-500">*</span>
          </Label>
          <Input
            placeholder="info@gmail.com"
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            className={`${darkMode ? "bg-gray-900 text-white border-gray-700" : "bg-white text-gray-900 border-gray-300"}`}
          />
        </div>

        <div>
          <Label>
            {UIText.auth.signIn.password}
            <span className="text-error-500">*</span>
          </Label>
          <div className="relative">
            <Input
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
              }}
              className={`${darkMode ? "bg-gray-900 text-white border-gray-700" : "bg-white text-gray-900 border-gray-300"}`}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
            >
              {showPassword ? (
                <GoEye
                  className={`${darkMode ? "fill-gray-300 hover:fill-[#63cb23]" : "fill-gray-500 hover:fill-[#63cb23]"}`}
                />
              ) : (
                <GoEyeClosed
                  className={`${darkMode ? "fill-gray-300 hover:fill-[#63cb23]" : "fill-gray-500 hover:fill-[#63cb23]"}`}
                />
              )}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Checkbox checked={isChecked} onChange={setIsChecked} />
            <span className={`block font-normal text-theme-sm ${darkMode ? "text-gray-400" : "text-gray-700"}`}>
              {UIText.auth.signIn.keep_me_signed_in}
            </span>
          </div>
          <button
            className="text-sm text-[#6060E5] hover:text-[#2828ff] cursor-pointer hover:underline"
            onClick={handleOpenForgotPasswrodDialog}
          >
            {UIText.auth.signIn.forgot_password}
          </button>
        </div>

        <button
          type="submit"
          className={`inline-flex items-center justify-center gap-3 py-3 w-full text-sm cursor-pointer font-normal rounded-full px-7 transition-colors
            ${darkMode
              ? "bg-[#94E561] text-white hover:bg-[#63cb23]"
              : "bg-[#94E561] text-white hover:bg-[#63cb23]"
            }`}
        >
          {UIText.auth.signIn.button}
        </button>
      </form>
    </>
  );
};

export default SignInForm;