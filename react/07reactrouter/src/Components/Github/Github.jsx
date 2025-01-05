import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

// function GitHub(){
//     const [data, setData]=useState([])
//     useEffect(()=>{
//         fetch("https://api.github.com/users/hiteshchoudhary")
//         .then((res)=>res.json())
//         .then((data)=>setData(data))
//     },[])
//     return (
//         <div className='text-center bg-gray-600 text-white text-3xl p-4 m-4'>Github followers : {data.followers}
//         <img className="mx-auto mt-4" src={data.avatar_url} alt="pic" width={300}/>
//         </div>
//     )
// }

function GitHub(){
    const data=useLoaderData()
    return (
        <div className='text-center bg-gray-600 text-white text-3xl p-4 m-4'>Github followers : {data.followers}
        <img className="mx-auto mt-4" src={data.avatar_url} alt="pic" width={300}/>
        </div>
    )
}

export default GitHub

export const githubInfoLoader=async()=>{
    const res=await fetch("https://api.github.com/users/hiteshchoudhary")
    return res.json();
}

