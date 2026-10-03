import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { loadHabits, saveHabits } from "../storage/habitStorage";
import { getTodayString } from "../utils/date";
import { Habit, Habits } from "../constants/habit";
import { ColorsSet } from "../constants/colorset";

const initialHabits: Habit[] = Habits;

type HabitsContextType = {
    habits: Habit[];
    addHabit: (habit: Habit) => void;
    updateHabit: (habit: Habit) => void;
    deleteHabit: (id: string) => void;
    toggleToday: (id: string) => void;
    getColor: (colorId: string) => string;
}

const HabitsContext = createContext<HabitsContextType | undefined>(undefined)

export function HabitsProvider({ children }: { children: ReactNode }) {
    const [habits, setHabits] = useState<Habit[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        (async ()=> {
            const stored = await loadHabits();
            setHabits(stored ?? initialHabits)
            setIsLoaded(true);
        })();
    },[]);

    useEffect(() => {
        if(isLoaded) {
            saveHabits(habits)
        }
    }, [habits, isLoaded])

    const addHabit = (habit: Habit) => {
        setHabits((prev) => [...prev, habit])
    }

    const updateHabit = (updated: Habit) => {
        setHabits((prev) => prev.map((h) => (h.id === updated.id ? updated : h)));
    }

    const deleteHabit = (habitId: string) => {
        setHabits((prev) => prev.filter((h) => h.id !== habitId))
    }

    const toggleToday = (habitId: string) => {
        const today = getTodayString();
        setHabits((prev) => 
            prev.map((habit) => {
                if(habit.id !== habitId) return habit;
                const alreadyDone = habit?.completedDates.includes(today)
                const updatedDates = alreadyDone 
                ? habit?.completedDates.filter((date) => date != today)
                : [...habit?.completedDates, today]
                return {... habit, completedDates: updatedDates};
            })
        )
    }

    const getColor = (colorId: string) => {
        const colorObj = ColorsSet.find((c) => c.id === colorId);
        return colorObj ? colorObj.color : '#000000'; // default to black if not found
    }
    
    return (
        <HabitsContext.Provider value={{
            habits, 
            addHabit, 
            updateHabit, 
            deleteHabit,
            toggleToday,
            getColor
        }}>
            {children}
        </HabitsContext.Provider>
    )
}

export function useHabits() {
  const context = useContext(HabitsContext);
  if (context === undefined) {
    throw new Error('useHabits must be used within a HabitsProvider');
  }
  return context;
}