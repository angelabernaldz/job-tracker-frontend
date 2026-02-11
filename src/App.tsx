"use client";

import { useState } from "react";
import { mockJobs } from "@/lib/mock-data";
import { JobApplication } from "@/types/job";
import { Button } from "@/components/ui/button";
import { Plus, BarChart3, Home, LogOut } from "lucide-react";
import { JobBoard } from "@/components/job-board";
import { DashboardStats } from "@/components/dashboard-stats";
import { JobDetailView } from "@/components/job-detail-view";
import { AddEditJobModal } from "@/components/add-edit-job-modal";
import { AnalyticsView } from "@/components/analytics-view";
import { LoginPage } from "@/components/auth/login-page";
import { SignupPage } from "@/components/auth/signup-page";
import { ForgotPasswordPage } from "@/components/auth/forgot-password-page";

type View = "dashboard" | "detail" | "analytics";
type AuthPage = "login" | "signup" | "forgot-password";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authPage, setAuthPage] = useState<AuthPage>("login");
  const [jobs, setJobs] = useState<JobApplication[]>(mockJobs);
  const [currentView, setCurrentView] = useState<View>("dashboard");
  const [selectedJob, setSelectedJob] = useState<JobApplication | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingJob, setEditingJob] = useState<JobApplication | null>(null);

  const handleLogin = (email: string, password: string) => {
    // Mock authentication - in real app, this would validate credentials
    console.log("Login attempt:", email);
    setIsAuthenticated(true);
  };

  const handleSignup = (name: string, email: string, password: string) => {
    // Mock signup - in real app, this would create an account
    console.log("Signup attempt:", { name, email });
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthPage("login");
    setCurrentView("dashboard");
  };

  // Show auth pages if not authenticated
  if (!isAuthenticated) {
    if (authPage === "login") {
      return (
        <LoginPage
          onLogin={handleLogin}
          onNavigateToSignup={() => setAuthPage("signup")}
          onNavigateToForgotPassword={() => setAuthPage("forgot-password")}
        />
      );
    }

    if (authPage === "signup") {
      return (
        <SignupPage
          onSignup={handleSignup}
          onNavigateToLogin={() => setAuthPage("login")}
        />
      );
    }

    if (authPage === "forgot-password") {
      return (
        <ForgotPasswordPage
          onNavigateToLogin={() => setAuthPage("login")}
        />
      );
    }
  }

  const handleJobClick = (job: JobApplication) => {
    setSelectedJob(job);
    setCurrentView("detail");
  };

  const handleSaveJob = (jobData: Partial<JobApplication>) => {
    if (editingJob) {
      // Update existing job
      setJobs((prev) =>
        prev.map((job) =>
          job.id === editingJob.id ? { ...job, ...jobData } : job
        )
      );
      // Update selected job if it's the one being edited
      if (selectedJob?.id === editingJob.id) {
        setSelectedJob({ ...selectedJob, ...jobData } as JobApplication);
      }
    } else {
      // Add new job
      setJobs((prev) => [...prev, jobData as JobApplication]);
    }
    setEditingJob(null);
  };

  const handleOpenAddModal = () => {
    setEditingJob(null);
    setShowAddModal(true);
  };

  const handleOpenEditModal = (job: JobApplication) => {
    setEditingJob(job);
    setShowAddModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/20 to-blue-50/30">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 lg:gap-6">
              <h1 className="text-lg sm:text-xl bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Job Hunt Tracker
              </h1>
              <nav className="flex items-center gap-1 sm:gap-2">
                <Button
                  variant={currentView === "dashboard" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentView("dashboard")}
                  className={`gap-1 sm:gap-2 text-xs sm:text-sm transition-all duration-200 ${
                    currentView === "dashboard"
                      ? "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                      : "hover:bg-slate-50"
                  }`}
                >
                  <Home className="w-4 h-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Button>
                <Button
                  variant={currentView === "analytics" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentView("analytics")}
                  className={`gap-1 sm:gap-2 text-xs sm:text-sm transition-all duration-200 ${
                    currentView === "analytics"
                      ? "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                      : "hover:bg-slate-50"
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span className="hidden sm:inline">Analytics</span>
                </Button>
              </nav>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <Button
                onClick={handleOpenAddModal}
                className="gap-1 sm:gap-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 text-xs sm:text-sm px-3 sm:px-4"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Application</span>
                <span className="sm:hidden">Add</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="gap-2 border-slate-200 hover:bg-slate-50 transition-all duration-200 hidden sm:flex"
              >
                <LogOut className="w-4 h-4" />
                Log out
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-slate-200 hover:bg-slate-50 transition-all duration-200 sm:hidden p-2"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 sm:py-8">
        <div key={currentView} className="animate-fade-in">
          {currentView === "dashboard" && (
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h2 className="mb-2 text-slate-800">Overview</h2>
                <p className="text-sm text-slate-600 mb-4 sm:mb-6">
                  Track your job applications and interview progress
                </p>
                <DashboardStats jobs={jobs} />
              </div>

              <div>
                <h2 className="mb-4 text-slate-800">Applications Board</h2>
                <JobBoard jobs={jobs} onJobClick={handleJobClick} />
              </div>
            </div>
          )}

          {currentView === "detail" && selectedJob && (
            <JobDetailView
              job={selectedJob}
              onBack={() => setCurrentView("dashboard")}
              onEdit={() => handleOpenEditModal(selectedJob)}
            />
          )}

          {currentView === "analytics" && (
            <div className="max-w-6xl">
              <h2 className="mb-2 text-slate-800">Analytics & Insights</h2>
              <p className="text-sm text-slate-600 mb-6">
                Track your job search performance and conversion rates
              </p>
              <AnalyticsView jobs={jobs} />
            </div>
          )}
        </div>
      </main>

      {/* Empty States */}
      {jobs.length === 0 && currentView === "dashboard" && (
        <div className="max-w-md mx-auto text-center py-16 animate-scale-in">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/50 p-12 shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Plus className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="mb-2 text-slate-900">Start Your Job Hunt</h3>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              Add your first application to begin tracking your progress.
              You've got this! 🚀
            </p>
            <Button 
              onClick={handleOpenAddModal} 
              className="gap-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4" />
              Add Your First Application
            </Button>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      <AddEditJobModal
        open={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setEditingJob(null);
        }}
        onSave={handleSaveJob}
        job={editingJob}
      />
    </div>
  );
}