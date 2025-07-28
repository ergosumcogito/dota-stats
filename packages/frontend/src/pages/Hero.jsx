import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import HeroHeader from '../components/HeroHeader';
import SuggestedItems from '../components/SuggestedItems';
import MatchupsTable from '../components/MatchupsTable';

const Hero = () => {
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const heroId = parseInt(searchParams.get('id'));

  useEffect(() => {
    const fetchHeroStats = async () => {
      try {
        const response = await fetch('https://api.opendota.com/api/heroStats');
        const data = await response.json();
        const selectedHero = data.find((h) => h.id === heroId);
        setHero(selectedHero);
      } catch (error) {
        console.error('Error loading hero data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroStats();
  }, [heroId]);

  if (loading) return <div className="text-white p-6">Loading...</div>;
  if (!hero) return <div className="text-red-500 p-6">Hero not found</div>;

  return (
    <div className="min-h-screen bg-[#0a192f] text-white">
      <HeroHeader hero={hero} />
      <SuggestedItems heroId={heroId} />
      <MatchupsTable heroId={heroId} />
    </div>
  );
};

export default Hero;
