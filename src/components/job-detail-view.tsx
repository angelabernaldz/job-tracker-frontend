import { JobApplication } from "@/types/job";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  MapPin,
  Calendar,
  DollarSign,
  ExternalLink,
  Edit,
  Briefcase,
  FileText,
  Mail,
  Phone,
  User,
  Globe,
} from "lucide-react";
import { InterviewTimeline } from "./interview-timeline";

interface JobDetailViewProps {
  job: JobApplication;
  onBack: () => void;
  onEdit?: () => void;
}

const statusConfig: Record<string, { label: string; color: string }> = {
  applied: { label: "Applied", color: "bg-blue-100 text-blue-700 border-blue-200" },
  phone_screen: {
    label: "Phone Screen",
    color: "bg-purple-100 text-purple-700 border-purple-200",
  },
  technical: {
    label: "Technical Interview",
    color: "bg-orange-100 text-orange-700 border-orange-200",
  },
  final_round: {
    label: "Final Round",
    color: "bg-yellow-100 text-yellow-700 border-yellow-200",
  },
  offer: { label: "Offer Received", color: "bg-green-100 text-green-700 border-green-200" },
  rejected: { label: "Not Selected", color: "bg-gray-100 text-gray-600 border-gray-200" },
  withdrawn: { label: "Withdrawn", color: "bg-slate-100 text-slate-600 border-slate-200" },
};

