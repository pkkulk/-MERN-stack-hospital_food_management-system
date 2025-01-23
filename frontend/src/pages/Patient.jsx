import React, { useState } from "react";
import { useEffect } from "react";
import { BASE_URL } from "../config";
const Patient = () => {
    const[data,setData]=useState([]);

    useEffect(()=>{
        const fetchs = async() => {
            try{
            const response=await fetch(`${BASE_URL}/api/Track/patient-data`)
                 const datas=await response.json();
                 setData(datas)
            } catch(error){
             console.log("Error fetching tasks:", error);
            }
        };
  fetchs();
    },[]);

  return (
    <div className="lg:p-6 bg-slate-100 sm:w-10 lg:w-full">
  <h1 className="text-2xl font-bold mb-4">Patient Management</h1>

  {/* Patient Table */}
  <div className="overflow-x-auto">
    <table className="w-full border-collapse border border-gray-300 min-w-[600px]">
      <thead>
        <tr className="bg-gray-200">
          <th className="border lg:p-2 p-1 text-left">Patient ID</th>
          <th className="border p-2 text-left">Name</th>
          <th className="border p-2 text-left">Room/Bed</th>
          <th className="border p-2 text-left">Allergies</th>
          <th className="border p-2 text-left">Disease</th>
        </tr>
      </thead>
      <tbody>
        {data.map((d) => (
          <tr
            className="border w-full text-left border-blue-300 hover:bg-blue-50"
            key={d._id}
          >
            <td className="border p-2">{d.patient_id}</td>
            <td className="border p-2">{d.name}</td>
            <td className="border p-2">{d.room_number}</td>
            <td className="border p-2">{d.allergies}</td>
            <td className="border p-2">{d.diseases}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default Patient;
