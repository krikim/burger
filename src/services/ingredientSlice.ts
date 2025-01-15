import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TBun = {
  type: string,
  name: string,
  image: string,
  price: string,
  id: string,
  key?:string
}
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
  })

// Action creators are generated for each case reducer function
export const {  setIngredients, setTab } = ingredientSlice.actions

export default ingredientSlice.reducer