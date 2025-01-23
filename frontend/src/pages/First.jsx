import { FcManager } from "react-icons/fc";
import { useState } from "react";
import image from  "../assets/image.png"
import download from "../assets/new.png"
import {useNavigate} from  "react-router-dom";
import React from "react";
function First()
{  const navigate =useNavigate();
    const handle=(role)=>{
     navigate("/login",{ state:{role} });
    }
    const next =()=>{
        navigate("/signup");
      }
      
    return(
        <>
        <div className="mx-auto space-y-3 p-6 sm:p-2">
  {/* Signup Button */}
  <button 
    onClick={next} 
    className="text-white absolute top-0 right-0 mr-1 mt-4 font-bold bg-blue-700 rounded-lg p-2 sm:p-3">
    Signup
  </button>

  {/* Login Heading */}
  <h1 className="text-4xl sm:text-6xl md:text-7xl mx-auto w-fit text-center">Login</h1>

  <hr className="my-4" />

  {/* Select User Type Heading */}
  <h1 className="text-2xl sm:text-3xl md:text-4xl mx-auto w-fit text-center text-red-600">
    Select User Type
  </h1>

  {/* User Type Options */}
  <div className="lg:flex lg:space-x-24 lg:justify-center ml-24 lg:ml-0 sm:flex-wrap sm:space-x-4 space-y-8 sm:space-y-0 mt-8">
    {/* Manager Button */}
    <p className="text-center">
      <button 
        onClick={() => handle("Manager")} 
        className="hover:shadow-2xl flex flex-col items-center">
        <FcManager className="w-32 h-32 sm:w-48 sm:h-48 lg:w-60 lg:h-60" />
        <h1 className="text-lg sm:text-xl lg:text-2xl mt-2">Manager</h1>
      </button>
    </p>

    {/* Pantry Staff Button */}
    <p className="text-center">
      <button 
        onClick={() => handle("Pantry Staff")} 
        className="hover:shadow-2xl flex flex-col items-center">
        <img 
          src={image} 
          alt="Pantry Staff" 
          className="w-32 h-32 sm:w-48 sm:h-48 lg:w-60 lg:h-60" 
        />
        <h1 className="text-lg sm:text-xl lg:text-2xl mt-2">Pantry Staff</h1>
      </button>
    </p>

    {/* Delivery Personnel Button */}
    <p className="text-center">
      <button 
        onClick={() => handle("Delivery Personnel")} 
        className="hover:shadow-2xl flex flex-col items-center">
        <img 
          src={download} 
          alt="Delivery Personnel" 
          className="w-32 h-32 sm:w-48 sm:h-48 lg:w-60 lg:h-60 bg-white" 
        />
        <h1 className="text-lg sm:text-xl lg:text-2xl mt-2">Delivery Personnel</h1>
      </button>
    </p>
  </div>
</div>

        </>
    )
}
export default First