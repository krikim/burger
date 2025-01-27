import { current } from "@reduxjs/toolkit";
import { ingredientSlice } from "../services/ingredientSlice";


const bun = {
        _id: '123',
       name: 'bun',
       type: 'sauce',
       proteins: 20,
       fat: 30,
       carbohydrates: 40,
       calories: 500,
       price: 2500,
       image: 'dummy',
       image_mobile: 'dummy',
       image_large: 'dummy',
       __v: 123,
       inElement: true,
       key: '12323dsfsfsf2323',
      id: 'defer',
}
describe('todos ingredientSlice', () => {
  it('should return the initial state', () => {
    expect(ingredientSlice.reducer(undefined, {})).toEqual(
      {
        ingredients:[],
        currentTab: 'first'
        
      }
    )
  })
  it('setIngredients', () => {
    expect(
      ingredientSlice.reducer(undefined,
        {
          type: "ingredient/setIngredients",
          payload: [bun]
        }
      )
    ).toEqual({currentTab: 'first', ingredients:[ bun ] })
  
})
it('setTab', () => {
    expect(
      ingredientSlice.reducer(undefined,
        {
          type: "ingredient/setTab",
          payload: 'second'
        }
      )
    ).toEqual({currentTab:'second', ingredients: [] })
  
})
})