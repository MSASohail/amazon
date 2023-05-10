import React from "react";
import {  createBrowserRouter,
  createRoutesFromElements,Outlet,Route,  RouterProvider,ScrollRestoration} from "react-router-dom";
import Header from "./Components/header/Header";

import Footer from "./Components/footer/Footer";

import Home from "./Pages/Home";
import { productsData } from "./Api/api";
import Signin from "./Pages/Signin";
import Cart from "./Pages/Cart";
import Registration from "./Pages/Registration";

const Layout=()=>{
 return(
  <div>
    <Header/>
    <ScrollRestoration/>
    <Outlet/>
    <Footer/>
  </div>
 )
}

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route>
    <Route path="/" element={<Layout/>}>
      <Route index element={<Home/>} loader={productsData}></Route>
      <Route path="/cart" element={<Cart/>} ></Route>
    </Route>
      <Route path="/signin" element={<Signin/>} ></Route>
      <Route path="/registration" element={<Registration/>} ></Route>
    </Route>
  ))
  return (
    <div className="font-bodyFont bg-gray-100">
  <RouterProvider router={router}>
    
  </RouterProvider>
    </div>
  );
}
export default App;










