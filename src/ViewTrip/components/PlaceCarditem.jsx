import { Button } from "@/components/ui/button";
import { useEffect, useState } from 'react';
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import place from "../../assets/place.jpg";
import place1 from "../../assets/place1.jpg";
import place2 from "../../assets/place2.jpg";
import place3 from "../../assets/place3.jpg";
import place4 from "../../assets/place4.jpg";
import { GetPlaceDetails } from "../../service/GlobalAPI";

const placeholders = [place, place1, place2, place3, place4];

function PlaceCarditem({ place, index }) {
  const [photoUrl, setPhotoUrl] = useState("");
  const [photos, setPhotos] = useState([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);//Use this if you want to make the images from google to keep changing
  //const currentPhotoIndex = 0;  // Here there is no cycling of images

  const [placeholderIndex, setPlaceholderIndex] = useState(() =>
    Math.floor(Math.random() * placeholders.length)
  );

  // cycle placeholder images if no Google photo found
  useEffect(() => {
    if (!photoUrl) {
      const interval = setInterval(() => {
        setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [photoUrl]);

  useEffect(() => {
    if (place) {
      fetchPhotos();
    }
  }, [place]);

  useEffect(() => {
    if (photos.length > 0) {
      const photoName = photos[currentPhotoIndex]?.name;
      if (photoName) {
        const url = `https://places.googleapis.com/v1/${photoName}/media?key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}&maxHeightPx=800`;
        const img = new Image();
        img.src = url;
        img.onload = () => setPhotoUrl(url);
      }
    }
  }, [currentPhotoIndex, photos]);

  const fetchPhotos = async () => {
    try {
      const data = { textQuery: place.placeName };
      const result = await GetPlaceDetails(data);
      const photoArray = result?.data?.places?.[0]?.photos || [];
      if (photoArray.length === 0) {
        console.warn("No photos found for", place.placeName);
        return;
      }
      setPhotos(photoArray);
    } catch (error) {
      console.error("Error fetching photo details:", error);
    }
  };

  const displayImage = photoUrl || placeholders[placeholderIndex];

  return (
    <Link to={`https://www.google.com/maps/search/?api=1&query=${place?.placeName}`} target="_blank">
      <div className="flex gap-5 border border-gray-400 rounded-2xl p-3 mt-2 hover:scale-105 transition-all hover:shadow-md shadow-blue-200 cursor-pointer">
        <img src={displayImage} className="w-[130px] h-[130px] rounded-xl object-cover" alt={place?.placeName || "Destination"} />
        <div>
          <h2 className="font-bold text-lg">{place.placeName}</h2>
          <p className="text-sm text-gray-500">{place.placeDetails}</p>
          {index === 0 ? (
            <h2 className="text-green-500 font-medium text-sm">First destination</h2>
          ) : (
            <h2 className="mt-2 text-sm">🕒 {place.travelTimeFromPrevious} from previous destination.</h2>
          )}
          <Button size="sm" className='bg-red-700 text-white px-6 py-3 rounded-md hover:bg-black transition cursor-pointer mt-2'>
            <FaMapLocationDot />
          </Button>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCarditem;
