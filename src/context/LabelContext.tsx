import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { LabelType } from '../types/label';
import { useHabits } from './HabitsContext';
import { loadLabels, saveLabels } from '../storage/labelStorage';
import { Labelset } from '../constants/labelset';

const initialLabel: LabelType[] = Labelset
// UI state for the label picker only (selection + editing).
// Label data, loading and saving live in HabitsContext.
type LabelContextType = {
    // data (from HabitsContext)
    storedLabel: LabelType[];
    currentLabel: LabelType | undefined
    setCurrentLabel: (label: LabelType | undefined) => void
    updateLabel: (updated: LabelType) => void;
    // addLabel: (label: Label) => void;
    // updateLabel: (label: Label) => void;
    // deleteLabel: (id: string) => void;

    // // selection
    // selectedIds: string[];
    // setSelectedIds: (ids: string[]) => void;
    // toggleLabel: (id: string) => void;

    // // editing
    // editingLabel: Label | null;
    // startEditing: (id: string) => void;
    // clearEditingLabel: () => void;
}

const LabelContext = createContext<LabelContextType | undefined>(undefined);

export function LabelProvider({children}: {children: ReactNode}) {
    const [storedLabel, setStoredLabel] = useState<LabelType[]>([])
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentLabel, setCurrentLabel] = useState<LabelType | undefined>(undefined)
    // const { labels, searchLabels, addLabel, updateLabel, deleteLabel: removeLabel } = useHabits()
    // const [selectedIds, setSelectedIds] = useState<string[]>([])
    // const [editingLabel, setEditingLabel] = useState<Label | null>(null)

    useEffect(() => {
        (async () => {
            const stored = await loadLabels()
            setStoredLabel(stored ?? initialLabel)
            setIsLoaded(true);
        })();
    }, [])

    useEffect(() => {
        saveLabels(storedLabel)
    }, [storedLabel, isLoaded])

    const updateLabel = (updated: LabelType) => {
        setStoredLabel((prev) => prev.map((l) => (l.id === updated.id) ? updated : l))
    }

    // // Also clear the deleted label from the picker's UI state
    // const deleteLabel = (id: string) => {
    //     removeLabel(id)
    //     setSelectedIds((prev) => prev.filter((x) => x !== id))
    //     setEditingLabel((prev) => (prev?.id === id ? null : prev))
    // }

    // const toggleLabel = (id: string) => {
    //     setSelectedIds((prev) =>
    //         prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    //     )
    // }

    // const startEditing = (id: string) => {
    //     setEditingLabel(labels.find((l) => l.id === id) ?? null)
    // }

    // const clearEditingLabel = () => setEditingLabel(null)

    return (
        <LabelContext.Provider value={{
            storedLabel,
            currentLabel,
            setCurrentLabel,
            updateLabel
            // addLabel,
            // updateLabel,
            // deleteLabel,
            // selectedIds,
            // setSelectedIds,
            // toggleLabel,
            // editingLabel,
            // startEditing,
            // clearEditingLabel
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
