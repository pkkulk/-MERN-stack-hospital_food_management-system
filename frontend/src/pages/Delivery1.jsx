import React, { Suspense, useEffect, useState } from "react";

function Delivery1(){
const [data,setData]=useState([]);
const[filter,setFilter]=useState("");
const[filtered,setFiltered]=useState([]);
useEffect(()=>{
const fet= async ()=>{
      try{
            const response=await fetch("http://localhost:5000/api/Track/delivery-data");
               const d=await response.json();
               setData(d);
               setFiltered(d);
      }catch(error)
      { console.log("unable to load",error)
      alert("unable to load")
      }
  };
fet();
},[])
 const handleFilterChange=(event)=>{
    const value=event.target.value;
    setFilter(value);
    if(value === "available"){
     setFiltered(data.filter((item)=>item.availability == true));
    }
     else if(value === "not available")
      {
        setFiltered(data.filter((item)=>item.availability == false));
     }
     else{
        setFiltered(data);
     }

 }
    return(
       <>
       <h1 className="font-medium text-2xl">Delivery Dashboard</h1>
     <div className="w-4/5 mx-auto "><div className="flex">
     <h1 className="text-xl p-3">choose according to:</h1>
     <select
          value={filter}
          onChange={handleFilterChange}
          className="border border-blue-300 ml-8 p-2 rounded mb-4 mx-auto w-64"
        >
          <option value="">Both</option>
          <option value="available">Available</option>
          <option value="not available">Not Available</option>
        </select>

     </div>
     <table className="w-4/5 text-center border-2 border-blue-300">
        <thead className="bg-blue-300">
            <tr>
                <th>Staff_id</th>
                <th>Naame</th>
                <th>Contact</th>
                <th>availability</th>
            </tr>
        </thead>
        <tbody className="border-2 border-blue-300"> {filtered.map((d)=>(
            <tr className="border-2 border-blue-300" key={d._id}>
                <td className="p-2 border-2 border-blue-300">{d.delivery_id}</td>
                <td className="p-2 border-2 border-blue-300">{d.name}</td>       
                <td className="p-2 border-2 border-blue-300">{d.contact}</td>
                <td className="p-2 border-2 border-blue-300">{d.availability ? "available" :"Not available" }</td>
               
           
           
            </tr>
            ))}
        </tbody>

      </table>
        
        </div> 
       </> 
    )
}
export default Delivery1;