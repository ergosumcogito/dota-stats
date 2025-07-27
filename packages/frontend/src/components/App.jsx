import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from 'pages/StartPage';
import PlayerProfilePage from "pages/PlayerProfilePage";
import HeroList from 'pages/HeroList';
import NotFoundPage from "pages/NotFoundPage";
//import HeroMatrix from './pages/HeroMatrix';

function App() {
    return (
        <Router>
            <div className="w-full mx-auto px-4 py-3">
            <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/player-search" element={<PlayerProfilePage />} />
                <Route path="/hero-list" element={<HeroList />} />
                <Route path="/player-search/:playerId?" element={<PlayerProfilePage />} />
                {/*<Route path="/hero-matrix" element={<HeroMatrix />} />*/}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            </div>
        </Router>
    );
}

export default App;
