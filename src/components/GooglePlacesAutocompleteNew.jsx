import { useEffect, useRef, useState } from "react";
import { loadGoogleMapsApi } from "../hooks/loadGoogleMaps.jsx";

function GooglePlacesAutocompleteNew({ apiKey, onSelect }) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const serviceRef = useRef(null);
  const ignoreNextInputEffect = useRef(false); // NEW

  useEffect(() => {
    loadGoogleMapsApi(apiKey)
      .then((google) => {
        serviceRef.current = new google.maps.places.AutocompleteService();
      })
      .catch((err) => {
        console.error("Failed to load Google Maps API", err);
      });
  }, [apiKey]);

  useEffect(() => {
    if (ignoreNextInputEffect.current) {
      ignoreNextInputEffect.current = false;
      return;
    }

    if (!serviceRef.current || input.length < 3) {
      setSuggestions([]);
      return;
    }

    serviceRef.current.getQueryPredictions({ input }, (predictions, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setSuggestions(predictions || []);
      } else {
        setSuggestions([]);
      }
    });
  }, [input]);

  const handleSelect = (suggestion) => {
    onSelect(suggestion);
    ignoreNextInputEffect.current = true;
    setInput(suggestion.description);
    setSuggestions([]);
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
              key={s.place_id}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSelect(s)}
            >
              {s.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GooglePlacesAutocompleteNew;
