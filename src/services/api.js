import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BURGER_API_URL = 'https://norma.nomoreparties.space/api' 
const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  };
  
  export const refreshToken = () => {
    return fetch(`${BURGER_API_URL}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    })
    .then(checkResponse)
    .then((refreshData) => {
      if (!refreshData.success) {
          return Promise.reject(refreshData);
        }
      localStorage.setItem("refreshToken", refreshData.refreshToken); 
      localStorage.setItem("accessToken", refreshData.accessToken);
      return refreshData;
    });
  };
  
  export const fetchWithRefresh = async (url, options) => {
    try {
      const res = await fetch(url, options);
      return await checkResponse(res);
    } catch (err) {
      if (err.message === "jwt expired") {
        const refreshData = await refreshToken(); //обновляем токен
        options.headers.authorization = refreshData.accessToken;
        const res = await fetch(url, options); //повторяем запрос
        return await checkResponse(res);
      } else {
        return Promise.reject(err);
      }
    }
  };

export const getUser = async () =>{
  try{
  return await fetchWithRefresh(`${BURGER_API_URL}/auth/user`, {
    method:'GET',
    headers: {
      'Authorization': `${localStorage.getItem("accessToken")}`,
      'Content-Type': 'application/json'
    },
  })
  }catch(error){
    throw error;
      
}
}

export const updateUser = async ({email,pass,name}) =>{
  try{
  return await fetchWithRefresh(`${BURGER_API_URL}/auth/user`, {
    method: "PATCH",
    headers: {
      'Authorization': `${localStorage.getItem("accessToken")}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({'email':email,'name':name,'password':pass})
  })
  }catch(error){
    throw error;
      
}
}

export const signIn = async ({email, password}) => {
  try{
  return await fetch(`${BURGER_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({'email':email,'password':password})
  })
  }catch(error){
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    throw error;
      
}
}
export const signOut = async () => {
  try{
    const res= await fetch(`${BURGER_API_URL}/auth/logout`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({token: localStorage.getItem('refreshToken')})
  })
  return await checkResponse(res);

  }catch(error){
    throw error;
      
}
}

export const register = async ({email, password,name}) => {
  try{
  return await fetch(`${BURGER_API_URL}/auth/register`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({'email':email,'password':password,'name':name})
  })
  }catch(error){
    throw error;
      
}
}
export const forgot = async ({email}) => {
  try{
  const res= await fetch(`${BURGER_API_URL}/password-reset`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({'email':email})
  })
  return await checkResponse(res);
  }catch(error){
    throw error;
      
}
}

export const reset = async ({pass,token}) => {
  try{
  const res= await fetch(`${BURGER_API_URL}/password-reset/reset`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({'password':pass,'token':token})
  })
  return await checkResponse(res);
  }catch(error){
    throw error;
      
}
}

export const burgerApi = createApi({
    reducerPath: "burgerApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://norma.nomoreparties.space/api/"
    }),
    endpoints: (builder) => ({
        getIngredients: builder.query({
            query: () => "ingredients"
        }),
        addOrder: builder.query({
            query: (order) => ({
                url: "orders",
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                //body: JSON.stringify({"ingredients": order})
                body: '{\"ingredients\": '+order+'}'
            })
            }),
              })   
})


export const { useGetIngredientsQuery, useAddOrderQuery } = burgerApi;