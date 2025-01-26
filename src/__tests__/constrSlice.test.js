import { constrSlice, iState } from "../services/constrSlice";


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
const bun2 = {
    _id: '231',
   name: 'bun',
   type: 'brad',
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
   key: '12323dsfsfsf2324',
  id: 'defer',
}

const newState = {...iState,elements:[bun,bun2]}

describe('constrSlice', () => {
  it('should return the initial state', () => {
    expect(constrSlice.reducer(undefined, iState)).toEqual(iState)
  })
  it('setBun', () => {
    expect(
      constrSlice.reducer(undefined,
        {
          type: "constr/setBun",
          payload: bun
        }
      )
    ).toEqual({...iState,bun:bun  })
  
})
it('addItem', () => {
    expect(
      constrSlice.reducer(undefined,
        {
          type: "constr/addItem",
          payload: bun
        }
      )
    ).toEqual({...iState,elements:[bun] })
  
})
it('removeItem', () => {
    expect(
      constrSlice.reducer(newState,
        {
          type: "constr/removeItem",
          payload: bun.key 
        }
      )
    ).toEqual({...iState,elements:[bun2] })
  
})
it('moveItem', () => {
    expect(
      constrSlice.reducer(newState,
        {
          type: "constr/moveItem",
          payload: {to:1,from:0} 
        }
      )
    ).toEqual({...iState,elements:[bun2,bun] })
  
})

})