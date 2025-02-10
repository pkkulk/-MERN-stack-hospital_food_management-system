import React, { useEffect, useState } from "react";
import { RxDashboard } from "react-icons/rx";
import d from "../assets/download.png";
import d2 from "../assets/d3.png";
import image from "../assets/image.png";
import { BASE_URL } from "../config";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { FiAlignJustify } from "react-icons/fi";


const Manager = () => {
  const [tasks, setTasks] = useState([]); // State to store tasks
  const[a2,setA]=useState(null);
  const [show,setShow]=useState(false);
  const location = useLocation();
  const navigate=useNavigate();
  // Fetch data on component load
  const fetchTasks = async () => {  
    try {
      const response = await fetch(`${BASE_URL}/api/Track/track`); // Replace with your backend URL
      const data = await response.json();
      setTasks(data); // Update the state with fetched data
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }
  useEffect(() => {
    active();
    fetchTasks(); // Call the fetch function
   
  }, []); // Empty dependency array to run only on component mount

  const updateTasks = async (staff_id,delivery_id) => {
    try {
      const response = await fetch(`${BASE_URL}/api/delete/update`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(staff_id,delivery_id),
      }); // Replace with your backend URL
      const data = await response.json(); // Update the state with fetched data
      if(response.ok)
      {
        console.log("updated suceessfully");
      }
    } catch (error) {

      console.error("Error fetching tasks:", error);
    }
  }

  const deleteTask = async ({task_id,staff_id,delivery_id}) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this task?');
  
    if (confirmDelete) {
      try {
         console.log('Deleting task with ID:', task_id); // Debugging log


        const response = await fetch(`${BASE_URL}/api/delete/tasks`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ task_id}),
        });
        console.log("sending id to update",{staff_id}," ",{delivery_id});
           updateTasks({staff_id,delivery_id});
        if (response.ok) {
          alert('Task deleted successfully');
          // Update task list in the UI
          fetchTasks();
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('Error deleting task');
      }
    }
  };
  
  const active= async ()=>{
    try{
    const response=await fetch(`${BASE_URL}/api/auth/actives`);
      const d= await response.json();
      setA(d);
      console.log(d);
    }
    catch(error){
     console.log('error',error);
    }
  }
  const toggle = () =>{
    setShow(!show);
  }
  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setShow(false); // Automatically hide sidebar on small screens
    }
  };
  
 const handlelogout=()=>{
  localStorage.removeItem("authToken");
  alert("Do you really want to exit")
  if (window.innerWidth < 768) {
    setShow(false); // Automatically hide sidebar on small screens after logout
  }
  navigate("/first");
 }
  // Default dashboard content when the route is "/manager"
  const renderDefaultDashboard = location.pathname === "/manager";

  return (
    <div className="w-screen min-h-screen flex flex-col sm:flex-row bg-slate-200">
    {/* Sidebar */}
    <FiAlignJustify className="cursor-pointer" size={30} onClick={toggle}/>
    
    <div className={`${
          show ? 'block' : 'hidden'
        } md:block w-72 h-screen fixed bg-slate-200`}>
        
        <div className="w-64 space-y-4 p-2 h-[calc(100%-30px)] m-3 bg-gradient-to-b from-slate-800 to-slate-700 rounded-3xl">
          <h1 className="mx-auto w-32 text-white font-bold">Manager123</h1>
          <hr />
          {/* Dashboard Link */}

          <Link to="/manager" onClick={handleLinkClick}>
            <div className="flex rounded-xl space-x-6 hover:bg-blue-500 p-2 pl-10 mx-auto w-60">
              <RxDashboard size={24} className="text-white" />
              <h1 className="text-white font-bold">Dashboard</h1>
            </div>
          </Link>
          {/* Patient Link */}
          <Link to="/manager/patient" onClick={handleLinkClick}>
            <div className="flex rounded-xl space-x-2 hover:bg-blue-500 p-2 pl-7 mx-auto w-60">
              <img src={d} className="w-14 h-9 bg-transparent" alt="Patient" />
              <h1 className="h-9 pt-2 text-white font-bold">Patient</h1>
            </div>
          </Link>
          {/* Pantry Staff Link */}
          <Link to="/manager/pantry1" onClick={handleLinkClick}>
            <div className="flex rounded-xl space-x-2 hover:bg-blue-500 p-2 pl-7 mx-auto w-60">
              <img src={image} className="w-14 h-9 bg-transparent" alt="Pantry Staff" />
              <h1 className="h-9 pt-2 text-white font-bold">Pantry staff</h1>
            </div>
          </Link>
          {/* Delivery Person Link */}
          <Link to="/manager/delivery1"onClick={handleLinkClick}>
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
      <div className="ml-0 sm:ml-72 flex-grow p-6 bg-slate-100">
      {renderDefaultDashboard ? (
          <> 
          <h1 className="font-medium mt-4 text-lg sm:text-2xl">Dashboard</h1>
          <div className="grid  grid-cols-2 gap-4 lg:grid-cols-4">
        
              <div className="bg-white py-4 px-3 text-center w-30 lg:w-60 mt-4 font-bold rounded-lg border-2 border-slate-400">
                <h1>Active patients</h1>
                {a2 ? a2.pa : 'Loading...'}
              </div>
              <div className="bg-white py-4 px-3 text-center w-30 lg:w-60 mt-4 font-bold rounded-lg border-2 border-slate-400">
                <h1>Active pantry Staff</h1>
                {a2 ? `${a2.pa3} / ${a2.pa2} ` : 'Loading...'}
              </div>
              <div className="bg-white py-4 px-3 text-center  w-30 lg:w-60 mt-4 font-bold rounded-lg border-2 border-slate-400">
                <h1>Task Completed</h1>
                {a2 ? `${a2.t2} / ${a2.t1} ` : 'Loading...'}

              </div>
              <div className="bg-white py-4 px-3 text-center  w-30 lg:w-60 mt-4 font-bold rounded-lg border-2 border-slate-400">
                <h1>Active Delivery Staff</h1>
              
                {a2 ?`${ a2.da2}/ ${ a2.da1}`: 'Loading...'}
              </div>
            </div>
            <hr /><div className="flex">
            <h1 className="text-xl font-medium m-4">Manager Task List</h1> 
                                                                            </div>
            
            <hr />
            <div className="bg-white border-2 border-slate-400 p-2 rounded-lg overflow-auto flex-1">
      <table className="border-2 w-full border-blue-300 p-4">
  
                <thead className=" p-4 border-2 w-full bg-blue-200 border-blue-300">
                  <tr className="border-2 w-full text-center border-blue-300">
                    <th className="border-2 border-blue-300 p-4">Task ID</th>
                    <th className="border-2 border-blue-300">Die Chart ID</th>
                    <th className="border-2 border-blue-300">Staff ID</th>
                    <th className="border-2 border-blue-300">Delivery ID</th>
                    <th className="border-2 border-blue-300">Status</th>
                    <th className="border-2 border-blue-300">Actions</th>
                
                  </tr>
                </thead>
                <tbody className="border-2 w-full border-blue-300">
                  {tasks.map((task) => (
                    <tr
                      className="border-2 w-full text-center border-blue-300"
                      key={task._id}
                    >
                      <td className="border-2 border-blue-300 p-3">{task.task_id}</td>
                      <td className="border-2 border-blue-300">{task.die_chart_id}</td>
                      <td className="border-2 border-blue-300">{task.staff_id}</td>
                      <td className="border-2 border-blue-300">{task.delivery_id}</td>
                      <td className="border-2 border-blue-300">{task.status}</td>
                     <td className="border-2 border-blue-300">
                      <button className="font-medium text-white bg-blue-600 rounded-lg p-4" 
                      onClick ={() =>deleteTask({task_id: task.task_id,staff_id:task.staff_id,delivery_id:task.delivery_id})}
                      hidden={task.status != "completed" }>
                        Delete
                      </button>

                     </td>
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
