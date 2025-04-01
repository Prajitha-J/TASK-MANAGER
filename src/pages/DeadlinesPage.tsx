
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Calendar, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
}

const DeadlinesPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  
  useEffect(() => {
    // Load saved events from localStorage
    const savedEvents = localStorage.getItem('events');
    if (savedEvents) {
      const parsedEvents = JSON.parse(savedEvents);
      
      // Convert string dates back to Date objects
      const formattedEvents = parsedEvents.map((event: any) => ({
        ...event,
        date: new Date(event.date)
      }));
      
      setEvents(formattedEvents);
    }
  }, []);

  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Deadlines</h1>
        <p className="text-muted-foreground mt-1">
          All events recorded from Event Reminders
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6">
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>All Deadlines</CardTitle>
            <CardDescription>Events and their deadlines</CardDescription>
          </CardHeader>
          <CardContent>
            {events.length > 0 ? (
              <div className="space-y-4">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start space-x-4 p-4 bg-card/50 rounded-md hover-scale"
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
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-10 text-muted-foreground">
                No deadlines found. Add events in the Event Reminders page to see them here.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeadlinesPage;
