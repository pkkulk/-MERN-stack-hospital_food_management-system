import React, { useState, useEffect } from "react";
import { IoIosLogOut } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";

function Pantry() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("viewTasks"); // Track active menu
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("pending");
  const [show, setShow] = useState(false);
  const [die, setDie] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [meal, setMeal] = useState("");
  const id = location.state?.username;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/Track/track2`, {
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
        setTasks(Array.isArray(data) ? data : [data]);
        setStatus(data.status === "pending" ? "pending" : "complete");
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    if (window.confirm("Do you really want to exit?")) {
      navigate("/first");
    }
  };

  const handle = async ({ die_chart_id }) => {
    try {
      const response = await fetch(`${BASE_URL}/api/Track/die2`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ die_chart_id }),
      });
      const data = await response.json();
      setDie(data); // Store diet chart data
      setShow(true); // Show popup
    } catch (error) {
      console.log("Error fetching diet chart:", error);
    }
  };

  const complete = async ({ staff_id, task_id, meal }) => {
    if (!meal) {
      alert("Please enter meal box number");
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/api/Track/task2`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ staff_id, task_id, meal }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Status updated! Task completed from your side.");
        setStatus(data.status === "pending" ? "pending" : "In progress");
      }
    } catch (error) {
      console.log("Error updating task status:", error);
    }
  };

  const handleMeal = (e) => {
    setMeal(e.target.value);
  };

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
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
              View Assigned Tasks
            </h2>
            {loading ? (
              <p className="text-gray-500">Loading tasks...</p>
            ) : tasks.length === 0 ? (
              <p className="text-gray-500">No tasks assigned.</p>
            ) : (
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div
                    key={task._id}
                    className="bg-white rounded-lg shadow-md p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between"
                  >
                    <div>
                      <p><strong>Task ID:</strong> {task.task_id}</p>
                      <p><strong>Status:</strong> {status}</p>
                      <p><strong>Delivery ID:</strong> {task.delivery_id}</p>
                      <p>
                        <strong>Diet Chart ID:</strong>{" "}
                        <button
                          onClick={() => handle({ die_chart_id: task.die_chart_id })}
                          className="text-blue-500 underline"
                        >
                          {task.die_chart_id}
                        </button>
                      </p>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <input
                        type="text"
                        className="border rounded p-2"
                        placeholder="Enter meal box number"
                        value={meal}
                        onChange={handleMeal}
                      />
                      {status === "pending" ? (
                        <button
                          onClick={() =>
                            complete({
                              staff_id: task.staff_id,
                              task_id: task.task_id,
                              meal: meal,
                            })
                          }
                          className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                          Mark as Completed
                        </button>
                      ) : (
                        <button
                          className="bg-gray-300 text-gray-500 px-4 py-2 rounded"
                          disabled
                        >
                          Completed
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case "mealTracking":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Meal Tracking</h2>
            <p>Track meals here.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-blue-500 flex flex-col sm:flex-row items-center justify-between p-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Pantry Dashboard</h1>
        <h2 className="text-lg sm:text-xl text-white mt-2 sm:mt-0">User ID: {id}</h2>
        <IoIosLogOut
          size={30}
          className="text-white cursor-pointer mt-2 sm:mt-0"
          onClick={handleLogout}
        />
      </div>

      {/* Menu */}
      <div className="flex flex-wrap justify-center bg-white shadow-md p-4 space-x-2 space-y-2">
        <button
          className={`px-4 py-2 rounded-md font-semibold ${
            activeMenu === "dashboard" ? "bg-blue-500 text-white" : "text-blue-500"
          }`}
          onClick={() => setActiveMenu("dashboard")}
        >
          Dashboard
        </button>
        <button
          className={`px-4 py-2 rounded-md font-semibold ${
            activeMenu === "editInfo" ? "bg-blue-500 text-white" : "text-blue-500"
          }`}
          onClick={() => setActiveMenu("editInfo")}
        >
          Edit Info
        </button>
        <button
          className={`px-4 py-2 rounded-md font-semibold ${
            activeMenu === "viewTasks" ? "bg-blue-500 text-white" : "text-blue-500"
          }`}
          onClick={() => setActiveMenu("viewTasks")}
        >
          View Tasks
        </button>
        <button
          className={`px-4 py-2 rounded-md font-semibold ${
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
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg">
            <table className="w-full border">
              <thead>
                <tr>
                  <th colSpan={3} className="border-b p-2">{die.die_chart_id}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border-b">Morning</td>
                  <td className="p-2 border-b">{die?.morning?.ing?.join(", ") || "No data"}</td>
                  <td className="p-2 border-b">{die?.morning?.ins || "No data"}</td>
                </tr>
                <tr>
                  <td className="p-2 border-b">Evening</td>
                  <td className="p-2 border-b">{die?.evening?.ing?.join(", ") || "No data"}</td>
                  <td className="p-2 border-b">{die?.evening?.ins || "No data"}</td>
                </tr>
                <tr>
                  <td className="p-2">Night</td>
                  <td className="p-2">{die?.night?.ing?.join(", ") || "No data"}</td>
                  <td className="p-2">{die?.night?.ins || "No data"}</td>
                </tr>
              </tbody>
            </table>
            <button
              onClick={() => setShow(false)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pantry;
