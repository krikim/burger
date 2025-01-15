import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'

type TBun = {
  type: string,
  name: string,
  image: string,
  price: number,
  id: string,
  key?:string,
}

type TIstate = {
  ingredient: TBun|{},  // Текущий ингредиент
}

export const currentIngredientSlice = createSlice({
  name: 'current',
  initialState:{
    ingredient:{},
    }as TIstate,
  reducers: {
    setIngredient:{
        reducer: (state:TIstate, action:PayloadAction<TBun>) => void(state.ingredient = action.payload),
        prepare: (items) => ({payload: {...items,key: nanoid()}}),
    },
},
  })

export const {  setIngredient, } = currentIngredientSlice.actions

export default currentIngredientSlice.reducer