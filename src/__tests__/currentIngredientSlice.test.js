import { currentIngredientSlice, setIngredient } from "../services/currentIngredientSlice";


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
describe('todos currentIngredientSlice', () => {
  it('should return the initial state', () => {
    expect(currentIngredientSlice.reducer(undefined, {})).toEqual(
      {
        ingredient:{}
        
      }
    )
  })
  it('setIngredient', () => {
    expect(
      currentIngredientSlice.reducer(undefined,
        {
          type: "current/setIngredient",
          payload: bun
        }
      )
    ).toEqual({ ingredient: bun })
  
})
})