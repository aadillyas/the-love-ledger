import React, { useState, useEffect, useCallback } from 'react';

// --- CONSOLIDATED DATA FROM YOUR TABLES ---
const APP_DATA = {
  wifeName: "Yumna",
  unlockPassword: "matcha",
  theme: {
    primary: "#9B4444", 
    secondary: "#E2C799", 
    background: "#FAF7F2", 
    text: "#2C3333", 
  },
  letters: [
    {
      id: 1,
      trigger: "Read this when you've had a long day",
      title: "Just relax my choop",
      content: "You're the light at the end of my dark gloomy days and I hope I can be the same for you. Every night getting in bed to spend way too long talking about topics that we've already exhausted makes life worth living <3",
      image: "https://i.imgur.com/tkQCF2u.jpeg",
      size: "large"
    },
    {
      id: 2,
      trigger: "Read this when I've definitely annoyed you",
      title: "But you still love me right?",
      content: "I'm sorry if I'm too FAT - no but you're ability to bear with my teeny tiny irrational behaviour tendencies is the best in the world my love. May Allah reward your patience with all the money I can give you",
      image: "https://i.imgur.com/jbPDEB0.jpeg",
      size: "medium"
    },
    {
      id: 3,
      trigger: "Read this when you’re missing me",
      title: "July 29 no more missing",
      content: "When I don't see you for a minute there's a twinge, when it's an hour it's like a stab through my heart and when it's a day I feel like someone has shoved their hand into my lungs and pulled out all the oxygen. Pls no more \"how much u miss me...\" now",
      image: "https://i.imgur.com/PsK5bsP.jpeg",
      size: "large"
    },
    {
      id: 4,
      trigger: "Read this when you're \"Hangry\"",
      title: "Better you than me....",
      content: "I love that you love to eat. I promise eventually we'll get healthier but for now there's so many burgers to explore that I just can't commit to it yet. But I truly do love so much how you always make time and energy for the things I like my angel.",
      image: "https://i.imgur.com/jsOtf4l.jpeg",
      size: "small"
    },
    {
      id: 5,
      trigger: "Read this when you're doubting yourself",
      title: "My genie beanie",
      content: "Baby you truly are so smart, so talented, so BEAUTIFUL - don't ever think you are limited, I am your #1 supporter in ANYTHING and EVERYTHING you want to do an become and will be right behind you no matter what. I love to be behind you...",
      image: "https://i.imgur.com/jWAlexO.jpeg",
      size: "medium"
    },
    {
      id: 6,
      trigger: "Read this when you're overstimulated",
      title: "Ooowaaoowaaoo (Wicked song)",
      content: "EvErY SeCONd CouNTS...no but fr pls don't leave me ever thank u SO much",
      image: "https://i.imgur.com/7VIEsbX.jpeg",
      size: "small"
    },
    {
      id: 8,
      trigger: "Read this on the toilet",
      title: "Poopster",
      content: "Because from 29th July you won't need to read it anymore I will be there physically with you for everything. No more personal space <3",
      image: "https://i.imgur.com/Rk2qLS0.jpeg",
      size: "medium"
    },
    {
      id: 9,
      trigger: "Read this when you can't decide what to eat",
      title: "I'm paying",
      content: "The answer is always whatever you want, as long as it's not the same thing we had yesterday. Or is it? I love exploring new tastes with you.",
      image: "https://i.imgur.com/tkQCF2u.jpeg", 
      size: "small"
    }
  ],
  wordleList: [
    { word: "LATTE", hint: "You're favourite bevvy", reward: "One Iced Latte with sugar syrup free!" },
    { word: "ANGEL", hint: "Wings", reward: "Please get your passport so we can fly" },
    { word: "CHOOP", hint: "Favourite CH name", reward: "Chungus was too long" },
    { word: "GALLE", hint: "Our first trip", reward: "Let's go again" },
    { word: "INDIA", hint: "Your fave food country", reward: "Hungry now...." },
    { word: "GRIND", hint: "The go-to", reward: "Matcha time" },
    { word: "CAFES", hint: "Spend too much money in these", reward: "Oh dear" },
    { word: "SLURP", hint: "I want to X you", reward: "Wink" }
  ],
  // Updated Spotify ID
  playlistId: "4pS28I5KG9OAyAxcG0Ws36" 
};

