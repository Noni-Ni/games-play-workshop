import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import { create, getAll } from "../../api/comments-api";
import { useGetOneGame } from "../../hooks/useGames";
import { useForm } from "../../hooks/useForm";

import  { useGetAllComments ,useCreateComment} from "../../hooks/useComments";
import { AuthContext } from "../../contexts/authContext";
import { remove } from "../../api/games-api";

const initialValues = {
    comment: ''
}
export default function GameDetails(){

    const {gameId} = useParams();
    const [ comments , dispatch] = useGetAllComments(gameId);
    const navigate = useNavigate()
    const createComment = useCreateComment();
    const [game, setGame] = useGetOneGame(gameId);
    const { isAuthenticated ,_id, email } = useContext(AuthContext)
    

    const { changeHandler, submitHandler, values } = useForm(initialValues, async( { comment }) => {

           try {
             const response = await createComment(gameId, comment);
             
             //setComments(oldComments => [ ...oldComments, response])
             dispatch({type: 'ADD_COMMENT', payload: {...response, author: { email }}})

           } catch (error) {
             console.log(error.message);
           }
        
    })

    const gameDeleteHandler = async() => {
        const isConfimed = confirm('Are you sure you want to delete this game ?');
        if(! isConfimed){
            return;
        }
        try {
            await remove(gameId);
            navigate('/')
        } catch (error) {
            console.log(error.message);
        }
        
    }

    

    return(
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">

                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} />
                    <h1>{game.title}</h1>
                    <span className="levels">MaxLevel: {game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>

                <p className="text">
                    {game.summary}
                </p>

                {/*<!-- Bonus ( for Guests and Users ) -->*/}
                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {/*<!-- list all comments for current game (If any) -->*/}

                        {

                         
                        
                        (  comments.map( comment => 
                            <li className="comment" key={comment._id} >
                            <p>{comment.author.email}: {comment.text}</p>
                        </li>)
                        ) 
                         
                        }
                        { comments.length === 0 && <p className="no-comment">No comments.</p>}
                        
                    </ul>
                    {/*<!-- Display paragraph: If there are no games in the database -->*/}
                    
                </div>

                {/*<!-- Edit/Delete buttons ( Only for creator of this game )  -->*/}
                { _id === game._ownerId ? <div className="buttons">
                    <Link to={`/games/${gameId}/edit`} className="button">Edit</Link>
                    <a href="#" onClick={gameDeleteHandler}  className="button">Delete</a>
                </div> : '' }
            </div>

            {/*<!-- Bonus -->*/}
            {/*<!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->*/}
            { isAuthenticated && (<article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" onSubmit={submitHandler}>
                    <textarea 
                        name="comment" 
                        placeholder="Comment......"
                        onChange={changeHandler}
                        value={values.comment}
                    ></textarea>
                    <input className="btn submit" type="submit" value="Add Comment"/>
                </form>
            </article>)}

        </section>
    )
}