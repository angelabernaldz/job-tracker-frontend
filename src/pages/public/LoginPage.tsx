import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { LogIn, Mail, Lock, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";


export function LoginPage() {

  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);
      const success = await login(email, password);
      if (success) {
        navigate("/dashboard")
      }
    } catch (error) {
      console.error("Error in log in.")
    } finally {
      setIsLoading(false)
    }
  };

  const handleNavigateToRegister = () => {
    navigate("/register")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-200/30 to-indigo-200/30 rounded-full blur-3xl" />
      
      <div className="w-full max-w-md relative z-10 animate-scale-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 mb-4 shadow-lg shadow-indigo-200">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-semibold mb-3 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-sm text-slate-600">
            Sign in to continue tracking your job applications
          </p>
        </div>

        {/* Login Card */}
        <Card className="p-8 bg-white/80 backdrop-blur-xl border border-slate-200 shadow-2xl shadow-indigo-100/50">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 font-medium">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  className={`pl-10 h-11 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 ${
                    errors.email ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-600 flex items-center gap-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700 font-medium">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  className={`pl-10 h-11 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 ${
                    errors.password ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
                  }`}
                />
              </div>
              {errors.password && (
                <p className="text-xs text-red-600 flex items-center gap-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-xs text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white shadow-lg shadow-indigo-200 transition-all duration-300"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </div>
              )}
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              Don't have an account?{" "}
              <button
                onClick={handleNavigateToRegister}
                className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200"
              >
                Sign up
              </button>
            </p>
          </div>
        </Card>

        {/* Footer */}
        <p className="text-xs text-center text-slate-500 mt-6">
          Track your job search journey with confidence
        </p>
      </div>
    </div>
  );
}