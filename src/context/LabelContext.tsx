import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { Label, Labels } from '../constants/labelset';
import { Habit } from '../constants/habit';
import { loadLabels } from '../storage/labelStorage';

const initialLabels: Label[] = Labels

type labelContextType = {
    labels: Label[];
    searchLabels: (query: string) => Label[]
}

const LabelContext = createContext<labelContextType | undefined>(undefined);

export function LabelProvider({children}: {children: ReactNode}) {
    const [labels, setLabels] = useState<Label[]>([])
    const [isloaded, setIsloaded] = useState(false);
    

    useEffect(() => {
        (async ()=> {
            const stored = await loadLabels();
            setLabels(stored ?? initialLabels)
            setIsloaded(true)
        })()
    }, [])

    const searchLabels = (query: string) => {
        const q = query.trim().toLowerCase();
        return labels.filter((label) => label.name.toLowerCase().includes(q))
    }

    return(
        <LabelContext.Provider value={{
            labels,
            searchLabels
        }}>
            {children}
        </LabelContext.Provider>
    )
}



export function useLabel() {
  const context = useContext(LabelContext);
  if (context === undefined) {
    throw new Error('useHabits must be used within a HabitsProvider');
  }
  return context;
}