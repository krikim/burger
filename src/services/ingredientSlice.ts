import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TBun } from './constrSlice'

type TIstate = {
  ingredients: Array<TBun>,
  currentTab: string
}

export const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState:{
    ingredients:[],
    currentTab: 'first'
    } as TIstate,
  reducers: {
    setIngredients:(state:TIstate, action:PayloadAction<Array<TBun>>) => {
      state.ingredients=action.payload
    },
    setTab: (state:TIstate, action:PayloadAction<string>) => {
        state.currentTab = action.payload
        
    },
    
},
selectors: {
  getIngredients : (state:TIstate) => state.ingredients,
},
  })

// Action creators are generated for each case reducer function
export const {  setIngredients, setTab } = ingredientSlice.actions
export const { getIngredients } = ingredientSlice.selectors

export default ingredientSlice.reducer