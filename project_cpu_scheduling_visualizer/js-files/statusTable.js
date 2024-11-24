const addRowInStatusTable=(()=>{
    let trElem=document.createElement("tr");
    trElem.innerHTML=`  <td>${1}</td>
                        <td>${rowValue}</td>
                        <td>    
                            <div class="status-bar">
                                <div class="status-bar--progress"></div>
                            </div>
                        </td>
                        <td>${0}</td>
                        <td>${0}</td>`;
                        statusTableBody.appendChild(trElem);
})

const deleteRowInStatusTable=(()=>{
    if (statusTableBody.lastElementChild) {
        statusTableBody.removeChild(statusTableBody.lastElementChild);
    }
})
