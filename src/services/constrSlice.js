import { createSlice, nanoid } from '@reduxjs/toolkit'
import { element } from 'prop-types'

export const constrSlice = createSlice({
  name: 'constr',
  initialState:{
    bun:{},
    elements:[],
    },
  reducers: {
    setBun:{
        reducer: (state, action) => {state.bun = action.payload},
        prepare:(bun) => ({payload: {...bun,key:nanoid()}})
    },
    addItem:{
        reducer: (state, action) => {state.elements.push(action.payload)},
        prepare:(item) => ({payload: {...item,key:nanoid(),inElement:true}})
    },
    removeItem: (state, action) => {
        const index = state.elements.findIndex(item => item.key === action.payload)
        if (index >= 0) {
            state.elements.splice(index, 1)
        }
    },
    moveItem: (state, action) => {
        state.elements.splice(action.payload.to, 0, state.elements.splice(action.payload.from, 1)[0])
        console.log(action.payload.from, action.payload.to, state.elements)
    }
  },
})

// Action creators are generated for each case reducer function
export const { setBun, addItem, removeItem, moveItem } = constrSlice.actions

export default constrSlice.reducer