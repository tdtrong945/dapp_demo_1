import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('dashboard')

  const logout = () => {
    localStorage.removeItem('role')
    navigate('/')
  }

  return (
    <div className="flex min-h-screen bg-[#050505] text-white font-sans">
      <aside className="w-64 border-r border-zinc-800 p-8 flex flex-col fixed h-full">
        <div className="text-2xl font-black italic text-orange-600 mb-12 tracking-tighter">
          ADMIN<span className="text-white">PANEL</span>
        </div>

        <nav className="space-y-6 flex-1">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full text-left text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
              activeTab === 'dashboard' ? 'text-orange-500' : 'text-zinc-600 hover:text-zinc-300'
            }`}
          >
            01. Tổng quan
          </button>
          <button
            onClick={() => setActiveTab('members')}
            className={`w-full text-left text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
              activeTab === 'members' ? 'text-orange-500' : 'text-zinc-600 hover:text-zinc-300'
            }`}
          >
            02. Hội viên
          </button>
        </nav>

        <button onClick={logout} className="text-zinc-700 text-[10px] font-black uppercase hover:text-red-500 transition-colors text-left">
          [ Đăng xuất ]
        </button>
      </aside>

      <main className="flex-1 ml-64 p-12">
        {activeTab === 'dashboard' ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-5xl font-black uppercase italic mb-12">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-zinc-900/50 p-8 border border-zinc-800 rounded-sm">
                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Doanh thu</p>
                <p className="text-3xl font-extrabold mt-2">$92,300</p>
              </div>
              <div className="bg-zinc-900/50 p-8 border border-zinc-800 rounded-sm">
                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Hội viên</p>
                <p className="text-3xl font-extrabold mt-2">1,248</p>
              </div>
              <div className="bg-zinc-900/50 p-8 border border-zinc-800 rounded-sm">
                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Yêu cầu</p>
                <p className="text-3xl font-extrabold mt-2">119</p>
              </div>
            </div>
            <div className="bg-zinc-900/20 border border-zinc-800 p-8">
              <h3 className="text-sm font-black uppercase mb-6 text-zinc-400 italic">Giao dịch gần đây</h3>
              <div className="space-y-4">
                <div className="text-sm">#0001 - user01 - mua gói Platinum</div>
                <div className="text-sm">#0002 - user02 - gia hạn gói Gold</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in duration-500 py-20 text-center border-2 border-dashed border-zinc-900">
            <p className="text-zinc-400">Quản lý danh sách thành viên, duyệt yêu cầu, sửa thông tin.</p>
          </div>
        )}
      </main>
    </div>
  )
}
