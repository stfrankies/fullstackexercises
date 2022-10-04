import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { onVote } from '../reducers/anecdoteReducer'


const AnecdoteList = () =>{

const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    const voteAnecdote = (id) => {
        console.log('vote', id)
        dispatch(onVote(id))
    }

    const anecdoteForSort = [...anecdotes]
    const sortAnecdotes = anecdoteForSort.sort((a, b) => b.votes - a.votes)

    return (
    <div>
        <h2>Anecdotes List</h2>
        {sortAnecdotes.map(anecdote =>
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