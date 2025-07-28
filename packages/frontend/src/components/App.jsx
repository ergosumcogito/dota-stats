import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from 'pages/StartPage';
import PlayerProfilePage from 'pages/PlayerProfilePage';

import Hero from 'pages/Hero';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0a192f] text-white">
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/player-search" element={<PlayerProfilePage />} />
          <Route path="/hero" element={<Hero />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
