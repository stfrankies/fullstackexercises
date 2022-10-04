import { createSlice } from '@reduxjs/toolkit'


const initialState = { value: ""}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    onFiltered(state, action){
       const filter = action.payload
       state.value += filter
       console.log(filter)
    },
  }
})

export const { onFiltered } = filterSlice.actions
export default filterSlice.reducer