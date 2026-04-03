import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
  // State để quản lý gói đang hiển thị
  const [activeTab, setActiveTab] = useState('pro');

  const currentPlan = pricingData[activeTab];

  const handleRegisterNow = () => {
    navigate('/login')
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

      </div>
    </section>
  )
}

export default Pricing