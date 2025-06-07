import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import hotel from "../../assets/hotel.jpg";
import hotel1 from "../../assets/hotel1.jpg";
import hotel2 from "../../assets/hotel2.jpg";
import hotel3 from "../../assets/hotel3.jpg";
import hotel4 from "../../assets/hotel4.jpg";

const placeholders = [hotel, hotel1, hotel2, hotel3, hotel4];

function HotelCardItem({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(() =>
    Math.floor(Math.random() * placeholders.length)
  );

  useEffect(() => {
    fetchHotelImage();
  }, [hotel]);

  const fetchHotelImage = async () => {
    try {
      const query = hotel?.hotelName || "hotel";
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=3&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`
      );

      if (!response.ok) {
        console.error("Unsplash API error:", response.statusText);
        return;
      }

      const data = await response.json();
      if (data.results.length > 0) {
        setPhotoUrl(data.results[0].urls.regular); // Use the first image
      } else {
        console.warn("No Unsplash images found.");
      }
    } catch (error) {
      console.error("Error fetching Unsplash images:", error);
    }
  };

  const displayImage = photoUrl || placeholders[placeholderIndex];

return (
  <Link
    to={`https://www.google.com/maps/search/?api=1&query=${hotel?.hotelName} ${hotel?.hotelAddress}`}
    target="_blank"
  >
    <motion.div
      className="my-3 cursor-pointer"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <img
        src={displayImage}
        className="rounded-xl w-full h-48 object-cover"
        alt={hotel?.hotelName || "Hotel"}
      />
      <div className="my-2 flex flex-col">
        <h2 className="font-medium">{hotel?.hotelName}</h2>
        <h2 className="text-xs text-gray-500">📍{hotel?.hotelAddress}</h2>
        <h2 className="text-sm text-blue-950 font-medium">{hotel?.price}</h2>
        <h2 className="text-sm text-blue-950">
          <span className="font-medium">Rating: </span>⭐{hotel?.rating}
        </h2>
      </div>
    </motion.div>
  </Link>
);
}

export default HotelCardItem;
