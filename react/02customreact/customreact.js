
const customRender=(reactElem,mainContainer)=>{
    // const customElem=document.createElement(reactElem.type);
    // customElem.setAttribute('href',reactElem.props.href);
    // customElem.setAttribute('target',reactElem.props.target);
    // customElem.textContent=reactElem.children;
    // mainContainer.appendChild(customElem);

    const customElem=document.createElement(reactElem.type);
    for(const prop in reactElem.props){
        if(prop === 'children'){
            customElem.textContent=reactElem.props[prop];
        }else{
            customElem.setAttribute(prop,reactElem.props[prop]);
        }
    }
    if(reactElem.children){
        customElem.textContent=reactElem.children;
    }
    mainContainer.appendChild(customElem);
}

const reactElem={
    type: 'a',
    props:{
        href:'https://www.google.com/',
        target:'_black',
    },
    children:'Click for visit'
}
const mainContainer=document.getElementById("root");

customRender(reactElem,mainContainer);


