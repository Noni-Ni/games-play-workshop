import { get, post } from "./requester"

const BASE_URL = 'http://localhost:3030/jsonstore/games'

export const  create = async(gameId, username, text) =>{
    const result = await post(`${BASE_URL}/${gameId}/comments`, {username, text})
    return result;
}

export const getAll = async(gameId) => {
    const result = await get(`${BASE_URL}/${gameId}/comments`);
    const comments = Object.values(result);
    return comments;
}

export default {
    create,
    getAll
}