// --- SVG ICON COMPONENT ---
const Icon = ({ name, size = 24, fill = "none", color = "currentColor" }) => {
  const paths = {
    heart: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
    mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
    game: "M6 12h4 M8 10v4 M15 13h.01 M18 11h.01 M2 6h20v12H2z",
    camera: "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
    music: "M9 18V5l12-2v13 M6 18a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M18 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
    x: "M18 6 6 18M6 6l12 12",
    trophy: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6 M18 9h1.5a2.5 2.5 0 0 0 0-5H18 M4 22h16 M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22 M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22 M18 2H6v7a6 6 0 0 0 12 0V2Z",
    delete: "M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z M18 9l-6 6 M12 9l6 6",
    sparkles: "m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"
  };

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={paths[name] || ""} />
    </svg>
  );
};

// --- SUB-COMPONENTS ---

const NavButton = ({ id, iconName, label, view, setView, primaryColor }) => {
  const isSelected = view === id;
  return (
    <button onClick={() => setView(id)} className={`flex flex-col items-center gap-1 transition-all ${isSelected ? 'text-[#9B4444] scale-110' : 'text-gray-400 hover:text-gray-600'}`}>
      <div className={`p-2 rounded-xl transition-all ${isSelected ? 'bg-[#9B4444]/10' : 'bg-transparent'}`}>
        <Icon name={iconName} size={22} fill={isSelected ? primaryColor : 'none'} color={isSelected ? primaryColor : 'currentColor'} />
      </div>
      <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
    </button>
  );
};

const LandingView = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.toLowerCase() === APP_DATA.unlockPassword.toLowerCase()) {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#FAF7F2]">
      <div className="w-full max-w-md animate-fade-in-up">
        <div className="text-center mb-12">
          <div className="inline-block p-4 rounded-full bg-white shadow-sm mb-6">
            <Icon name="heart" color={APP_DATA.theme.primary} size={32} />
          </div>
          <h1 className="text-4xl font-serif italic text-gray-900 mb-2">Hello, {APP_DATA.wifeName}.</h1>
          <p className="text-gray-400 text-sm tracking-[0.2em] uppercase">I've been waiting for you.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8 text-center">
          <div className="space-y-4">
            <label className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-400 block text-center">Please enter your secret key</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="What's the code?"
              className="w-full bg-white border border-gray-100 rounded-3xl px-6 py-5 text-center text-xl outline-none focus:border-[#9B4444]/30 transition-all shadow-sm"
            />
          </div>
          {error && <p className="text-[#9B4444] text-xs animate-shake italic">That's not it, my love... try again.</p>}
          <button type="submit" className="w-full bg-[#9B4444] text-white rounded-3xl py-5 font-bold uppercase tracking-[0.25em] text-xs shadow-xl shadow-[#9B4444]/20 transform active:scale-95 transition-all">Enter the Archive</button>
        </form>
      </div>
    </div>
  );
};

