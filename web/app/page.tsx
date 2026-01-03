'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

// Tutaj będziemy importować gotowe komponenty w kolejnych krokach
// import CreativeZone from '@/components/features/CreativeZone';
// import KnowledgeBase from '@/components/features/KnowledgeBase';
// import GameCenter from '@/components/games/GameCenter';

export default function Home() {
  const [activeSection, setActiveSection] = useState('start');

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(id);
  };

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-gray-100 selection:bg-blue-500/30">
      
      {/* --- NAWIGACJA (Tymczasowa, zaraz wydzielimy do komponentu) --- */}
      <nav className="fixed top-0 w-full z-50 bg-[#1a1a1a]/80 backdrop-blur-md border-b border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-black tracking-tighter text-gray-200">
            TYMON<span className="text-blue-500">TEAM</span>
          </h1>
          <ul className="flex gap-6 text-sm font-bold tracking-wide text-gray-400">
            <li onClick={() => scrollTo('kreatywna')} className="hover:text-blue-400 cursor-pointer transition">KREATYWNOŚĆ</li>
            <li onClick={() => scrollTo('wiedza')} className="hover:text-green-400 cursor-pointer transition">WIEDZA</li>
            <li onClick={() => scrollTo('gry')} className="hover:text-purple-400 cursor-pointer transition">GRY & 3D</li>
          </ul>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-20 px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            NOWA ERA NAUKI
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Strefa Wiedzy, Projekty 3D i Rozrywka na najwyższym poziomie.
          </p>
        </motion.div>
      </section>

      {/* --- STREFA KREATYWNA (Zamiast Sklepu) --- */}
      <section id="kreatywna" className="py-20 px-6 border-t border-white/5 bg-[#1f1f1f]">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold mb-10 text-blue-400 flex items-center gap-3">
            🎨 STREFA KREATYWNA <span className="text-sm text-gray-500 font-normal">(Projekty i Design)</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Placeholder na projekty zeszytów */}
            <div className="h-64 bg-[#252525] rounded-2xl border border-white/5 flex items-center justify-center soft-glow">
              <p className="text-gray-500">Tu pojawią się projekty Zeszytów</p>
            </div>
            <div className="h-64 bg-[#252525] rounded-2xl border border-white/5 flex items-center justify-center soft-glow">
              <p className="text-gray-500">Tu pojawią się projekty Soków</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- STREFA WIEDZY (Szkoła + Kalkulator) --- */}
      <section id="wiedza" className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold mb-10 text-green-400">📚 SZKOŁA & WIEDZA</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="p-8 bg-[#252525] rounded-3xl border border-white/5 soft-glow">
              <h4 className="text-xl font-bold mb-4">Quizy i Nauka</h4>
              <p className="text-gray-400">Miejsce na nowy Quiz Matematyczny i Angielski (z CMS).</p>
            </div>
            <div className="p-8 bg-[#252525] rounded-3xl border border-white/5 soft-glow">
              <h4 className="text-xl font-bold mb-4">Kalkulator & Tabliczka</h4>
              <p className="text-gray-400">Tu wdrożymy kalkulator ręczny.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- GRY (Kubki 3D, Szachy, Kółko i Krzyżyk) --- */}
      <section id="gry" className="py-20 px-6 border-t border-white/5 bg-[#1f1f1f]">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold mb-10 text-purple-400">🕹️ STREFA GIER</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="aspect-square bg-black/40 rounded-xl border border-purple-500/20 flex flex-col items-center justify-center hover:border-purple-500 transition cursor-pointer">
               <span className="text-4xl mb-4">♟️</span>
               <span className="font-bold">SZACHY (Coming Soon)</span>
             </div>
             <div className="aspect-square bg-black/40 rounded-xl border border-purple-500/20 flex flex-col items-center justify-center hover:border-purple-500 transition cursor-pointer">
               <span className="text-4xl mb-4">🥤</span>
               <span className="font-bold">3 KUBKI (3D Physics)</span>
             </div>
             <div className="aspect-square bg-black/40 rounded-xl border border-purple-500/20 flex flex-col items-center justify-center hover:border-purple-500 transition cursor-pointer">
               <span className="text-4xl mb-4">❌⭕</span>
               <span className="font-bold">KÓŁKO I KRZYŻYK</span>
             </div>
          </div>
        </div>
      </section>

    </main>
  );
}