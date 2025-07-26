import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from 'pages/StartPage';
import PlayerProfilePage from "pages/PlayerProfilePage";
import NotFoundPage from "pages/NotFoundPage";
//import HeroList from './pages/HeroList';
//import HeroMatrix from './pages/HeroMatrix';

function App() {
    return (
        <Router>
            <div className="max-w-5xl w-full mx-auto px-4 py-3">
            <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/player-search/:playerId?" element={<PlayerProfilePage />} />
                {/*<Route path="/hero-list" element={<HeroList />} />*/}
                {/*<Route path="/hero-matrix" element={<HeroMatrix />} />*/}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            </div>
        </Router>
    );
}

export default App;
