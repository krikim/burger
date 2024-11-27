import { createSlice, nanoid } from '@reduxjs/toolkit'

export const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState:{
    ingredients:[],
    },
  currentTab: 'first',
  reducers: {
    setIngredients:{
        reducer: (state, action) => {state.ingredients=action.payload},
       // prepare: (items) => ({payload: [...items, items.forEach((...item)=>({counter: 0}))]}),
    },
    setTab: (state, action) => {
        state.currentTab = action.payload
        
    },
    
},
  })

// Action creators are generated for each case reducer function
export const {  setIngredients, setTab } = ingredientSlice.actions

export default ingredientSlice.reducer