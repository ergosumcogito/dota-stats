import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from 'pages/StartPage';
import PlayerProfilePage from 'pages/PlayerProfilePage';
import Hero from 'pages/Hero';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0a192f] text-white">
          {/*<div className="w-full mx-auto px-4 py-3">*/}
          <Routes>
          <Route path="/" element={<StartPage />} />
            <Route path="/player-search/:playerId?" element={<PlayerProfilePage />} />
          <Route path="/hero" element={<Hero />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
