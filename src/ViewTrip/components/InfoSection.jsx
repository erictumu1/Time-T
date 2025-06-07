import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BsFillSendArrowUpFill } from "react-icons/bs";
import placeholder from "../../assets/placeholder.jpg";
import placeholder1 from "../../assets/placeholder1.jpg";
import placeholder2 from "../../assets/placeholder2.jpg";
import placeholder3 from "../../assets/placeholder3.jpg";
import placeholder4 from "../../assets/placeholder4.jpg";

const placeholders = [placeholder,placeholder1, placeholder2, placeholder3, placeholder4];

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState("");
  const [photos, setPhotos] = useState([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0); //Use this if you want to keep cycling through google images.
    //const currentPhotoIndex = 0;  // Here there is no cycling of google images
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const shareUrl = `${window.location.origin}/trip?location=${encodeURIComponent(trip?.userSelection?.location?.description)}&days=${trip?.userSelection?.noOfDays}&budget=${trip?.userSelection?.budget}&travelers=${trip?.userSelection?.traveler}`;
  
  const handleShare = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: "Check out my trip plan!",
        text: "Here's a trip I planned using the travel app:",
        url: shareUrl,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  } else {
    // fallback: copy to clipboard
    await navigator.clipboard.writeText(shareUrl);
    alert("Trip link copied to clipboard!");
  }
};

  useEffect(() => {
    if (trip) fetchPhotos();
  }, [trip]);

  // Cycle through internet photos
  useEffect(() => {
    if (photos.length > 0) {
      const interval = setInterval(() => {
        setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
      }, 20000);
      return () => clearInterval(interval);
    }
  }, [photos]);

  // Cycle through placeholder images 
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Load actual photo from Google
  useEffect(() => {
    if (photos.length > 0) {
      const url = photos[currentPhotoIndex];
      const img = new Image();
      img.src = url;
      img.onload = () => {
        setPhotoUrl(url);
        console.log("Preloaded image:", url);
      };
    }
  }, [currentPhotoIndex, photos]);

  const fetchPhotos = async () => {
    try {
      const query = trip?.userSelection?.location?.properties?.city 
                    ? `${trip.userSelection.location.properties.city} ${trip.userSelection.location.properties.country}` 
                    : trip?.userSelection?.location?.description || "travel";
    
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=3&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`
      );
    
      if (!response.ok) {
        console.error("Unsplash API error:", response.statusText);
        return;
      }
    
      const data = await response.json();
    
      if (data.results.length === 0) {
        console.error("No photos found on Unsplash.");
        return;
      }
    
      // Map the URLs from Unsplash results
      const photoUrls = data.results.map(photo => photo.urls.regular);
      setPhotos(photoUrls);
      setPhotoUrl(photoUrls[0]); // Set initial photo
    } catch (error) {
      console.error("Error fetching photos from Unsplash:", error);
    }
  };

  const displayImage = photoUrl || placeholders[placeholderIndex];

return (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
    <motion.div
      className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <img
        src={placeholders[placeholderIndex]}
        alt="Cycling Placeholder"
        className="absolute w-full h-full object-cover blur-sm scale-110 transition-opacity duration-1000 ease-in-out"
      />
      <img
        src={displayImage}
        alt="Main"
        className="absolute w-full h-full object-cover transition-opacity duration-700 ease-in-out opacity-0"
        onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        <p className="text-lg font-medium text-white">Your trip to:</p>
        <h2 className="text-white text-3xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          {trip?.userSelection?.location?.properties?.city}, {trip?.userSelection?.location?.properties?.country}
        </h2>
      </motion.div>
    </motion.div>

    <motion.div
      className="flex justify-between items-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="my-5 flex flex-col gap-2">
        <h2 className="font-bold text-2xl">
          <span className="text-red-700">{trip?.userSelection?.noOfDays}</span>{" "}
          {trip.userSelection?.noOfDays === 1 ? "Day" : "Days"} Trip.
        </h2>
        <div className="flex gap-5 flex-wrap">
          <span className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
            📅 {trip.userSelection?.noOfDays}{" "}
            {trip.userSelection?.noOfDays === 1 ? "Day" : "Days"}
          </span>
          <span className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
            💳 {trip.userSelection?.budget} Budget
          </span>
          <span className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
            👨‍👩‍👧‍👧 No. of Travelers: {trip.userSelection?.traveler}
          </span>
        </div>
      </div>

      <Button
        className="bg-blue-700 text-white px-6 py-3 rounded-md hover:bg-black transition cursor-pointer"
        onClick={handleShare}
      >
        <BsFillSendArrowUpFill />
      </Button>
    </motion.div>
  </motion.div>
);

}

export default InfoSection;
