import React, { Suspense, useEffect, useState } from "react";
import { BASE_URL } from "../config";
function Delivery1(){
const [data,setData]=useState([]);
const[filter,setFilter]=useState("");
const[filtered,setFiltered]=useState([]);
useEffect(()=>{
const fet= async ()=>{
      try{
            const response=await fetch(`${BASE_URL}/api/Track/delivery-data`);
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
       <div className="p-4 bg-slate-100">
  <h1 className="font-medium text-2xl mb-6">Delivery Dashboard</h1>
  
  <div className="w-full lg:w-4/5 mx-auto">
    {/* Filter Section */}
    <div className="flex flex-col lg:flex-row items-center justify-between mb-4">
      <h1 className="text-xl p-3">Choose according to:</h1>
      <select
        value={filter}
        onChange={handleFilterChange}
        className="border border-blue-300 p-2 rounded w-full lg:w-64"
      >
        <option value="">Both</option>
        <option value="available">Available</option>
        <option value="not available">Not Available</option>
      </select>
    </div>
    
    {/* Responsive Table */}
    <div className="overflow-x-auto">
      <table className="w-full text-center border-2 border-blue-300">
        <thead className="bg-blue-300">
          <tr>
            <th className="p-2">Staff ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Contact</th>
            <th className="p-2">Availability</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((d) => (
            <tr className="border-2 border-blue-300" key={d._id}>
              <td className="p-2">{d.delivery_id}</td>
              <td className="p-2">{d.name}</td>
              <td className="p-2">{d.contact}</td>
              <td className="p-2">
                {d.availability ? "Available" : "Not Available"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

       </> 
    )
}
export default Delivery1;