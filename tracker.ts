// 75 Hard Challenge

type Activity = {
    name: string;
    completed: boolean;
}

type DayRecord = {
    date: string;
    dayNumber: number;
    activities: Activity[];
    isCompleted: boolean;
}

class ActivityTracker {
    // Store all days here
    days: DayRecord[] = []

    // Standard Activities for 75 Hard
    standardActivities = [
        "Indoor workout",
        "Outdoor workout",
        "Follow diet",
        "Drink water",
        "Read 10 pages",
        "Take progress photo"
    ];

    // add a new day
    addDay(date = new Date()): DayRecord {
        // Format date as YYYY-MM-DD
        const dateString = date.toISOString().split('T')[0];

        const activities: Activity[] = this.standardActivities.map(name => ({
            name: name,
            completed: false
        }));

        // Create new day record
        const newDay: DayRecord = {
            date: dateString,
            dayNumber: this.days.length + 1,
            activities: activities,
            isCompleted: false
        };

        // Add it to out list of days
        this.days.push(newDay);
        return newDay;
    }

    // Mark an activity as complete
    completeActivity(date: string, activityName: string): boolean {
        // find the day
        const day = this.days.find(day => day.date == date);
        if (!day) {
            console.log("Day not found");
            return false;
        }
        // Find the activity
        const activity = day.activities.find(a => a.name == activityName);
        if(!activity) {
            console.log("Activity not found");
            return false;
        }
        //Mark as complete
        activity.completed = true;

        // Check if all activities are complete
        day.isCompleted = day.activities.every(a => a.completed);
        return true;

    }
    
    getDay(date: string): DayRecord | undefined {
        return this.days.find(day => day.date === date);
    }

    getStatus() {
        const completedDays = this.days.filter(day => day.isCompleted).length;
        
        return {
            totalDays: 75,
            daysCompleted: completedDays,
            daysRemaining: 75 - completedDays,
            percentComplete: Math.round((completedDays / 75) * 100)
        };
    }
}

// Example usage 
const tracker = new ActivityTracker()

// Add today as a new day

const today = tracker.addDay();
console.log("Started day " + today.dayNumber);

// Complete some acitivites
tracker.completeActivity(today.date, "Indoor workout");
tracker.completeActivity(today.date, "Outdoor workout");

// Check progress
console.log("Today's progress:", tracker.getDay(today.date));
console.log("Overall progress:", tracker.getStatus());