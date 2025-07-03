import React, { useContext } from "react";

const TodoContext=React.createContext({
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
    toggleCompeted:(id)=>{},
}
)

export const TodoProvider= TodoContext.Provider;
 export function useTodo(){
    return useContext(TodoContext);
 }