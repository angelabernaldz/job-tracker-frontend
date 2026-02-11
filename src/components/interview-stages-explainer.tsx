"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Phone,
  Code,
  Users,
  Trophy,
  HelpCircle,
  ChevronRight,
} from "lucide-react";

interface Stage {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
  tips: string[];
}

const stages: Stage[] = [
  {
    id: "applied",
    name: "Applied",
    icon: <FileText className="w-5 h-5" />,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    description:
      "You've submitted your application. The recruiter will review your resume and cover letter.",
    tips: [
      "Response time typically ranges from 1-2 weeks",
      "Follow up politely after 7-10 days if you haven't heard back",
      "Keep your LinkedIn profile updated",
    ],
  },
  {
    id: "phone_screen",
    name: "Phone Screen",
    icon: <Phone className="w-5 h-5" />,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    description:
      "A brief conversation with a recruiter to discuss your background, salary expectations, and mutual fit.",
    tips: [
      "Usually lasts 15-30 minutes",
      "Be ready to discuss your resume and career goals",
      "Prepare questions about the role and company",
    ],
  },
  {
    id: "technical",
    name: "Technical Interview",
    icon: <Code className="w-5 h-5" />,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
    description:
      "Assess your technical skills through coding challenges, system design, or take-home assignments.",
    tips: [
      "Practice common algorithms and data structures",
      "Think out loud and explain your reasoning",
      "Ask clarifying questions before starting",
    ],
  },
  {
    id: "final_round",
    name: "Final Round",
    icon: <Users className="w-5 h-5" />,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    description:
      "Meet with team members, managers, and leadership to assess cultural fit and collaboration style.",
    tips: [
      "May include multiple back-to-back interviews",
      "Demonstrate your communication and teamwork skills",
      "Show genuine interest in the team and mission",
    ],
  },
  {
    id: "offer",
    name: "Offer",
    icon: <Trophy className="w-5 h-5" />,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    description:
      "Congratulations! You'll receive a formal offer with details on compensation, benefits, and start date.",
    tips: [
      "Review the offer carefully and take time to decide",
      "Negotiation is normal and expected",
      "Ask questions about anything that's unclear",
    ],
  },
];

export function InterviewStagesExplainer() {
  const [activeStage, setActiveStage] = useState<string | null>(null);
  const [focusedStage, setFocusedStage] = useState<string | null>(null);

  const displayStage = activeStage || focusedStage;

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-xl">
        <HelpCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-slate-800 mb-1 font-medium">
            Understanding the Interview Journey
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">
            Select a stage below to learn what to expect. Every company's process is unique, 
            but these are the typical steps in a software engineering interview.
          </p>
        </div>
      </div>

      {/* Visual Roadmap - Horizontal Stepper */}
      <div className="relative px-4">
        {/* Connection Line */}
        <div className="absolute top-[32px] left-[calc(20%/2+16px)] right-[calc(20%/2+16px)] h-[2px] bg-slate-200" />

        {/* Stages */}
        <div className="grid grid-cols-5 gap-2 relative">
          {stages.map((stage, index) => {
            const isActive = displayStage === stage.id;
            
            return (
              <button
                key={stage.id}
                onClick={() =>
                  setActiveStage(activeStage === stage.id ? null : stage.id)
                }
                onMouseEnter={() => setActiveStage(stage.id)}
                onMouseLeave={() => setActiveStage(null)}
                onFocus={() => setFocusedStage(stage.id)}
                onBlur={() => setFocusedStage(null)}
                className={`flex flex-col items-center gap-3 p-3 rounded-xl transition-all duration-500 ease-out focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 group relative ${
                  isActive ? "bg-slate-50" : "hover:bg-slate-50"
                }`}
                aria-label={`${stage.name}: ${stage.description}`}
                aria-expanded={displayStage === stage.id}
                aria-describedby={`stage-${stage.id}-description`}
              >
                {/* Icon Circle */}
                <div
                  className={`w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-500 ease-out relative z-10 ${
                    isActive
                      ? `${stage.bgColor} ${stage.borderColor} shadow-lg scale-110`
                      : `bg-white ${stage.borderColor} group-hover:scale-105 group-hover:shadow-md`
                  }`}
                >
                  <div className={stage.color}>{stage.icon}</div>
                </div>

                {/* Stage Name */}
                <div className="text-center">
                  <p
                    className={`text-xs font-medium mb-1 transition-colors duration-400 ${
                      isActive ? "text-slate-900" : "text-slate-700"
                    }`}
                  >
                    {stage.name}
                  </p>
                  <Badge
                    variant="outline"
                    className={`text-[10px] px-2 py-0 h-5 border transition-all duration-400 ${
                      isActive
                        ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                        : "bg-white border-slate-200 text-slate-500"
                    }`}
                  >
                    Step {index + 1}
                  </Badge>
                </div>

                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-indigo-600 rounded-full animate-pulse-subtle" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Explanation Card */}
      {displayStage ? (
        <Card
          id={`stage-${displayStage}-description`}
          className="p-6 bg-white border border-slate-200 shadow-lg animate-scale-in"
          role="region"
          aria-live="polite"
        >
          {stages
            .filter((s) => s.id === displayStage)
            .map((stage) => (
              <div key={stage.id} className="space-y-5">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl ${stage.bgColor} ${stage.borderColor} border flex items-center justify-center ${stage.color} flex-shrink-0`}
                  >
                    {stage.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-base font-medium text-slate-900">
                        {stage.name}
                      </h4>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-5">
                  <p className="text-xs font-medium text-slate-700 mb-3 uppercase tracking-wide">
                    Tips for Success
                  </p>
                  <ul className="space-y-2.5">
                    {stage.tips.map((tip, index) => (
                      <li
                        key={index}
                        className="text-sm text-slate-700 leading-relaxed flex gap-3"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0 mt-2" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
        </Card>
      ) : (
        <Card className="p-8 bg-slate-50 border border-slate-200 border-dashed">
          <p className="text-sm text-slate-500 text-center">
            Select a stage above to learn more about what to expect
          </p>
        </Card>
      )}
    </div>
  );
}