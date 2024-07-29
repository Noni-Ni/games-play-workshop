import { useEffect, useReducer } from "react";
import { create, getAll } from "../api/comments-api";

export  function useCreateComment(){
    const commentCreateHandler = async (gameId, comment) => {
        const result = await create(gameId, comment)
        return result;
         
     }
 
     return commentCreateHandler
}

function commentReducer( state, action ){
     switch (action.type) {
        case 'GET_ALL':
            return action.payload.slice();
        case 'ADD_COMMENT':
            return [...state, action.payload];
            
     
        default:
            return state;
           
     }
    return state;
}

export function useGetAllComments(gameId){
    const [comments, dispatch ]  = useReducer(commentReducer, []);

    useEffect(()=>{
        (async()=> {
           const result = await getAll(gameId);
           dispatch({type: 'GET_ALL', payload: result});
        })()
    },[ gameId ])

    return [ comments, dispatch ]
}