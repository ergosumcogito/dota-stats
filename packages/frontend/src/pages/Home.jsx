import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
            <h1 className="text-4xl font-bold mb-6">Welcome to Dota 2 Stats Hub</h1>
            <nav className="space-x-4">
                <Link to="/player-search" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
                    Player Search
                </Link>
                <Link to="/hero-list" className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded">
                    Hero List
                </Link>
                <Link to="/hero-matrix" className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded">
                    Hero Matrix
                </Link>
            </nav>
        </div>
    );
}
