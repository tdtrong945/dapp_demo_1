import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import GymWebsite from './components/Hello/index'
import Pricing from './components/Pricing/index'
import Trainers from './components/Trainers/index'
import Contact from './components/Contact/index'
import AdminDashboard from './Admin/index'
import Login from './Admin/Login'
import Register from './Admin/Register'
import MemberDashboard from './components/Member/index'

function RequireRole({ role, children }) {
  const currentRole = localStorage.getItem('role')
  if (currentRole !== role) {
    return <Navigate to="/login" replace />
  }
  return children
}

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <section id="home">
                <GymWebsite />
              </section>
              <section id="pricing">
                <Pricing />
              </section>
              <section id="trainers">
                <Trainers />
              </section>
              <section id="contact">
                <Contact />
              </section>
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin-portal"
          element={
            <RequireRole role="admin">
              <AdminDashboard />
            </RequireRole>
          }
        />
        <Route
          path="/member-portal"
          element={
            <RequireRole role="member">
              <MemberDashboard />
            </RequireRole>
          }
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App