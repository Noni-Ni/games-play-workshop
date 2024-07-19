import { get } from "./requester"

const BASE_URL = 'http://localhost:3030/jsonstore/games'

export const getAll = async() => {
   const result = await get( BASE_URL );

   const games = Object.values(result);

   return games;
}

export const getOne = async (gameId) => {
    const response = await get(`${BASE_URL}/${gameId}`)
    return response;
    
}