import React, { useState, useEffect } from "react";
import { IoIosLogOut } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";


function Pantry() {
  const navigate=useNavigate();
  const [activeMenu, setActiveMenu] = useState("viewTasks"); // Track active menu
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("pending");
  const[show,setShow]=useState(false)
  const[die,setDie]=useState(null)
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [meal,setMeal]=useState("");
  const id = location.state?.username;
   console.log(id);
  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/Track/track2", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          const data = await response.json();
          console.log(data);
          setTasks(Array.isArray(data) ? data : [data]);
           // Correctly parse and set tasks

           {data.status == "pending" ? setStatus("pending") :setStatus("complete")}
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
        }
      };
    fetchData();
  }, []);
  const handlelogout=()=>{
    localStorage.removeItem("authToken");
    alert("Do you really want to exit")
    navigate("/first");
   }
  const handle= async ({die_chart_id})=>{
    console.log("dats is",{die_chart_id});

    try{
      const response= await fetch("http://localhost:5000/api/Track/die2",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( {die_chart_id }),
      })
      const data = await response.json();
      setDie(data); // Store diet chart data
      setShow(true); // Show popu
    }
    catch(error)
    {
      console.log("Error fetching diet chart:", error)
    }
  }
 const complete =async ({staff_id,task_id,meal})=>{
  if(!meal)
  {
    alert("pleas enter meal box number");

    return;
  }
  try{
    const response= await fetch("http://localhost:5000/api/Track/task2",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify( {staff_id,task_id,meal}),
    })
    const data = await response.json();
    setStatus("completed")
   if(response.ok)
   {
    alert("status updated task completed from your side");
    {data.status == "pending" ? setStatus("pending") :setStatus("In progress")}
   }
  }
  catch(error)
  {
    console.log("Error fetching diet chart:", error)
  }

 }
 function handleMeal(e){
  setMeal(e.target.value);
 }
  const renderMenuContent = () => {                                                   
    switch (activeMenu) {
      case "dashboard":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
            <p>Welcome to the Pantry Dashboard!</p>
          </div>
        );
      case "editInfo":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Edit Personal Information</h2>
            <form className="bg-white p-4 rounded-md shadow-md">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Name:</label>
                <input
                  type="text"
                  className="w-full border-gray-300 rounded-md shadow-sm"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Contact:</label>
                <input
                  type="text"
                  className="w-full border-gray-300 rounded-md shadow-sm"
                  placeholder="Enter your contact"
                />
              </div>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
                Save Changes
              </button>
            </form>
          </div>
        );
        case "viewTasks":
          return (
            <div >
              <h2 className="text-2xl font-semibold mb-4">View Assigned Tasks</h2>
              {loading ? (
                <p className="text-gray-500">Loading tasks...</p>
              ) : tasks.length === 0 ? (
                <p className="text-gray-500">No tasks assigned.</p>
              ) : (
               <div>
                {tasks.map((task) => ( 
                <div className="bg-white  rounded-lg shadow-2xl p-9 flex border-2 border-sky-300">
                  <div className=" w-4/5">
                <ul className="list-disc ml-4">
                    <div key={task._id} className="mb-2 flex flex-row space-x-7 w-4/5">
                    <li>  <strong>Task ID:</strong> {task.task_id} <br/></li>
                      <li><strong>Status:</strong> {status} <br /></li>
                      <li><strong>Delivery ID:</strong> {task.delivery_id}</li>
                      <li>  <strong>Staff ID:</strong> {task.staff_id} <br /></li>
                      <li><strong>Die chart id:</strong><button onClick={() => handle({die_chart_id:task.die_chart_id})} style={{ color: "blue", cursor: "pointer" }}>
                               {task.die_chart_id}
                          </button> 
                      <br /></li><li>
                  <label>enter meal box number:
                  <input type="text" className="border-black border-2" name="meal" value={meal} onChange={handleMeal}
               disabled={ status === "in progress" }
                        /></label></li>
                     </div>
                   
                 
                  
                  <div><li><strong>Task description:</strong>{task.task_des}</li></div>
                </ul>
                </div>
                {status === "pending" ? (
            <button
              onClick={() => complete({staff_id:task.staff_id,task_id:task.task_id,meal:meal})} // Pass task ID
              className="btn btn-primary  bg-blue-400 p-5 rounded-xl hover:bg-blue-700 text-white font-bold"
            >
              Mark as Completed
            </button>
          ) : (
            <button className="btn btn-disabled bg-blue-400 p-5 rounded-xl text-white font-bold" disabled>
              Completed
            </button>
          )} </div>   ))}
                </div> 
              )}

            </div>
          );
        
      case "mealTracking":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Meal Tracking</h2>
          
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-blue-500 flex items-center justify-between p-4">
        <h1 className="text-3xl font-bold text-white">Pantry Dashboard</h1>
        <h2 className="text-xl text-white">User ID: {id}</h2>
        <IoIosLogOut size={40} className="text-white cursor-pointer"  onClick={handlelogout}/>
      </div>

      {/* Menu */}
      <div className="flex bg-white shadow-md p-4">
        <button
          className={`px-4 py-2 rounded-md font-semibold ${
            activeMenu === "dashboard" ? "bg-blue-500 text-white" : "text-blue-500"
          }`}
          onClick={() => setActiveMenu("dashboard")}
        >
          Dashboard
        </button>
        <button
          className={`px-4 py-2 rounded-md font-semibold mx-2 ${
            activeMenu === "editInfo" ? "bg-blue-500 text-white" : "text-blue-500"
          }`}
          onClick={() => setActiveMenu("editInfo")}
        >
          Edit Personal Information
        </button>
        <button
          className={`px-4 py-2 rounded-md font-semibold ${
            activeMenu === "viewTasks" ? "bg-blue-500 text-white" : "text-blue-500"
          }`}
          onClick={() => setActiveMenu("viewTasks")}
        >
          View Assigned Tasks
        </button>
        <button
          className={`px-4 py-2 rounded-md font-semibold ml-2 ${
            activeMenu === "mealTracking" ? "bg-blue-500 text-white" : "text-blue-500"
          }`}
          onClick={() => setActiveMenu("mealTracking")}
        >
          Meal Tracking
        </button>
      </div>

      {/* Content */}
      <div className="p-4">{renderMenuContent()}</div>
      {show && die && (
        <div className="p-10 mx-auto boder-2 border-sky-700 border-solid"   style={{ position: "fixed", top: "20%", left: "30%", width: "40%", padding: "20px", background: "white", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)" }}>
         <table className="border-2 ml-20">
          <thead colSpan={2}>
            <th colSpan={3} className="border-2"> {die.die_chart_id}</th>
          </thead>
        <tbody>
          {/* Morning Data */}  
           {/* Morning Data */}
           <tr className="border-2">
            <td className="border-2 p-4">Morning</td>
            <td className="border-2">{die?.morning?.ing?.join(", ") || "No data"}</td>
            <td className="border-2">{die?.morning?.ins || "No data"}</td>
          </tr>

          {/* Evening Data */}
          <tr className="border-2">
            <td className="border-2 p-4">Evening</td>
            <td className="border-2">{die?.evening?.ing?.join(", ") || "No data"}</td>
            <td className="border-2">{die?.evening?.ins || "No data"}</td>
          </tr>

          {/* Night Data */}
          <tr className="border-2">
            <td className="border-2 p-4">Night</td>
            <td className="border-2">{die?.night?.ing?.join(", ") || "No data"}</td>
            <td className="border-2">{die?.night?.ins || "No data"}</td>
          </tr>
        </tbody>
      </table>
         
         
                <button onClick={() => setShow(false)} style={{ marginTop: "10px", padding: "5px 10px" }} className="ml-56 boder-2 border-slate-400 p-4 text-white font-medium   bg-blue-600 rounded-2xl">
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default Pantry;
