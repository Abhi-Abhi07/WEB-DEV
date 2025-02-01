import { useContext, createContext } from "react";

export const TodoContext=createContext({
    todos:[
        {
            id:1,
            todo:"todoMsg",
            completed:false,
        },
    ],
    addTodo:(todo)=>{},
    updateTodo:(id,todo)=>{},
    deleteTodo:(id)=>{},
    toggleComplete:(id)=>{},
})

export const TodoProvider=TodoContext.Provider

export function useTodo() {
    return useContext(TodoContext);
}