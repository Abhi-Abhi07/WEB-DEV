import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'

import App from './App.jsx'

function MyApp(){
    return(
        <div>
            paani pee lo !
        </div>
    )
}

const reactElem={
    type: 'a',
    props:{
        href:'https://www.google.com/',
        target:'_black',
    },
    children:'Click for visit'
}

const anotherReactelem=(
    <a href="https://www.google.com/" target="_black">Click kar do yaar</a>
)

const createCustomReactElem=React.createElement(
    'a',
    {
        href:'https://www.google.com/',
        target:'_black', 
    },
    'Click here for visting google'
)

createRoot(document.getElementById('root')).render(
    // reactElem
    // anotherReactelem
    // createCustomReactElem
//   <StrictMode>
//     <App/>
//   </StrictMode>
)

