import { useCallback, useEffect, useRef, useState } from 'react'

function App() {    
    let [length, setLength]=useState(8);
    let [password,setPassword]=useState("");
    let [numberAllow, setNumberAllow]=useState(false);
    let [charAllow,setCharAllow]=useState(false);

    // useRef hook
    const passwordRef=useRef(null);

    // password Generator method
    const passwordGenerator=useCallback(()=>{
        let pass="";
        let str="ABCDEFGHIJKLMNOPQRSTUVWXZabcdefghijklmnopqrstuvwxyz";
        if(numberAllow) str+="0123456789";
        if(charAllow) str+="!@#$%^&*(){}[]";
        for (let i = 0; i < length; i++) {
            const charIndex=Math.floor(Math.random()*str.length);
            pass+=str.charAt(charIndex);
        }
        setPassword(pass);
    },[length,numberAllow,charAllow,setPassword]);

    // copy to clipboard
    const copyPasswordToClipBoard=useCallback(()=>{
        passwordRef.current?.select();
        // passwordRef.current?.setSelectionRange(0,8);
        window.navigator.clipboard.writeText(password);
    },[password])

    // useEffect hook
    useEffect(()=>{
        passwordGenerator();
    },[length,numberAllow,charAllow,passwordGenerator])

  return (
    <>
        <div className="w-full max-w-lg mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">
            <h1 className='text-white text-center my-3'>Password Generator</h1>
            <div className="flex shadow rounded-lg overflow-hidden mb-4">
                <input 
                type="text"
                value={password}
                className="outline-none w-full py-1  px-3"
                placeholder="Password"
                readOnly
                ref={passwordRef}
                />
                <button 
                onClick={copyPasswordToClipBoard}
                className='bg-blue-700 text-white px-3 pb-1 outline-none shrink-0'
                >copy</button>
            </div>
            <div className='flex text-sm gap-x-1'>
                <div className='flex items-center gap-x-1'>
                    <input 
                    type="range" 
                    min={6}
                    max={100}
                    value={length}
                    className='cursor-pointer'
                    onChange={(e)=>{setLength(e.target.value)}}
                    />
                    <label htmlFor="">
                        Length: {length}
                    </label>
                </div>
                <div className='flex items-center gap-x-1'>
                    <input 
                    type="checkbox" 
                    name="numberInput" 
                    id="numberInput"
                    defaultChecked={numberAllow}
                    onChange={()=>{
                        setNumberAllow((prevNumberAllow)=>!prevNumberAllow);
                    }}
                    />
                    <label htmlFor="">
                        Numbers
                    </label>
                </div>
                <div className='flex items-center gap-x-1'>
                    <input 
                    type="checkbox" 
                    name="charInput" 
                    id="charInput" 
                    defaultChecked={charAllow}
                    onChange={()=>{
                        setCharAllow((prevCharAllow)=>!prevCharAllow);
                    }}
                    />
                    <label htmlFor="">
                        Special Characters
                    </label>
                </div>
            </div>
        </div>
    </>
  )
}

export default App
