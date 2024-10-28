const waitforme=((millisec)=>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve();
        },millisec);
    })
})


