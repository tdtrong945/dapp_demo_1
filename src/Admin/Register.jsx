import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'

export default function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    if (!username || !password) {
      setError('Vui lòng điền đầy đủ thông tin.')
      setLoading(false)
      return
    }
    if (password !== confirm) {
      setError('Mật khẩu và xác nhận mật khẩu không khớp.')
      setLoading(false)
      return
    }

    try {
      const result = await api.register(username, password)

      if (result.error) {
        setError(result.error)
      } else {
        setSuccess('Đăng ký thành công! Vui lòng đăng nhập.')
        setUsername('')
        setPassword('')
        setConfirm('')

        setTimeout(() => {
          navigate('/login')
        }, 1200)
      }
    } catch (err) {
      setError('Lỗi kết nối server. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
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

        <button className="w-full px-4 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-bold" type="submit" disabled={loading}>
          {loading ? 'Đang đăng ký...' : 'Đăng ký'}
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
