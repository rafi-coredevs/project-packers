import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeChat: null
 
 
}

export const supportSlice = createSlice({
  name: 'support',
  initialState,
  reducers: {
    
    storeActiveChat: (state, action) => {
      state.activeChat= action.payload;
     
    },
    
    
  },
})

// Action creators are generated for each case reducer function
export const { storeActiveChat } = supportSlice.actions

export default supportSlice.reducer