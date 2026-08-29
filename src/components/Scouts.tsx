import React, { useState } from 'react';
import { Search, UserPlus, MoreHorizontal } from 'lucide-react';
import { scoutsData as initialScouts } from '../data/mock_data';

export default function Scouts() {
  const [scouts, setScouts] = useState(initialScouts);
  const [searchQuery, setSearchQuery] = useState('');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [editingStatusId, setEditingStatusId] = useState<string | null>(null);

  const filteredScouts = scouts.filter(
    (scout) =>
      scout.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scout.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scout.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Update specific scout's status by ID
  const handleStatusChange = (id: string, newStatus: string) => {
    setScouts((prevScouts) =>
      prevScouts.map((scout) =>
        scout.id === id ? { ...scout, status: newStatus } : scout
      )
    );
    setEditingStatusId(null); // Close the select dropdown after choosing
  };

  // Dynamic styling for the status pill
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700';
      case 'Pending':
        return 'bg-amber-100 text-amber-700';
      case 'Under Review':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-end gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">Scouts</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your scouting network and assignments.</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors cursor-pointer">
          <UserPlus size={18} /> Invite Scout
        </button>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border flex justify-between items-center">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search scouts..."
              className="w-full h-10 pl-10 pr-4 bg-muted/50 border border-transparent rounded-lg focus:bg-card focus:border-border focus:outline-none focus:ring-1 focus:ring-primary text-sm"
            />
          </div>
        </div>
        <div className="overflow-visible min-h-[300px]">
          <table className="w-full text-left text-sm text-muted-foreground">
            <thead className="bg-muted/50 text-foreground text-xs uppercase font-semibold border-b border-border">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Region</th>
                <th className="px-6 py-4">Applied Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredScouts.map((scout) => (
                <tr key={scout.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{scout.name}</td>
                  <td className="px-6 py-4">{scout.region}</td>
                  <td className="px-6 py-4">{scout.applied}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getStatusStyle(scout.status)}`}>
                      {scout.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right relative">
                    {editingStatusId === scout.id ? (
                      <select
                        autoFocus
                        value={scout.status}
                        onChange={(e) => handleStatusChange(scout.id, e.target.value)}
                        onBlur={() => setEditingStatusId(null)}
                        className="bg-muted/50 border border-border text-foreground text-xs rounded-lg focus:ring-primary focus:border-primary block w-full px-6 py-4 cursor-pointer"
                      >
                        <option value="Active">Active</option>
                        <option value="Pending">Pending</option>
                        <option value="Under Review">Under Review</option>
                      </select>
                    ) : (
                      <div className="relative inline-block text-left">
                        <button
                          onClick={() => setOpenMenuId(openMenuId === scout.id ? null : scout.id)}
                          className="p-2 text-muted-foreground hover:bg-muted rounded-lg cursor-pointer"
                        >
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                        
                        {openMenuId === scout.id && (
                          <div className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-card border border-border shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                            <div className="py-1">
                              <button
                                onClick={() => {
                                  setEditingStatusId(scout.id);
                                  setOpenMenuId(null);
                                }}
                                className="block w-full px-4 py-2 text-sm text-left text-foreground hover:bg-muted cursor-pointer"
                              >
                                Change Status
                              </button>
                              <button
                                onClick={() => setOpenMenuId(null)}
                                className="block w-full px-4 py-2 text-sm text-left text-foreground hover:bg-muted cursor-pointer"
                              >
                                Other
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}