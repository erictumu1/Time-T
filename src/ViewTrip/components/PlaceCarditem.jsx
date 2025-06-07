import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import place from "../../assets/place.jpg";
import place1 from "../../assets/place1.jpg";
import place2 from "../../assets/place2.jpg";
import place3 from "../../assets/place3.jpg";
import place4 from "../../assets/place4.jpg";

const placeholders = [place, place1, place2, place3, place4];

function PlaceCarditem({ place, index }) {
  const [photoUrl, setPhotoUrl] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(() =>
    Math.floor(Math.random() * placeholders.length)
  );

  useEffect(() => {
    if (place?.placeName) {
      fetchUnsplashPhoto(place.placeName);
    }
  }, [place]);

  useEffect(() => {
    if (!photoUrl) {
      const interval = setInterval(() => {
        setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [photoUrl]);

  const fetchUnsplashPhoto = async (query) => {
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}&per_page=1`
      );
      const data = await res.json();
      const imgUrl = data?.results?.[0]?.urls?.regular;
      if (imgUrl) setPhotoUrl(imgUrl);
    } catch (error) {
      console.error("Error fetching Unsplash image:", error);
    }
  };

  const displayImage = photoUrl || placeholders[placeholderIndex];

return (
  <Link
    to={`https://www.google.com/maps/search/?api=1&query=${place?.placeName}`}
    target="_blank"
  >
    <motion.div
      className="flex gap-5 border border-gray-400 rounded-2xl p-3 mt-2 hover:shadow-md shadow-blue-200 cursor-pointer"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <img
        src={displayImage}
        className="w-[130px] h-[130px] rounded-xl object-cover"
        alt={place?.placeName || "Destination"}
      />
      <div>
        <h2 className="font-bold text-lg">
          {/lunch|dinner/i.test(place.placeName) && place.placeName.includes(" in ")
            ? (() => {
                const [main, location] = place.placeName.split(" in ");
                return (
                  <>
                    {main}
                    <span className="text-white"> in {location}</span>
                  </>
                );
              })()
            : place.placeName}
        </h2>
        <p className="text-sm text-gray-500">{place.placeDetails}</p>
        {index === 0 ? (
          <h2 className="text-green-500 font-medium text-sm">First destination</h2>
        ) : (
          <h2 className="mt-2 text-sm">
            🕒 {place.travelTimeFromPrevious} from previous destination.
          </h2>
        )}
        <Button size="sm" className="bg-red-700 text-white px-6 py-3 rounded-md hover:bg-black transition cursor-pointer mt-2">
          <FaMapLocationDot />
        </Button>
      </div>
    </motion.div>
  </Link>
);
}

export default PlaceCarditem;
