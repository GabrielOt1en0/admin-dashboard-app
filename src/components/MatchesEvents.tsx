import { Calendar as CalendarIcon, MapPin, Clock } from 'lucide-react';
import { eventsData } from '../data/mock_data';

export default function MatchesEvents() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-end gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">Matches & Events</h1>
          <p className="text-sm text-muted-foreground mt-1">Schedule and track upcoming scouting opportunities.</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors">Create Event</button>
      </div>
      
      <div className="grid gap-4">
        {eventsData.map((event) => (
          <div key={event.id} className="bg-card p-5 rounded-xl border border-border flex flex-col md:flex-row items-start md:items-center justify-between hover:border-muted-foreground/30 transition-colors gap-4">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-muted rounded-lg text-foreground"><CalendarIcon size={24} /></div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{event.title}</h3>
                <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock size={16} /> {event.date} at {event.time}</span>
                  <span className="flex items-center gap-1"><MapPin size={16} /> {event.location}</span>
                </div>
              </div>
            </div>
            <span className="px-3 py-1 bg-muted text-foreground rounded-md text-xs font-medium whitespace-nowrap">{event.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}