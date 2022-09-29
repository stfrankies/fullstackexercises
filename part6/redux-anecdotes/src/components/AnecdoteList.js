import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { onVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () =>{

const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const voteAnecdote = (id) => {
        console.log('vote', id)
        dispatch(onVote(id))
    }

    const sortAnecdote = anecdotes.sort((a, b) => b.votes - a.votes)

    return (
    <div>
        <h2>Anecdotes List</h2>
        {sortAnecdote.map(anecdote =>
        <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => voteAnecdote(anecdote.id)}>vote</button>
            </div>
        </div>
    )}
    </div>
    )
}

export default AnecdoteList