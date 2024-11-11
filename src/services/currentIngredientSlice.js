import { createSlice, nanoid } from '@reduxjs/toolkit'

export const currentIngredientSlice = createSlice({
  name: 'current',
  initialState:{
    ingredient:{},
    },
  reducers: {
    setIngredient:{
        reducer: (state, action) => void(state.ingredient = action.payload),
        prepare: (items) => ({payload: {...items,key: nanoid()}}),
    },
},
  })

// Action creators are generated for each case reducer function
export const {  setIngredient, } = currentIngredientSlice.actions

export default currentIngredientSlice.reducer