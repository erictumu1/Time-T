import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import iphone from '../../assets/iphone.jpeg';
import iphoneimage from '../../assets/iphoneimage.png';
import landing from "../../assets/landing.png";
import landing1 from "../../assets/landing1.png";
import laptop from '../../assets/laptop.png';

function StartPage() {
  return (
    <div className="flex flex-col items-center max-w-5xl mx-auto px-6 gap-9">
      <h1 className="font-extrabold text-[312%] text-center mt-9">
        <span className="text-[#004aad]">Discover Your Next Adventure with AI:</span > Personalized Itineraries at Your FingerTips
      </h1>
      <p className="text-xl text-gray-500 text-center -mt-5">
        Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
      </p>

      <Link to={'/create-trip'}>
        <Button className="-mt-20 bg-red-700 text-white px-6 py-3 rounded-md hover:bg-white hover:text-black hover:border-2 hover:border-red-700 transition cursor-pointer">
          Get Started
        </Button>
      </Link>

      <div className="flex justify-evenly items-end w-full px-4 -ml-25 -mt-12">
        {/* Laptop Motion */}
        <motion.div
          className="relative w-[960px] aspect-[16/9] overflow-hidden -ml-20"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <img
            src={landing}
            alt="Landing Screenshot"
            className="absolute top-[18.5%] left-[24%] w-[52%] h-[52%] object-cover rounded-sm"
          />
          <img
            src={landing1}
            alt="Bottom Screenshot Extension"
            className="absolute top-[63.5%] left-[24%] w-[52%] h-[16%] object-cover"
          />
          <img
            src={laptop}
            alt="Laptop Frame"
            className="w-full h-auto relative"
          />
        </motion.div>

        {/* iPhone Motion */}
          <motion.div
            className="hidden md:block relative w-[250px] aspect-[9/18] overflow-hidden mb-10 sm: -ml-95"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <img
              src={iphone}
              alt="iPhone Screenshot"
              className="absolute top-[9%] left-[10%] w-[80%] h-[86%] object-cover rounded-md"
            />
            <img
              src={iphoneimage}
              alt="iPhone Frame"
              className="top-[27%] w-[200%] h-[50%] relative scale-215"
            />
          </motion.div>
      </div>
 </div>
  );
}

export default StartPage