const LetterModal = ({ letter, onClose }) => {
  if (!letter) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="bg-[#FAF7F2] w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl animate-modal-in">
        <div className="relative h-64 sm:h-96 overflow-hidden">
          <img src={letter.image} alt="Postcard" className="w-full h-full object-cover" />
          <button onClick={onClose} className="absolute top-6 right-6 p-3 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-all transform hover:rotate-90">
            <Icon name="x" size={24} />
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
            <p className="text-white/80 text-xs font-bold tracking-[0.3em] uppercase mb-2">{letter.trigger}</p>
            <h2 className="text-white text-4xl font-serif italic">{letter.title}</h2>
          </div>
        </div>
        <div className="p-10 sm:p-14 overflow-y-auto max-h-[60vh]">
          <div className="max-w-prose mx-auto">
            <p className="text-xl leading-relaxed text-gray-800 font-serif italic whitespace-pre-wrap">{letter.content}</p>
            <div className="mt-12 pt-8 border-t border-[#E2C799]/30 flex justify-between items-center text-gray-400 italic">
              <div>Forever yours,<br/><span className="text-gray-600 font-semibold not-italic tracking-wide uppercase text-xs">Aadil</span></div>
              <div className="animate-pulse-slow"><Icon name="heart" fill={APP_DATA.theme.primary} color={APP_DATA.theme.primary} size={24} /></div>
            </div>
            <button onClick={onClose} className="mt-10 w-full py-4 border border-gray-200 rounded-xl text-gray-400 text-sm hover:text-[#9B4444] transition-all font-medium uppercase tracking-widest">Close Letter</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ArchiveView = ({ onSelectLetter }) => (
  <div className="max-w-6xl mx-auto px-4 py-12 animate-fade-in">
    <header className="text-center mb-16 animate-fade-in-up">
      <span className="text-sm font-bold tracking-[0.4em] text-[#9B4444] uppercase mb-3 block">Personal Notes</span>
      <h1 className="text-6xl font-serif italic text-gray-900">The Love Archive</h1>
      <div className="w-16 h-[1px] bg-[#E2C799] mx-auto mt-8"></div>
    </header>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[220px]">
      {APP_DATA.letters.map((letter) => {
        const sizeClasses = { large: "md:col-span-2 md:row-span-2", medium: "md:col-span-2 md:row-span-1", small: "md:col-span-1 md:row-span-1" };
        return (
          <button key={letter.id} onClick={() => onSelectLetter(letter)} className={`${sizeClasses[letter.size] || ""} group relative bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 text-left transform hover:-translate-y-1`}>
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 opacity-30 grayscale group-hover:grayscale-0 group-hover:opacity-60" style={{ backgroundImage: `url(${letter.image})` }} />
            <div className="relative h-full p-10 flex flex-col justify-end bg-gradient-to-t from-white/90 via-white/40 to-transparent">
              <div className="absolute top-8 right-8 text-gray-300 group-hover:text-[#9B4444] transition-all transform group-hover:rotate-12"><Icon name="mail" size={28} /></div>
              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase text-gray-500 mb-3 font-bold group-hover:text-[#9B4444]">Select to open</p>
                <h3 className="text-2xl font-serif italic text-gray-800 leading-tight group-hover:translate-x-1 transition-transform">{letter.trigger}</h3>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  </div>
);

const WordleView = () => {
  const [currentChallenge, setCurrentChallenge] = useState(() => APP_DATA.wordleList[Math.floor(Math.random() * APP_DATA.wordleList.length)]);
  const [guesses, setGuesses] = useState(Array(6).fill(''));
  const [currentGuess, setCurrentGuess] = useState('');
  const [completedGuesses, setCompletedGuesses] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [shakeRow, setShakeRow] = useState(-1);
  
  const solution = currentChallenge.word.toUpperCase();

  const resetGame = () => {
    setCurrentChallenge(APP_DATA.wordleList[Math.floor(Math.random() * APP_DATA.wordleList.length)]);
    setGuesses(Array(6).fill(''));
    setCurrentGuess('');
    setCompletedGuesses([]);
    setGameOver(false);
  };

  const onKey = useCallback((key) => {
    if (gameOver) return;
    if (key === 'ENTER' || key === 'SUBMIT') {
      if (currentGuess.length !== 5) { setShakeRow(completedGuesses.length); setTimeout(() => setShakeRow(-1), 500); return; }
      const newGuesses = [...completedGuesses, currentGuess];
      setCompletedGuesses(newGuesses);
      setCurrentGuess('');
      if (currentGuess === solution || newGuesses.length === 6) setGameOver(true);
    } else if (key === 'BACKSPACE' || key === 'DEL') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (/^[A-Z]$/.test(key) && currentGuess.length < 5) {
      setCurrentGuess(prev => prev + key.toUpperCase());
    }
  }, [currentGuess, completedGuesses, gameOver, solution]);

  useEffect(() => {
    const handleKeyDown = (e) => onKey(e.key.toUpperCase());
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onKey]);

  const getStatus = (char) => {
    let status = 'default';
    completedGuesses.forEach(guess => {
      guess.split('').forEach((letter, i) => {
        if (letter !== char) return;
        if (solution[i] === letter) status = 'correct';
        else if (solution.includes(letter) && status !== 'correct') status = 'present';
        else if (status === 'default') status = 'absent';
      });
    });
    return status;
  };

  const keyboardRows = [['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'], ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'], ['DEL', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'SUBMIT']];

  return (
    <div className="max-w-md mx-auto px-4 py-8 flex flex-col items-center min-h-[85vh] animate-fade-in">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-serif italic mb-4 text-center">Love Wordle</h2>
        <div className="bg-white/50 border border-[#E2C799]/40 rounded-2xl px-6 py-3 text-sm text-gray-600 shadow-sm mx-auto flex flex-col items-center">
          <span className="font-bold uppercase tracking-widest text-[10px] text-[#9B4444] block mb-1">Daily Hint</span>
          <span className="italic text-center">"{currentChallenge.hint}"</span>
        </div>
      </div>
      <div className="grid grid-rows-6 gap-3 mb-12">
        {[0, 1, 2, 3, 4, 5].map((rowIdx) => {
          const isCurrent = rowIdx === completedGuesses.length;
          const isCompleted = rowIdx < completedGuesses.length;
          const word = isCurrent ? currentGuess.padEnd(5) : (completedGuesses[rowIdx] || '').padEnd(5);
          return (
            <div key={rowIdx} className={`flex gap-3 ${shakeRow === rowIdx ? 'animate-shake' : ''}`}>
              {word.split('').map((letter, i) => {
                let statusClass = "bg-white/80 border-gray-200 text-gray-800";
                if (isCompleted) {
                  const guess = completedGuesses[rowIdx];
                  if (guess[i] === solution[i]) statusClass = "bg-[#9B4444] border-[#9B4444] text-white animate-flip";
                  else if (solution.includes(guess[i])) statusClass = "bg-[#E2C799] border-[#E2C799] text-white animate-flip";
                  else statusClass = "bg-gray-400 border-gray-400 text-white animate-flip";
                } else if (isCurrent && letter !== ' ') statusClass = "bg-white border-[#9B4444] scale-105 shadow-md";
                return <div key={i} style={{ animationDelay: `${i * 100}ms` }} className={`w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center text-2xl font-bold rounded-xl border-2 transition-all ${statusClass}`}>{letter !== ' ' ? letter : ''}</div>;
              })}
            </div>
          );
        })}
      </div>
      <div className="w-full space-y-3">
        {keyboardRows.map((row, i) => (
          <div key={i} className="flex justify-center gap-2">
            {row.map(key => {
              const status = getStatus(key);
              let bgColor = "bg-white text-gray-700";
              if (status === 'correct') bgColor = "bg-[#9B4444] text-white";
              else if (status === 'present') bgColor = "bg-[#E2C799] text-white";
              else if (status === 'absent') bgColor = "bg-gray-400 text-white";
              const isSpecial = key === 'SUBMIT' || key === 'DEL';
              return <button key={key} onClick={() => onKey(key)} className={`${isSpecial ? 'px-4 text-[10px] flex-grow' : 'w-10 sm:w-12'} h-14 flex items-center justify-center rounded-xl font-bold uppercase transition-all active:scale-90 border border-gray-100 shadow-sm ${bgColor}`}>
                {key === 'DEL' ? <Icon name="delete" size={20} /> : key}
              </button>;
            })}
          </div>
        ))}
      </div>
      {gameOver && (
        <div className="mt-12 text-center animate-fade-in flex flex-col items-center">
          <div className="text-[#E2C799] mb-4 animate-bounce-custom"><Icon name="trophy" size={56} /></div>
          <h3 className="text-3xl font-serif italic mb-2">
            {completedGuesses.length > 0 && completedGuesses[completedGuesses.length-1] === solution ? "You Won!" : "Try again, Love!"}
          </h3>
          <p className="text-gray-600 mb-6">{currentChallenge.reward}</p>
          <button onClick={resetGame} className="px-6 py-2 bg-[#9B4444] text-white rounded-full font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform">Play Another Word</button>
        </div>
      )}
    </div>
  );
};

const PhotosView = () => (
  <div className="max-w-6xl mx-auto px-4 py-12 animate-fade-in">
    <header className="text-center mb-16 animate-fade-in-up">
      <span className="text-sm font-bold tracking-[0.4em] text-[#9B4444] uppercase mb-3 block">Our Journey</span>
      <h1 className="text-6xl font-serif italic text-gray-900">Memory Wall</h1>
    </header>
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
      {APP_DATA.letters.map((letter, i) => (
        <div key={i} className="relative group overflow-hidden rounded-[2rem] shadow-lg transform transition-all hover:scale-[1.02] animate-float-slow" style={{ animationDelay: `${i * 0.5}s` }}>
          <img src={letter.image} className="w-full object-cover group-hover:scale-110 transition-transform duration-[2s]" alt="Memory" />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Icon name="heart" fill="white" color="white" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const PlaylistView = () => (
  <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
    <header className="text-center mb-16 animate-fade-in-up">
      <span className="text-sm font-bold tracking-[0.4em] text-[#9B4444] uppercase mb-3 block">Soundtrack</span>
      <h1 className="text-6xl font-serif italic text-gray-900">For Your Ears</h1>
    </header>
    <div className="bg-white rounded-[3rem] p-8 shadow-2xl border border-[#E2C799]/20 flex flex-col md:flex-row gap-12 items-center relative overflow-hidden">
      <div className="absolute -top-12 -right-12 text-[#E2C799]/10"><Icon name="music" size={200} /></div>
      <div className="relative z-10 w-full md:w-1/2">
        <h2 className="text-3xl font-serif italic text-gray-800 mb-6">Songs that remind me of us.</h2>
        <p className="text-gray-600 leading-relaxed mb-8">Every track here represents a moment we've shared. Listen while you explore the archive.</p>
        <div className="flex items-center gap-4 text-[#9B4444]"><Icon name="sparkles" size={20} /><span className="text-xs font-bold uppercase tracking-widest">Our Private Playlist</span></div>
      </div>
      <div className="w-full md:w-1/2 rounded-2xl overflow-hidden shadow-xl border-8 border-[#FAF7F2]">
        <iframe 
          style={{ borderRadius: "12px" }}
          src={`https://open.spotify.com/embed/playlist/${APP_DATA.playlistId}?utm_source=generator&theme=0`} 
          width="100%" 
          height="352" 
          frameBorder="0" 
          allowFullScreen="" 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          loading="lazy"
        ></iframe>
      </div>
    </div>
  </div>
);

// --- MAIN APP ---

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [view, setView] = useState('archive');
  const [selectedLetter, setSelectedLetter] = useState(null);

  if (!isUnlocked) return <LandingView onUnlock={() => setIsUnlocked(true)} />;

  return (
    <div className="min-h-screen font-sans selection:bg-[#9B4444]/20" style={{ backgroundColor: APP_DATA.theme.background, color: APP_DATA.theme.text }}>
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-md">
        <div className="bg-white/90 backdrop-blur-2xl border border-white px-8 py-4 rounded-[2.5rem] shadow-2xl flex items-center justify-between">
          <NavButton id="archive" iconName="mail" label="Letters" view={view} setView={setView} primaryColor={APP_DATA.theme.primary} />
          <NavButton id="wordle" iconName="game" label="Game" view={view} setView={setView} primaryColor={APP_DATA.theme.primary} />
          <NavButton id="photos" iconName="camera" label="Photos" view={view} setView={setView} primaryColor={APP_DATA.theme.primary} />
          <NavButton id="playlist" iconName="music" label="Music" view={view} setView={setView} primaryColor={APP_DATA.theme.primary} />
        </div>
      </nav>
      <main className="pb-40 pt-12">
        {view === 'archive' && <ArchiveView onSelectLetter={setSelectedLetter} />}
        {view === 'wordle' && <WordleView />}
        {view === 'photos' && <PhotosView />}
        {view === 'playlist' && <PlaylistView />}
      </main>
      <LetterModal letter={selectedLetter} onClose={() => setSelectedLetter(null)} />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Inter:wght@400;500;600;700&display=swap');
        body { font-family: 'Inter', sans-serif; overflow-x: hidden; margin: 0; }
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes modalIn { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes flip { 0% { transform: rotateX(0); } 50% { transform: rotateX(90deg); } 100% { transform: rotateX(0); } }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 20%, 60% { transform: translateX(-5px); } 40%, 80% { transform: translateX(5px); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        @keyframes bounceCustom { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .animate-fade-in { animation: fadeIn 0.8s ease forwards; }
        .animate-fade-in-up { animation: fadeInUp 1s ease forwards; }
        .animate-modal-in { animation: modalIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-flip { animation: flip 0.6s ease forwards; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        .animate-float-slow { animation: float 6s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse 3s ease-in-out infinite; }
        .animate-bounce-custom { animation: bounceCustom 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
