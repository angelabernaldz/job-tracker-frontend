import { InterviewStage } from "@/types/job";
import { CheckCircle2, Circle, Clock, Calendar, FileText, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface InterviewTimelineProps {
  stages: InterviewStage[];
  onAddNote?: (stageId: string) => void;
}

export function InterviewTimeline({ stages, onAddNote }: InterviewTimelineProps) {
  // Determine current stage (first incomplete stage)
  const currentStageIndex = stages.findIndex((stage) => !stage.completed);
  const currentIndex = currentStageIndex === -1 ? stages.length - 1 : currentStageIndex;

  return (
    <div className="space-y-6">
      {/* Horizontal Stepper for larger screens */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Progress Line Background */}
          <div className="absolute top-5 left-0 right-0 h-[2px] bg-slate-200" />
          
          {/* Progress Line Active */}
          <div 
            className="absolute top-5 left-0 h-[2px] bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-500 ease-out"
            style={{ 
              width: stages.length > 1 
                ? `${(currentIndex / (stages.length - 1)) * 100}%` 
                : '0%' 
            }}
          />

          {/* Stage Steps */}
          <div className="relative flex justify-between">
            {stages.map((stage, index) => {
              const isCompleted = stage.completed;
              const isCurrent = index === currentIndex && !stage.completed;
              const isUpcoming = index > currentIndex;

              return (
                <div
                  key={stage.id}
                  className="flex flex-col items-center"
                  style={{ 
                    flex: 1,
                    maxWidth: `${100 / stages.length}%`
                  }}
                >
                  {/* Step Circle */}
                  <div className="relative group">
                    <div
                      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ease-out ${
                        isCompleted
                          ? "bg-indigo-600 border-indigo-600 shadow-sm"
                          : isCurrent
                          ? "bg-white border-indigo-500 shadow-lg shadow-indigo-200/50 scale-110"
                          : "bg-white border-slate-300"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      ) : isCurrent ? (
                        <div className="relative">
                          <Clock className="w-5 h-5 text-indigo-600" />
                          <div className="absolute inset-0 bg-indigo-400/30 rounded-full animate-pulse-subtle" />
                        </div>
                      ) : (
                        <Circle className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                    
                    {/* Hover effect */}
                    {!isUpcoming && (
                      <div className="absolute inset-0 bg-indigo-400/0 group-hover:bg-indigo-400/10 rounded-full transition-colors duration-200" />
                    )}
                  </div>

                  {/* Stage Label */}
                  <div className="mt-3 text-center max-w-[120px]">
                    <p
                      className={`text-xs font-medium transition-colors duration-200 ${
                        isCompleted
                          ? "text-indigo-700"
                          : isCurrent
                          ? "text-indigo-900"
                          : "text-slate-500"
                      }`}
                    >
                      {stage.name}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      {new Date(stage.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Vertical Timeline for mobile and detailed view */}
      <div className="space-y-3 mt-8">
        {stages.map((stage, index) => {
          const isCompleted = stage.completed;
          const isCurrent = index === currentIndex && !stage.completed;
          const isUpcoming = index > currentIndex;
          const isLast = index === stages.length - 1;

          return (
            <div key={stage.id} className="relative animate-slide-in-right" style={{ animationDelay: `${index * 50}ms` }}>
              {/* Timeline line */}
              {!isLast && (
                <div
                  className={`absolute left-[19px] top-[40px] w-[2px] h-[calc(100%+12px)] transition-all duration-300 ${
                    isCompleted
                      ? "bg-gradient-to-b from-indigo-500 to-indigo-400"
                      : "bg-slate-200"
                  }`}
                />
              )}

              <div className="flex gap-4">
                {/* Timeline dot */}
                <div className="flex-shrink-0 relative z-10">
                  <div
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ease-out ${
                      isCompleted
                        ? "bg-indigo-600 border-indigo-600 shadow-sm hover:shadow-md"
                        : isCurrent
                        ? "bg-white border-indigo-500 shadow-lg shadow-indigo-200/50 scale-105"
                        : "bg-white border-slate-300"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    ) : isCurrent ? (
                      <div className="relative">
                        <Clock className="w-5 h-5 text-indigo-600" />
                        <div className="absolute inset-0 bg-indigo-400/30 rounded-full animate-pulse-subtle" />
                      </div>
                    ) : (
                      <div className="w-3 h-3 rounded-full bg-slate-300" />
                    )}
                  </div>
                </div>

                {/* Content */}
                <Card 
                  className={`flex-1 p-4 transition-all duration-250 ease-out ${
                    isCompleted
                      ? "bg-white border-slate-200 hover:border-indigo-200 hover:shadow-md"
                      : isCurrent
                      ? "bg-gradient-to-br from-indigo-50/50 to-white border-indigo-300 shadow-md"
                      : "bg-slate-50/50 border-slate-200"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 
                            className={`text-sm font-medium transition-colors duration-200 ${
                              isCompleted
                                ? "text-indigo-900"
                                : isCurrent
                                ? "text-indigo-900"
                                : "text-slate-600"
                            }`}
                          >
                            {stage.name}
                          </h4>
                          {isCurrent && (
                            <Badge className="text-[10px] px-2 py-0 h-5 bg-indigo-100 text-indigo-700 border-indigo-200">
                              In Progress
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>
                            {new Date(stage.date).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Stage-specific Notes */}
                    {stage.notes && (
                      <div className="bg-white border border-slate-200 rounded-lg p-3 transition-all duration-200 hover:border-slate-300">
                        <div className="flex gap-2 text-xs text-slate-700 mb-1.5">
                          <FileText className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-slate-500" />
                          <span className="font-medium">Notes</span>
                        </div>
                        <p className="text-xs text-slate-600 pl-5 leading-relaxed whitespace-pre-wrap">{stage.notes}</p>
                      </div>
                    )}

                    {/* Feedback */}
                    {stage.feedback && (
                      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 transition-all duration-200 hover:border-emerald-300">
                        <div className="flex gap-2 text-xs text-emerald-900 mb-1.5">
                          <MessageSquare className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-emerald-600" />
                          <span className="font-medium">Feedback</span>
                        </div>
                        <p className="text-xs text-emerald-800 pl-5 leading-relaxed whitespace-pre-wrap">{stage.feedback}</p>
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}