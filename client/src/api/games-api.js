import { del, get, post, put } from "./requester"

const BASE_URL = 'http://localhost:3030/data/games'

export const getAll = async() => {
   const result = await get( BASE_URL );

   const games = Object.values(result);

   return games;
}

export const getLatest = async() => {

    const urlSearchParams = new URLSearchParams({
        sortBy: `_createdOn desc`,
        pageSize: 3
    })
    //const result = await get(`${BASE_URL}?${urlSearchParams.toString()}`);
    const result = await get(`http://localhost:3030/data/games?sortBy=_createdOn%20desc&pageSize=3`);
    

    //http://localhost:3030/data/games?sortBy=_createdOn+desc&pageSize=3
    
 
    return result;
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

export const update = async (gameId , gameData) => {
    await put(`${BASE_URL}/${gameId}`, gameData)
    
}

