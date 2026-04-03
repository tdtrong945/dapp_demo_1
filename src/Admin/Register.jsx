import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!username || !password) {
      setError('Vui lòng điền đầy đủ thông tin.')
      return
    }
    if (password !== confirm) {
      setError('Mật khẩu và xác nhận mật khẩu không khớp.')
      return
    }

    const users = JSON.parse(localStorage.getItem('localUsers') || '{}')
    if (users[username]) {
      setError('Tài khoản đã tồn tại. Vui lòng chọn tên khác.')
      return
    }

    users[username] = { password, role: 'member' }
    localStorage.setItem('localUsers', JSON.stringify(users))
    setSuccess('Đăng ký thành công! Vui lòng đăng nhập.')
    setUsername('')
    setPassword('')
    setConfirm('')

    setTimeout(() => {
      navigate('/login')
    }, 1200)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-zinc-800 rounded-xl p-8 shadow-lg text-white">
        <h2 className="text-3xl font-bold mb-5">Đăng ký</h2>
        {error && <p className="mb-4 text-red-400">{error}</p>}
        {success && <p className="mb-4 text-green-400">{success}</p>}

        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Tên đăng nhập"
          className="w-full mb-3 px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 focus:outline-none"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mật khẩu"
          className="w-full mb-3 px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 focus:outline-none"
        />
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Xác nhận mật khẩu"
          className="w-full mb-4 px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 focus:outline-none"
        />

        <button className="w-full px-4 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-bold" type="submit">
          Đăng ký
        </button>
        <button
          type="button"
          className="mt-3 w-full px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-bold"
          onClick={() => navigate('/login')}
        >
          Quay lại Đăng nhập
        </button>
      </form>
    </div>
  )
}
