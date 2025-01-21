import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const AssignTask = ({ onTaskAssigned }) => {
const navigate=useNavigate();
const location=useLocation();
const  id = location.state.staff_id || {};
  const [taskDetails, setTaskDetails] = useState({
    task_id: "",
    die_chart_id:"",
    patient_id: "",
    staff_id:id,
    delivery_id: "",
    meal:"0",
    task_des:"",
  });
  const[data,setData]=useState([]);
  useEffect(()=> {
    const fet= async ()=>{
      try{
            const response=await fetch("http://localhost:5000/api/Track/die");
               const d=await response.json();
               setData(d);
      }catch(error)
      { console.log("unable to load",error);}

      }
fet();
},[])

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails({
      ...taskDetails,
      [name]: value,
    });
  };
  

  const handleAssignTask = async () => {
    const { task_id, die_chart_id,patient_id, staff_id, delivery_id,meal,task_des } = taskDetails;

    if (!task_id ||!die_chart_id || !patient_id || !staff_id || !delivery_id|| !task_des) {
      alert("All fields are required!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/createuser/delivery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task_id,
          die_chart_id,
          patient_id,
          staff_id,
          delivery_id,
          status: "pending",
          meal:"0",
          task_des,
        }),
      });

      if (response.ok) {
        const newTask = await response.json();
        alert("Task assigned successfully!");
        navigate('/manager/pantry1');
        setTaskDetails({ task_id: "",die_chart_id:"", patient_id: "", staff_id: "", delivery_id: "",tesk_des: "" });
        if (onTaskAssigned) {
          onTaskAssigned(newTask);
        }
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to assign task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-2xl border-2 border-slate-300 rounded-lg p-6 mt-14">
   <div className="bg-blue-600">   <h2 className="text-2xl font-bold text-gray-700 mb-4 pl-32 bg-blue-400">Assign Task</h2></div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Task ID:</label>
          <input
            type="text"
            name="task_id"
            value={taskDetails.task_id}
            onChange={handleInputChange}
            className="w-full border-gray-300 rounded-lg p-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Task ID"
          />
        </div>
        <div>
  <label className="block text-sm font-medium text-gray-600 mb-1">Diechart ID:</label>
  <select
    name="die_chart_id"
    value={taskDetails.die_chart_id}
    onChange={handleInputChange}
    className="w-full border-gray-300 rounded-lg p-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
  >
    <option value="" disabled>Select Diechart ID</option>
    {data.map((chart) => (
      <option key={chart.die_chart_id} value={chart.die_chart_id}>
        {chart.die_chart_id}
      </option>
    ))}
  </select>
</div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Patient ID:</label>
          <input
            type="text"
            name="patient_id"
            value={taskDetails.patient_id}
            onChange={handleInputChange}
            className="w-full border-gray-300 rounded-lg p-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Patient ID"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Staff ID:</label>
          <input
            type="text"
            name="staff_id"
            value={taskDetails.staff_id}
            onChange={handleInputChange}
            className="w-full border-gray-300 rounded-lg p-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Staff ID"
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Delivery ID:</label>
          <input
            type="text"
            name="delivery_id"
            value={taskDetails.delivery_id}
            onChange={handleInputChange}
            className="w-full border-gray-300 rounded-lg p-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Delivery ID"
          />
        </div>
      </div>
      <div>
  <label className="block text-sm font-medium text-gray-600 mb-1">Task Description:</label>
  <textarea
    name="task_des"
    value={taskDetails.task_des}
    onChange={handleInputChange}
    className="w-full border-gray-300 rounded-lg p-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
    placeholder="Enter Task Description"
    rows="3" // Adjust rows as needed for multi-line input
  ></textarea>
</div>

      <button
        onClick={handleAssignTask}
        disabled={loading}
        className={`mt-6 w-full px-4 py-2 text-white font-semibold rounded-lg ${
          loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {loading ? "Assigning..." : "Assign Task"}
      </button>
    </div>
  );
};

export default AssignTask;
