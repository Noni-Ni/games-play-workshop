import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "../../hooks/useForm"
import { useGetOneGame } from "../../hooks/useGames";
import { update } from "../../api/games-api";



export default function GameEdit() {
    const { gameId } = useParams();
    const [game, setGame] = useGetOneGame(gameId);
    
    const navigate = useNavigate();
    const {
        changeHandler,
        submitHandler,
        values
    } = useForm(game, async (values) => {
        try {
            const isConfimed = confirm('Are you sure you want to update this game ?');
            if (isConfimed) {
                const updatedGame = await update(gameId, values);
                navigate(`/games/${gameId}/details`);
            }

        } catch (err) {
            console.log(err.message)
        }
    }, true)
    return (
        <section id="edit-page" className="auth">
            <form id="edit" onSubmit={submitHandler} >
                <div className="container">

                    <h1>Edit Game</h1>
                    <label htmlFor="leg-title">Legendary title:</label>
                    <input type="text" id="title" name="title" value={values.title} onChange={changeHandler} />

                    <label htmlFor="category">Category:</label>
                    <input type="text" id="category" name="category" value={values.category} onChange={changeHandler} />

                    <label htmlFor="levels">MaxLevel:</label>
                    <input type="number" id="maxLevel" name="maxLevel" min="1" value={values.maxLevel} onChange={changeHandler} />

                    <label htmlFor="game-img">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" value={values.imageUrl} onChange={changeHandler} />

                    <label htmlFor="summary">Summary:</label>
                    <textarea name="summary" id="summary" value={values.summary} onChange={changeHandler} ></textarea>
                    <input className="btn submit" type="submit" value="Edit Game" />

                </div>
            </form>
        </section>
    )
}