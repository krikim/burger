import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TBun } from './constrSlice'


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
        prepare: (items:TBun) => ({payload: {...items,key: 'currentpay'+items._id}}),
    },
},
  })

export const {  setIngredient, } = currentIngredientSlice.actions

export default currentIngredientSlice.reducer

export type TcurrentIngridientActions = ReturnType<typeof currentIngredientSlice.actions[keyof typeof currentIngredientSlice.actions]>;