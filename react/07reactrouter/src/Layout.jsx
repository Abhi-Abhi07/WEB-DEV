import React from "react";
import Header from "./Components/Header/Header.jsx";
import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer/Footer";

function Layout(){
    return (
        <>
        <Header/>
        <Outlet/>
        <Footer/>
    </>
    )
}

export default Layout;