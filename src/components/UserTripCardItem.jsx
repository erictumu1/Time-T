import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import placeholder from "../assets/placeholder.jpg";
import placeholder1 from "../assets/placeholder1.jpg";
import placeholder2 from "../assets/placeholder2.jpg";
import placeholder3 from "../assets/placeholder3.jpg";
import placeholder4 from "../assets/placeholder4.jpg";

const placeholders = [placeholder, placeholder1, placeholder2, placeholder3, placeholder4];

function UserTripCardItem({ trip }) {
  const [photoUrl, setPhotoUrl] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [placeholderIndex] = useState(() => Math.floor(Math.random() * placeholders.length));

  const fetchUnsplashPhoto = async () => {
    try {
      const query =
        trip?.userSelection?.location?.properties?.city +
        ", " +
        trip?.userSelection?.location?.properties?.country;

      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`
      );

      if (!response.ok) {
        console.error("Unsplash API error:", response.statusText);
        return;
      }

      const data = await response.json();
      const photoUrl = data?.results?.[0]?.urls?.regular;
      if (photoUrl) {
        setPhotoUrl(photoUrl);
      } else {
        console.warn("No image found for:", query);
      }
    } catch (error) {
      console.error("Error fetching Unsplash photo:", error);
    }
  };

  useEffect(() => {
    if (trip) fetchUnsplashPhoto();
  }, [trip]);

  useEffect(() => {
    if (!photoUrl) return;

    const img = new Image();
    img.src = photoUrl;
    img.onload = () => setLoaded(true);
  }, [photoUrl]);

  const displayImage = loaded && photoUrl ? photoUrl : placeholders[placeholderIndex];

  return (
    <Link to={"/view-trip/" + trip?.id}>
      <div className="flex flex-col rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-all">
        <div className="relative w-full aspect-square">
          <img
            src={displayImage}
            alt="Trip location"
            className="absolute w-full h-full object-cover"
            onLoad={() => setLoaded(true)}
            onError={() => {
              setLoaded(false);
              setPhotoUrl(""); // fallback to placeholder
            }}
            style={{
              opacity: loaded ? 1 : 1,
              transition: "opacity 0.7s ease-in-out",
            }}
          />
        </div>
        <div className="p-4 bg-white">
          <h2 className="font-bold text-lg">
            {(() => {
              const city = trip?.userSelection?.location?.properties?.city;
              const country = trip?.userSelection?.location?.properties?.country;
              if (!city || !country) return city || country || "Unknown location";
              return city.toLowerCase() === country.toLowerCase()
                ? city
                : `${city}, ${country}`;
            })()}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            <span className="text-red-700 font-medium">{trip?.userSelection?.noOfDays}</span>{" "}
            {trip.userSelection?.noOfDays === 1 ? "Day" : "Days"} Trip with a {trip?.userSelection?.budget} Budget.
          </p>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;
