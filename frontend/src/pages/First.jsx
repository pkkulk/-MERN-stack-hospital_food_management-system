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
        <><div className="mx-auto  space-y-3 p-9 sm:p-1">
            <button  onClick={next} className="text-white absolute top-0 right-0 mr-10 mt-10 font-bold bg-blue-700 rounded-lg p-3 ml-28 mx-auto">
                signup 
              </button>
        <h1 className="text-7xl mx-auto w-40 "> Login </h1>

        <hr></hr>
        <h1 className="text-4xl mx-auto w-96 pl-20 text-red-600"> Select User Type </h1>

        <div className="lg:flex lg:space-x-20 lg:ml-36 sm:flex-row sm:ml-8">
  {/* Your content goes here */}
        <p ><button onClick={() => handle("Manager")} className=" hover:shadow-2xl " >
            <FcManager size={270} />
            <h1 className="mx-auto text-2xl w-28">Manager</h1>
             </button>
        </p>
        <p className=" "><button onClick={() => handle("Pantry Staff")} className=" mx-auto  hover:shadow-2xl">
            <img src={image}  className="h-60 mx-auto"/> 
            <h1 className="mx-auto text-2xl w-28 p-3 text-center sm:ml-28">Pantry Staff</h1> 
            </button>
        </p>
        <p ><button onClick={() => handle("Delivery Personnel")} className=" hover:shadow-2xl">
            <img src={download}  className="h-60 bg-white"/>
            <h1 className="mx-auto text-2xl w-28 p-2 text-center">Delivery Personnel</h1> 
            </button>
        </p>
        </div>
        
        </div>
        
        </>
    )
}
export default First