import React, { useState } from 'react'

const trainersData = [
  {
    id: 'pt-1',
    name: 'Trần Hùng',
    nickname: 'Iron Hung',
    role: 'Huấn luyện viên Trưởng',
    experience: '12 năm',
    bio: 'Chuyên gia phục hồi thể chất và xây dựng cơ bắp chuyên sâu. Đã giúp hơn 500 khách hàng thay đổi hình thể thành công.',
    specialties: ['Bodybuilding', 'Powerlifting', 'Dinh dưỡng lâm sàng'],
    achievement: 'Vô địch thể hình quốc gia 2022'
  },
  {
    id: 'pt-2',
    name: 'Luu Linh',
    nickname: 'Theresa',
    role: 'Chuyên gia Yoga & Pilates',
    experience: '8 năm',
    bio: 'Tập trung vào sự dẻo dai và hơi thở. Giúp học viên tìm thấy sự cân bằng giữa tâm trí và cơ thể qua các bài tập chuyên sâu.',
    specialties: ['Hatha Yoga', 'Mat Pilates', 'Trị liệu cột sống'],
    achievement: 'Chứng chỉ Yoga quốc tế Alliance 500h'
  },
  {
    id: 'pt-3',
    name: 'Hoàng Long',
    nickname: 'MCK',
    role: 'HLV Boxing & Kickfit',
    experience: '10 năm',
    bio: 'Cựu vận động viên Boxing. Phương pháp huấn luyện cường độ cao, tập trung vào phản xạ và sức bền tim mạch.',
    specialties: ['Boxing', 'Muay Thai', 'HIIT'],
    achievement: 'Huy chương Vàng Boxing trẻ toàn quốc'
  }
]

const Trainers = () => {
  // Quản lý PT đang được chọn
  const [activePT, setActivePT] = useState(trainersData[0])

  return (
    <section id="trainers" className="bg-zinc-950 py-24 px-4 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto">
        
        {/* TIÊU ĐỀ */}
        <div className="mb-16">
          <h2 className="text-orange-500 font-bold tracking-[0.3em] uppercase mb-2">Expert Team</h2>
          <h1 className="text-5xl font-black italic uppercase">Đội ngũ chuyên gia</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* CỘT TRÁI: DANH SÁCH TÊN PT (TABS) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {trainersData.map((pt) => (
              <button
                key={pt.id}
                onClick={() => setActivePT(pt)}
                className={`group flex items-center justify-between p-6 transition-all duration-300 border-l-4 ${
                  activePT.id === pt.id 
                  ? 'bg-zinc-900 border-orange-600' 
                  : 'bg-transparent border-zinc-800 hover:border-zinc-500'
                }`}
              >
                <div className="text-left">
                  <p className={`text-xs uppercase font-bold ${activePT.id === pt.id ? 'text-orange-500' : 'text-zinc-500'}`}>
                    {pt.role}
                  </p>
                  <h3 className="text-xl font-black tracking-tight">{pt.name}</h3>
                </div>
                <span className={`text-2xl transition-transform duration-300 ${activePT.id === pt.id ? 'translate-x-2 text-orange-500' : 'text-zinc-800'}`}>
                  →
                </span>
              </button>
            ))}
          </div>

          {/* CỘT PHẢI: CHI TIẾT PT (NỘI DUNG CHUYỂN ĐỔI) */}
          <div className="lg:col-span-8 bg-zinc-900/30 border border-zinc-900 p-8 md:p-12 relative overflow-hidden">
            {/* Hiệu ứng trang trí nền */}
            <div className="absolute -top-10 -right-10 text-[12rem] font-black text-white/[0.03] italic leading-none pointer-events-none uppercase">
              {activePT.nickname}
            </div>

            <div className="relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-wrap gap-4 mb-6">
                <span className="bg-orange-600 text-white text-[10px] font-black uppercase px-3 py-1 tracking-widest">
                  {activePT.experience} Kinh nghiệm
                </span>
                <span className="border border-zinc-700 text-zinc-400 text-[10px] font-black uppercase px-3 py-1 tracking-widest">
                  {activePT.achievement}
                </span>
              </div>

              <h2 className="text-6xl font-black italic uppercase mb-4 text-orange-500">
                {activePT.name}
              </h2>
              
              <p className="text-xl text-zinc-300 mb-8 leading-relaxed max-w-2xl">
                "{activePT.bio}"
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-zinc-800">
                <div>
                  <h4 className="text-orange-500 font-bold uppercase text-xs tracking-widest mb-4">Chuyên môn chính</h4>
                  <ul className="space-y-2">
                    {activePT.specialties.map((spec, index) => (
                      <li key={index} className="flex items-center gap-2 text-zinc-400 font-medium">
                        <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-end">
                  <button className="w-full bg-white text-black font-black py-4 uppercase tracking-tighter hover:bg-orange-500 hover:text-white transition-all">
                    Đặt lịch tập với {activePT.nickname}
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Trainers