import React from "react";

const HeroHeader = ({ hero }) => {
  const {
    img,
    localized_name,
    primary_attr,
    roles,
    base_str,
    str_gain,
    base_agi,
    agi_gain,
    base_int,
    int_gain,
    base_health,
    base_health_regen,
    base_mana,
    base_mana_regen,
    base_attack_min,
    base_attack_max,
    move_speed,
    attack_range,
    base_armor
  } = hero;

  const getAttrIcon = (attr) => {
    switch (attr) {
      case "str":
        return "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_strength.png";
      case "agi":
        return "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_agility.png";
      case "int":
        return "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_intelligence.png";
      default:
        return "";
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-[#122f38] to-[#1e4954] rounded-md p-8 flex items-start justify-between text-white">
      {/* Левая часть */}
      <div className="flex gap-6 items-start">
        <img
          src={`https://cdn.cloudflare.steamstatic.com${img}`}
          alt={localized_name}
          className="w-[130px] h-[130px] object-cover rounded"
        />
        <div className="flex flex-col gap-3">
          <div>
            <h2 className="text-3xl font-bold">{localized_name}</h2>
            <p className="text-base text-gray-300 mt-1">{roles.join(" · ").toUpperCase()}</p>
          </div>

          {/* Атрибуты */}
          <div className="flex gap-6 text-xl mt-2">
            <div className="flex items-center gap-2 text-red-400">
              <img src={getAttrIcon("str")} alt="str" className="w-5 h-5" />
              <span>{base_str} + {str_gain}</span>
            </div>
            <div className="flex items-center gap-2 text-[#d44aff]">
              <img src={getAttrIcon("agi")} alt="agi" className="w-5 h-5" />
              <span>{base_agi} + {agi_gain}</span>
            </div>
            <div className="flex items-center gap-2 text-cyan-300">
              <img src={getAttrIcon("int")} alt="int" className="w-5 h-5" />
              <span>{base_int} + {int_gain}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Правая часть — Статы */}
      <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-lg leading-relaxed text-white text-right">
        <p><strong>Health:</strong> {base_health}</p>
        <p><strong>Health Regen:</strong> {base_health_regen}</p>
        <p><strong>Mana:</strong> {base_mana}</p>
        <p><strong>Mana Regen:</strong> {base_mana_regen}</p>
        <p><strong>Attack:</strong> {base_attack_min}–{base_attack_max}</p>
        <p><strong>Move Speed:</strong> {move_speed}</p>
        <p><strong>Range:</strong> {attack_range}</p>
        <p><strong>Base Armor:</strong> {base_armor.toFixed(1)} ({(base_armor * 0.06 * 100).toFixed(0)}%)</p>
      </div>
    </div>
  );
};

export default HeroHeader;
