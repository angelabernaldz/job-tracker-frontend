"use client";

import { useState, useEffect } from "react";
import { JobApplication, JobStatus, InterviewStage } from "@/types/job";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InterviewStagesExplainer } from "@/components/interview-stages-explainer";
import { Card } from "@/components/ui/card";
import { Calendar, StickyNote } from "lucide-react";

interface AddEditJobModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (job: Partial<JobApplication>) => void;
  job?: JobApplication | null;
}

const statusOptions: { value: JobStatus; label: string }[] = [
  { value: "applied", label: "Applied" },
  { value: "phone_screen", label: "Phone Screen" },
  { value: "technical", label: "Technical Interview" },
  { value: "final_round", label: "Final Round" },
  { value: "offer", label: "Offer" },
  { value: "rejected", label: "Not Selected" },
  { value: "withdrawn", label: "Withdrawn" },
];

const jobTypeOptions = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
];

export function AddEditJobModal({
  open,
  onClose,
  onSave,
  job,
}: AddEditJobModalProps) {
  const isEdit = !!job;

  const [formData, setFormData] = useState({
    company: "",
    companyUrl: "",
    position: "",
    status: "applied" as JobStatus,
    appliedDate: new Date().toISOString().split("T")[0],
    location: "",
    jobType: "full-time" as "full-time" | "part-time" | "contract",
    salary: "",
    description: "",
    url: "",
    notes: "",
    contactName: "",
    contactRole: "",
    contactEmail: "",
    contactPhone: "",
  });

  const [interviewStages, setInterviewStages] = useState<InterviewStage[]>([]);

  useEffect(() => {
    if (job) {
      setFormData({
        company: job.company,
        companyUrl: job.companyUrl || "",
        position: job.position,
        status: job.status,
        appliedDate: job.appliedDate,
        location: job.location || "",
        jobType: job.jobType,
        salary: job.salary || "",
        description: job.description || "",
        url: job.url || "",
        notes: job.notes || "",
        contactName: job.contact?.name || "",
        contactRole: job.contact?.role || "",
        contactEmail: job.contact?.email || "",
        contactPhone: job.contact?.phone || "",
      });
      setInterviewStages(job.interviewStages || []);
    } else {
      // Reset form when opening for new job
      setFormData({
        company: "",
        companyUrl: "",
        position: "",
        status: "applied",
        appliedDate: new Date().toISOString().split("T")[0],
        location: "",
        jobType: "full-time",
        salary: "",
        description: "",
        url: "",
        notes: "",
        contactName: "",
        contactRole: "",
        contactEmail: "",
        contactPhone: "",
      });
      setInterviewStages([
        {
          id: `stage-${Date.now()}`,
          name: "Application Submitted",
          date: new Date().toISOString().split("T")[0],
          completed: true,
        },
      ]);
    }
  }, [job, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { contactName, contactRole, contactEmail, contactPhone, ...otherFormData } = formData;

    const jobData: Partial<JobApplication> = {
      ...otherFormData,
      id: job?.id || `temp-${Date.now()}`,
      interviewStages: interviewStages,
      contact: (contactName || contactRole || contactEmail || contactPhone)
        ? {
            name: contactName || undefined,
            role: contactRole || undefined,
            email: contactEmail || undefined,
            phone: contactPhone || undefined,
          }
        : undefined,
    };

    onSave(jobData);
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleStageUpdate = (stageId: string, field: keyof InterviewStage, value: string | boolean) => {
    setInterviewStages((prev) =>
      prev.map((stage) =>
        stage.id === stageId ? { ...stage, [field]: value } : stage
      )
    );
  };

  const handleAddStage = () => {
    const newStage: InterviewStage = {
      id: `stage-${Date.now()}`,
      name: "New Interview Stage",
      date: new Date().toISOString().split("T")[0],
      completed: false,
    };
    setInterviewStages((prev) => [...prev, newStage]);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Application" : "Add New Application"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the details of this job application."
              : "Track a new job application and its progress."}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="details" className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Job Details</TabsTrigger>
            <TabsTrigger value="stages">Interview Stages</TabsTrigger>
            <TabsTrigger value="guide">Interview Guide</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto py-4">
            <TabsContent value="details" className="space-y-6 mt-0">
              <form id="job-form" onSubmit={handleSubmit}>
                {/* Company & Position */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company *</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleChange("company", e.target.value)}
                      placeholder="TechCorp Inc"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Position *</Label>
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={(e) => handleChange("position", e.target.value)}
                      placeholder="Software Engineer"
                      required
                    />
                  </div>
                </div>

                {/* Status & Job Type */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => handleChange("status", value)}
                    >
                      <SelectTrigger id="status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jobType">Job Type</Label>
                    <Select
                      value={formData.jobType}
                      onValueChange={(value) => handleChange("jobType", value)}
                    >
                      <SelectTrigger id="jobType">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {jobTypeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Location & Applied Date */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleChange("location", e.target.value)}
                      placeholder="San Francisco, CA"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="appliedDate">Applied Date *</Label>
                    <Input
                      id="appliedDate"
                      type="date"
                      value={formData.appliedDate}
                      onChange={(e) => handleChange("appliedDate", e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Salary & URL */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor="salary">Salary Range</Label>
                    <Input
                      id="salary"
                      value={formData.salary}
                      onChange={(e) => handleChange("salary", e.target.value)}
                      placeholder="$120k - $150k"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="url">Job Posting URL</Label>
                    <Input
                      id="url"
                      type="url"
                      value={formData.url}
                      onChange={(e) => handleChange("url", e.target.value)}
                      placeholder="https://..."
                    />
                  </div>
                </div>

                {/* Company URL */}
                <div className="space-y-2 mb-4">
                  <Label htmlFor="companyUrl">Company Website</Label>
                  <Input
                    id="companyUrl"
                    type="url"
                    value={formData.companyUrl}
                    onChange={(e) => handleChange("companyUrl", e.target.value)}
                    placeholder="https://company.com"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2 mb-4">
                  <Label htmlFor="description">Job Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    placeholder="Brief description of the role..."
                    rows={3}
                  />
                </div>

                {/* General Notes */}
                <div className="space-y-2">
                  <Label htmlFor="notes" className="flex items-center gap-2">
                    <StickyNote className="w-4 h-4 text-slate-400" />
                    General Notes
                  </Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleChange("notes", e.target.value)}
                    placeholder="Add any personal notes about this opportunity..."
                    rows={3}
                    className="resize-none"
                  />
                  <p className="text-xs text-slate-500">
                    Use this for overall thoughts about the role, company culture, or anything else you want to remember.
                  </p>
                </div>

                {/* Contact Information */}
                <div className="space-y-2">
                  <Label htmlFor="contactName">Contact Name</Label>
                  <Input
                    id="contactName"
                    value={formData.contactName}
                    onChange={(e) => handleChange("contactName", e.target.value)}
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactRole">Contact Role</Label>
                  <Input
                    id="contactRole"
                    value={formData.contactRole}
                    onChange={(e) => handleChange("contactRole", e.target.value)}
                    placeholder="Recruiter"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleChange("contactEmail", e.target.value)}
                    placeholder="john.doe@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => handleChange("contactPhone", e.target.value)}
                    placeholder="(123) 456-7890"
                  />
                </div>
              </form>
            </TabsContent>

            <TabsContent value="stages" className="space-y-4 mt-0">
              <Card className="p-4 bg-gradient-to-br from-indigo-50 to-blue-50/30 border border-indigo-100/50">
                <p className="text-sm text-slate-700 leading-relaxed">
                  Track each stage of your interview process. Add dates, mark stages as completed, 
                  and capture notes specific to each interview round.
                </p>
              </Card>

              <div className="space-y-3">
                {interviewStages.map((stage, index) => (
                  <Card key={stage.id} className="p-4 space-y-4 border-slate-200 hover:border-slate-300 transition-colors duration-200">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1.5">
                            <Label htmlFor={`stage-name-${stage.id}`} className="text-xs">
                              Stage Name
                            </Label>
                            <Input
                              id={`stage-name-${stage.id}`}
                              value={stage.name}
                              onChange={(e) =>
                                handleStageUpdate(stage.id, "name", e.target.value)
                              }
                              placeholder="e.g., Phone Screen"
                              className="h-9"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor={`stage-date-${stage.id}`} className="text-xs flex items-center gap-1.5">
                              <Calendar className="w-3 h-3 text-slate-400" />
                              Date
                            </Label>
                            <Input
                              id={`stage-date-${stage.id}`}
                              type="date"
                              value={stage.date}
                              onChange={(e) =>
                                handleStageUpdate(stage.id, "date", e.target.value)
                              }
                              className="h-9"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor={`stage-notes-${stage.id}`} className="text-xs flex items-center gap-1.5">
                            <StickyNote className="w-3 h-3 text-slate-400" />
                            Stage Notes
                          </Label>
                          <Textarea
                            id={`stage-notes-${stage.id}`}
                            value={stage.notes || ""}
                            onChange={(e) =>
                              handleStageUpdate(stage.id, "notes", e.target.value)
                            }
                            placeholder="Add notes about this interview stage..."
                            rows={2}
                            className="resize-none text-sm"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id={`stage-completed-${stage.id}`}
                            checked={stage.completed}
                            onChange={(e) =>
                              handleStageUpdate(stage.id, "completed", e.target.checked)
                            }
                            className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 transition-colors duration-200"
                          />
                          <Label
                            htmlFor={`stage-completed-${stage.id}`}
                            className="text-sm text-slate-700 cursor-pointer"
                          >
                            Mark as completed
                          </Label>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={handleAddStage}
                className="w-full border-dashed border-slate-300 hover:border-indigo-400 hover:bg-indigo-50 transition-all duration-200"
              >
                + Add Interview Stage
              </Button>
            </TabsContent>

            <TabsContent value="guide" className="mt-0">
              <InterviewStagesExplainer />
            </TabsContent>
          </div>
        </Tabs>

        <DialogFooter className="border-t pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="job-form" className="bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600">
            {isEdit ? "Save Changes" : "Add Application"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}