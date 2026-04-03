import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../api'

const pricingData = {
  basic: {
    name: 'Gói Cơ Bản',
    price: '499.000',
    features: ['Truy cập mọi khung giờ', 'Tủ đồ riêng', '2 buổi PT miễn phí', 'Gửi xe miễn phí'],
    color: 'border-zinc-700'
  },
  pro: {
    name: 'Gói Chuyên Nghiệp',
    price: '999.000',
    features: ['Ưu tiên máy tập', 'Tủ đồ riêng VIP', '5 buổi PT miễn phí', 'Tư vấn dinh dưỡng', 'Nước uống miễn phí'],
    color: 'border-orange-600'
  },
  vip: {
    name: 'Gói VIP',
    price: '1.999.000',
    features: ['Phòng tập riêng biệt', 'PT kèm 1-1 hàng ngày', 'Xông hơi & Bể bơi', 'Massage sau tập', 'Trái cây & Whey'],
    color: 'border-yellow-500'
  }
}

const Pricing = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('pro')
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const currentPlan = pricingData[activeTab]

  const handleRegisterNow = () => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    } else {
      setShowModal(true)
    }
  }

  const handleSubmitRequest = async () => {
    setLoading(true)
    setMessage('')

    try {
      const result = await api.createPackageRequest(currentPlan.name, currentPlan.price)
      if (result.error) {
        setMessage(`Lỗi: ${result.error}`)
      } else {
        setMessage('✓ Yêu cầu được gửi thành công! Admin sẽ duyệt trong thời gian sớm nhất.')
        setTimeout(() => {
          setShowModal(false)
        }, 2000)
      }
    } catch (err) {
      setMessage('Lỗi kết nối server.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="pricing" className="bg-zinc-950 py-24 px-4 border-t border-zinc-900">
      <div className="max-w-4xl mx-auto">
        
        {/* TIÊU ĐỀ */}
        <div className="text-center mb-12">
          <h2 className="text-orange-500 font-bold tracking-widest uppercase mb-2 text-sm">Bảng giá</h2>
          <h1 className="text-4xl font-black italic uppercase">Chọn lộ trình của bạn</h1>
        </div>

        {/* CÁC NÚT CHỌN GÓI (TABS) */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.keys(pricingData).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-8 py-3 font-black uppercase tracking-tighter transition-all border-b-4 ${
                activeTab === key 
                ? 'border-orange-600 bg-zinc-900 text-white' 
                : 'border-transparent text-zinc-500 hover:text-white'
              }`}
            >
              {pricingData[key].name}
            </button>
          ))}
        </div>

        {/* NỘI DUNG CHÍNH (THAY ĐỔI THEO TAB) */}
        <div className={`bg-zinc-900/50 p-10 border-l-8 ${currentPlan.color} transition-all duration-500 animate-in fade-in slide-in-from-right-5`}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <h3 className="text-5xl font-black italic text-white mb-2 uppercase">
                {currentPlan.price} <span className="text-xl text-zinc-500">VNĐ/Tháng</span>
              </h3>
              <p className="text-zinc-400 mb-8 italic italic italic tracking-wide">Chi tiết quyền lợi gói {currentPlan.name}</p>
              
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentPlan.features.map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-zinc-300">
                    <span className="text-orange-600 font-bold">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={handleRegisterNow}
              className="bg-orange-600 hover:bg-orange-500 text-white font-black px-12 py-5 uppercase tracking-widest shadow-xl shadow-orange-900/20 whitespace-nowrap"
            >
              Đăng ký ngay
            </button>
          </div>
        </div>

        {/* MODAL YÊU CẦU GÓI TẬP */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 max-w-md w-full">
              <h2 className="text-2xl font-black text-orange-500 mb-4">Yêu cầu gói tập</h2>

              <div className="bg-zinc-950 p-4 rounded mb-4">
                <p className="text-sm text-zinc-500 mb-1">Gói được chọn:</p>
                <p className="text-xl font-bold text-white">{currentPlan.name}</p>
                <p className="text-lg text-orange-500 font-black">{currentPlan.price} VNĐ/Tháng</p>
              </div>

              {message && (
                <div className={`p-3 rounded mb-4 text-sm ${
                  message.includes('✓') 
                    ? 'bg-green-900/50 text-green-300' 
                    : 'bg-red-900/50 text-red-300'
                }`}>
                  {message}
                </div>
              )}

              <p className="text-zinc-400 text-sm mb-6">
                Nhấn xác nhận để gửi yêu cầu. Admin sẽ xem xét và liên hệ với bạn trong thời gian sớm nhất.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded font-bold disabled:opacity-50"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSubmitRequest}
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded font-bold disabled:opacity-50"
                >
                  {loading ? 'Đang gửi...' : 'Xác nhận'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Pricing