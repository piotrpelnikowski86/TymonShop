'use client';

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  // --- STAN: LIGHTBOX ---
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  // --- STAN: OKNA MODALE ---
  const [activeModal, setActiveModal] = useState<'knowledge' | 'quiz' | null>(null);

  // --- STAN: QUIZ ---
  const [quizQuestion, setQuizQuestion] = useState({ a: 1, b: 1 });
  const [quizScore, setQuizScore] = useState(0);
  const [quizMessage, setQuizMessage] = useState("");
  const [quizInput, setQuizInput] = useState("");

  // --- STAN: GRA ---
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameMode, setGameMode] = useState<'PvP' | 'PvC'>('PvP');
  const [player1, setPlayer1] = useState("Gracz X");
  const [player2, setPlayer2] = useState("Gracz Y");

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  // --- LOGIKA QUIZU ---
  const generateQuestion = () => {
    let a, b;
    do { a = Math.floor(Math.random() * 10) + 1; b = Math.floor(Math.random() * 10) + 1; } while (a * b > 30);
    setQuizQuestion({ a, b }); setQuizInput(""); setQuizMessage("");
  };
  const checkQuizAnswer = () => {
    if (parseInt(quizInput) === quizQuestion.a * quizQuestion.b) {
      setQuizScore(quizScore + 1); setQuizMessage("SUPER! DOBRZE! 🎉"); setTimeout(generateQuestion, 1500);
    } else { setQuizMessage("UPS... SPRÓBUJ JESZCZE RAZ 😅"); }
  };
  useEffect(() => { if (activeModal === 'quiz') { generateQuestion(); setQuizScore(0); } }, [activeModal]);

  // --- LOGIKA GRY ---
  const calculateWinner = (squares: any[]) => {
    const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    for (let i = 0; i < lines.length; i++) { const [a, b, c] = lines[i]; if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a]; }
    return null;
  };
  const handleClick = (i: number) => {
    if (calculateWinner(board) || board[i] || (gameMode === 'PvC' && !xIsNext)) return;
    const nextBoard = board.slice(); nextBoard[i] = xIsNext ? "X" : "O"; setBoard(nextBoard); setXIsNext(!xIsNext);
  };
  useEffect(() => {
    if (gameMode === 'PvC' && !xIsNext && !calculateWinner(board)) {
      const timer = setTimeout(() => {
        const empty = board.map((v, i) => v === null ? i : null).filter(v => v !== null);
        if (empty.length > 0) { const rnd = empty[Math.floor(Math.random() * empty.length)]; if (rnd !== undefined) { const n = [...board]; n[rnd] = "O"; setBoard(n); setXIsNext(true); } }
      }, 600); return () => clearTimeout(timer);
    }
  }, [xIsNext, gameMode, board]);
  const toggleGameMode = (mode: 'PvP' | 'PvC') => { setGameMode(mode); setBoard(Array(9).fill(null)); setXIsNext(true); if (mode === 'PvC') setPlayer2("KOMP"); else setPlayer2("Gracz Y"); };
  const winnerSymbol = calculateWinner(board);
  const status = winnerSymbol ? `WYGRYWA: ${winnerSymbol === 'X' ? player1 : player2} 🎉` : board.every(Boolean) ? "REMIS!" : `RUCH: ${xIsNext ? player1 : player2} (${xIsNext ? 'X' : 'O'})`;

  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-hidden relative selection:bg-lime-400 selection:text-black">
      
      {/* MODALE */}
      {zoomedImage && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4" onClick={() => setZoomedImage(null)}>
          <div className="relative w-full max-w-5xl h-[85vh]">
            <Image src={zoomedImage} alt="Zoom" fill className="object-contain" />
          </div>
          <button className="absolute top-4 right-4 text-white text-4xl">&times;</button>
        </div>
      )}

      {activeModal === 'knowledge' && (
        <div className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in zoom-in duration-300">
           <div className="bg-slate-800 border-2 border-blue-500 rounded-[2rem] p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-[0_0_50px_rgba(59,130,246,0.5)]">
              <button onClick={() => setActiveModal(null)} className="absolute top-4 right-6 text-slate-400 hover:text-white text-4xl font-black">&times;</button>
              <h2 className="text-3xl md:text-5xl font-black text-center mb-8 text-blue-400">TABLICZKA MNOŻENIA 🤓</h2>
              <div className="grid grid-cols-5 md:grid-cols-10 gap-2 text-center font-bold font-mono">
                 {Array.from({ length: 100 }, (_, i) => { const r = Math.floor(i / 10) + 1; const c = (i % 10) + 1; return (<div key={i} className={`p-2 rounded-lg ${r === 1 || c === 1 ? 'bg-blue-600 text-white' : 'bg-slate-700 text-blue-200'} hover:scale-110 transition-transform`}>{r * c}</div>) })}
              </div>
           </div>
        </div>
      )}

      {activeModal === 'quiz' && (
        <div className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in zoom-in duration-300">
           <div className="bg-slate-800 border-2 border-indigo-500 rounded-[2rem] p-8 max-w-2xl w-full relative shadow-[0_0_50px_rgba(99,102,241,0.5)] text-center">
              <button onClick={() => setActiveModal(null)} className="absolute top-4 right-6 text-slate-400 hover:text-white text-4xl font-black">&times;</button>
              <h2 className="text-3xl md:text-4xl font-black mb-4 text-indigo-400">SZYBKI TEST 🧠</h2>
              <div className="text-xl text-slate-400 mb-8">WYNIK: <span className="text-white font-bold text-2xl">{quizScore}</span> PKT</div>
              <div className="bg-slate-900 rounded-3xl p-10 mb-8 border border-white/10"><p className="text-6xl font-black mb-2">{quizQuestion.a} <span className="text-indigo-500">&times;</span> {quizQuestion.b} = ?</p></div>
              <div className="flex gap-4 justify-center mb-6">
                 <input type="number" value={quizInput} onChange={(e) => setQuizInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && checkQuizAnswer()} placeholder="..." className="bg-white text-black text-3xl font-bold text-center w-32 py-3 rounded-xl focus:outline-none focus:ring-4 ring-indigo-500" autoFocus />
                 <button onClick={checkQuizAnswer} className="bg-indigo-500 hover:bg-indigo-400 text-white text-xl font-bold px-8 py-3 rounded-xl transition-transform active:scale-95">SPRAWDŹ</button>
              </div>
              <p className={`text-xl font-bold h-8 ${quizMessage.includes("SUPER") ? "text-green-400" : "text-pink-500"}`}>{quizMessage}</p>
           </div>
        </div>
      )}

      {/* STRONA GŁÓWNA */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/30 via-slate-950 to-slate-950 z-0 pointer-events-none"></div>

      <nav className="relative z-50 p-6 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 border-b border-white/5">
        <div className="text-3xl md:text-4xl font-black tracking-tighter text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.6)] cursor-pointer" onClick={() => scrollToSection('hero')}>TYMON<span className="text-cyan-400">SHOP</span><span className="text-sm align-top text-lime-400 ml-1">PL</span></div>
        <ul className="flex gap-4 md:gap-10 text-xs md:text-lg font-bold tracking-widest bg-white/5 px-4 md:px-8 py-3 rounded-full border border-white/10 backdrop-blur-md">
          <li onClick={() => scrollToSection('omnie')} className="text-white hover:text-cyan-400 cursor-pointer transition-colors hover:scale-105">O MNIE</li>
          <li onClick={() => scrollToSection('gadzety')} className="text-lime-400 hover:text-lime-300 cursor-pointer transition-colors hover:scale-105">GADŻETY</li>
          <li onClick={() => scrollToSection('szkola')} className="text-blue-400 hover:text-blue-300 cursor-pointer transition-colors hover:scale-105">SZKOŁA</li>
          <li onClick={() => scrollToSection('rozrywka')} className="text-purple-400 hover:text-purple-300 cursor-pointer transition-colors hover:scale-105">ROZRYWKA</li>
        </ul>
      </nav>

      <section id="hero" className="relative z-10 flex flex-col items-center justify-center text-center mt-16 md:mt-24 px-4 mb-24">
        <div className="inline-flex items-center gap-2 bg-pink-600 text-white px-6 py-2 rounded-full font-bold text-sm md:text-base mb-8 -rotate-2 shadow-[0_0_20px_rgba(219,39,119,0.5)] animate-pulse border-2 border-pink-400">🚀 STARTUJEMY NIEDŁUGO!</div>
        <h1 className="text-6xl md:text-9xl font-black mb-6 leading-[0.9] tracking-tight">
          <span className="block text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 to-blue-600 drop-shadow-2xl">EPICKIE</span>
          <span className="block text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">RZECZY</span>
        </h1>
        <p className="text-lg md:text-2xl text-slate-300 max-w-2xl mb-12 font-medium leading-relaxed">Oficjalna baza Tymona. Tutaj znajdziesz <span className="text-lime-400 font-bold">najlepsze gadżety</span> oraz materiały do nauki.</p>
        <button onClick={() => scrollToSection('gadzety')} className="px-10 py-5 bg-lime-400 hover:bg-lime-300 text-black text-2xl font-black rounded-2xl transition-transform hover:scale-105 shadow-[0_0_40px_rgba(163,230,53,0.5)] border-b-4 border-lime-600 active:border-b-0 active:translate-y-1">💥 CHCĘ BYĆ PIERWSZY!</button>
      </section>

      <section id="omnie" className="relative z-10 mb-32 px-4">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl max-w-3xl mx-auto text-center">
            <div className="grid grid-cols-3 gap-4 text-center text-white font-black text-4xl">
                <div>14 <span className="text-sm block text-slate-500 font-normal">DNI</span></div>
                <div>08 <span className="text-sm block text-slate-500 font-normal">GODZIN</span></div>
                <div className="text-pink-500 animate-bounce">00 <span className="text-sm block text-slate-500 font-normal">MINUT</span></div>
            </div>
        </div>
      </section>

      {/* ================= GADŻETY ================= */}
      <section id="gadzety" className="relative z-10 py-20 px-4">
          <div className="text-center mb-16 relative">
               <div className="absolute inset-0 flex justify-center items-center opacity-10 pointer-events-none"><span className="text-[10rem] md:text-[15rem] font-black text-lime-500/10 tracking-tighter">SHOP</span></div>
               <span className="text-lime-400 font-bold tracking-widest uppercase mb-2 block relative">Oficjalny Sklep</span>
               <h2 className="text-4xl md:text-6xl font-black text-white drop-shadow-lg relative">TWOJE <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-500">GADŻETY</span></h2>
          </div>

          <div className="max-w-6xl mx-auto flex flex-col gap-16">
            
            {/* 1. ODZIEŻ (4 KAFELKI) */}
            <div>
                <h3 className="text-2xl font-black text-lime-400 mb-8 pl-4 border-l-4 border-lime-400 uppercase tracking-widest">Strefa: Odzież</h3>
                <div className="grid md:grid-cols-2 gap-8">
                    
                    {/* Bluza 1 (Kolor) */}
                    <div className="bg-slate-900/50 backdrop-blur-md border border-lime-400/20 rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(163,230,53,0.15)] p-8 flex flex-col group hover:border-lime-400/50 transition-all">
                        <div className="relative w-full aspect-square rounded-3xl overflow-hidden border-4 border-lime-400/30 shadow-2xl bg-white cursor-zoom-in hover:scale-105 transition-transform mb-6" onClick={() => setZoomedImage('/bluza_Tymon_kolor.png')}>
                            <Image src="/bluza_Tymon_kolor.png" alt="Bluza Kolor" fill className="object-cover" />
                            <div className="absolute top-2 right-2 bg-black text-lime-400 font-bold px-3 py-1 rounded-full text-xs">ZOOM 🔍</div>
                        </div>
                        <h3 className="text-3xl font-black mb-2">Bluza "Rainbow"</h3>
                        <p className="text-slate-400 mb-6 flex-grow">Najbardziej kolorowa bluza w szkole. Pokaż swój styl!</p>
                        <button className="w-full bg-lime-400 hover:bg-lime-300 text-black font-black text-lg px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(163,230,53,0.4)] transition-transform active:scale-95">DO KOSZYKA 🛒</button>
                    </div>

                    {/* Bluza 2 (Zielona) */}
                    <div className="bg-slate-900/50 backdrop-blur-md border border-lime-400/20 rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(163,230,53,0.15)] p-8 flex flex-col group hover:border-lime-400/50 transition-all">
                        <div className="relative w-full aspect-square rounded-3xl overflow-hidden border-4 border-lime-400/30 shadow-2xl bg-white cursor-zoom-in hover:scale-105 transition-transform mb-6" onClick={() => setZoomedImage('/bluza_Tymon_team.png')}>
                            <Image src="/bluza_Tymon_team.png" alt="Bluza Green" fill className="object-cover" />
                            <div className="absolute top-2 right-2 bg-black text-lime-400 font-bold px-3 py-1 rounded-full text-xs">ZOOM 🔍</div>
                        </div>
                        <h3 className="text-3xl font-black mb-2">Bluza "Classic Green"</h3>
                        <p className="text-slate-400 mb-6 flex-grow">Klasyczna zieleń z wielkim logo Tymon Team. Wygodna i ciepła.</p>
                        <button className="w-full bg-lime-400 hover:bg-lime-300 text-black font-black text-lg px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(163,230,53,0.4)] transition-transform active:scale-95">DO KOSZYKA 🛒</button>
                    </div>

                    {/* Bluza 3 (Dwa kolory) */}
                    <div className="bg-slate-900/50 backdrop-blur-md border border-lime-400/20 rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(163,230,53,0.15)] p-8 flex flex-col group hover:border-lime-400/50 transition-all">
                        <div className="relative w-full aspect-square rounded-3xl overflow-hidden border-4 border-lime-400/30 shadow-2xl bg-white cursor-zoom-in hover:scale-105 transition-transform mb-6" onClick={() => setZoomedImage('/bluza_Tymon_dwakolory.png')}>
                            <Image src="/bluza_Tymon_dwakolory.png" alt="Bluza Duo" fill className="object-cover" />
                            <div className="absolute top-2 right-2 bg-black text-lime-400 font-bold px-3 py-1 rounded-full text-xs">ZOOM 🔍</div>
                        </div>
                        <h3 className="text-3xl font-black mb-2">Bluza "Midnight"</h3>
                        <p className="text-slate-400 mb-6 flex-grow">Dostępna w wersji niebieskiej i czarnej. Wybierz swój kolor!</p>
                        <button className="w-full bg-lime-400 hover:bg-lime-300 text-black font-black text-lg px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(163,230,53,0.4)] transition-transform active:scale-95">DO KOSZYKA 🛒</button>
                    </div>

                    {/* Koszulka (Stara) */}
                    <div className="bg-slate-900/50 backdrop-blur-md border border-lime-400/20 rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(163,230,53,0.15)] p-8 flex flex-col group hover:border-lime-400/50 transition-all">
                        <div className="relative w-full aspect-square rounded-3xl overflow-hidden border-4 border-lime-400/30 shadow-2xl bg-white cursor-zoom-in hover:scale-105 transition-transform mb-6" onClick={() => setZoomedImage('/koszulka.png')}>
                            <Image src="/koszulka.png" alt="Koszulka" fill className="object-cover" />
                            <div className="absolute top-2 right-2 bg-black text-lime-400 font-bold px-3 py-1 rounded-full text-xs">ZOOM 🔍</div>
                        </div>
                        <h3 className="text-3xl font-black mb-2">T-Shirt "Tymon Team"</h3>
                        <p className="text-slate-400 mb-6 flex-grow">Lekka koszulka na WF i na co dzień.</p>
                        <button className="w-full bg-lime-400 hover:bg-lime-300 text-black font-black text-lg px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(163,230,53,0.4)] transition-transform active:scale-95">DO KOSZYKA 🛒</button>
                    </div>

                </div>
            </div>

             {/* 2. ZESZYTY */}
            <div>
                <h3 className="text-2xl font-black text-pink-500 mb-8 pl-4 border-l-4 border-pink-500 uppercase tracking-widest">Strefa: Szkoła</h3>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-slate-900/50 backdrop-blur-md border border-pink-500/20 rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(236,72,153,0.15)] p-8 flex flex-col group hover:border-pink-500/50 transition-all">
                        <div className="relative w-full aspect-square rounded-3xl overflow-hidden border-4 border-pink-500/30 shadow-2xl bg-white cursor-zoom-in hover:scale-105 transition-transform mb-6" onClick={() => setZoomedImage('/zeszyty.png')}>
                            <Image src="/zeszyty.png" alt="Zeszyty" fill className="object-cover" />
                            <div className="absolute top-2 right-2 bg-black text-pink-500 font-bold px-3 py-1 rounded-full text-xs">ZOOM 🔍</div>
                        </div>
                        <h3 className="text-3xl font-black mb-2">Zeszyty "TEAM"</h3>
                        <p className="text-slate-400 mb-6 flex-grow">Zestaw trzech zeszytów do zadań specjalnych. Pokaż, że należysz do ekipy!</p>
                        <button className="w-full bg-pink-500 hover:bg-pink-400 text-white font-black text-lg px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-transform active:scale-95">DO KOSZYKA 🎒</button>
                    </div>
                </div>
            </div>

            {/* 3. SOKI */}
            <div>
                <h3 className="text-2xl font-black text-orange-400 mb-8 pl-4 border-l-4 border-orange-400 uppercase tracking-widest">Strefa: Orzeźwienie</h3>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-slate-900/50 backdrop-blur-md border border-orange-400/20 rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(251,146,60,0.15)] p-8 flex flex-col group hover:border-orange-400/50 transition-all">
                        <div className="relative w-full aspect-square rounded-3xl overflow-hidden border-4 border-orange-400/30 shadow-2xl bg-white cursor-zoom-in hover:scale-105 transition-transform mb-6" onClick={() => setZoomedImage('/soki.png')}>
                            <Image src="/soki.png" alt="Soki Tymonek" fill className="object-cover" />
                            <div className="absolute top-2 right-2 bg-black text-orange-400 font-bold px-3 py-1 rounded-full text-xs">ZOOM 🔍</div>
                        </div>
                        <h3 className="text-3xl font-black mb-2">Soki "Tymonek"</h3>
                        <p className="text-slate-400 mb-6 flex-grow">Pyszne, zdrowe soki w epickich opakowaniach. Pomarańcza, winogrono i jabłko!</p>
                        <button className="w-full bg-orange-400 hover:bg-orange-300 text-black font-black text-lg px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(251,146,60,0.4)] transition-transform active:scale-95">DO KOSZYKA 🧃</button>
                    </div>
                </div>
            </div>

          </div>
      </section>

      {/* CENTRUM WIEDZY */}
      <section id="szkola" className="relative z-10 py-20 px-4">
          <div className="text-center mb-16 relative">
                <div className="absolute inset-0 flex justify-center items-center opacity-10 pointer-events-none"><span className="text-[10rem] md:text-[15rem] font-black text-blue-500/10 tracking-tighter">BRAIN</span></div>
               <span className="text-blue-400 font-bold tracking-widest uppercase mb-2 block relative">Strefa Nauki</span>
               <h2 className="text-4xl md:text-6xl font-black text-white drop-shadow-lg relative">CENTRUM <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">WIEDZY</span></h2>
          </div>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
               <div className="bg-gradient-to-br from-blue-900/50 to-slate-900 border border-blue-500/30 p-10 rounded-[3rem] text-center hover:scale-105 transition-all duration-300 cursor-pointer group shadow-[0_0_40px_rgba(59,130,246,0.2)]">
                  <div className="text-7xl mb-6 group-hover:animate-bounce">📚</div>
                  <h3 className="text-3xl font-black text-white mb-4">MATERIAŁY</h3>
                  <p className="text-slate-400 mb-8">Ściągi, notatki i wszystko, co potrzebne, żeby zdać na 6.</p>
                  <button onClick={() => setActiveModal('knowledge')} className="px-8 py-3 bg-blue-500 text-white font-bold rounded-xl group-hover:bg-blue-400 transition-colors shadow-lg">OTWÓRZ BAZĘ ➜</button>
               </div>
               <div className="bg-gradient-to-br from-indigo-900/50 to-slate-900 border border-indigo-500/30 p-10 rounded-[3rem] text-center hover:scale-105 transition-all duration-300 cursor-pointer group shadow-[0_0_40px_rgba(99,102,241,0.2)]">
                  <div className="text-7xl mb-6 group-hover:animate-pulse">🧠</div>
                  <h3 className="text-3xl font-black text-white mb-4">SPRAWDZIANY</h3>
                  <p className="text-slate-400 mb-8">Rozwiąż quiz i sprawdź, czy jesteś gotowy na lekcję.</p>
                  <button onClick={() => setActiveModal('quiz')} className="px-8 py-3 bg-indigo-500 text-white font-bold rounded-xl group-hover:bg-indigo-400 transition-colors shadow-lg">ROZPOCZNIJ TEST ➜</button>
               </div>
          </div>
      </section>

      {/* STREFA ROZRYWKI */}
      <section id="rozrywka" className="relative z-10 py-24 px-4 mb-20 bg-slate-900/30 backdrop-blur-sm mt-20">
          <div className="text-center mb-10">
               <h2 className="text-4xl md:text-6xl font-black text-white mb-4">STREFA <span className="text-purple-400">ROZRYWKI</span></h2>
               <p className="text-slate-400 font-bold tracking-widest uppercase">Przerwa w nauce? Zagraj!</p>
          </div>
          <div className="max-w-xl mx-auto bg-slate-900 border-2 border-purple-500/50 rounded-3xl p-8 shadow-[0_0_60px_rgba(168,85,247,0.3)]">
              <div className="flex flex-col gap-4 mb-8 p-4 bg-slate-800/50 rounded-2xl border border-white/5">
                  <div className="flex justify-center gap-4">
                      <button onClick={() => toggleGameMode('PvP')} className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${gameMode === 'PvP' ? 'bg-purple-500 text-white shadow-lg' : 'bg-slate-700 text-slate-400'}`}>👥 Gra z Kumplem</button>
                      <button onClick={() => toggleGameMode('PvC')} className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${gameMode === 'PvC' ? 'bg-purple-500 text-white shadow-lg' : 'bg-slate-700 text-slate-400'}`}>🤖 Gra z Kompem</button>
                  </div>
                  <div className="flex gap-4 items-center">
                      <div className="flex-1">
                          <label className="text-xs text-slate-500 font-bold block mb-1 ml-2">GRACZ X</label>
                          <input type="text" value={player1} onChange={(e) => setPlayer1(e.target.value)} className="w-full bg-slate-900 border border-purple-500/30 rounded-xl px-4 py-2 text-white font-bold focus:outline-none focus:border-purple-500 text-center" />
                      </div>
                      <div className="text-purple-500 font-black">VS</div>
                      <div className="flex-1">
                          <label className="text-xs text-slate-500 font-bold block mb-1 ml-2">GRACZ O</label>
                          <input type="text" value={player2} disabled={gameMode === 'PvC'} onChange={(e) => setPlayer2(e.target.value)} className={`w-full bg-slate-900 border border-cyan-400/30 rounded-xl px-4 py-2 text-white font-bold focus:outline-none focus:border-cyan-400 text-center ${gameMode === 'PvC' ? 'opacity-50' : ''}`} />
                      </div>
                  </div>
              </div>
              <div className="text-center mb-8"><div className={`text-2xl font-black text-white py-3 rounded-xl border border-white/10 ${winnerSymbol ? 'bg-green-600 animate-bounce' : 'bg-slate-800'}`}>{status}</div></div>
              <div className="grid grid-cols-3 gap-3 mb-8">
                  {board.map((square, i) => (
                    // DODANO outline-none i select-none DO PRZYCISKÓW GRY
                    <button key={i} className={`h-24 md:h-32 text-5xl md:text-7xl font-black rounded-xl transition-all duration-200 outline-none select-none ${square === 'X' ? 'text-purple-500 bg-purple-500/10 border-2 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]' : ''} ${square === 'O' ? 'text-cyan-400 bg-cyan-400/10 border-2 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]' : ''} ${!square ? 'bg-slate-800 hover:bg-slate-700' : ''}`} onClick={() => handleClick(i)}>{square}</button>
                  ))}
              </div>
              <button onClick={() => { setBoard(Array(9).fill(null)); setXIsNext(true); }} className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl font-bold text-white text-lg transition-transform hover:scale-105 shadow-lg">🔄 ZAGRAJ JESZCZE RAZ</button>
          </div>
      </section>

      <div className="absolute top-20 left-10 w-32 h-32 bg-purple-600 rounded-full blur-[100px] opacity-40 animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-cyan-600 rounded-full blur-[150px] opacity-20 pointer-events-none"></div>

    </main>
  );
}