export type JobStatus =
  | "applied"
  | "phone_screen"
  | "technical"
  | "final_round"
  | "offer"
  | "rejected"
  | "withdrawn";

export interface InterviewStage {
  id: string;
  name: string;
  date: string;
  completed: boolean;
  notes?: string;
  feedback?: string;
}

export interface ContactPerson {
  name?: string;
  role?: string;
  email?: string;
  phone?: string;
}

export interface JobApplication {
  id: string;
  company: string;
  companyUrl?: string;
  position: string;
  status: JobStatus;
  appliedDate: string;
  location: string;
  jobType: "full-time" | "part-time" | "contract";
  salary?: string;
  description?: string;
  url?: string;
  interviewStages: InterviewStage[];
  notes?: string;
  contact?: ContactPerson;
}