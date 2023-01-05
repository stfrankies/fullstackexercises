import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateVote, initializeAnecdotes } from '../reducers/anecdoteReducer'
import { setNotifiction } from '../reducers/notificationReducer'


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

    useEffect(() =>{
        dispatch(initializeAnecdotes());
    }, [dispatch])
    const filter = useSelector(state => state.anecdotefilter.value)

    const voteAnecdote = (anecdote) => {
        dispatch(updateVote(anecdote))
        dispatch(setNotifiction(`You voted ${anecdote.content}`, 5))
    }

    let anecdoteClone = [...anecdotes]
    
    const anecdoteFilter = filter ? anecdoteClone.filter( anecdote => anecdote.content.includes(filter)) : anecdoteClone
    const sortAnecdote = anecdoteFilter.sort((a,b) => b.votes - a.votes)
    
    return (
        <div>
            <h2>Anecdotes List</h2>
            <div>
                {sortAnecdote.map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote} handleVote={() => voteAnecdote(anecdote)}/>)}            
            </div>
        </div>
    )
}

export default AnecdoteList