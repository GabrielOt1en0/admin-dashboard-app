// mock data used for the players, scouts and dashboard pages
{/*Data used for the charts on the main chart on the dashboard */}
export const chartData = [
  { name: "Mon", active: 400, scouts: 240 },
  { name: "Tue", active: 300, scouts: 139 },
  { name: "Wed", active: 550, scouts: 380 },
  { name: "Thu", active: 278, scouts: 190 },
  { name: "Fri", active: 689, scouts: 480 },
  { name: "Sat", active: 839, scouts: 680 },
  { name: "Sun", active: 949, scouts: 830 },
];
{/* Data displayed on the recent activity tab on the dashboard page*/}
export const recentActivity = [
  { id: 1, user: "Alex Mitchell", action: "Scouted a new player", target: "Marcus Johnson", time: "10 mins ago", type: "scout" },
  { id: 2, user: "Sarah Jenkins", action: "Updated player profile", target: "David Chen", time: "1 hour ago", type: "update" },
  { id: 3, user: "System", action: "Monthly report generated", target: "", time: "3 hours ago", type: "system" },
  { id: 4, user: "Michael Brown", action: "Approved new scout", target: "Elena Rostova", time: "5 hours ago", type: "approve" },
];
{/*Initial player data displayed on the  players page*/}
export const playersData = [
  { id: '1', name: 'Job Ochieng', position: 'LW', age: 21, team: 'Academy U21', status: 'Active' },
  { id: '2', name: 'David Wambugu', position: 'CM', age: 19, team: 'Reserves', status: 'Injured' },
  { id: '3', name: 'Liam Smith', position: 'CB', age: 22, team: 'First Team', status: 'Active' },
  {id:'4', name:'David Chen', position:'CAM', age:22, team:'University Team', status:'Active'},
  {id:'5', name:'Marcus Johnson', position:'RB', age:18, team:'Academy U19', status:'Injured'},
];
{/*Initial data displayed on the scouts data page*/}
export const scoutsData = [
  { id: '1', name: 'Thomas Reid', region: 'Europe / UK', applied: 'Oct 24, 2026', status: 'Pending' },
  { id: '2', name: 'Lucas Moura', region: 'South America / BR', applied: 'Oct 23, 2026', status: 'Pending' },
  { id: '3', name: 'Sarah Jenkins', region: 'North America', applied: 'Sep 12, 2026', status: 'Active' },
  {id:'4', name:'Alex Mitchell',region:'Oceania/AU', applied:'April 4, 2026', status:'Active'},
  { id:'5',name:'James Mwaura',region:'North Africa',applied:'Aug 29, 2026', status:'Active' },
  {id:'6', name:'Elena Rastova', region:'Asia/RUS', applied:'Nov 18, 2026', status:'Active'}
];
{/*Placeholder data for the events page*/}
export const eventsData = [
  { id: 1, title: 'U21 Regional Final', date: 'Oct 24, 2026', time: '14:00', location: 'London Stadium', type: 'Match' },
  { id: 2, title: 'Scout Evaluation Seminar', date: 'Nov 02, 2026', time: '09:00', location: 'Virtual', type: 'Event' },
];