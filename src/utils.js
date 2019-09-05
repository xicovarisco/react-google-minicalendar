const utils = {
    getDaysInMonth(month, year) {
        const date = new Date(Date.UTC(year, month, 1));
        const days = [];
        while (date.getMonth() === month) {
            const dayOfWeek = date.getDay();
    
            // It should add some days at the beggining of the array from last month
            // This is useful for displaying purposes
            if (days.length === 0 && dayOfWeek !== 0) {
                for (let r = dayOfWeek; r > 0; r -= 1) {
                    const d = new Date(date);
                    const dateToAdd = new Date(d.setDate(d.getDate() - r));
                    days.push({
                        date: new Date(dateToAdd),
                        outOfMonth: true
                    });
                }
            }
            days.push({
                date: new Date(date),
                outOfMonth: false,
            });
            date.setDate(date.getDate() + 1);
        }
        const lastDayOfMonth = days[days.length - 1].date;
        // It should add some days at the end of the array from the current month
        // This is useful for displaying purposes
        if (lastDayOfMonth.getDay() !== 6) {
            const numberOfDaysToAdd = 6 - lastDayOfMonth.getDay();
            for (let r = 1; r <= numberOfDaysToAdd; r += 1) {
                const d = new Date(lastDayOfMonth);
                const dateToAdd = new Date(d.setDate(d.getDate() + r));
                days.push({
                    date: new Date(dateToAdd),
                    outOfMonth: true
                });
            }
        }
        return days;
    },
    isToday(someDate) {
        const today = new Date();
        return someDate.getDate() === today.getDate() &&
            someDate.getMonth() === today.getMonth() &&
            someDate.getFullYear() === today.getFullYear();
    }
} 
