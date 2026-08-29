import React, { useState } from 'react';

interface SettingsProps {
  currentName: string;
  currentEmail: string;
  onSaveProfile: (name: string, email: string) => void;
}

export default function Settings({ currentName, currentEmail, onSaveProfile }: SettingsProps) {
  const [name, setName] = useState(currentName);
  const [email, setEmail] = useState(currentEmail);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-foreground tracking-tight">Configuration</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage platform rules and your administrator preferences.</p>
      </div>
      
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Profile Information</h3>
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
              <input 
                type="text" 
                value={name}
                placeholder='Admin User'
                onChange={(e) => setName(e.target.value)}
                className="w-full h-10 px-4 bg-muted/50 border border-border rounded-lg focus:bg-card focus:border-border focus:outline-none focus:ring-1 focus:ring-primary text-sm" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email Address</label>
              <input 
                type="email" 
                value={email}
                placeholder='admin@matobev.com'
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 px-4 bg-muted/50 border border-border rounded-lg focus:bg-card focus:border-border focus:outline-none focus:ring-1 focus:ring-primary text-sm" 
              />
            </div>
          </div>
        </div>
        <div className="p-6 bg-muted/30 flex justify-end">
          <button 
            onClick={() => onSaveProfile(name, email)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}