import {createContext, useContext, useState} from 'react'

export const GameContext = createContext();

export const useGame = useContext(GameContext)

const GameProvider = ({children}) => {
    const [currentGame, setCurrentGame] = useState('')
    const [getAllGames, setAllGames] = useState('')
    const [loadGames, setLoadGames] = useState('')
}