import { iState, userSlice } from "../services/userSlice"

const initialState = iState;
describe('userSlice test',()=>{
    it('should be initial', ()=>{
        expect(
            userSlice.reducer(undefined,iState)
            ).toEqual(
            initialState
        );
    })
    it('setUser', ()=>{
        expect(
            userSlice.reducer(undefined,
                {
                    type:'user/setUser',
                    payload:{
                        name: 'Andrew',
                        email: 'andrew@example.com',
                        password: '123'
                    }
                }
            )
            ).toEqual(
            {...iState,
                user:{
                    name: 'Andrew',
                    email: 'andrew@example.com',
                    password: '123'
                }
        }
        );
    })
    it('setAuth', ()=>{
        expect(
            userSlice.reducer(undefined,
                {
                    type:'user/setAuth',
                    payload:true
                    
                }
            )
            ).toEqual(
            {...iState,
            isAuthChecked: true
        }
        );
    })
    it('setForgotPass', ()=>{
        expect(
            userSlice.reducer(undefined,
                {
                    type:'user/setForgotPass',
                    payload: true
                    
                }
            )
            ).toEqual(
            {...iState,
                forgotPass: true
        }
        );
    })
})