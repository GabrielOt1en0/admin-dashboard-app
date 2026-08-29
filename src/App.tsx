//imports
import React, { useState } from "react";
import { Users, UserCheck, Trophy, BarChart2, Calendar, Search, Bell, Settings, LayoutDashboard, LogOut, Menu, X } from "lucide-react";
import Dashboard from "./components/Dashboard";
import Players from "./components/Players";
import Scouts from "./components/Scouts";
import MatchesEvents from "./components/MatchesEvents";
import Analytics from "./components/Analytics";
import AppSettings from "./components/Settings";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); //Added mobile accessibility
  //placeholder credentials
  const [adminName, setAdminName] = useState("Admin User");
  const [adminEmail, setAdminEmail] = useState("admin@matobev.com");
  //function to get initials from username
  const getInitials = (name: string) => {
    const parts = name.split(" ").filter((p) => p.length > 0);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return "AD";
  };
 //handles navigation on mobile devices
  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  const SidebarContent = () => (
    <>
      <div className="h-16 flex items-center px-6 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-2 text-white font-bold text-xl tracking-tight">
          <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
            <Trophy className="w-5 h-5 text-white" />
          </div>
          Matobev
        </div>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">Platform</div>
        <NavItem icon={LayoutDashboard} label="Dashboard" active={activeTab === "dashboard"} onClick={() => handleNavClick("dashboard")} />
        <NavItem icon={Users} label="Players" active={activeTab === "players"} onClick={() => handleNavClick("players")} />
        <NavItem icon={UserCheck} label="Scouts" active={activeTab === "scouts"} onClick={() => handleNavClick("scouts")} />
        <NavItem icon={Calendar} label="Matches & Events" active={activeTab === "events"} onClick={() => handleNavClick("events")} />
        <NavItem icon={BarChart2} label="Analytics" active={activeTab === "analytics"} onClick={() => handleNavClick("analytics")} />
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2 mt-8">Configuration</div>
        <NavItem icon={Settings} label="Settings" active={activeTab === "settings"} onClick={() => handleNavClick("settings")} />
      </nav>

      <div className="p-4 border-t border-slate-800 shrink-0">
        <div className="flex items-center gap-3 hover:bg-white/5 p-2 rounded-lg cursor-pointer transition-colors">
          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white font-semibold text-sm">
            {getInitials(adminName)}
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="text-sm font-medium text-white truncate">{adminName}</div>
            <div className="text-xs text-slate-400 truncate">{adminEmail}</div>
          </div>
          <LogOut className="w-4 h-4 text-slate-400 hover:text-white transition-colors" />
        </div>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-muted/30 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-[#0F172A] border-r border-slate-800 flex-col hidden md:flex shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <aside className="relative w-64 bg-[#0F172A] flex flex-col h-full shadow-2xl">
            <button 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white z-10 bg-slate-800/50 rounded-md"
            >
              <X size={20} />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 md:px-6 shrink-0">
          <div className="flex items-center gap-3 flex-1">
            <button 
              onClick={() => setIsMobileMenuOpen(true)} 
              className="md:hidden p-2 -ml-2 text-muted-foreground hover:bg-muted rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="md:hidden font-bold text-lg tracking-tight">Matobev</div>
            <div className="hidden md:flex relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" placeholder="Search players, scouts, or events..." className="w-full h-10 pl-10 pr-4 bg-muted/50 border border-transparent rounded-lg focus:bg-card focus:border-border focus:outline-none focus:ring-1 focus:ring-primary text-sm transition-all" />
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <button className="relative p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors md:hidden">
              <Search className="w-5 h-5" />
            </button>
            <button className="relative p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-card"></span>
            </button>
          </div>
        </header>

        {/* Dynamic Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "players" && <Players />}
          {activeTab === "scouts" && <Scouts />}
          {activeTab === "events" && <MatchesEvents />}
          {activeTab === "analytics" && <Analytics />}
          {activeTab === "settings" && (
            <AppSettings 
              currentName={adminName} 
              currentEmail={adminEmail} 
              onSaveProfile={(name, email) => {
                setAdminName(name);
                setAdminEmail(email);
              }} 
            />
          )}
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon: Icon, label, active, onClick }: { icon: any; label: string; active?: boolean; onClick: () => void; }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${active ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}>
      <Icon className={`w-4 h-4 ${active ? "text-white" : "text-slate-400"}`} />
      {label}
    </button>
  );
}
