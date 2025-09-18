"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiPhone, FiLock, FiArrowRight } from "react-icons/fi";
import Button from "./Button";
import { sendPhoneVerification, verifyOTP, saveAuthToken } from "@/lib/auth";

export default function LoginForm() {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return;

    setLoading(true);
    setError("");

    try {
      const response = await sendPhoneVerification(phoneNumber);

      if (response.success) {
        setStep("otp");
      } else {
        setError("Failed to send verification code. Please try again.");
      }
    } catch (error) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");

    if (otpCode.length !== 4) {
      setError("Please enter the complete 4-digit code");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await verifyOTP(phoneNumber, otpCode);

      if (response.success) {
        // Save token and redirect
        saveAuthToken(response.data.token);
        window.location.href = "/dashboard";
      } else {
        setError("Invalid verification code. Please try again.");
      }
    } catch (error) {
      setError("Invalid verification code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToPhone = () => {
    setStep("phone");
    setOtp(["", "", "", ""]);
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <FiLock className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Portal
          </h1>
          <p className="text-gray-600">Manage vibes, scenes & hobbies</p>
        </div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
        >
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}
          {step === "phone" ? (
            /* Phone Number Step */
            <form onSubmit={handlePhoneSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiPhone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                loading={loading}
                className="w-full"
                size="lg"
                icon={<FiArrowRight />}
              >
                Send Verification Code
              </Button>
            </form>
          ) : (
            /* OTP Step */
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Verification Code
                </label>
                <p className="text-sm text-gray-500 mb-4">
                  Enter the 4-digit code sent to {phoneNumber}
                </p>

                <div className="flex gap-3 justify-center">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
                      maxLength={1}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleBackToPhone}
                  className="flex-1"
                  size="lg"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  loading={loading}
                  className="flex-1"
                  icon={<FiArrowRight />}
                >
                  Verify & Login
                </Button>
              </div>
            </form>
          )}
        </motion.div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Admin access only • Secure authentication
        </p>
      </motion.div>
    </div>
  );
}
