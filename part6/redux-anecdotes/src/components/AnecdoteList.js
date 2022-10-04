import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { onVote } from '../reducers/anecdoteReducer'
import { onNotifed, onClear } from '../reducers/notificationReducer'


const AnecdoteList = () =>{

const anecdotes = useSelector(state => state.anecdotes)

    const dispatch = useDispatch()

    const voteAnecdote = (id, content) => {
        console.log('vote', id)
        dispatch(onNotifed(`You voted ${content}`))
        dispatch(onVote(id))
        setTimeout(()=> dispatch(onClear()), 5000)
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
                <button onClick={() => voteAnecdote(anecdote.id, anecdote.content)}>vote</button>
            </div>
        </div>
    )}
    </div>
    )
}

export default AnecdoteList