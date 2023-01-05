import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState:[],
  reducers: {
    onVote(state, action){
     const anecdoteId = action.payload;
     return state.map(anecdote => anecdote.id === anecdoteId ? {...anecdote, votes: anecdote.votes + 1} : anecdote)
    },
    
    appendAnecdote(state, action){
      const content = action.payload
      state.push(content)
    },
    
    setAnecdotes(state, action){
      return action.payload.sort((a,b) => b.votes - a.votes)
    }
  }
})

export const { appendAnecdote, onVote, setAnecdotes } = anecdoteSlice.actions
export const initializeAnecdotes = () =>{
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content =>{
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const updateVote = (anecdote) =>{
  return async dispatch =>{
    const res = await anecdoteService.updateItem(anecdote)
    dispatch(onVote(res.id))
  }  
}

export default anecdoteSlice.reducer