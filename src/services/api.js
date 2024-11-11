import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Эндпоинт
// POST https://norma.nomoreparties.space/api/orders

// Тело запроса
//{ 
//    "ingredients": ["609646e4dc916e00276b286e","609646e4dc916e00276b2870"]
//}
// {
//     "name": "Краторный метеоритный бургер",
//     "order": {
//         "number": 6257
//     },
//     "success": true
//   }


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
        })
       
    })
})

export const { useGetIngredientsQuery, useAddOrderQuery } = burgerApi;