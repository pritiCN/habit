import React, { createContext, ReactNode, useContext, useState } from 'react'
import { Label } from '../types/label';
import { useHabits } from './HabitsContext';

// UI state for the label picker only (selection + editing).
// Label data, loading and saving live in HabitsContext.
type LabelContextType = {
    // data (from HabitsContext)
    // labels: Label[];
    // searchLabels: (query: string) => Label[];
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
    // const { labels, searchLabels, addLabel, updateLabel, deleteLabel: removeLabel } = useHabits()
    // const [selectedIds, setSelectedIds] = useState<string[]>([])
    // const [editingLabel, setEditingLabel] = useState<Label | null>(null)

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
            // labels,
            // searchLabels,
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
