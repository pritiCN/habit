import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { Label } from '../types/label';
import { Labels } from '../constants/labelset';
import { loadLabels, saveLabels } from '../storage/labelStorage';

type LabelContextType = {
    // data
    labels: Label[];
    searchLabels: (query: string) => Label[];
    addLabel: (label: Label) => void;
    updateLabel: (label: Label) => void;
    deleteLabel: (id: string) => void;

    // selection
    selectedIds: string[];
    setSelectedIds: (ids: string[]) => void;
    toggleLabel: (id: string) => void;

    // editing
    editingLabel: Label | null;
    startEditing: (id: string) => void;
    clearEditingLabel: () => void;
}

const LabelContext = createContext<LabelContextType | undefined>(undefined);

export function LabelProvider({children}: {children: ReactNode}) {
    const [labels, setLabels] = useState<Label[]>([])
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>([])
    const [editingLabel, setEditingLabel] = useState<Label | null>(null)

    useEffect(() => {
        (async () => {
            try {
                const stored = await loadLabels();
                setLabels(stored ?? Labels)
            } catch (e) {
                console.warn('Failed to load labels', e)
                setLabels(Labels)
            } finally {
                setIsLoaded(true)
            }
        })()
    }, []);

    useEffect(() => {
        if (isLoaded) {
            saveLabels(labels);
        }
    }, [isLoaded, labels])

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
        setSelectedIds((prev) => prev.filter((x) => x !== id))
        setEditingLabel((prev) => (prev?.id === id ? null : prev))
    }

    const toggleLabel = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        )
    }

    const startEditing = (id: string) => {
        setEditingLabel(labels.find((l) => l.id === id) ?? null)
    }

    const clearEditingLabel = () => setEditingLabel(null)

    return (
        <LabelContext.Provider value={{
            labels,
            searchLabels,
            addLabel,
            updateLabel,
            deleteLabel,
            selectedIds,
            setSelectedIds,
            toggleLabel,
            editingLabel,
            startEditing,
            clearEditingLabel
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
