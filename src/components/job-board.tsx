import { JobApplication, JobStatus } from "@/types/job";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Calendar, DollarSign, Clock } from "lucide-react";

interface JobBoardProps {
  jobs: JobApplication[];
  onJobClick: (job: JobApplication) => void;
}

const statusConfig: Record<
  JobStatus,
  { label: string; color: string; bgGradient: string; icon: string }
> = {
  applied: {
    label: "Applied",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    bgGradient: "bg-gradient-to-br from-blue-50 to-blue-100/30",
    icon: "📝",
  },
  phone_screen: {
    label: "Phone Screen",
    color: "bg-purple-50 text-purple-700 border-purple-200",
    bgGradient: "bg-gradient-to-br from-purple-50 to-purple-100/30",
    icon: "📞",
  },
  technical: {
    label: "Technical",
    color: "bg-indigo-50 text-indigo-700 border-indigo-200",
    bgGradient: "bg-gradient-to-br from-indigo-50 to-indigo-100/30",
    icon: "💻",
  },
  final_round: {
    label: "Final Round",
    color: "bg-amber-50 text-amber-700 border-amber-200",
    bgGradient: "bg-gradient-to-br from-amber-50 to-amber-100/30",
    icon: "👥",
  },
  offer: {
    label: "Offer",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    bgGradient: "bg-gradient-to-br from-emerald-50 to-emerald-100/30",
    icon: "🎉",
  },
  rejected: {
    label: "Not Selected",
    color: "bg-slate-50 text-slate-600 border-slate-200",
    bgGradient: "bg-gradient-to-br from-slate-50 to-slate-100/30",
    icon: "📋",
  },
  withdrawn: {
    label: "Withdrawn",
    color: "bg-slate-50 text-slate-500 border-slate-200",
    bgGradient: "bg-gradient-to-br from-slate-50 to-slate-100/30",
    icon: "↩️",
  },
};

