import { JobApplication, JobStatus } from "@/types/job";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { TrendingUp, Target, Clock, Award, Zap, CheckCircle } from "lucide-react";

interface AnalyticsViewProps {
  jobs: JobApplication[];
}

// Cohesive color palette - indigo/blue tones
const statusColors: Record<JobStatus, string> = {
  applied: "#6366f1",      // indigo-500
  phone_screen: "#8b5cf6", // violet-500
  technical: "#a855f7",    // purple-500
  final_round: "#c084fc",  // purple-400
  offer: "#22d3ee",        // cyan-400
  rejected: "#94a3b8",     // slate-400
  withdrawn: "#cbd5e1",    // slate-300
};

const statusLabels: Record<JobStatus, string> = {
  applied: "Applied",
  phone_screen: "Phone Screen",
  technical: "Technical",
  final_round: "Final Round",
  offer: "Offer",
  rejected: "Not Selected",
  withdrawn: "Withdrawn",
};

export function AnalyticsView({ jobs }: AnalyticsViewProps) {
  // Calculate statistics
  const totalApplications = jobs.length;
  const activeApplications = jobs.filter(
    (job) => !["rejected", "offer", "withdrawn"].includes(job.status)
  ).length;
  const offers = jobs.filter((job) => job.status === "offer").length;
  const rejected = jobs.filter((job) => job.status === "rejected").length;
  const withdrawn = jobs.filter((job) => job.status === "withdrawn").length;
  const responseRate = totalApplications > 0 
    ? ((totalApplications - jobs.filter(j => j.status === "applied").length) / totalApplications * 100)
    : 0;
  const offerRate = totalApplications > 0 ? (offers / totalApplications * 100) : 0;

  // Status distribution for pie chart
  const statusDistribution = Object.entries(
    jobs.reduce((acc, job) => {
      acc[job.status] = (acc[job.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([status, count]) => ({
    name: statusLabels[status as JobStatus],
    value: count,
    color: statusColors[status as JobStatus],
  }));

  // Applications by status for bar chart
  const applicationsByStatus = Object.keys(statusLabels).map((status) => ({
    status: statusLabels[status as JobStatus],
    count: jobs.filter((job) => job.status === status).length,
    fill: statusColors[status as JobStatus],
  }));

  // Weekly trend (mock data for demonstration)
  const weeklyTrend = [
    { week: "Week 1", applications: 3, responses: 1 },
    { week: "Week 2", applications: 5, responses: 3 },
    { week: "Week 3", applications: 4, responses: 2 },
    { week: "Week 4", applications: 6, responses: 4 },
  ];

  // Average time in each stage (mock calculation)
  const avgTimeByStage = [
    { stage: "Applied → Response", days: 5 },
    { stage: "Phone → Technical", days: 7 },
    { stage: "Technical → Final", days: 10 },
    { stage: "Final → Offer", days: 6 },
  ];

  // Key insights
  const insights = [
    {
      icon: Target,
      label: "Response Rate",
      value: `${responseRate.toFixed(0)}%`,
      description: "Applications receiving responses",
      gradient: "from-indigo-500 to-indigo-600",
      bgGradient: "from-indigo-50 to-indigo-100/50",
    },
    {
      icon: CheckCircle,
      label: "Offer Conversion",
      value: `${offerRate.toFixed(1)}%`,
      description: "Applications to offers",
      gradient: "from-violet-500 to-violet-600",
      bgGradient: "from-violet-50 to-violet-100/50",
    },
    {
      icon: Clock,
      label: "Avg. Time to Offer",
      value: "28 days",
      description: "From application to offer",
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-50 to-purple-100/50",
    },
    {
      icon: Zap,
      label: "Active Pipeline",
      value: activeApplications.toString(),
      description: "Applications in progress",
      gradient: "from-cyan-500 to-cyan-600",
      bgGradient: "from-cyan-50 to-cyan-100/50",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">Analytics Dashboard</h2>
        <p className="text-sm text-slate-600">
          Track your job search performance and gain actionable insights
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <Card 
              key={insight.label} 
              className="p-6 bg-white border-slate-200 hover:shadow-lg transition-all duration-300 animate-slide-in-up overflow-hidden relative"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${insight.bgGradient} opacity-50`} />
              
              <div className="relative z-10">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${insight.gradient} mb-4 shadow-sm`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-3xl font-semibold text-slate-900 mb-1">{insight.value}</p>
                <p className="text-sm font-medium text-slate-700 mb-1">{insight.label}</p>
                <p className="text-xs text-slate-500">{insight.description}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution Pie Chart */}
        <Card className="p-6 bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="mb-6">
            <h3 className="text-base font-semibold text-slate-900 mb-1">Status Distribution</h3>
            <p className="text-xs text-slate-500">
              Breakdown of applications by current status
            </p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={statusDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
                strokeWidth={2}
                stroke="#fff"
              >
                {statusDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Applications by Status Bar Chart */}
        <Card className="p-6 bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="mb-6">
            <h3 className="text-base font-semibold text-slate-900 mb-1">Applications by Stage</h3>
            <p className="text-xs text-slate-500">
              Number of applications at each stage
            </p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={applicationsByStatus}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis
                dataKey="status"
                tick={{ fontSize: 11, fill: '#64748b' }}
                angle={-45}
                textAnchor="end"
                height={80}
                axisLine={{ stroke: '#e2e8f0' }}
              />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#e2e8f0' }} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Bar dataKey="count" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Trend Line Chart */}
        <Card className="p-6 bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="mb-6">
            <h3 className="text-base font-semibold text-slate-900 mb-1">Application Activity</h3>
            <p className="text-xs text-slate-500">
              Applications submitted and responses over time
            </p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={weeklyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#e2e8f0' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#e2e8f0' }} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line
                type="monotone"
                dataKey="applications"
                stroke="#6366f1"
                strokeWidth={3}
                name="Applications"
                dot={{ fill: '#6366f1', r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="responses"
                stroke="#22d3ee"
                strokeWidth={3}
                name="Responses"
                dot={{ fill: '#22d3ee', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Average Time by Stage */}
        <Card className="p-6 bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="mb-6">
            <h3 className="text-base font-semibold text-slate-900 mb-1">Time Between Stages</h3>
            <p className="text-xs text-slate-500">
              Average duration for each interview stage
            </p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={avgTimeByStage} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#e2e8f0' }} />
              <YAxis
                dataKey="stage"
                type="category"
                tick={{ fontSize: 10, fill: '#64748b' }}
                width={120}
                axisLine={{ stroke: '#e2e8f0' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Bar dataKey="days" fill="#a855f7" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Summary Stats */}
      <Card className="p-8 bg-gradient-to-br from-slate-50 to-white border-slate-200 shadow-sm">
        <h3 className="text-base font-semibold text-slate-900 mb-6">Summary Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div className="space-y-2 text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center mx-auto mb-3">
              <span className="text-xl font-bold text-white">{totalApplications}</span>
            </div>
            <p className="text-xs font-medium text-slate-600">Total Applications</p>
          </div>
          <div className="space-y-2 text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center mx-auto mb-3">
              <span className="text-xl font-bold text-white">{activeApplications}</span>
            </div>
            <p className="text-xs font-medium text-slate-600">Active</p>
          </div>
          <div className="space-y-2 text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-500 flex items-center justify-center mx-auto mb-3">
              <span className="text-xl font-bold text-white">{offers}</span>
            </div>
            <p className="text-xs font-medium text-slate-600">Offers</p>
          </div>
          <div className="space-y-2 text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-400 to-slate-500 flex items-center justify-center mx-auto mb-3">
              <span className="text-xl font-bold text-white">{rejected}</span>
            </div>
            <p className="text-xs font-medium text-slate-600">Not Selected</p>
          </div>
          <div className="space-y-2 text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center mx-auto mb-3">
              <span className="text-xl font-bold text-white">{withdrawn}</span>
            </div>
            <p className="text-xs font-medium text-slate-600">Withdrawn</p>
          </div>
        </div>
      </Card>

      {/* Motivational Message */}
      {totalApplications > 0 && (
        <Card className="p-6 bg-gradient-to-br from-indigo-50 via-violet-50 to-purple-50 border-indigo-200 shadow-sm">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="p-3 bg-white rounded-xl shadow-sm">
                <TrendingUp className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Keep Going! 💪</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                You've submitted {totalApplications} application{totalApplications !== 1 ? "s" : ""} and
                received {offers} offer{offers !== 1 ? "s" : ""}. 
                {activeApplications > 0 && ` You have ${activeApplications} application${activeApplications !== 1 ? "s" : ""} still in progress.`}
                {" "}Every application is a step closer to your next opportunity. Stay positive and persistent!
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}