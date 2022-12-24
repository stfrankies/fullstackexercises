import { createSlice } from '@reduxjs/toolkit'


const initialState = { message: ""}

const notficationSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    onNotifed(state, action){
       const message = action.payload
       state.message = message
    },
  }
})

export const { onNotifed } = notficationSlice.actions

var controlVar = null;

export const setNotifiction = (message, time) =>{
  return async (dispatch) =>{
    dispatch(onNotifed(message));

    if(controlVar ){
      clearTimeout(controlVar) 
    }
    controlVar = setTimeout(()=> dispatch(onNotifed()), time * 1000)
  }
}

export default notficationSlice.reducer