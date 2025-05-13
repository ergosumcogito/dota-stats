import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from 'pages/Home';
import PlayerProfilePage from "pages/PlayerProfilePage";
//import HeroList from './pages/HeroList';
//import HeroMatrix from './pages/HeroMatrix';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/player-search" element={<PlayerProfilePage />} />
                {/*<Route path="/hero-list" element={<HeroList />} />*/}
                {/*<Route path="/hero-matrix" element={<HeroMatrix />} />*/}
            </Routes>
        </Router>
    );
}

export default App;
