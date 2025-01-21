import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Delivery from './pages/Delivery';
import First from './pages/First';
import Manager from './pages/Manager';
import Signup from './pages/Signup';
import Pantry from './pages/Pantry';
import Patient from './pages/Patient';
import Delivery1 from './pages/Delivery1';
import Pantry1 from './pages/Pantry1'; 
import './index.css';
import AssignTask from './pages/Assigntask';

export default function App() {
  return (
    <>
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<First />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pantry" element={<Pantry />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/first" element={<First />} />
        <Route path="/assigntask" element={<AssignTask />} />
        {/* Nested Routes under '/manager' */}
        <Route path="/manager" element={<Manager />}>
        <Route path="patient" element={<Patient />} />
        <Route path="pantry1" element={<Pantry1 />} />
        <Route path="delivery1" element={<Delivery1 />} />
      </Route>

      </Routes>
    </>
  );
}
