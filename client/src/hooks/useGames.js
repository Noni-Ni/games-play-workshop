import { useState, useEffect } from "react";

import { getAll, getOne } from "../api/games-api";

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