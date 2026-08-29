import React, { useState } from 'react';
import { Search, Plus, X, MoreHorizontal } from 'lucide-react';
import { playersData as initialPlayers } from '../data/mock_data';
//player positions
const subPositionOptions: Record<string, string[]> = {
  Forward: ['LW', 'RW', 'ST', 'CF'],
  Midfielder: ['CM', 'CDM', 'CAM'],
  Defender: ['RB', 'RWB', 'LB', 'LWB', 'CB'],
  Goalkeeper: ['GK'],
};

export default function Players() {
  const [players, setPlayers] = useState(initialPlayers);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [editingStatusId, setEditingStatusId] = useState<string | null>(null);

  const [newPlayer, setNewPlayer] = useState({
    name: '',
    position: 'Forward',
    subPosition: 'LW',
    age: '',
    team: '',
    status: 'Active',
  });

  // Filter players based on search query
  const filteredPlayers = players.filter(
    (player) =>
      player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.team.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Remove player handler
  const handleDeletePlayer = (id: string) => {
    setPlayers((prev) => prev.filter((player) => player.id !== id));
  };

  // Update specific player's status by ID
  const handleStatusChange = (id: string, newStatus: string) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === id ? { ...player, status: newStatus } : player
      )
    );
    setEditingStatusId(null); // Close the select dropdown after choosing
  };

  // Handle main position change to automatically update the sub-position
  const handlePositionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPosition = e.target.value;
    setNewPlayer({
      ...newPlayer,
      position: selectedPosition,
      subPosition: subPositionOptions[selectedPosition][0], // Auto-select the first valid role
    });
  };

  // Add player handler
  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlayer.name || !newPlayer.age || !newPlayer.team) return;

    // Use only the role (subPosition) for the table display
    const roleOnly = newPlayer.position === 'Goalkeeper' 
      ? 'GK' 
      : newPlayer.subPosition;

    const createdPlayer = {
      id: Date.now().toString(),
      name: newPlayer.name,
      position: roleOnly,
      age: Number(newPlayer.age),
      team: newPlayer.team,
      status: newPlayer.status,
    };

    setPlayers((prev) => [createdPlayer, ...prev]);
    setNewPlayer({ name: '', position: 'Forward', subPosition: 'LW', age: '', team: '', status: 'Active' });
    setIsModalOpen(false);
  };

  // Dynamic styling for the status pill
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700';
      case 'Injured':
        return 'bg-red-100 text-red-700';
      case 'Under Review':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-end gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">Players</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage and view all registered players.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors cursor-pointer"
        >
          <Plus size={18} /> Add Player {/*adds players to the data*/}
        </button>
      </div>

      {/* Main Table Card */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border flex justify-between items-center">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search players..."
              className="w-full h-10 pl-10 pr-4 bg-muted/50 border border-transparent rounded-lg focus:bg-card focus:border-border focus:outline-none focus:ring-1 focus:ring-primary text-sm"
            />
          </div>
        </div>

        <div className="overflow-visible min-h-[300px]">
          <table className="w-full text-left text-sm text-muted-foreground">
            <thead className="bg-muted/50 text-foreground text-xs uppercase font-semibold border-b border-border">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Position</th>
                <th className="px-6 py-4">Age</th>
                <th className="px-6 py-4">Team</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredPlayers.length > 0 ? (
                filteredPlayers.map((player) => (
                  <tr key={player.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">{player.name}</td>
                    <td className="px-6 py-4">{player.position}</td>
                    <td className="px-6 py-4">{player.age}</td>
                    <td className="px-6 py-4">{player.team}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getStatusStyle(player.status)}`}>
                        {player.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right relative">
                      {editingStatusId === player.id ? (
                        <select
                          autoFocus
                          value={player.status}
                          onChange={(e) => handleStatusChange(player.id, e.target.value)}
                          onBlur={() => setEditingStatusId(null)}
                          className="bg-muted/50 border border-border text-foreground text-xs rounded-lg focus:ring-primary focus:border-primary block w-full px-6 py-4 cursor-pointer"
                        >
                          <option value="Active">Active</option>
                          <option value="Injured">Injured</option>
                          <option value="Under Review">Under Review</option>
                        </select>
                      ) : (
                        <div className="relative inline-block text-left">
                          <button
                            onClick={() => setOpenMenuId(openMenuId === player.id ? null : player.id)}
                            className="p-2 text-muted-foreground hover:bg-muted rounded-lg cursor-pointer"
                          >
                            <MoreHorizontal className="w-5 h-5" />
                          </button>
                          
                          {openMenuId === player.id && (
                            <div className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-card border border-border shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden">
                              <div className="py-1">
                                {/*button to change the player's status*/}
                                <button
                                  onClick={() => {
                                    setEditingStatusId(player.id);
                                    setOpenMenuId(null);
                                  }}
                                  className="block w-full px-4 py-2 text-sm text-left text-foreground hover:bg-muted cursor-pointer"
                                >
                                  Change Status
                                </button>
                                {/*Button to remove player from data*/}
                                <button
                                  onClick={() => {
                                    handleDeletePlayer(player.id);
                                    setOpenMenuId(null);
                                  }}
                                  className="block w-full px-4 py-2 text-sm text-left text-red-500 hover:bg-red-50 hover:text-red-700 cursor-pointer"
                                >
                                  Remove Player
                                </button>
                                {/*Placeholder for additional options*/}
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
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                    No players found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Player Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-xl max-w-md w-full p-6 space-y-4 shadow-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-foreground">Add New Player</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddPlayer} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={newPlayer.name}
                  onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="w-full h-10 px-3 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">Position</label>
                  <select
                    value={newPlayer.position}
                    onChange={handlePositionChange}
                    className="w-full h-10 px-3 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="Forward">Forward</option>
                    <option value="Midfielder">Midfielder</option>
                    <option value="Defender">Defender</option>
                    <option value="Goalkeeper">Goalkeeper</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">Role</label>
                  <select
                    value={newPlayer.subPosition}
                    onChange={(e) => setNewPlayer({ ...newPlayer, subPosition: e.target.value })}
                    disabled={newPlayer.position === 'Goalkeeper'}
                    className="w-full h-10 px-3 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
                  >
                    {subPositionOptions[newPlayer.position].map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">Team</label>
                  <input
                    type="text"
                    required
                    value={newPlayer.team}
                    onChange={(e) => setNewPlayer({ ...newPlayer, team: e.target.value })}
                    placeholder="e.g. Reserve Squad"
                    className="w-full h-10 px-3 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">Age</label>
                  <input
                    type="number"
                    required
                    min={15}
                    max={45}
                    value={newPlayer.age}
                    onChange={(e) => setNewPlayer({ ...newPlayer, age: e.target.value })}
                    placeholder="e.g. 21"
                    className="w-full h-10 px-3 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Status</label>
                <select
                  value={newPlayer.status}
                  onChange={(e) => setNewPlayer({ ...newPlayer, status: e.target.value })}
                  className="w-full h-10 px-3 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="Active">Active</option>
                  <option value="Injured">Injured</option>
                  <option value="Under Review">Under Review</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors cursor-pointer"
                >
                  Save Player
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}