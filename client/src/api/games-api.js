import { del, get, post } from "./requester"

const BASE_URL = 'http://localhost:3030/data/games'

export const getAll = async() => {
   const result = await get( BASE_URL );

   const games = Object.values(result);

   return games;
}

export const getOne = async (gameId) => {
    const response = await get(`${BASE_URL}/${gameId}`)
    return response;
    
}

export const create = async (gameData) => {
    const response = await post(`${BASE_URL}`, gameData)
    return response;
    
}

export const remove = async (gameId) => {
    await del(`${BASE_URL}/${gameId}`);
    
}

