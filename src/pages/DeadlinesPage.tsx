
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CalendarDays, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
}

const DeadlinesPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Load saved events from localStorage
    setLoading(true);
    const savedEvents = localStorage.getItem('events');
    if (savedEvents) {
      try {
        const parsedEvents = JSON.parse(savedEvents);
        
        // Convert string dates back to Date objects and sort by date
        const formattedEvents = parsedEvents
          .map((event: any) => ({
            ...event,
            date: new Date(event.date)
          }))
          .sort((a: Event, b: Event) => a.date.getTime() - b.date.getTime());
        
        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error parsing events:", error);
      }
    }
    setLoading(false);
  }, []);

  // Group events by month for a better organization
  const eventsByMonth: { [key: string]: Event[] } = {};
  events.forEach(event => {
    const monthYear = new Date(event.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    if (!eventsByMonth[monthYear]) {
      eventsByMonth[monthYear] = [];
    }
    eventsByMonth[monthYear].push(event);
  });

  return (
    <div className="container mx-auto pb-10">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Deadlines</h1>
        <p className="text-muted-foreground mt-1">
          All events recorded from Event Reminders
        </p>
      </header>

      <Card className="glass-effect overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl">Deadline Calendar</CardTitle>
          <CardDescription>Events and reminders tracking</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-pulse text-primary">Loading events...</div>
            </div>
          ) : events.length > 0 ? (
            <div className="space-y-8">
              {Object.keys(eventsByMonth).map(monthYear => (
                <div key={monthYear} className="event-month-group">
                  <h3 className="text-lg font-medium mb-4 bg-primary/10 p-2 rounded-md">{monthYear}</h3>
                  <div className="space-y-4">
                    {eventsByMonth[monthYear].map((event) => (
                      <div
                        key={event.id}
                        className="flex items-start space-x-4 p-4 bg-card/50 rounded-md hover-scale border border-primary/20"
                      >
                        <div className="flex-shrink-0 flex flex-col items-center justify-center w-12 h-12 rounded-md bg-primary/10 text-primary">
                          <span className="text-xs font-semibold">
                            {new Intl.DateTimeFormat("en", {
                              month: "short",
                            }).format(event.date)}
                          </span>
                          <span className="text-lg font-bold">
                            {event.date.getDate()}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{event.title}</h4>
                            {event.time && (
                              <Badge
                                variant="outline"
                                className="text-xs font-normal"
                              >
                                <Clock className="mr-1 h-3 w-3" />
                                {event.time}
                              </Badge>
                            )}
                          </div>
                          {event.description && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {event.description}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground mt-2">
                            {new Date(event.date).toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              day: 'numeric', 
                              month: 'long', 
                              year: 'numeric' 
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4">
              <CalendarDays className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-medium text-muted-foreground mb-2">No deadlines found</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Add events in the Event Reminders page to see them appear here. Track important dates and never miss a deadline.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DeadlinesPage;
