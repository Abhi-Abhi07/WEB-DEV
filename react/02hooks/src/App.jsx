import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React from 'react'
import './App.css'

function App() {
  // let counter=10;
  let [counter, setCounter]=React.useState(10);
  const increaseCounter=()=>{
    // console.log("clicked : ",Math.random());
    // counter+=1;
    // console.log(counter);  
    
    // console.log("clicked : ",Math.random());
    if(counter>=99){
      alert(`Now Counter reach maximum value so You can't Increase !`)
    }else{
    //   counter=counter+1;
    //   setCounter(counter);
      // console.log(counter);

    //   interview question on counter
    // setCounter(counter+1);
    // setCounter(counter+1);
    // setCounter(counter+1);
    // setCounter(counter+1);
    // output only one increament because react send similar types of work in bunches
    
    // how achive this
    // setCounter((preCounter)=>{return preCounter+1});
    // setCounter((preCounter)=>{return preCounter+1});
    // setCounter((preCounter)=>{return preCounter+1});
    // setCounter((preCounter)=>{return preCounter+1});

    // you can write this in simply
    setCounter(counter=> counter+1);
    setCounter(counter=> counter+1);
    setCounter(preCounter=> preCounter+1);
    setCounter(preCounter=> preCounter+1);

    }
  }

  const decreseCounter=()=>{
    // console.log("clicked : ",Math.random());
    if(counter<=0){
      alert(`Now Counter is 0. You can't decrease !`)
    }else{
      counter=counter-1;
      setCounter(counter);
      // console.log(counter);
    }
  }

  return (
    <>
      <h1>Now let's start counting : {counter}</h1>
      <>
      <button onClick={increaseCounter}>Count ↑ : {counter}</button>
      <p></p>
      <button onClick={decreseCounter}>Count ↓ : {counter}</button>
      </>
    </>
  )
}

export default App
