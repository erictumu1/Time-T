import { useEffect, useRef, useState } from "react";

function GeoapifyAutocomplete({ apiKey, onSelect }) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const debounceRef = useRef(null);
  const ignoreNextEffect = useRef(false);

  useEffect(() => {
    if (ignoreNextEffect.current) {
      ignoreNextEffect.current = false;
      return;
    }

    if (input.length < 3) {
      setSuggestions([]);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
          input
        )}&limit=5&apiKey=${apiKey}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.features) {
            const seen = new Set();
            const uniqueCities = data.features.filter((f) => {
              const city = f.properties.city || f.properties.name;
              const country = f.properties.country;
              if (!city || !country) return false;
            
              const key = `${city.toLowerCase()}-${country.toLowerCase()}`;
              if (seen.has(key)) return false;
            
              seen.add(key);
              return true;
            });
          
            setSuggestions(uniqueCities);
          } else {
            setSuggestions([]);
          }
        })
        .catch((err) => {
          console.error("Geoapify autocomplete error", err);
          setSuggestions([]);
        });
    }, 300);
  }, [input, apiKey]);

  const handleSelect = (suggestion) => {
    ignoreNextEffect.current = true;
    setInput(suggestion.properties.formatted);
    setSuggestions([]);
    onSelect(suggestion);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Enter a location"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-2 rounded w-full"
      />
      {suggestions.length > 0 && (
        <ul className="border mt-1 max-h-48 overflow-auto w-full absolute bg-white z-10">
          {suggestions.map((s) => (
            <li
              key={s.properties.place_id || s.properties.osm_id}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSelect(s)}
            >
              {s.properties.city || s.properties.name}, {s.properties.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GeoapifyAutocomplete;
