import React, { createContext, ReactNode, useContext, useState } from 'react'
import { ColorsSet } from '../constants/colorset'

type modalType = {
    currentModal: string
    prev?: string
}

type AppContextType = {
    getColor: (colorId: string, text?: boolean) => string;
    getDateMillis: (date: Date) => number
    openModal: (modalType: string) => void
    modalState: modalType
    closeModal: () => void
    setSelectedColor: (colorId: string) => void
    selectedColor: string
    setSelectedIcon: (iconId: string) => void
    selectedIcon: string
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [modalState, setModalState] = useState<modalType>({currentModal: ''})
    const [selectedColor, setSelectedColor] = useState<string>('')
    const [selectedIcon, setSelectedIcon] = useState<string>('')

    const getColor = (colorId: string, text?: boolean) => {
        const colorObj = ColorsSet.find((c) => c.id === colorId);
        if(text) {
            return colorObj ? colorObj.blackColor ? '#000000' : colorObj.color  : '#000000'
        }
        
        return colorObj ? colorObj.color : '#000000'; // default to black if not found
    }

    const getDateMillis = (date: Date) => {
        const d = new Date(date)    // copy, so the original isn't changed
        d.setHours(0, 0, 0, 0)
        return d.getTime()
    }

    const openModal = (modalType: string) => {
        setModalState((c) => ({currentModal: modalType, prev: modalState.currentModal ?? undefined}))
    }

    const closeModal = () => {
        setModalState((s) => ({ currentModal: s.prev ?? '', prev: undefined }))
    }    

    return (
        <AppContext.Provider value={{
            getColor,
            getDateMillis,
            modalState,
            openModal,
            closeModal,
            setSelectedColor,
            selectedColor,
            setSelectedIcon,
            selectedIcon,
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useApp = () => {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error('useApp must be used within an AppProvider')
    }
    return context
}
