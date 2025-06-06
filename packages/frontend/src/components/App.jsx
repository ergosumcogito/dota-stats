import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from 'pages/StartPage';
import PlayerProfilePage from "pages/PlayerProfilePage";
//import HeroList from './pages/HeroList';
//import HeroMatrix from './pages/HeroMatrix';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/player-search" element={<PlayerProfilePage />} />
                {/*<Route path="/hero-list" element={<HeroList />} />*/}
                {/*<Route path="/hero-matrix" element={<HeroMatrix />} />*/}
            </Routes>
        </Router>
    );
}

export default App;
