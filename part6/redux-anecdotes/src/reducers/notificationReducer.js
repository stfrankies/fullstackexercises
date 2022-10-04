import { createSlice } from '@reduxjs/toolkit'

const message = "action noted!"

const initialState = message

const notficationSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    onSuccess(state){
      return state.message
    }
  }
})

export const { onSuccess } = notficationSlice.actions
export default notficationSlice.reducer