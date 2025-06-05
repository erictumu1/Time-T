import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import hotel from "../../assets/hotel.jpg";
import hotel1 from "../../assets/hotel1.jpg";
import hotel2 from "../../assets/hotel2.jpg";
import hotel3 from "../../assets/hotel3.jpg";
import hotel4 from "../../assets/hotel4.jpg";
import { GetPlaceDetails } from "../../service/GlobalAPI";

const placeholders = [hotel, hotel1, hotel2, hotel3, hotel4];

function HotelCardItem({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState("");
  const [photos, setPhotos] = useState([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const [placeholderIndex, setPlaceholderIndex] = useState(() =>
    Math.floor(Math.random() * placeholders.length)
  );

  useEffect(() => {
    if (!photoUrl) {
      const interval = setInterval(() => {
        setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [photoUrl]);

  useEffect(() => {
    if (hotel) {
      fetchPhotos();
    }
  }, [hotel]);

  useEffect(() => {
    if (photos.length > 0) {
      const photoName = photos[currentPhotoIndex]?.name;
      if (photoName) {
        const url = `https://places.googleapis.com/v1/${photoName}/media?key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}&maxHeightPx=800`;
        const img = new Image();
        img.src = url;
        img.onload = () => setPhotoUrl(url); // Only set if it loads successfully
      }
    }
  }, [currentPhotoIndex, photos]);

  const fetchPhotos = async () => {
    try {
      const data = { textQuery: hotel?.hotelName };
      const result = await GetPlaceDetails(data);
      const photoArray = result?.data?.places?.[0]?.photos || [];
      if (photoArray.length === 0) {
        console.error("No photos found.");
        return;
      }
      setPhotos(photoArray);
    } catch (error) {
      console.error("Error fetching photo details:", error);
    }
  };

  const displayImage = photoUrl ? photoUrl : placeholders[placeholderIndex];

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${hotel?.hotelName} ${hotel?.hotelAddress}`}
      target="_blank"
    >
      <div className="my-3 hover:scale-105 transition-all cursor-pointer">
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
            <span className="font-medium text-blue-950">Rating: </span>⭐{hotel?.rating}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default HotelCardItem;
