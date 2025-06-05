import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import landing from "../../assets/landing.png";
import landing1 from "../../assets/landing1.png";
import laptop from '../../assets/laptop.png';

function StartPage() {
  return (
    <div className="flex flex-col items-center max-w-5xl mx-auto px-6 gap-9">
      <h1 className="font-extrabold text-[50px] text-center mt-16">
        <span className="text-[#004aad]">Discover Your Next Adventure with AI:</span> Personalized Itineraries at Your FingerTips
      </h1>
      <p className="text-xl text-gray-500 text-center -mt-5">
        Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
      </p>

      <Link to={'/create-trip'}>
        <Button className="bg-red-700 text-white px-6 py-3 rounded-md hover:bg-white hover:text-black hover:border-2 hover:border-red-700 transition cursor-pointer">
          Get Started
        </Button>
      </Link>

    {/* Laptop with Screenshot container */}
    <div className="relative w-[960px] max-w-full -mt-11 aspect-[16/9] overflow-hidden">
      {/* Screenshot*/}
      <img
        src={landing}
        alt="Landing Screenshot"
        className="absolute top-[18.5%] left-[24%] w-[52%] h-[52%] object-cover rounded-sm"
      />
      {/* Bottom Extension */}
      <img
        src={landing1}
        alt="Bottom Screenshot Extension"
        className="absolute top-[63.5%] left-[24%] w-[52%] h-[16%] object-cover"
      />

      {/* Laptop frame */}
      <img
        src={laptop}
        alt="Laptop Frame"
        className="w-full h-auto relative"
      />
    </div>
 </div>
  );
}

export default StartPage