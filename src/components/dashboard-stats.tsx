import { JobApplication } from "@/types/job";

interface DashboardStatsProps {
  jobs: JobApplication[];
}

export function DashboardStats({ jobs }: DashboardStatsProps) {
  const totalApplications = jobs.length;
  const activeApplications = jobs.filter(
    (job) => !["rejected", "offer"].includes(job.status)
  ).length;
  const offers = jobs.filter((job) => job.status === "offer").length;
  const avgTimeToOffer = 21; // Mock calculation - would be based on actual data

  const stats = [
    { 
      label: "Total Applications", 
      value: totalApplications, 
      color: "from-blue-500 to-blue-600",
      bg: "bg-gradient-to-br from-blue-50 to-blue-100/50",
      iconBg: "bg-blue-100"
    },
    { 
      label: "Active", 
      value: activeApplications, 
      color: "from-indigo-500 to-indigo-600",
      bg: "bg-gradient-to-br from-indigo-50 to-indigo-100/50",
      iconBg: "bg-indigo-100"
    },
    { 
      label: "Offers", 
      value: offers, 
      color: "from-emerald-500 to-emerald-600",
      bg: "bg-gradient-to-br from-emerald-50 to-emerald-100/50",
      iconBg: "bg-emerald-100"
    },
    { 
      label: "Avg. Days to Offer", 
      value: avgTimeToOffer, 
      color: "from-amber-500 to-amber-600",
      bg: "bg-gradient-to-br from-amber-50 to-amber-100/50",
      iconBg: "bg-amber-100"
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className={`${stat.bg} rounded-xl border border-slate-200/50 p-6 transition-all duration-250 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/50 animate-slide-in-up cursor-default`}
          style={{ animationDelay: `${index * 75}ms` }}
        >
          <p className="text-xs text-slate-600 mb-3 uppercase tracking-wide">{stat.label}</p>
          <p className={`text-4xl bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}