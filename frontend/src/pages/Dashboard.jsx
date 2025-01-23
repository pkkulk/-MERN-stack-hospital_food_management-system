import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config";
import { RxDashboard } from "react-icons/rx";
import d from "../assets/download.png"
import d2 from "../assets/d3.png"
import image from  "../assets/image.png"
const Manager = () => {
  const [tasks, setTasks] = useState([]); // State to store tasks

  // Fetch data on component load
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/Track/track`); // Replace with your backend URL
        const data = await response.json();
        setTasks(data); // Update the state with fetched data
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks(); // Call the fetch function
  }, []); // Empty dependency array to run only on component mount

  return (
   
      <div>
        <h1 className="font-medium mt-4 text-2xl">Dashboard</h1>
        <div className="flex space-x-4">
          <div className="bg-white py-4 px-3 text-center w-60 mt-4 font-bold rounded-lg border-2 border-slate-400"><h1>Active patients</h1>+9</div>
          <div className="bg-white py-4 px-3 text-center w-60 mt-4 font-bold rounded-lg border-2 border-slate-400"><h1>Active patients</h1>+9</div>
          <div className="bg-white py-4 px-3 text-center w-60 mt-4 font-bold rounded-lg border-2 border-slate-400"><h1>Active patients</h1>+9</div>
          <div className="bg-white py-4 px-3 text-center w-60 mt-4 font-bold rounded-lg border-2 border-slate-400"><h1>Active patients</h1>+9</div>
         
        </div>
         <hr />
        <h1 className="text-xl font-medium m-4">Manager Task List</h1>
        <hr></hr>
        <div className="bg-white border-2 border-slate-400 p-2 rounded-lg ">
      <table border="1" cellPadding="10" className="border-2 w-full  border-blue-300">
        <thead className="border-2 w-full bg-blue-200 border-blue-300">
          <tr className="border-2 w-full text-center border-blue-300">
            <th className="border-2 border-blue-300">Task ID</th>
            <th className="border-2 border-blue-300">Die Chart ID</th>
            <th className="border-2 border-blue-300">Staff ID</th>
            <th className="border-2 border-blue-300">Delivery ID</th>
            <th className="border-2 border-blue-300">Status</th>
            <th className="border-2 border-blue-300">Prepared At</th>
            <th className="border-2 border-blue-300">Delivered At</th>
          </tr>
        </thead>
        <tbody className="border-2 w-full  border-blue-300">
          {tasks.map((task) => (
            <tr className="border-2 w-full text-center border-blue-300" key={task._id}>
              <td className="border-2 border-blue-300">{task.task_id}</td>
              <td className="border-2 border-blue-300">{task.die_chart_id}</td>
              <td className="border-2 border-blue-300">{task.staff_id}</td>
              <td className="border-2 border-blue-300">{task.delivery_id}</td>
              <td className="border-2 border-blue-300">{task.status}</td>
              <td className="border-2 border-blue-300">{task.prapred_at ? new Date(task.prapred_at).toLocaleString() : "N/A"}</td>
              <td className="border-2 border-blue-300">{task.delivered_at ? new Date(task.delivered_at).toLocaleString() : "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
   </div>
  );
};

export default Manager;
