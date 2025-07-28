import React, { useState, useEffect } from 'react';
import heroService from '../services/HeroService';
import PickRateBar from "components/PickRateBar";
import WinRateBar from "components/WinRateBar";
import { Link } from "react-router-dom";

const HeroList = () => {
    const [heroes, setHeroes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    useEffect(() => {
        const fetchHeroes = async () => {
            try {
                const heroData = await heroService.getHeroStats();
                setHeroes(heroData);
            } catch (err) {
                setError('Failed to load heroes');
            } finally {
                setLoading(false);
            }
        };

        fetchHeroes();
    }, []);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const getSortedHeroes = () => {
        if (!sortConfig.key) return heroes;

        return [...heroes].sort((a, b) => {
            let aValue, bValue;

            switch (sortConfig.key) {
                case 'name':
                    aValue = a.localized_name.toLowerCase();
                    bValue = b.localized_name.toLowerCase();
                    break;
                case 'overall_pick':
                    aValue = a.overall_pick_rate;
                    bValue = b.overall_pick_rate;
                    break;
                case 'overall_win':
                    aValue = a.overall_win_rate;
                    bValue = b.overall_win_rate;
                    break;
                case 'high_pick':
                    aValue = a.high_pick_rate;
                    bValue = b.high_pick_rate;
                    break;
                case 'high_win':
                    aValue = a.high_win_rate;
                    bValue = b.high_win_rate;
                    break;
                case 'mid_pick':
                    aValue = a.mid_pick_rate;
                    bValue = b.mid_pick_rate;
                    break;
                case 'mid_win':
                    aValue = a.mid_win_rate;
                    bValue = b.mid_win_rate;
                    break;
                case 'low_pick':
                    aValue = a.low_pick_rate;
                    bValue = b.low_pick_rate;
                    break;
                case 'low_win':
                    aValue = a.low_win_rate;
                    bValue = b.low_win_rate;
                    break;
                default:
                    return 0;
            }

            if (typeof aValue === 'string') {
                return sortConfig.direction === 'asc'
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            }

            return sortConfig.direction === 'asc'
                ? aValue - bValue
                : bValue - aValue;
        });
    };

    const getSortIcon = (columnKey) => {
        if (sortConfig.key !== columnKey) {
            return <span className="text-gray-400 ml-1">↕</span>;
        }
        return sortConfig.direction === 'asc'
            ? <span className="text-white ml-1">↑</span>
            : <span className="text-white ml-1">↓</span>;
    };

    if (loading) return <div className="text-text">Loading heroes...</div>;
    if (error) return <div className="text-accent">{error}</div>;

    const rankIconImmortal = "https://www.opendota.com/assets/images/dota2/rank_icons/rank_icon_8.png";
    const rankIconLegend = "https://www.opendota.com/assets/images/dota2/rank_icons/rank_icon_5.png";
    const rankIconCrusader = "https://www.opendota.com/assets/images/dota2/rank_icons/rank_icon_2.png";

    const sortedHeroes = getSortedHeroes();

    return (
        <div className="p-0 h-screen w-full mx-auto">
            <h1 className="text-3xl font-bold text-text mb-6 text-center">Heroes in Public Matches</h1>
            <div className="overflow-x-auto bg-box rounded-lg shadow-lg">
                <table className="w-full text-base">
                    <thead>
                    <tr className="border-b border-background bg-indigo-950">
                        <th
                            className="p-6 text-left text-text font-bold cursor-pointer hover:bg-indigo-900 transition-colors"
                            onClick={() => handleSort('name')}
                        >
                            Hero{getSortIcon('name')}
                        </th>
                        <th
                            className="p-6 text-center text-text font-bold cursor-pointer hover:bg-indigo-900 transition-colors"
                            onClick={() => handleSort('overall_pick')}
                        >
                            Overall<br/>Pick %{getSortIcon('overall_pick')}
                        </th>
                        <th
                            className="p-6 text-center text-text font-bold cursor-pointer hover:bg-indigo-900 transition-colors"
                            onClick={() => handleSort('overall_win')}
                        >
                            Overall<br/>Win %{getSortIcon('overall_win')}
                        </th>
                        <th
                            className="p-6 text-center text-text font-bold cursor-pointer transition-colors"
                            style={{ backgroundColor: 'rgba(12, 74, 110, 0.3)' }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(12, 74, 110, 0.6)'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(12, 74, 110, 0.3)'}
                            onClick={() => handleSort('high_pick')}
                        >
                            Imm/Div/Anc
                            <br/>Pick %{getSortIcon('high_pick')} <img src={rankIconImmortal} alt="Immortal Rank" className="w-5 h-5 ml-1 inline-block" />
                        </th>
                        <th
                            className="p-6 text-center text-text font-bold cursor-pointer transition-colors"
                            style={{ backgroundColor: 'rgba(22, 78, 99, 0.4)' }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(22, 78, 99, 0.7)'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(22, 78, 99, 0.4)'}
                            onClick={() => handleSort('high_win')}
                        >
                            Imm/Div/Anc
                            <br/>Win %{getSortIcon('high_win')} <img src={rankIconImmortal} alt="Immortal Rank" className="w-5 h-5 ml-1 inline-block" />
                        </th>
                        <th
                            className="p-6 text-center text-text font-bold cursor-pointer transition-colors"
                            style={{ backgroundColor: 'rgba(217, 119, 6, 0.4)' }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(217, 119, 6, 0.7)'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(217, 119, 6, 0.4)'}
                            onClick={() => handleSort('mid_pick')}
                        >
                            Legend/Archon
                            <br/>Pick %{getSortIcon('mid_pick')} <img src={rankIconLegend} alt="Legend Rank" className="w-5 h-5 ml-1 inline-block" />
                        </th>
                        <th
                            className="p-6 text-center text-text font-bold cursor-pointer transition-colors"
                            style={{ backgroundColor: 'rgba(217, 119, 6, 0.5)' }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(217, 119, 6, 0.8)'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(217, 119, 6, 0.5)'}
                            onClick={() => handleSort('mid_win')}
                        >
                            Legend/Archon
                            <br/>Win %{getSortIcon('mid_win')} <img src={rankIconLegend} alt="Legend Rank" className="w-5 h-5 ml-1 inline-block" />
                        </th>
                        <th
                            className="p-6 text-center text-text font-bold cursor-pointer transition-colors"
                            style={{ backgroundColor: 'rgba(4, 120, 87, 0.5)' }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(4, 120, 87, 0.8)'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(4, 120, 87, 0.5)'}
                            onClick={() => handleSort('low_pick')}
                        >
                            Cru/Guard/Her
                            <br/>Pick %{getSortIcon('low_pick')} <img src={rankIconCrusader} alt="Crusader Rank" className="w-5 h-5 ml-1 inline-block" />
                        </th>
                        <th
                            className="p-6 text-center text-text font-bold cursor-pointer transition-colors"
                            style={{ backgroundColor: 'rgba(4, 120, 87, 0.6)' }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(4, 120, 87, 0.9)'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(4, 120, 87, 0.6)'}
                            onClick={() => handleSort('low_win')}
                        >
                            Cru/Guard/Her
                            <br/>Win %{getSortIcon('low_win')} <img src={rankIconCrusader} alt="Crusader Rank" className="w-5 h-5 ml-1 inline-block" />
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {sortedHeroes.map((hero) => (
                        <tr
                            key={hero.id}
                            className="border-b border-background odd:bg-purple-950 even:bg-indigo-950 hover:bg-slate-900 transition-colors"
                        >
                            <td className="py-4 px-6 flex items-center gap-3">
                                <Link to={`/hero?id=${hero.id}`}>
                                    <img src={hero.img} alt={hero.name} className="w-8 h-8 rounded hover:scale-110 transition-transform duration-200" />
                                </Link>
                                <span className="text-text">{hero.localized_name}</span>
                            </td>

                            <td className="py-4 px-6 text-text text-center">
                                <div style={{ display: 'grid', placeItems: 'center' }}>
                                    <span>{(hero.overall_pick_rate * 100).toFixed(1)}%</span>
                                    <PickRateBar pickRate={hero.overall_pick_rate} color={hero.pick_rate_color} />
                                </div>
                            </td>
                            <td className="py-4 px-6 text-text text-center">
                                <div style={{ display: 'grid', placeItems: 'center' }}>
                                    <span>{(hero.overall_win_rate * 100).toFixed(1)}%</span>
                                    <WinRateBar winRate={hero.overall_win_rate} color={hero.win_rate_color} />
                                </div>
                            </td>
                            <td className="py-4 px-6 text-text text-center" style={{ backgroundColor: 'rgba(12, 74, 110, 0.3)' }}>
                                <div style={{ display: 'grid', placeItems: 'center' }}>
                                    <span>{(hero.high_pick_rate * 100).toFixed(1)}%</span>
                                    <PickRateBar pickRate={hero.high_pick_rate} color={hero.pick_rate_color} />
                                </div>
                            </td>
                            <td className="py-4 px-6 text-text text-center" style={{ backgroundColor: 'rgba(22, 78, 99, 0.4)' }}>
                                <div style={{ display: 'grid', placeItems: 'center' }}>
                                    <span>{(hero.high_win_rate * 100).toFixed(1)}%</span>
                                    <WinRateBar winRate={hero.high_win_rate} color={hero.win_rate_color} />
                                </div>
                            </td>
                            <td className="py-4 px-6 text-text text-center" style={{ backgroundColor: 'rgba(217, 119, 6, 0.4)' }}>
                                <div style={{ display: 'grid', placeItems: 'center' }}>
                                    <span>{(hero.mid_pick_rate * 100).toFixed(1)}%</span>
                                    <PickRateBar pickRate={hero.mid_pick_rate} color={hero.pick_rate_color} />
                                </div>
                            </td>
                            <td className="py-4 px-6 text-text text-center" style={{ backgroundColor: 'rgba(217, 119, 6, 0.5)' }}>
                                <div style={{ display: 'grid', placeItems: 'center' }}>
                                    <span>{(hero.mid_win_rate * 100).toFixed(1)}%</span>
                                    <WinRateBar winRate={hero.mid_win_rate} color={hero.win_rate_color} />
                                </div>
                            </td>
                            <td className="py-4 px-6 text-text text-center" style={{ backgroundColor: 'rgba(4, 120, 87, 0.5)' }}>
                                <div style={{ display: 'grid', placeItems: 'center' }}>
                                    <span>{(hero.low_pick_rate * 100).toFixed(1)}%</span>
                                    <PickRateBar pickRate={hero.low_pick_rate} color={hero.pick_rate_color} />
                                </div>
                            </td>
                            <td className="py-4 px-6 text-text text-center" style={{ backgroundColor: 'rgba(4, 120, 87, 0.6)' }}>
                                <div style={{ display: 'grid', placeItems: 'center' }}>
                                    <span>{(hero.low_win_rate * 100).toFixed(1)}%</span>
                                    <WinRateBar winRate={hero.low_win_rate} color={hero.win_rate_color} />
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HeroList;