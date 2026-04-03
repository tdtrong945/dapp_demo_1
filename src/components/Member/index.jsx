import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function MemberDashboard() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('role')
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black mb-4">Khu vực Thành viên</h1>
        <p className="mb-6 text-zinc-300">Chào mừng bạn đến với tài khoản thành viên. Bạn có thể xem và quản lý thông tin cá nhân, gói tập và lịch huấn luyện.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
            <h2 className="text-xl font-bold mb-2">Gói tập hiện tại</h2>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
            <h2 className="text-xl font-bold mb-2">Huấn luyện viên</h2>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 mb-8">
          <h2 className="text-xl font-bold mb-3">Lịch tập</h2>
          
        </div>

        <button onClick={handleLogout} className="bg-orange-600 hover:bg-orange-700 px-6 py-2 rounded-lg font-bold">Đăng xuất</button>
      </div>
    </div>
  )
}
