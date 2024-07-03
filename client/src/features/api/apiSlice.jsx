import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import baseUrl from '../../helper/baseUrl'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    tagTypes: ['Todos'],
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => '/todo',
            providesTags: ['Todos']
        }),
        addTodo: builder.mutation({
            query: (todo) => ({
                url: '/todo',
                method: 'POST',
                body: todo
            }),
            invalidatesTags: ['Todos']
        }),
        // updateTodo: builder.mutation({
        //     query: (todo) => ({
        //         url: `/todos/${todo.id}`,
        //         method: 'PATCH',
        //         body: todo
        //     }),
        //     invalidatesTags: ['Todos']
        // }),
        // deleteTodo: builder.mutation({
        //     query: ({ id }) => ({
        //         url: `/todos/${id}`,
        //         method: 'DELETE',
        //         body: id
        //     }),
        //     invalidatesTags: ['Todos']
        // }),
    })
})

export const {useGetTodosQuery, useAddTodoMutation} = apiSlice