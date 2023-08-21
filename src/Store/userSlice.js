import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user:null,
  supportRoom:{},
  notifications: {
    isNew: false,
    data: [],
    totalDocs: 0,
  },
 
 
}

export const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    
    userSignin: (state, action) => {
      state.user= action.payload;
      
     
    },
    userSignout: (state) => {
        state.user= null;
    },
    storeSupportRoom: ( state, action ) => {
      const room= action.payload;

      state.supportRoom= {...state.supportRoom,[room]: room };
    },
    setNotification: ( state, action ) => {
      state.notifications.isNew= true;
      state.notifications.data= action.payload.docs;
      state.notifications.totalDocs=action.payload.totalDocs;
    },
    readNotification: ( state ) => {
      state.notifications.isNew= false;

    }
    
  },
})

// Action creators are generated for each case reducer function
export const { userSignin, userSignout, storeSupportRoom, setNotification, readNotification } = userSlice.actions

export default userSlice.reducer