import { Link } from 'react-router-dom';
import logo from 'assets/logo.png';

export default function StartPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
            <img src={logo} className="w-72 h-72 object-contain" alt="Logo"/>
            <h1 className="text-5xl font-sans font-[800] text-text mb-2">Dota Stats</h1>
            <h2 className="text-xl font-sans font-[400] text-primary mb-12">Know the meta. Become <em className="italic">undefeatable</em>.</h2>
            <nav className="space-x-4">
                <Link to="/player-search" className="btn start-btn-player">
                    Player's Profile
                </Link>
                <Link to="/hero-list" className="btn start-btn-meta">
                    Heroes Meta
                </Link>
                <Link to="/hero-matrix" className="btn start-btn-hero">
                    Hero's Stats
                </Link>
            </nav>
        </div>
    );
}
