import { useState, useEffect } from "react";

import { create, getAll, getOne } from "../api/games-api";

export function useGetAllGames(){

    const [games, setGames] = useState([]);

    useEffect(() => {
        getAll()
        .then(result => setGames(result));
    }, [])

    return [
        games,
        setGames
    ]
}

export function useGetOneGame(gameId){

    const [game, setGame] = useState({});

    useEffect(() => {
         getOne(gameId)
        .then(result => setGame(result));
    }, [gameId])

    return [
        game,
        setGame
    ]
}

export function useCreateGame(){
    const gameCreateHandler = async (gameData) => {
       const result = await create(gameData)
       return result;
        
    }

    return gameCreateHandler
}