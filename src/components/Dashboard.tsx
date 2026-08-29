// imports
import { Users, UserCheck, Activity, Bell, ChevronDown, MoreHorizontal, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { chartData, recentActivity, scoutsData } from "../data/mock_data";

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">Overview</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage and monitor Matobev platform activity.</p>
        </div>
        {/*placeholder buttons for generating reports on players and scouts and exporting them*/}
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-card border border-border text-foreground text-sm font-medium rounded-lg hover:bg-muted transition-colors">Export Data</button>
          <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors">Generate Report</button>
        </div>
      </div>

      {/* Stats Grid containing hard coded dummy data */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Players" value="12,482" trend="+14%" positive={true} icon={Users} /> 
        <StatCard title="Active Scouts" value="843" trend="+5.2%" positive={true} icon={UserCheck} />
        <StatCard title="Matches Tracked" value="3,210" trend="+1.2%" positive={true} icon={Activity} />
        <StatCard title="Pending Approvals" value="24" trend="-2" positive={false} icon={Bell} />
      </div>

      {/* Charts & Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart with hard coded static data */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-semibold text-foreground">Platform Activity</h2>
              <p className="text-sm text-muted-foreground">Active players and scouts over the last 7 days</p>
            </div>
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              Last 7 Days <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E4E4E7" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#71717A" }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#71717A" }} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #E4E4E7", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} itemStyle={{ fontSize: "13px" }} />
                <Line type="monotone" dataKey="active" stroke="#18181B" strokeWidth={2} dot={false} activeDot={{ r: 4 }} name="Active Players" />
                <Line type="monotone" dataKey="scouts" stroke="#A1A1AA" strokeWidth={2} dot={false} name="Scout Activity" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-card border border-border rounded-xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-semibold text-foreground">Recent Activity</h2>
            <button className="text-sm text-primary font-medium hover:underline">View All</button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-6">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex gap-4">
                  <div className="mt-0.5">
                    <div className={`w-2 h-2 rounded-full mt-1.5 ${activity.type === "scout" ? "bg-blue-500" : activity.type === "update" ? "bg-amber-500" : activity.type === "system" ? "bg-gray-400" : "bg-green-500"}`} />
                  </div>
                  <div>
                    <p className="text-sm text-foreground">
                      <span className="font-medium">{activity.user}</span> {activity.action} <span className="font-medium">{activity.target}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, positive, icon: Icon }: any) {
  return (
    <div className="bg-card border border-border p-5 rounded-xl flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-muted rounded-lg"><Icon className="w-5 h-5 text-foreground" /></div>
        <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${positive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {trend}
        </div>
      </div>
      <div>
        <h3 className="text-3xl font-bold text-foreground tracking-tight">{value}</h3>
        <p className="text-sm text-muted-foreground mt-1">{title}</p>
      </div>
    </div>
  );
}