import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { loadHabits, saveHabits } from "../storage/habitStorage";
import { getTodayMillis } from "../utils/date";
import { Habit } from "../types/habit";
import { Habits } from "../constants/habit";
import { ColorsSet } from "../constants/colorset";
import { loadLabels, saveLabels } from "../storage/labelStorage";
import { Label } from "../types/label";
import { Labels } from "../constants/labelset";

const initialHabits: Habit[] = Habits;

type HabitsContextType = {
    habits: Habit[];
    addHabit: (habit: Habit) => void;
    updateHabit: (habit: Habit) => void;
    deleteHabit: (id: string) => void;
    toggleToday: (id: string) => void;
    getColor: (colorId: string, text?: boolean) => string;
    currentHabit: Habit | undefined
    setCurrentHabit: (habit:Habit | undefined) => void
    toMilliSec: (date: string) => number
    milliSecToSring: (date: number) => string
    to12Hour: (time: string) => { hour: string; minute: string; period: string }
    // labels (single source of truth, persisted to storage)
    labels: Label[]
    searchLabels: (query: string) => Label[]
    addLabel: (label: Label) => void
    updateLabel: (label: Label) => void
    deleteLabel: (id: string) => void
}

const HabitsContext = createContext<HabitsContextType | undefined>(undefined)

export function HabitsProvider({ children }: { children: ReactNode }) {
    const [habits, setHabits] = useState<Habit[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentHabit, setCurrentHabit] = useState<Habit | undefined>(undefined)
    const [labels, setLabels] = useState<Label[]>([])
    const [isLabelsLoaded, setIsLabelsLoaded] = useState(false)

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

    useEffect(() => {
        (async ()=> {
            try {
                const stored = await loadLabels()
                setLabels(stored ?? Labels)                
            } catch (error) {
                console.warn('Failed to load labels', error)
                setLabels(Labels)
            } finally {
                setIsLabelsLoaded(true)
            }
        })()
    }, [])

    useEffect(() => {
        if (isLabelsLoaded) {
            saveLabels(labels)
        }
    }, [labels, isLabelsLoaded])

    const searchLabels = (query: string) => {
        const q = query.trim().toLowerCase();
        return labels.filter((label) => label.name.toLowerCase().includes(q))
    }

    const addLabel = (label: Label) => {
        setLabels((prev) => [...prev, label])
    }

    const updateLabel = (updated: Label) => {
        setLabels((prev) => prev.map((l) => (l.id === updated.id ? updated : l)))
    }

    const deleteLabel = (id: string) => {
        setLabels((prev) => prev.filter((l) => l.id !== id))
    }

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
        const today = getTodayMillis();
        
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

    const getColor = (colorId: string, text?: boolean) => {
        const colorObj = ColorsSet.find((c) => c.id === colorId);
        if(text) {
            return colorObj ? colorObj.blackColor ? '#000000' : colorObj.color  : '#000000'
        }
        
        return colorObj ? colorObj.color : '#000000'; // default to black if not found
    }

    const toMilliSec = (date: string) => {
        const [year, month, day] = date.split('-').map(Number)
        return new Date(year, month - 1, day).getTime()
    }

    const milliSecToSring = (date: number) => {
        const d = new Date(date)
        const year = d.getFullYear()
        const month = String(d.getMonth() + 1).padStart(2, '0')
        const day = String(d.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }

    const to12Hour = (time: string) => {
        const [h, m] = time.split(':').map(Number);
        
        return {
            hour: String(h % 12 || 12).padStart(2, '0'),
            minute: String(m).padStart(2, '0'),
            period: h >= 12  ? 'PM' : 'AM'
        }
    }
    
    return (
        <HabitsContext.Provider value={{
            habits, 
            addHabit, 
            updateHabit, 
            deleteHabit,
            toggleToday,
            getColor,
            currentHabit,
            setCurrentHabit,
            toMilliSec,
            milliSecToSring,
            to12Hour,
            labels,
            searchLabels,
            addLabel,
            updateLabel,
            deleteLabel
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