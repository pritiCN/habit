import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { Label } from '../types/label';
import { Labels } from '../constants/labelset';
import { loadLabels, saveLabels } from '../storage/labelStorage';

const initialLabels: Label[] = Labels

type labelContextType = {
    labels: Label[];
    searchLabels: (query: string) => Label[];
    addLabels: (label: Label) => void
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
    }, []);

    useEffect(() => {
        if(isloaded) {
            saveLabels(labels);
        }
    }, [isloaded, labels])

    const searchLabels = (query: string) => {
        const q = query.trim().toLowerCase();
        return labels.filter((label) => label.name.toLowerCase().includes(q))
    }

    const addLabels = (label: Label) => {
        setLabels((prev) => [...prev, label])
    }
    
    return(
        <LabelContext.Provider value={{
            labels,
            searchLabels,
            addLabels
        }}>
            {children}
        </LabelContext.Provider>
    )
}



export function useLabel() {
  const context = useContext(LabelContext);
  if (context === undefined) {
    throw new Error('useLabel must be used within a LabelProvider');
  }
  return context;
}