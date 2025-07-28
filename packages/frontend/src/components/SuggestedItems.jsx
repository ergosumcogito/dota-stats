import React, { useEffect, useState } from "react";
import axios from "axios";

const Tooltip = ({ data, position }) => {
  const { dname, cost, desc, attrib, lore, history, img } = data;

  return (
    <div
      className="fixed z-50 bg-[#0d1117] text-white text-sm rounded-lg shadow-xl w-[300px] px-4 py-3 pointer-events-none"
      style={{
        top: `${position.y + 8}px`,
        left: `${position.x + 12}px`,
      }}
    >
      <div className="flex items-center gap-3 mb-2">
        <img
          src={`https://cdn.cloudflare.steamstatic.com${img}`}
          alt={dname}
          className="w-10 h-10 rounded"
        />
        <div>
          <div className="uppercase font-bold text-[13px]">{dname}</div>
          <div className="text-yellow-400 text-xs font-medium">{cost} 🪙</div>
        </div>
      </div>

      {desc && (
        <div
          className="text-xs text-gray-200 mb-2 whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: desc }}
        />
      )}

      {attrib?.length > 0 && (
        <ul className="text-xs text-gray-300 list-disc list-inside mb-2">
          {attrib.map((attr, i) => {
            const value = Array.isArray(attr.value)
              ? attr.value.join(" / ")
              : attr.value;

            const defaultLabels = [
              "Attack Speed",
              "Movement Speed",
              "Mana Regen",
              "Health Regen",
              "Armor",
              "Magic Resistance",
              "Spell Amplification",
              "Agility",
              "Strength",
              "Intelligence",
              "All Attributes",
              "Damage",
              "Attack Damage",
              "Cast Range",
              "Cooldown Reduction",
              "Status Resistance",
              "Evasion",
              "Health",
              "Mana",
              "HP per second",
              "MP per second",
            ];

            const label = attr.label || attr.footer || defaultLabels[i] || "";

            return (
              <li key={i}>
                <span className="text-yellow-300 font-semibold">+{value}</span>
                {label && <span className="text-white"> {label}</span>}
              </li>
            );
          })}
        </ul>
      )}

      {lore && (
        <div className="italic text-gray-400 text-xs mb-2">{lore}</div>
      )}

      {history?.length > 0 && (
        <div className="text-[11px] text-gray-500 space-y-1 border-t border-gray-700 pt-2">
          {history.map((h, i) => (
            <div key={i}>
              <span className="text-yellow-400">{h[0]}: </span>
              <span>{h[1]}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ItemImage = ({ itemKey, details, onHover, onLeave }) => {
  return (
    <img
      src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/items/${itemKey}_lg.png`}
      alt={itemKey}
      className="w-12 h-12 object-contain transition-transform duration-150 hover:scale-110 cursor-pointer"
      onMouseEnter={(e) => onHover(details, { x: e.clientX, y: e.clientY })}
      onMouseMove={(e) => onHover(details, { x: e.clientX, y: e.clientY })}
      onMouseLeave={onLeave}
    />
  );
};

const SuggestedItems = ({ heroId }) => {
  const [itemBuild, setItemBuild] = useState(null);
  const [itemDetails, setItemDetails] = useState({});
  const [tooltipData, setTooltipData] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const [itemsRes, popRes] = await Promise.all([
          axios.get("https://api.opendota.com/api/constants/items"),
          axios.get(`https://api.opendota.com/api/heroes/${heroId}/itemPopularity`),
        ]);

        const itemData = itemsRes.data;
        const itemMeta = {};

        for (const [key, value] of Object.entries(itemData)) {
          itemMeta[key] = {
            ...value,
            dname: value.dname || key,
            cost: value.cost || 0,
            img: value.img || "",
            attrib: value.attrib || [],
            desc: value.desc || "",
            lore: value.lore || "",
            history: value.history || [],
          };
        }

        const idToKey = {};
        for (const [key, val] of Object.entries(itemData)) {
          if (val.id !== undefined) idToKey[val.id] = key;
        }

        const convert = (obj) =>
          Object.entries(obj || {})
            .sort(([, a], [, b]) => b - a)
            .slice(0, 20)
            .map(([id]) => idToKey[id])
            .filter(Boolean);

        const data = popRes.data;

        setItemBuild({
          "START GAME": convert(data.start_game_items),
          "EARLY GAME": convert(data.early_game_items),
          "MID GAME": convert(data.mid_game_items),
          "LATE GAME": convert(data.late_game_items),
        });

        setItemDetails(itemMeta);
      } catch (err) {
        console.error("Ошибка загрузки предметов:", err);
      }
    };

    if (heroId) fetchItems();
  }, [heroId]);

  const handleHover = (itemData, position) => {
    setTooltipData(itemData);
    setTooltipPosition(position);
  };

  const handleLeave = () => {
    setTooltipData(null);
  };

  if (!itemBuild) {
    return (
      <div className="text-white text-center mt-10">
        Loading suggested items...
      </div>
    );
  }

  return (
    <div className="w-full mt-10 px-4 text-white font-sans relative">
      <div className="bg-[#213056] py-5 mb-4">
        <h2 className="text-2xl text-white text-center font-bold tracking-wide">
          Suggested Items
        </h2>
      </div>

      <div className="bg-[#151e34] p-6 rounded-md overflow-x-auto">
        <div className="flex flex-row gap-12 justify-between">
          {Object.entries(itemBuild).map(([phase, items]) => (
            <div key={phase} className="flex flex-col min-w-[220px]">
              <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide text-white text-center">
                {phase}
              </h3>
              <div className="grid grid-cols-6 gap-2">
                {items.map((key, idx) => (
                  <ItemImage
                    key={idx}
                    itemKey={key}
                    details={itemDetails[key]}
                    onHover={handleHover}
                    onLeave={handleLeave}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {tooltipData && (
        <Tooltip data={tooltipData} position={tooltipPosition} />
      )}
    </div>
  );
};

export default SuggestedItems;
