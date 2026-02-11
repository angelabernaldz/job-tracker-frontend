"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { AlertCircle, Mail, CheckCircle2, ArrowLeft } from "lucide-react";

interface ForgotPasswordPageProps {
  onNavigateToLogin: () => void;
}

export function ForgotPasswordPage({ onNavigateToLogin }: ForgotPasswordPageProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateEmail = () => {
    if (!email) {
      setError("Email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail()) {
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setIsLoading(false);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/20 to-blue-50/30 flex items-center justify-center p-6">
        <div className="w-full max-w-md animate-scale-in">
          <Card className="p-8 bg-white/70 backdrop-blur-sm border border-slate-200/50 shadow-xl text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-full flex items-center justify-center relative">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                <div className="absolute inset-0 bg-emerald-400/20 rounded-full animate-pulse-subtle" />
              </div>
            </div>

            <h2 className="text-2xl mb-3 text-slate-900">Check Your Email</h2>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              We've sent password reset instructions to{" "}
              <span className="text-slate-900 font-medium">{email}</span>
            </p>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100/30 border border-blue-100/50 rounded-xl p-4 mb-6">
              <div className="flex gap-3 text-left">
                <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-blue-900 mb-1">
                    Didn't receive the email?
                  </p>
                  <p className="text-xs text-blue-700">
                    Check your spam folder or{" "}
                    <button
                      onClick={() => setSubmitted(false)}
                      className="underline hover:text-blue-900 transition-colors duration-200"
                    >
                      try again
                    </button>
                  </p>
                </div>
              </div>
            </div>

            <Button 
              onClick={onNavigateToLogin} 
              variant="outline" 
              className="w-full gap-2 border-slate-200 hover:bg-slate-50 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to login
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/20 to-blue-50/30 flex items-center justify-center p-6">
      <div className="w-full max-w-md animate-scale-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl mb-3 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Reset Your Password</h1>
          <p className="text-sm text-slate-600">
            Enter your email address and we'll send you instructions to reset
            your password
          </p>
        </div>

        <Card className="p-8 bg-white/70 backdrop-blur-sm border border-slate-200/50 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) {
                    setError("");
                  }
                }}
                className={`transition-all duration-200 ${error ? "border-red-400 focus-visible:ring-red-500" : "border-slate-200 focus-visible:border-indigo-400 focus-visible:ring-indigo-400"}`}
                disabled={isLoading}
                autoFocus
              />
              {error && (
                <div className="flex items-center gap-1.5 text-xs text-red-600 animate-slide-in-up">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5" 
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send reset instructions"}
            </Button>
          </form>
        </Card>

        {/* Back to Login Link */}
        <div className="text-center mt-6">
          <button
            onClick={onNavigateToLogin}
            className="text-sm text-slate-600 hover:text-slate-900 inline-flex items-center gap-2 transition-colors duration-200"
            disabled={isLoading}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to login
          </button>
        </div>
      </div>
    </div>
  );
}