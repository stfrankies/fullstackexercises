import { useSelector, useDispatch } from 'react-redux'
import { onVote } from '../reducers/anecdoteReducer'
import { onNotifed, onClear } from '../reducers/notificationReducer'


const Anecdote = ({ anecdote, handleVote})=>{

    return(
    <div>
        <div>
            {anecdote.content}
        </div>
        <div>
            has {anecdote.votes}
            <button onClick={handleVote}>vote</button>
        </div>
    </div>
    )
}

const AnecdoteList = () =>{

    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)

    const filter = useSelector(state => state.anecdotefilter.value)

    const voteAnecdote = (id, content) => {
        console.log('vote', id)
        dispatch(onNotifed(`You voted ${content}`))
        dispatch(onVote(id))
        setTimeout(()=> dispatch(onClear()), 5000)
    }

    let anecdoteClone = [...anecdotes]
    
    const anecdoteFilter = filter ? anecdoteClone.filter( anecdote => anecdote.content.includes(filter)) : anecdotes
    
    return (
        <div>
            <h2>Anecdotes List</h2>
            <div>
                {anecdoteFilter.map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote} handleVote={() => voteAnecdote(anecdote.id, anecdote.content)}/>)}            
            </div>
        </div>
    )
}

export default AnecdoteList