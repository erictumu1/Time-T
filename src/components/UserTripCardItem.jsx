import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import placeholder from "../assets/placeholder.jpg";
import placeholder1 from "../assets/placeholder1.jpg";
import placeholder2 from "../assets/placeholder2.jpg";
import placeholder3 from "../assets/placeholder3.jpg";
import placeholder4 from "../assets/placeholder4.jpg";
import { GetPlaceDetails } from "../service/GlobalAPI";

const placeholders = [placeholder, placeholder1, placeholder2, placeholder3, placeholder4];

function UserTripCardItem({ trip }) {
  const [photoUrl, setPhotoUrl] = useState("");
  const [loaded, setLoaded] = useState(false);

  const [placeholderIndex] = useState(() => Math.floor(Math.random() * placeholders.length));

  const fetchPhotos = async () => {
    try {
      const data = {
        textQuery: trip?.userSelection?.location?.description,
      };
      const result = await GetPlaceDetails(data);
      const photoArray = result?.data?.places?.[0]?.photos || [];
      if (photoArray.length === 0) {
        console.error("No photos found.");
        return;
      }

      const photoName = photoArray[0]?.name;
      if (photoName) {
        const url = `https://places.googleapis.com/v1/${photoName}/media?key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}&maxHeightPx=800`;
        setPhotoUrl(url);
      }
    } catch (error) {
      console.error("Error fetching photo details:", error);
    }
  };

  useEffect(() => {
    if (trip) {
      fetchPhotos();
    }
  }, [trip]);

  useEffect(() => {
    if (!photoUrl) return;

    const img = new Image();
    img.src = photoUrl;
    img.onload = () => {
      setLoaded(true);
      console.log("Preloaded image:", photoUrl);
    };
  }, [photoUrl]);

  const displayImage = loaded && photoUrl ? photoUrl : placeholders[placeholderIndex];
return (
  <Link to={'/view-trip/' + trip?.id}>
    <div className="flex flex-col rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-all">
      <div className="relative w-full aspect-square">
        <img
          src={displayImage}
          alt="Trip location"
          className="absolute w-full h-full object-cover"
          onLoad={() => setLoaded(true)}
          onError={() => {
            console.error("Failed to load image from Google.");
            setPhotoUrl("");
            setLoaded(false);
          }}
          style={{
            opacity: loaded ? 1 : 1,
            transition: "opacity 0.7s ease-in-out",
          }}
        />
      </div>
      <div className="p-4 bg-white">
        <h2 className="font-bold text-lg">{trip?.userSelection?.location?.description}</h2>
        <p className="text-sm text-gray-600 mt-1">
          {trip?.userSelection?.location?.description} <br />
          <span className="text-red-700 font-medium">{trip?.userSelection?.noOfDays}</span>{" "}
          {trip.userSelection?.noOfDays === 1 ? "Day" : "Days"} Trip with a {trip?.userSelection?.budget} Budget.
        </p>
      </div>
    </div>
  </Link>
);
}

export default UserTripCardItem;
