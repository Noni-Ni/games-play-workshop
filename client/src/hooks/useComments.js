import { useEffect, useState } from "react";
import { create, getAll } from "../api/comments-api";

export  function useCreateComment(){
    const commentCreateHandler = async (gameId, comment) => {
        const result = await create(gameId, comment)
        return result;
         
     }
 
     return commentCreateHandler
}

export function useGetAllComments(gameId){
    const [comments, setComments]  = useState([]);

    useEffect(()=>{
        (async()=> {
           const result = await getAll(gameId);
           setComments(result);
        })()
    },[ gameId ])

    return [ comments, setComments ]
}