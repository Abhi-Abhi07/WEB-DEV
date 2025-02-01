import React, { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './Contexts'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'


function App() {

  const [todos, setTodos]=useState([]);

  const addTodo=(todo)=>{
    setTodos((preTodo)=>([{id:Date.now(),...todo},...preTodo]))
  }

  const updateTodo=(id,todo)=>{ 
    setTodos((preTodo)=>(preTodo.map((todoElem)=>(todoElem.id===id ? todo : todoElem))))
  }

  const deleteTodo=(id)=>{
    setTodos((preTodo)=>(preTodo.filter((todoElem)=>(todoElem.id!==id))))
  }

  const toggleComplete=(id)=>{
    setTodos((preTodo)=>(
      preTodo.map((todoElem)=>(
        todoElem.id===id ? {...todoElem,completed: !todoElem.completed} : todoElem
      ))
    ))
  }

  useEffect(()=>{
    const todos=JSON.parse(localStorage.getItem("todos"));
    if(todos && todos.length > 0){
      setTodos(todos);
    }
  },[])

  useEffect(()=>{
      localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])

  return (
    <TodoProvider value={{addTodo,updateTodo,deleteTodo,toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
          <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
              <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
              <div className="mb-4">
                  {/* Todo form goes here */} 
                  <TodoForm/>
              </div>
              <div className="flex flex-wrap gap-y-3">
                  {/*Loop and Add TodoItem here */}
                  {
                    todos.map((todo)=>(
                      <div key={todo.id} className='w-full'>
                        <TodoItem todo={todo}></TodoItem>
                      </div>
                    ))
                  }
              </div>
          </div>
      </div>
    </TodoProvider>
  )
}

export default App
