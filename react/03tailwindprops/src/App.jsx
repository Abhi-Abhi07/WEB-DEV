import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/Card'

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
   <div className='bg-green-400 p-2 font-bold text-red-500 rounded-full mb-5'>Tailwind test</div>
   <div className='flex gap-5'>
    <Card username='Aire'/>
    <Card username='ree'/>
   </div>
    </>
  )
}

export default App
