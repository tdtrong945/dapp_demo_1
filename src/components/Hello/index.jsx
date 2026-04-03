import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const GymWebsite = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập từ localStorage
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const currentUser = localStorage.getItem('currentUser');

    if (token && role && currentUser) {
      setUser({ username: currentUser, role });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('currentUser');
    setUser(null);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900">
        <div className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
          <div className="text-3xl font-black italic tracking-tighter text-orange-500">
            POWER<span className="text-white">GYM</span>
          </div>
          <ul className="hidden md:flex gap-10 text-sm font-bold uppercase tracking-widest">
            <li><a href="#" className="hover:text-orange-500">Trang chủ</a></li>
            <li><a href="#pricing" className="hover:text-orange-500">Gói tập</a></li>
            <li><a href="#trainers" className="hover:text-orange-500">Huấn luyện viên</a></li>
            <li><a href="#contact" className="hover:text-orange-500">Liên hệ</a></li>
          </ul>
          <div className="flex gap-3 items-center">
            {user ? (
              <>
                <span className="text-sm text-zinc-300">
                  Xin chào, <span className="text-orange-500 font-bold">{user.username}</span>
                  {user.role === 'admin' && <span className="text-red-400 ml-1">(Admin)</span>}
                </span>
                <Link
                  to={user.role === 'admin' ? '/admin-portal' : '/member-portal'}
                  className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-full font-bold text-sm transition-all"
                >
                  {user.role === 'admin' ? 'Admin Panel' : 'Member Portal'}
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-full font-bold text-sm transition-all"
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <Link to="/login" className="bg-orange-600 hover:bg-orange-500 px-6 py-2 rounded-full font-bold text-sm transition-all">
                ĐĂNG KÝ / ĐĂNG NHẬP
              </Link>
            )}
          </div>
        </div>
      </nav>

      <section className="relative flex flex-col items-center justify-center pt-48 pb-32 px-4 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-600/10 blur-[120px] rounded-full"></div>
        <h2 className="text-orange-500 font-bold tracking-[0.4em] uppercase mb-6 animate-bounce">No Pain, No Gain</h2>
        <h1 className="text-6xl md:text-9xl font-black leading-none uppercase italic mb-8 tracking-tighter">
          THÁCH THỨC <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-orange-400 to-orange-700">GIỚI HẠN</span>
        </h1>
        <p className="max-w-2xl text-zinc-400 text-lg md:text-xl mb-10 leading-relaxed">
          Đừng chỉ mơ ước về một thân hình đẹp. Hãy bắt đầu hành trình thay đổi vóc dáng của bạn tại môi trường tập luyện đẳng cấp nhất.
        </p>
        <div className="flex flex-col sm:flex-row gap-5">
          <a href="#contact" className="bg-white text-black font-black px-10 py-4 uppercase tracking-tighter hover:bg-orange-500 hover:text-white transition-all">Bắt đầu tập luyện</a>
          <a href="#pricing" className="border-2 border-zinc-700 px-10 py-4 uppercase font-black tracking-tighter hover:border-orange-500 transition-all">Xem bảng giá</a>
        </div>
      </section>
    </div>
  );
};

export default GymWebsite;