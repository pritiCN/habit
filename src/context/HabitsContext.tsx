import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { loadHabits, saveHabits } from "../storage/habitStorage";
import { getTodayMillis } from "../utils/date";
import { HabitType } from "../types/habit";
import { HabitsSet } from "../constants/habitSet";
import { ColorsSet } from "../constants/colorset";
// import { Label } from "../types/label";
// import { Labels } from "../constants/labelset";
import { useApp } from "./appContext";

const initialHabits: HabitType[] = HabitsSet;

type HabitsContextType = {
    storedHabits: HabitType[];
    completeToday: (id: string) => void;
    isDoneCurrentHabit: (date: Date, completedDate: number[]) => boolean
    currentHabit: HabitType | undefined
    setCurrentHabit: (habit:HabitType | undefined) => void
    addHabit: (habit: HabitType) => void;
    updateHabit: (habit: HabitType) => void;
    setSelectedIcon: (iconId: string) => void
    selectedIcon: string
    deleteHabit: (id: string) => void;
    // toMilliSec: (date: string) => number
    // milliSecToSring: (date: number) => string
    // to12Hour: (time: string) => { hour: string; minute: string; period: string }
    // // labels (single source of truth, persisted to storage)
    // labels: Label[]
    // searchLabels: (query: string) => Label[]
    // addLabel: (label: Label) => void
    // updateLabel: (label: Label) => void
    // deleteLabel: (id: string) => void
}

const HabitsContext = createContext<HabitsContextType | undefined>(undefined)

export function HabitsProvider({ children }: { children: ReactNode }) {
    const [storedHabits, setStoredHabits] = useState<HabitType[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const {getDateMillis} = useApp()
    const [currentHabit, setCurrentHabit] = useState<HabitType | undefined>(undefined)
    const [selectedIcon, setSelectedIcon] = useState<string>('')
    // const [labels, setLabels] = useState<Label[]>([])
    // const [isLabelsLoaded, setIsLabelsLoaded] = useState(false)

    useEffect(() => {
        (async ()=> {
            const stored = await loadHabits();
            setStoredHabits(stored ?? initialHabits)
            setIsLoaded(true);
        })();
    },[]);

    useEffect(() => {
        if(isLoaded) {
            saveHabits(storedHabits)
        }
    }, [storedHabits, isLoaded])

    const completeToday = (habitId: string) => {
        const today = getDateMillis(new Date());
        setStoredHabits((prev) => 
            prev.map((habit) => {
                if(habit.id !== habitId) return habit

                const dates = habit.completedDates ?? []
                const isDone = dates.includes(today)

                return {
                    ...habit,
                    completedDates: isDone
                        ? dates.filter((d) => d !== today)   // un-complete
                        : [...dates, today],                 // complete
                }
            })
        )
    }

    const isDoneCurrentHabit = (date: Date, completedDate: number[]) => {
        const selectedDate = getDateMillis(date)
        return completedDate.includes(selectedDate) ?? false
    }

    const addHabit = (habit: HabitType) => {
        setStoredHabits((prev) => [...prev, habit])
    }

    const updateHabit = (updated: HabitType) => {
        setStoredHabits((prev) => prev.map((h) => (h.id === updated.id ? updated : h)));
    }

    const deleteHabit = (habitId: string) => {
        setStoredHabits((prev) => prev.filter((h) => h.id !== habitId))
    }

    // useEffect(() => {
    //     if (isLabelsLoaded) {
    //         saveLabels(labels)
    //     }
    // }, [labels, isLabelsLoaded])

    // const searchLabels = (query: string) => {
    //     const q = query.trim().toLowerCase();
    //     return labels.filter((label) => label.name.toLowerCase().includes(q))
    // }

    // const addLabel = (label: Label) => {
    //     setLabels((prev) => [...prev, label])
    // }

    // const updateLabel = (updated: Label) => {
    //     setLabels((prev) => prev.map((l) => (l.id === updated.id ? updated : l)))
    // }

    // const deleteLabel = (id: string) => {
    //     setLabels((prev) => prev.filter((l) => l.id !== id))
    // }

    // const toMilliSec = (date: string) => {
    //     const [year, month, day] = date.split('-').map(Number)
    //     return new Date(year, month - 1, day).getTime()
    // }

    // const milliSecToSring = (date: number) => {
    //     const d = new Date(date)
    //     const year = d.getFullYear()
    //     const month = String(d.getMonth() + 1).padStart(2, '0')
    //     const day = String(d.getDate()).padStart(2, '0')
    //     return `${year}-${month}-${day}`
    // }

    // const to12Hour = (time: string) => {
    //     const [h, m] = time.split(':').map(Number);
        
    //     return {
    //         hour: String(h % 12 || 12).padStart(2, '0'),
    //         minute: String(m).padStart(2, '0'),
    //         period: h >= 12  ? 'PM' : 'AM'
    //     }
    // }
    
    return (
        <HabitsContext.Provider value={{
            storedHabits, 
            completeToday,
            isDoneCurrentHabit,
            currentHabit,
            setCurrentHabit,
            addHabit, 
            updateHabit, 
            setSelectedIcon,
            selectedIcon,
            deleteHabit,
            // toMilliSec,
            // milliSecToSring,
            // to12Hour,
            // labels,
            // searchLabels,
            // addLabel,
            // updateLabel,
            // deleteLabel
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