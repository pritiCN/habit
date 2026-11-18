import React, { createContext, ReactNode, useContext } from 'react'
import { ColorsSet } from '../constants/colorset'

type AppContextType = {
    getColor: (colorId: string)=>string
    getDateMillis: (date: Date) => number
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider = ({ children }: { children: ReactNode }) => {

    const getColor = (colorId: string) => {
        const colorCode = ColorsSet.find((c) => c.id === colorId)

        return colorCode ? colorCode.color : '#000'
    }

    const getDateMillis = (date: Date) => {
        const d = new Date(date)    // copy, so the original isn't changed
        d.setHours(0, 0, 0, 0)
        return d.getTime()
    }

    return (
        <AppContext.Provider value={{
            getColor,
            getDateMillis
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
