import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState:[],
  reducers: {
    createAnecdote(state, action){
      const content = action.payload
      state.push(content)
    },
    onVote(state, action){
     const id = action.payload
     const anecdoteToVote = state.find(a => a.id === id)
 
     const votedAnecdote = {
       ...anecdoteToVote, votes: anecdoteToVote.votes + 1
     }
     const updatedState = state.map(anecdote => anecdote.id  !== id? anecdote : votedAnecdote)
     return updatedState.sort((a,b) => b.votes - a.votes)
    },
    setAnecdotes(state, action){
      return action.payload
    }
  }
})

export const { createAnecdote, onVote, setAnecdotes } = anecdoteSlice.actions
export const initializeAnecdotes = () =>{
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}
export default anecdoteSlice.reducer