export function JobBoard({ jobs, onJobClick }: JobBoardProps) {
  const columns: JobStatus[] = [
    "applied",
    "phone_screen",
    "technical",
    "final_round",
    "offer",
    "rejected",
    "withdrawn",
  ];

  const getJobsByStatus = (status: JobStatus) => {
    return jobs.filter((job) => job.status === status);
  };

  // Calculate days since applied
  const getDaysSinceApplied = (appliedDate: string) => {
    const today = new Date();
    const applied = new Date(appliedDate);
    const diffTime = Math.abs(today.getTime() - applied.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 px-1">
      {columns.map((status, columnIndex) => {
        const columnJobs = getJobsByStatus(status);
        const config = statusConfig[status];
        
        return (
          <div
            key={status}
            className="flex-shrink-0 w-[340px] flex flex-col gap-3 animate-fade-in"
            style={{ animationDelay: `${columnIndex * 50}ms` }}
          >
            {/* Column Header */}
            <div className={`${config.bgGradient} border ${config.color} rounded-xl p-4 shadow-sm`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">{config.icon}</span>
                  <div>
                    <h3 className="text-sm font-medium text-slate-800">
                      {config.label}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {columnJobs.length} {columnJobs.length === 1 ? 'position' : 'positions'}
                    </p>
                  </div>
                </div>
                <div className={`w-8 h-8 rounded-lg ${config.color} border flex items-center justify-center`}>
                  <span className="text-sm font-medium">{columnJobs.length}</span>
                </div>
              </div>
            </div>

            {/* Cards Container */}
            <div className="flex flex-col gap-3 min-h-[400px]">
              {columnJobs.length === 0 ? (
                <div className="bg-slate-50/50 border border-dashed border-slate-200 rounded-xl p-8 text-center">
                  <p className="text-sm text-slate-400 mb-1">No applications</p>
                  <p className="text-xs text-slate-400">Cards will appear here</p>
                </div>
              ) : (
                columnJobs.map((job, index) => {
                  const daysSince = getDaysSinceApplied(job.appliedDate);
                  const completedStages = job.interviewStages.filter((s) => s.completed).length;
                  const totalStages = job.interviewStages.length;
                  const progressPercent = totalStages > 0 ? (completedStages / totalStages) * 100 : 0;
                  
                  return (
                    <Card
                      key={job.id}
                      className="p-0 cursor-pointer bg-white border border-slate-200 hover:border-indigo-300 transition-all duration-250 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-100/50 group animate-slide-in-up overflow-hidden"
                      style={{ animationDelay: `${index * 50}ms` }}
                      onClick={() => onJobClick(job)}
                    >
                      {/* Header Section - Most Important */}
                      <div className="p-5 pb-4 bg-gradient-to-br from-slate-50/50 to-white">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-slate-900 group-hover:text-indigo-700 transition-colors duration-200 mb-1.5 line-clamp-2 leading-snug">
                              {job.position}
                            </h4>
                            <div className="flex items-center gap-1.5 text-sm text-slate-600">
                              <Building2 className="w-4 h-4 text-slate-400 flex-shrink-0" />
                              <span className="truncate font-medium">{job.company}</span>
                            </div>
                          </div>
                          <Badge
                            variant="secondary"
                            className="text-xs bg-white text-slate-700 border-slate-200 shadow-sm flex-shrink-0"
                          >
                            {job.jobType}
                          </Badge>
                        </div>

                        {/* Key Info Row */}
                        <div className="flex items-center gap-4 text-xs">
                          {job.location && (
                            <div className="flex items-center gap-1.5 text-slate-600">
                              <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                              <span className="truncate max-w-[120px]">{job.location}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1.5 text-slate-500 ml-auto">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span className="whitespace-nowrap">
                              {daysSince === 0 ? "Today" : daysSince === 1 ? "1 day" : `${daysSince} days`}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Details Section */}
                      <div className="px-5 py-4 space-y-2.5">
                        {job.salary && (
                          <div className="flex items-center gap-2 text-sm">
                            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0">
                              <DollarSign className="w-4 h-4 text-emerald-600" />
                            </div>
                            <span className="text-slate-700 font-medium">{job.salary}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center flex-shrink-0">
                            <Calendar className="w-4 h-4 text-blue-600" />
                          </div>
                          <span>
                            Applied {new Date(job.appliedDate).toLocaleDateString(
                              "en-US",
                              { month: "short", day: "numeric", year: "numeric" }
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Progress Section - Highlighted */}
                      <div className="px-5 py-4 bg-gradient-to-br from-indigo-50/30 to-transparent border-t border-slate-100">
                        {totalStages > 1 ? (
                          <>
                            <div className="flex items-center justify-between mb-2.5">
                              <span className="text-xs font-medium text-slate-700">Interview Progress</span>
                              <div className="flex items-center gap-1.5">
                                <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
                                  <span className="text-xs font-bold text-indigo-700">{completedStages}</span>
                                </div>
                                <span className="text-xs text-slate-400">/</span>
                                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                                  <span className="text-xs font-bold text-slate-600">{totalStages}</span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Progress Bar */}
                            <div className="relative w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-2.5">
                              <div 
                                className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${progressPercent}%` }}
                              />
                            </div>
                            
                            {/* Stage Bars */}
                            <div className="flex items-center gap-1">
                              {job.interviewStages.map((stage, idx) => (
                                <div
                                  key={idx}
                                  className={`flex-1 h-1 rounded-full transition-all duration-300 ${
                                    stage.completed
                                      ? "bg-indigo-600"
                                      : "bg-slate-200"
                                  }`}
                                  title={stage.name}
                                />
                              ))}
                            </div>
                          </>
                        ) : (
                          <div className="text-center py-1">
                            <span className="text-xs text-slate-500">Just applied • Waiting for response</span>
                          </div>
                        )}
                      </div>
                    </Card>
                  );
                })
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}