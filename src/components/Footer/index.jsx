import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-16 px-6 border-t border-zinc-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        

        <div className="md:col-span-1">
          <Link to="/" className="text-2xl font-black italic tracking-tighter text-orange-600 mb-6 block">
            POWER<span className="text-white">GYM</span>
          </Link>
          <p className="text-zinc-500 text-xs leading-relaxed uppercase font-bold tracking-tighter">
            Hệ thống phòng tập Web3 đầu tiên tại Việt Nam. Thay đổi hình thể, làm chủ công nghệ.
          </p>
        </div>


        <div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 mb-6">Khám phá</h4>
          <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            <li><a href="#home" className="hover:text-white transition-colors">Trang chủ</a></li>
            <li><a href="#pricing" className="hover:text-white transition-colors">Gói tập</a></li>
            <li><a href="#trainers" className="hover:text-white transition-colors">Huấn luyện viên</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 mb-6">Hội viên</h4>
          <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            <li><Link to="/me" className="hover:text-white transition-colors">Hồ sơ của tôi</Link></li>
            <li><Link to="/admin-portal" className="hover:text-white transition-colors opacity-30">Admin Portal</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 mb-6">Liên hệ</h4>
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 leading-loose">
            Số 1 UTC, Cầu Giấy, Hà Nội <br />
            Hotline: 1900 6789 <br />
            Email: contact@powergym.io
          </p>
        </div>
      </div>


      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-zinc-900 flex justify-between items-center text-[8px] font-black uppercase tracking-[0.4em] text-zinc-700">
        <p>© 2026 POWER GYM WEB3 PROJECT</p>
        <p>DESIGNED BY TRONG TRAN</p>
      </div>

      <div className="absolute top-0 left-0 w-64 h-64 bg-orange-600/5 blur-[100px] rounded-full"></div>
    </footer>
  );
};

export default Footer;