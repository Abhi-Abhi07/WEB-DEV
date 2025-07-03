const addRowInProcessTable=(()=>{
    if(selectedValue==="Priority" || selectedValue==="P-Priority"){
        let trElem=document.createElement("tr");
        trElem.innerHTML=`  <td contentEditable="true">${1}</td>
                            <td>${rowValue}</td>
                            <td contenteditable="true">${0}</td>
                            <td contenteditable="true">${0}</td>
                            <td>${"---"}</td>
                            <td>${"---"}</td>
                            <td>${"---"}</td>`;
        processTableBody.appendChild(trElem);
    }else{
        let trElem=document.createElement("tr");
        trElem.innerHTML=`  <td>${1}</td>
        <td>${rowValue}</td>
        <td contenteditable="true">${0}</td>
        <td contenteditable="true">${0}</td>
        <td>${"---"}</td>
        <td>${"---"}</td>
        <td>${"---"}</td>`;
        processTableBody.appendChild(trElem);
    }
    // rowValue+=1;
});

// Validate Editable Cells
processTableBody.addEventListener("input", (event) => {
    const target = event.target;

    if (target.isContentEditable) {
        const value = target.textContent.trim();
        if (isNaN(value) || value < 0) {
            target.style.backgroundColor = "red"; // Highlight invalid input
        } else {
            target.style.backgroundColor = "white"; // Reset background for valid input
        }
    }
});

const deleteRowInProcessTable=(()=>{
    if (processTableBody.lastElementChild) {
        processTableBody.removeChild(processTableBody.lastElementChild);
        // rowValue -= 1;
    }
})

const fillRandomData=(()=>{
    // console.log(processTableBody.childNodes[1].childNodes[5].textContent);
    if(selectedValue==="Priority" || selectedValue==="P-Priority"){
        for(let row=1; row<=rowValue; row++){
            let randomValue=~~(Math.random()*10+1);
            processTableBody.childNodes[row].childNodes[1].textContent=`${randomValue}`;
        }
    }
    for(let row=1; row<=rowValue; row++){
        for(let col=5; col<=7; col+=2){
            // console.log(processTableBody.childNodes[row].childNodes[col].textContent);
            let randomValue=~~(Math.random()*10+1);
            processTableBody.childNodes[row].childNodes[col].textContent=`${randomValue}`;
            
        }
    }
})

