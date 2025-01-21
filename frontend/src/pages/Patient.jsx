import React, { useState } from "react";
import { useEffect } from "react";
const Patient = () => {
    const[data,setData]=useState([]);

    useEffect(()=>{
        const fetchs = async() => {
            try{
            const response=await fetch("http://localhost:5000/api/Track/patient-data")
                 const datas=await response.json();
                 setData(datas)
            } catch(error){
             console.log("Error fetching tasks:", error);
            }
        };
  fetchs();
    },[]);

  return (
    <div className="p-6 bg-slate-100">
      <h1 className="text-2xl font-bold mb-4">Patient Management</h1>

      {/* Patient Table */}
      <table className="w-full  border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200 sticky top-0">
            <th className="sticky top-0 border p-2">Patient ID</th>
            <th className="sticky top-0 border p-2">Name</th>
            <th className="sticky top-0 border p-2">Room/Bed</th>
            <th className="sticky top-0 border p-2">Allergies</th>
            <th className="border p-2 sticky top-0">Disease</th>
            <th className="border p-2 sticky top-0">Actions</th>
          </tr>
        </thead>
        <tbody>
            {data.map((d) => (
          <tr  className="border-2 w-full text-center border-blue-300"
          key={d._id}>
            <td className="border p-2">{d.patient_id}</td>
            <td className="border p-2">{d.name}</td>
            <td className="border p-2">{d.room_number}</td>
            <td className="border p-2">{d.allergies}</td>
            <td className="border p-2">{d.diseases}</td>
            <td className="border p-2">
              {/* Button to Assign Diet Plan */}
              <button className="bg-blue-500 text-white px-2 py-1 rounded">
                Assign Diet Plan
              </button>
              {/* Button to View Diet Plan */}
              <button className="ml-2 bg-gray-500 text-white px-2 py-1 rounded">
                View Diet Plan
              </button>
            </td>
          </tr>
            ))}
          {/* Add more rows dynamically */}
        </tbody>
      </table>
    </div>
  );
};

export default Patient;
