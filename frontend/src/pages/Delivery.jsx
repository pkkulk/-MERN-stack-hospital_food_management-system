import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";

function Delivery() {
  const [menuOption, setMenuOption] = useState("assignedTasks"); // "personalInfo", "editPersonalInfo", "assignedTasks"
  const [availability,setAvailability] =useState(true);
  const [t,setAvailability2] =useState(true);
  const [name,setName]=useState("");
  const[tasks,setTasks]=useState([]);
  const [info,setInfo]=useState("")
  const[contact,setcontact]=useState("");
  const[status,setStatus]=useState("");
  const navigate=useNavigate();
  const location=useLocation();
  const id = location.state?.username;

  console.log("Location state:", location.state);
  const fetchData = async () => {
    const delivery_id=id;
    try {
      const response = await fetch("http://localhost:5000/api/Track/delivery2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({delivery_id}),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          console.log(data);

          // Assuming data is an array or a single task object, handle accordingly
          setTasks(Array.isArray(data) ? data : [data]);

          // Check the status of the first task (or all tasks if needed) and set the state
          if (data.status === "in progress") {
              setStatus("in progress");
          } else if (data.status === "completed") {
              setStatus("complete");
          }
    } catch (error) {
      console.error("Error fetching data:", error);

    }

  };
  const fetchAvailability = async () => {
    try {
      const delivery_id=id;
      const response = await fetch("http://localhost:5000/api/Track/deliveryinfo",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({delivery_id}),
      });

      const data = await response.json();
     
      
      if (response.ok) {
        setAvailability(data.availability); // Set the availability from the data
      } else {
        console.error("Failed to fetch availability");
      }
      setInfo(data);
      
    } catch (error) {
      console.error("Error fetching availability:", error);
    } 
  };

useEffect(()=>{
  fetchAvailability();
  fetchData();
}, []);
const handlelogout=()=>{
  localStorage.removeItem("authToken");
  alert("Do you really want to exit")
  navigate("/first");
 }
const handleSubmitPersonalInfo = async () => {
  try {

    const delivery_id=id;
    const response = await fetch("http://localhost:5000/api/Track/updatePersonal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({delivery_id,contact,name }),
    });

    if (response.ok) {
      alert("Personal Information updated successfully!");
    } else {
      alert("Failed to update personal information.");
    }
  } catch (error) {
    console.error("Error updating personal information:", error);
  }
};

const handleSubmit= async (newAvailability) => {
  setAvailability(newAvailability); 
  try {

    const delivery_id=id;
    const response = await fetch("http://localhost:5000/api/Track/updateAvailability", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ delivery_id, availability :newAvailability }),
    });

    if (response.ok) {
      alert("Availability updated successfully!");
    } else {
      alert("Failed to update availability.");
    }
  } catch (error) {
    console.error("Error updating availability:", error);
  }
};
const markTaskComplete = async({task_id}) => {
  console.log( "In progress",task_id)
  const response = await fetch("http://localhost:5000/api/Track/delivery3",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify( {task_id}),
    })
  const data = await response.json();
  if(response.ok)
    {
     alert("status updated task completed from your side");
     {data.status == "In progress" ? setStatus("In progess") :setStatus("complete")}
    }
   };
return (
<div className="min-h-screen bg-gray-100 flex flex-col items-center">
   <div className="bg-blue-600 w-screen  p-4 "> 
   <div className="flex md:flex-1">
      <h1 className="text-3xl font-bold text-white  ">Delivery Dashboard</h1>
      <h1  className="text-xl font-bold text-white pl-96">DeliveryId:{id}</h1>
       <IoIosLogOut size={60} onClick={handlelogout}
       className="text-white  pb-4 cursor-pointer fixed top-3 right-8" />
       </div>
   </div>
   <div className="bg-white shadow-lg rounded-lg w-11/12 max-w-4xl p-6 mt-12">
        {/* Menu */}
        <div className="flex space-x-4 mb-6 border-b pb-4">
          <button
            onClick={() => setMenuOption("personalInfo")}
            className={`${
              menuOption === "personalInfo"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-600"
            } font-medium pb-1`}
          >
            View Personal Info
          </button>
          <button
            onClick={() => setMenuOption("editPersonalInfo")}
            className={`${
              menuOption === "editPersonalInfo"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-600"
            } font-medium pb-1`}
          >
            Edit Personal Info
          </button>
          <button
            onClick={() => setMenuOption("assignedTasks")}
            className={`${
              menuOption === "assignedTasks"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-600"
            } font-medium pb-1`}
          >
            Assigned Tasks
          </button>
        </div>
  {menuOption === "personalInfo" &&(
    <div>
    <h2 className="text-xl font-bold text-gray-800 mb-4">
      Personal Information
    </h2>
    <div className="space-y-4">
      <div>
        <p className="text-gray-600">
          <strong>ID:{info.delivery_id}</strong>
        </p>
      </div>
      <div>
        <p className="text-gray-600">
          <strong>Contact Name:{info.name}</strong>
        </p>
      </div>
      <div>
        <p className="text-gray-600">
          <strong>Contact contact:{info.contact}</strong> 
        </p>
      </div>
      <div>
        <p className="text-gray-600">
          <strong>Availability:</strong>{" "}
          <span
            className={`${
              availability ? "text-green-500" : "text-red-500"
            }`}
          >
            {availability ? "Available" : "Not Available"}
          </span>
        </p>
      </div>
    </div>
  </div>

  )}
  {menuOption === "editPersonalInfo"&&(
    <div>
    <h2 className="text-xl font-bold text-gray-800 mb-4">
      Edit Personal Information
    </h2>
    
      {/* Form for Personal Information */}
      <div className="space-y-4">
        <div>
          <label className="block text-gray-600 font-medium mb-2">
            Contact Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-600 font-medium mb-2">
            Contact contact
          </label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setcontact(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
          />
        </div>
        <button
          onClick={handleSubmitPersonalInfo}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Submit Personal Info
        </button>
      </div>
       <div>
        
       

  
        </div>
  </div>
     
  )}
  {menuOption === "assignedTasks" && (
    <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Assigned Tasks

            </h2> <div> { tasks.map(task => (
              <ul className="space-y-4  "   >
              
                <li className="flex justify-between items-center bg-gray-100 p-4 rounded-lg"key={task.id}> 
                  <h1 className="font-medium">Task Id: {id}</h1>
                  <h1 className="font-medium">Status: {status}</h1>
                
                 
                    <div className="flex space-x-9">
                <h2 className="font-medium mt-2">meal box contact:{task.meal}</h2>
                <button
              onClick={() => markTaskComplete({ task_id: task.task_id })}
               disabled={task.status === 'completed'} // Disable if task is completed
               className={`px-4 py-2 rounded-md transition ${
                  task.status === 'completed'
                 ? 'bg-gray-400 text-gray-700 cursor-not-allowed' // Styling for disabled state
                  : 'bg-blue-500 text-white hover:bg-blue-600' // Styling for active state
                   }`}
                 >
  {status === 'completed' ? 'Completed' : 'Mark Complete'}
</button>
</div>
                </li>
            </ul>
            ))}</div>
          </div>
        )}
        </div>
        </div>
     
)}
export default Delivery;