export function JobDetailView({ job, onBack, onEdit }: JobDetailViewProps) {
  const statusInfo = statusConfig[job.status];
  
  // Calculate progress
  const completedStages = job.interviewStages.filter(s => s.completed).length;
  const totalStages = job.interviewStages.length;
  const progressPercentage = totalStages > 0 ? (completedStages / totalStages) * 100 : 0;

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-slide-in-up">
      {/* Back button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onBack}
        className="hover:bg-slate-100 transition-all duration-200"
      >
        ← Back to Dashboard
      </Button>

      {/* Header Card */}
      <Card className="p-6 sm:p-8 bg-white/70 backdrop-blur-sm border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-6">
          <div className="flex-1 w-full sm:w-auto">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <Badge
                className={`${statusInfo.color} border text-xs px-3 py-1 shadow-sm`}
                variant="outline"
              >
                {statusInfo.label}
              </Badge>
              <Badge
                variant="secondary"
                className="text-xs bg-slate-50 text-slate-700 border-slate-200"
              >
                {job.jobType}
              </Badge>
            </div>
            <h1 className="text-xl sm:text-2xl mb-2 text-slate-900">{job.position}</h1>
            <div className="flex items-center gap-2 text-slate-600">
              <Building2 className="w-5 h-5 text-slate-400" />
              <span className="text-base">{job.company}</span>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onEdit}
            className="gap-2 border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 w-full sm:w-auto"
          >
            <Edit className="w-4 h-4" />
            Edit
          </Button>
        </div>

        {/* Interview Progress Bar */}
        {totalStages > 0 && (
          <div className="mb-6 p-4 bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-700">Interview Progress</span>
              <span className="text-xs text-slate-600">{completedStages} of {totalStages} stages completed</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}

        <Separator className="my-6 bg-slate-200" />

        {/* Job Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {job.location && (
              <div className="flex items-start gap-3 group">
                <MapPin
                  className="w-5 h-5 text-slate-400 mt-0.5 group-hover:text-indigo-500 transition-colors duration-200"
                />
                <div>
                  <p className="text-xs text-slate-500 mb-1">Location</p>
                  <p className="text-sm text-slate-900">{job.location}</p>
                </div>
              </div>
            )}
            {job.salary && (
              <div className="flex items-start gap-3 group">
                <DollarSign
                  className="w-5 h-5 text-slate-400 mt-0.5 group-hover:text-emerald-500 transition-colors duration-200"
                />
                <div>
                  <p className="text-xs text-slate-500 mb-1">Salary Range</p>
                  <p className="text-sm text-slate-900">{job.salary}</p>
                </div>
              </div>
            )}
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3 group">
              <Calendar
                className="w-5 h-5 text-slate-400 mt-0.5 group-hover:text-blue-500 transition-colors duration-200"
              />
              <div>
                <p className="text-xs text-slate-500 mb-1">Applied Date</p>
                <p className="text-sm text-slate-900">
                  {new Date(job.appliedDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 group">
              <Briefcase
                className="w-5 h-5 text-slate-400 mt-0.5 group-hover:text-purple-500 transition-colors duration-200"
              />
              <div>
                <p className="text-xs text-slate-500 mb-1">Job Type</p>
                <p className="text-sm text-slate-900 capitalize">
                  {job.jobType.replace("-", " ")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {job.description && (
          <>
            <Separator className="my-6 bg-slate-200" />
            <div>
              <h3 className="text-sm mb-3 text-slate-800">Description</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {job.description}
              </p>
            </div>
          </>
        )}

        {/* Links Section */}
        {(job.url || job.companyUrl) && (
          <>
            <Separator className="my-6 bg-slate-200" />
            <div className="flex flex-wrap gap-3">
              {job.url && (
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="gap-2 border-slate-200 hover:bg-slate-50 hover:border-indigo-300 hover:text-indigo-600 transition-all duration-200"
                >
                  <a href={job.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                    View Job Posting
                  </a>
                </Button>
              )}
              {job.companyUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="gap-2 border-slate-200 hover:bg-slate-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-200"
                >
                  <a href={job.companyUrl} target="_blank" rel="noopener noreferrer">
                    <Globe className="w-4 h-4" />
                    Company Website
                  </a>
                </Button>
              )}
            </div>
          </>
        )}
      </Card>

      {/* Contact Information Card */}
      {job.contact && (job.contact.name || job.contact.email || job.contact.phone) && (
        <Card className="p-6 bg-white/70 backdrop-blur-sm border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
          <h3 className="text-sm mb-4 text-slate-800 font-medium">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {job.contact.name && (
              <div className="flex items-start gap-3 group">
                <User className="w-5 h-5 text-slate-400 mt-0.5 group-hover:text-indigo-500 transition-colors duration-200" />
                <div>
                  <p className="text-xs text-slate-500 mb-1">Contact Person</p>
                  <p className="text-sm text-slate-900 font-medium">{job.contact.name}</p>
                  {job.contact.role && (
                    <p className="text-xs text-slate-600 mt-0.5">{job.contact.role}</p>
                  )}
                </div>
              </div>
            )}
            {job.contact.email && (
              <div className="flex items-start gap-3 group">
                <Mail className="w-5 h-5 text-slate-400 mt-0.5 group-hover:text-blue-500 transition-colors duration-200" />
                <div>
                  <p className="text-xs text-slate-500 mb-1">Email</p>
                  <a 
                    href={`mailto:${job.contact.email}`}
                    className="text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-200"
                  >
                    {job.contact.email}
                  </a>
                </div>
              </div>
            )}
            {job.contact.phone && (
              <div className="flex items-start gap-3 group">
                <Phone className="w-5 h-5 text-slate-400 mt-0.5 group-hover:text-emerald-500 transition-colors duration-200" />
                <div>
                  <p className="text-xs text-slate-500 mb-1">Phone</p>
                  <a 
                    href={`tel:${job.contact.phone}`}
                    className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline transition-colors duration-200"
                  >
                    {job.contact.phone}
                  </a>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Interview Timeline */}
      <div>
        <h2 className="mb-4 text-slate-800">Interview Process</h2>
        <InterviewTimeline stages={job.interviewStages} />
      </div>

      {/* Personal Notes */}
      {job.notes && (
        <Card className="p-6 bg-white/70 backdrop-blur-sm border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-in-up">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-indigo-500 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm mb-2 text-slate-800">Personal Notes</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {job.notes}
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}