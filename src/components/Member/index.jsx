import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../api'

export default function MemberDashboard() {
  const navigate = useNavigate()
  const [memberName, setMemberName] = useState('')
  const [metamaskAddress, setMetamaskAddress] = useState('')
  const [statusMsg, setStatusMsg] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    loadMemberData()
  }, [navigate])

  const loadMemberData = async () => {
    try {
      const result = await api.getCurrentMember()
      if (result.error) {
        if (result.error === 'Invalid token') {
          localStorage.removeItem('token')
          localStorage.removeItem('role')
          localStorage.removeItem('currentUser')
          navigate('/login')
          return
        }
        setError(result.error)
      } else {
        setMemberName(result.user.username)
        setMetamaskAddress(result.user.metamask_address || '')
      }
    } catch (err) {
      setError('Lỗi kết nối server.')
    } finally {
      setLoading(false)
    }
  }

  const handleLinkMetamask = async () => {
    setError('')
    setStatusMsg('')

    if (!window.ethereum) {
      setError('Vui lòng cài MetaMask trước khi liên kết.')
      return
    }

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const address = accounts[0]?.toLowerCase() || ''
      if (!address) {
        setError('Không tìm thấy địa chỉ MetaMask.')
        return
      }

      const result = await api.linkMetamask(address)

      if (result.error) {
        setError(result.error)
      } else {
        setMetamaskAddress(address)
        setStatusMsg('Liên kết MetaMask thành công!')
      }
    } catch (err) {
      console.error(err)
      setError('Không thể kết nối MetaMask. Vui lòng thử lại.')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('currentUser')
    navigate('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8 flex items-center justify-center">
        <div className="text-xl">Đang tải...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black mb-4">Khu vực Thành viên</h1>
        <p className="mb-6 text-zinc-300">Chào mừng <strong>{memberName || 'thành viên'}</strong>. Bạn có thể xem và quản lý thông tin cá nhân, gói tập và lịch huấn luyện.</p>

        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 mb-6">
          <h2 className="text-xl font-bold mb-3">MetaMask</h2>
          {error && <p className="text-red-400 mb-2">{error}</p>}
          {statusMsg && <p className="text-green-400 mb-2">{statusMsg}</p>}
          <p className="mb-4">Trạng thái liên kết: {metamaskAddress ? <span className="text-lime-300">Đã liên kết</span> : <span className="text-yellow-300">Chưa liên kết</span>}</p>
          {metamaskAddress && <p className="break-all mb-4">Địa chỉ MetaMask: {metamaskAddress}</p>}

          <button onClick={handleLinkMetamask} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold">
            {metamaskAddress ? 'Cập nhật MetaMask' : 'Liên kết MetaMask'}
          </button>
        </div>

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
