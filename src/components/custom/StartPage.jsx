import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import iphone from "../../assets/iphone.jpeg";
import iphoneimage from "../../assets/iphoneimage.png";
import landing from "../../assets/landing.png";
import landing1 from "../../assets/landing1.png";
import laptop from "../../assets/laptop.png";

function StartPage() {
  return (
    <div className="flex flex-col items-center max-w-5xl mx-auto px-6 gap-9">
      {/* Heading */}
      <motion.h1
        className="font-extrabold text-[312%] text-center mt-9"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <span className="text-[#004aad]">
          Discover Your Next Adventure with AI:
        </span>{" "}
        Personalized Itineraries at Your FingerTips
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-xl text-gray-500 text-center -mt-5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
      </motion.p>

      {/* Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <Link to={"/create-trip"}>
          <Button className="-mt-20 bg-red-700 text-white px-6 py-3 rounded-md hover:bg-white hover:text-black hover:border-2 hover:border-red-700 transition cursor-pointer">
            Get Started
          </Button>
        </Link>
      </motion.div>

      {/* Device showcase container */}
      <div className="relative w-full flex justify-center items-center -mt-5 px-4">
        {/* Laptop Motion */}
        <motion.div
          className="relative w-full max-w-[900px] aspect-[16/9]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -10, 0]
          }}
          transition={{
            opacity: { duration: 1, delay: 0.4 },
            scale: { duration: 1, delay: 0.4 },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
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
            className="w-full h-auto relative z-10"
          />
        </motion.div>

        {/* iPhone Motion */}
        <motion.div
          className="absolute right-[4%] sm:right-[8%] md:right-[10%] lg:right-[12%] xl:right-[14%] bottom-[10%] w-[90px] sm:w-[130px] md:w-[160px] lg:w-[200px] xl:w-[230px] aspect-[9/18] overflow-hidden z-20"
          initial={{ opacity: 0, x: 50, scale: 0.9 }}
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
            y: [0, -10, 0]
          }}
          transition={{
            opacity: { duration: 1, delay: 1 },
            x: { duration: 1, delay: 1 },
            scale: { duration: 1, delay: 1 },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }
          }}
          whileHover={{ scale: 1.05 }}
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

export default StartPage;
