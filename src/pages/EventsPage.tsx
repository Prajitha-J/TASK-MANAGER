
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CalendarDays, Clock, Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
}

const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [newEvent, setNewEvent] = useState<Omit<Event, "id">>({
    title: "",
    description: "",
    date: new Date(),
    time: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Load events from localStorage on component mount
  useEffect(() => {
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

  // Save events to localStorage whenever events change
  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const addEvent = () => {
    if (newEvent.title.trim() === "") {
      toast.error("Event title cannot be empty");
      return;
    }

    const event: Event = {
      id: Date.now().toString(),
      ...newEvent,
    };

    setEvents([...events, event]);
    setNewEvent({
      title: "",
      description: "",
      date: new Date(),
      time: "",
    });
    setIsDialogOpen(false);
    toast.success("Event added successfully");
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter((event) => event.id !== id));
    toast.success("Event deleted successfully");
  };

  const eventsForSelectedDate = events.filter(
    (event) =>
      selectedDate &&
      event.date.getDate() === selectedDate.getDate() &&
      event.date.getMonth() === selectedDate.getMonth() &&
      event.date.getFullYear() === selectedDate.getFullYear()
  );

  // Function to highlight dates with events
  const dateHasEvents = (date: Date) => {
    return events.some(
      (event) =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear()
    );
  };

  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Event Reminders</h1>
        <p className="text-muted-foreground mt-1">
          Schedule and manage your upcoming events
        </p>
      </header>

      <div className="flex justify-between items-center mb-6">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="button-effect">
              <Plus className="mr-2 h-4 w-4" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
              <DialogDescription>
                Create a new event with reminders.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Event title"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Event description"
                  rows={3}
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, description: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <div className="border rounded-md p-2">
                  <Calendar
                    mode="single"
                    selected={newEvent.date}
                    onSelect={(date) =>
                      setNewEvent({ ...newEvent, date: date || new Date() })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={newEvent.time}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, time: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={addEvent}>Add Event</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-effect md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarDays className="mr-2 h-5 w-5" />
              Calendar
            </CardTitle>
            <CardDescription>Select a date to view events</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              modifiers={{
                hasEvents: (date) => dateHasEvents(date),
              }}
              modifiersClassNames={{
                hasEvents:
                  "relative before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:w-1 before:h-1 before:bg-primary before:rounded-full",
              }}
            />
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">
              Dates with events are marked with a dot
            </p>
          </CardFooter>
        </Card>

        <Card className="glass-effect md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              {selectedDate ? (
                <>Events for {selectedDate.toLocaleDateString()}</>
              ) : (
                <>All Events</>
              )}
            </CardTitle>
            <CardDescription>
              {eventsForSelectedDate.length === 0
                ? "No events scheduled for this date"
                : `${eventsForSelectedDate.length} event(s) scheduled`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {eventsForSelectedDate.length === 0 ? (
              <div className="text-center p-10">
                <p className="text-muted-foreground">
                  No events scheduled for this date
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {eventsForSelectedDate.map((event) => (
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
                    <button
                      onClick={() => deleteEvent(event.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventsPage;
