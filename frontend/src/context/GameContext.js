import { createContext, useState, useContext } from 'react';

export const GameContext = createContext();
export const useGameContext = () => useContext(GameContext);

export default function GameProvider(props) {
    const [game, setGame] = useState({});

    return (
        <GameContext.Provider value={{ game, setGame }}>
            {props.children}
        </GameContext.Provider>
    );
}
