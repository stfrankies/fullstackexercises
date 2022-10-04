import { createSlice } from '@reduxjs/toolkit'


const initialState = { message: ""}

const notficationSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    onNotifed(state, action){
       const message = action.payload
       state.message += message
       console.log(message)
    },
    onClear(){
      return initialState
    }
  }
})

export const { onNotifed, onClear } = notficationSlice.actions
export default notficationSlice.reducer