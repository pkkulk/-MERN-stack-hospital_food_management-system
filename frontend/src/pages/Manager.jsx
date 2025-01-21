import React, { useEffect, useState } from "react";
import { RxDashboard } from "react-icons/rx";
import d from "../assets/download.png";
import d2 from "../assets/d3.png";
import image from "../assets/image.png";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";

const Manager = () => {
  const [tasks, setTasks] = useState([]); // State to store tasks
  const location = useLocation();
  const navigate=useNavigate();
  // Fetch data on component load
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/Track/track"); // Replace with your backend URL
        const data = await response.json();
        setTasks(data); // Update the state with fetched data
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks(); // Call the fetch function
  }, []); // Empty dependency array to run only on component mount

 const handlelogout=()=>{
  localStorage.removeItem("authToken");
  alert("Do you really want to exit")
  navigate("/first");
 }
  // Default dashboard content when the route is "/manager"
  const renderDefaultDashboard = location.pathname === "/manager";

  return (
    <div className="w-screen min-h-screen flex  bg-slate-200 ">
      {/* Sidebar */}
      <div className="w-72 h-screen fixed bg-slate-200">
        <div className="w-64 space-y-4 p-2 h-[calc(100%-30px)] m-3 bg-gradient-to-b from-slate-800 to-slate-700 rounded-3xl">
          <h1 className="mx-auto w-32 text-white font-bold">Manager123</h1>
          <hr />
          {/* Dashboard Link */}

          <Link to="/manager">
            <div className="flex rounded-xl space-x-6 hover:bg-blue-500 p-2 pl-10 mx-auto w-60">
              <RxDashboard size={24} className="text-white" />
              <h1 className="text-white font-bold">Dashboard</h1>
            </div>
          </Link>
          {/* Patient Link */}
          <Link to="/manager/patient">
            <div className="flex rounded-xl space-x-2 hover:bg-blue-500 p-2 pl-7 mx-auto w-60">
              <img src={d} className="w-14 h-9 bg-transparent" alt="Patient" />
              <h1 className="h-9 pt-2 text-white font-bold">Patient</h1>
            </div>
          </Link>
          {/* Pantry Staff Link */}
          <Link to="/manager/pantry1">
            <div className="flex rounded-xl space-x-2 hover:bg-blue-500 p-2 pl-7 mx-auto w-60">
              <img src={image} className="w-14 h-9 bg-transparent" alt="Pantry Staff" />
              <h1 className="h-9 pt-2 text-white font-bold">Pantry staff</h1>
            </div>
          </Link>
          {/* Delivery Person Link */}
          <Link to="/manager/delivery1">
            <div className="flex rounded-xl space-x-4 hover:bg-blue-500 pt-4 pl-10 mx-auto w-60">
              <img src={d2} className="w-9 h-9 bg-transparent" alt="Delivery Person" />
              <h1 className="text-white font-bold">Delivery person</h1>
            </div>
          </Link>
          <div onClick={handlelogout} className=" cursor-pointer flex rounded-xl space-x-4 hover:bg-blue-500 p-2 pl-10 mx-auto w-60">
          <IoIosLogOut className=" w-9 h-9 text-white" /> <h1 className="text-white font-bold">Logout</h1>
            </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="ml-72 flex-grow p-6  bg-slate-100">
        {renderDefaultDashboard ? (
          <>
            <h1 className="font-medium mt-4 text-2xl">Dashboard</h1>
            <div className="flex space-x-4">
              <div className="bg-white py-4 px-3 text-center w-60 mt-4 font-bold rounded-lg border-2 border-slate-400">
                <h1>Active patients</h1>
                +9
              </div>
              <div className="bg-white py-4 px-3 text-center w-60 mt-4 font-bold rounded-lg border-2 border-slate-400">
                <h1>Active patients</h1>
                +9
              </div>
              <div className="bg-white py-4 px-3 text-center w-60 mt-4 font-bold rounded-lg border-2 border-slate-400">
                <h1>Active patients</h1>
                +9
              </div>
              <div className="bg-white py-4 px-3 text-center w-60 mt-4 font-bold rounded-lg border-2 border-slate-400">
                <h1>Active patients</h1>
                +9
              </div>
            </div>
            <hr /><div className="flex">
            <h1 className="text-xl font-medium m-4">Manager Task List</h1> 
                                                                            </div>
            
            <hr />
            <div className="bg-white border-2 border-slate-400 p-2 rounded-lg">
              <table
                border="1"
                cellPadding="10"
                className="border-2 w-full border-blue-300"
              >
                <thead className="border-2 w-full bg-blue-200 border-blue-300">
                  <tr className="border-2 w-full text-center border-blue-300">
                    <th className="border-2 border-blue-300">Task ID</th>
                    <th className="border-2 border-blue-300">Die Chart ID</th>
                    <th className="border-2 border-blue-300">Staff ID</th>
                    <th className="border-2 border-blue-300">Delivery ID</th>
                    <th className="border-2 border-blue-300">Status</th>
                  </tr>
                </thead>
                <tbody className="border-2 w-full border-blue-300">
                  {tasks.map((task) => (
                    <tr
                      className="border-2 w-full text-center border-blue-300"
                      key={task._id}
                    >
                      <td className="border-2 border-blue-300">{task.task_id}</td>
                      <td className="border-2 border-blue-300">{task.die_chart_id}</td>
                      <td className="border-2 border-blue-300">{task.staff_id}</td>
                      <td className="border-2 border-blue-300">{task.delivery_id}</td>
                      <td className="border-2 border-blue-300">{task.status}</td>
                   
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <Outlet /> // Render child routes if not on the root /manager
        )}
      </div>
    </div>
  );
};

export default Manager;
