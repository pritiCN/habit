import React, { createContext, ReactNode, useContext, useState } from 'react'
import { ColorsSet } from '../constants/colorset'

type modalType = {
    currentModal: string
    prev?: string
}

type AppContextType = {
    getColor: (colorId: string) => string
    getDateMillis: (date: Date) => number
    openModal: (modalType: string) => void
    modalState: modalType
    closeModal: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [modalState, setModalState] = useState<modalType>({currentModal: ''})

    const getColor = (colorId: string) => {
        const colorCode = ColorsSet.find((c) => c.id === colorId)

        return colorCode ? colorCode.color : '#000'
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
