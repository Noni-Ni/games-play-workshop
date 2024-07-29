import { get, post } from "./requester"

const BASE_URL = 'http://localhost:3030/data/comments'

export const  create = async(gameId, text) =>{
    const result = await post(`${BASE_URL}`, {gameId, text})
    return result;
}

export const getAll = async(gameId) => {

    const params = new URLSearchParams({
        where: `gameId="${gameId}"`
    })
    const result = await get(`${BASE_URL}?${params.toString()}`);
    
    return result;
}

export default {
    create,
    getAll
}