
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import supportSlice from './supportSlice';

const persistConfig = {
    key: 'root',
    storage,
  }
  const rootReducer = combineReducers({ 
    userInfo: userSlice,
    support: supportSlice,
    
  })

const persistedReducer = persistReducer(persistConfig, rootReducer)
  
export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
  });


  export const persistor = persistStore(store)
