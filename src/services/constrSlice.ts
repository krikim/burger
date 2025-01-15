import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'

export type TBun = {
       _id: string;
       name: string;
       type?: string;
       proteins?: number;
       fat?: number;
       carbohydrates?: number;
       calories?: number;
       price: number;
       image: string;
       image_mobile?: string;
       image_large?: string;
       __v?: number;
       inElement?: boolean|null;
       key?: string;
      id: string;
}

export type TIstate = {
  bun:TBun;
  elements: Array<TBun>;
}

const iState:TIstate = {
  bun:{
      _id: '____id',
      type:'bun',
      name:'Перетащите сюда вашу булку и ингридиенты!',
      image:'https://code.s3.yandex.net/react/code/bun-02.png',
      price: 0,
      id:'_',
  },
  elements:[],
  }


export const constrSlice = createSlice({
  name: 'constr',
  initialState: iState,
  reducers: {
    setBun:{
        reducer: (state:TIstate, action:PayloadAction<TBun>) => {state.bun = action.payload},
        prepare:(bun:TBun) => ({payload: {...bun,key:nanoid()}})
    },
    addItem:{
        reducer: (state:TIstate, action:PayloadAction<TBun>) => {state.elements.push(action.payload);console.log(state.elements)},
        prepare:(item:TBun) => ({payload: {...item,key:nanoid(),inElement:true}})
    },
    removeItem: (state:TIstate, action:PayloadAction<string|undefined>) => {
        const index = state.elements.findIndex((item:TBun) => item.key === action.payload)
        if (index >= 0) {
            state.elements.splice(index, 1)
        }
    },
    moveItem: (state, action) => {
        state.elements.splice(action.payload.to, 0, state.elements.splice(action.payload.from, 1)[0])
        console.log(action.payload.from, action.payload.to, state.elements)
    }
  },
  selectors:{
    getBun: (state:TIstate) => state.bun,
    getElements: (state:TIstate) => state.elements,
  }
})

export const { setBun, addItem, removeItem, moveItem } = constrSlice.actions
export const {getBun, getElements} = constrSlice.selectors

export default constrSlice.reducer