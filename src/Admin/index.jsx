import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (activeTab === 'members') {
      loadMembers()
    }
  }, [activeTab])

  const loadMembers = async () => {
    setLoading(true)
    setError('')

    try {
      const result = await api.getAllMembers()
      if (result.error) {
        setError(result.error)
      } else {
        setMembers(result.members)
      }
    } catch (err) {
      setError('Lỗi kết nối server.')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateMember = async (memberId, updates) => {
    try {
      const result = await api.updateMember(memberId, updates)
      if (result.error) {
        setError(result.error)
      } else {
        loadMembers() // Reload list
      }
    } catch (err) {
      setError('Lỗi cập nhật member.')
    }
  }

  const handleDeleteMember = async (memberId) => {
    if (!window.confirm('Bạn có chắc muốn xóa member này?')) return

    try {
      const result = await api.deleteMember(memberId)
      if (result.error) {
        setError(result.error)
      } else {
        loadMembers() // Reload list
      }
    } catch (err) {
      setError('Lỗi xóa member.')
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('currentUser')
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
              </div>
              <div className="bg-zinc-900/50 p-8 border border-zinc-800 rounded-sm">
                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Hội viên</p>
              </div>
              <div className="bg-zinc-900/50 p-8 border border-zinc-800 rounded-sm">
                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Yêu cầu</p>
              </div>
            </div>
            <div className="bg-zinc-900/20 border border-zinc-800 p-8">
              <h3 className="text-sm font-black uppercase mb-6 text-zinc-400 italic">Giao dịch gần đây</h3>
              <div className="space-y-4">
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in duration-500">
            <h2 className="text-5xl font-black uppercase italic mb-12">Quản lý Hội viên</h2>

            {error && <div className="mb-6 p-4 bg-red-900/50 border border-red-800 rounded text-red-300">{error}</div>}

            {loading ? (
              <div className="text-center py-20">
                <p className="text-zinc-400">Đang tải danh sách...</p>
              </div>
            ) : (
              <div className="bg-zinc-900/20 border border-zinc-800 p-8">
                <h3 className="text-sm font-black uppercase mb-6 text-zinc-400 italic">Danh sách thành viên ({members.length})</h3>

                <div className="space-y-4">
                  {members.map((member) => (
                    <div key={member.id} className="bg-zinc-900/50 p-6 border border-zinc-800 rounded-sm">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-bold text-orange-500">{member.username}</h4>
                          <p className="text-sm text-zinc-400">ID: {member.id}</p>
                          <p className="text-sm text-zinc-400">Ngày tạo: {new Date(member.created_at).toLocaleDateString('vi-VN')}</p>
                        </div>
                        <div className="flex gap-2">
                          <select
                            value={member.role}
                            onChange={(e) => handleUpdateMember(member.id, { role: e.target.value })}
                            className="bg-zinc-800 border border-zinc-700 px-3 py-1 rounded text-sm"
                          >
                            <option value="member">Member</option>
                            <option value="admin">Admin</option>
                          </select>
                          <button
                            onClick={() => handleDeleteMember(member.id)}
                            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm font-bold"
                          >
                            Xóa
                          </button>
                        </div>
                      </div>

                      <div className="text-sm">
                        <span className="text-zinc-500">MetaMask: </span>
                        {member.metamask_address ? (
                          <span className="text-green-400 font-mono">{member.metamask_address}</span>
                        ) : (
                          <span className="text-yellow-400">Chưa liên kết</span>
                        )}
                      </div>
                    </div>
                  ))}

                  {members.length === 0 && (
                    <div className="text-center py-10 text-zinc-500">
                      Chưa có thành viên nào.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
