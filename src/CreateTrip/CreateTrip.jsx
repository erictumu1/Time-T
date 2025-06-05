import GooglePlacesAutocompleteNew from "@/components/GooglePlacesAutocompleteNew";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { collection, doc, getDocs, query, serverTimestamp, setDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../assets/logo.png";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from "../constants/options";
import { chatSession } from "../service/AIModel";
import { db } from "../service/firebaseconfig";

function CreateTrip() {
  const [place, setPlace] = useState();

  const [formData, setFormData] = useState([]);

  const [openDialog,setOpenDialog] = useState(false);

  const [loading, setLoading] = useState(false); 

  const navigate = useNavigate();

  const handleInputChange = (name,value)=>{

    if(name=='noOfDays'&&value>5){
      return;
    }
    
    setFormData({
      ...formData,
      [name]:value
    })
  }

  useEffect(()=>{
    console.log(formData);
  },[formData])

const login = useGoogleLogin({
  onSuccess: (tokenResponse) => {
    console.log("Token Info:", tokenResponse);
    GetUserProfile(tokenResponse);
  },
  onError: (error) => {
    console.log("Login Error:", error);
  }
});


const onGenerateTrip = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    setOpenDialog(true);
    return;
  }

  if (
    formData?.noOfDays > 5 ||
    !formData?.location ||
    !formData?.budget ||
    !formData?.traveler
  ) {
    toast("Please fill in all details.", {
      style: {
        color: "black",
      },
    });
    return;
  }

  setLoading(true);

  try {
    //Query Firestore for an existing trip matching user and selections
    const tripsRef = collection(db, "AITrips");
    const q = query(
      tripsRef,
      where("userEmail", "==", user.email),
      where("userSelection.location.description", "==", formData.location.description),
      where("userSelection.noOfDays", "==", formData.noOfDays),
      where("userSelection.budget", "==", formData.budget),
      where("userSelection.traveler", "==", formData.traveler)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Found existing trip, navigate to it
      const existingTrip = querySnapshot.docs[0].data();
      setLoading(false);
      navigate("/view-trip/" + existingTrip.id);
      return;
    }

    //No existing trip found, generate new trip with AI
    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData.location.description)
      .replace("{totalDays}", formData.noOfDays)
      .replace("{traveler}", formData.traveler)
      .replace("{budget}", formData.budget)
      .replace("{totalDays}", formData.noOfDays);

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    saveAITrip(result?.response?.text());

  } catch (error) {
    console.error("Error checking existing trips or generating new trip:", error);
    setLoading(false);
    toast("Something went wrong. Please try again.", { style: { color: "red" } });
  }
};

const saveAITrip = async (TripData) => {
  setLoading(true);

  const user = JSON.parse(localStorage.getItem('user'));
  const docId = Date.now().toString();

  try {

    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
      createdAt: serverTimestamp(),
    });
    setLoading(false);
    navigate('/view-trip/'+docId);

  } catch (error) {
    console.error("Invalid JSON in TripData:", error);
    toast("Trip data is invalid. Please try again.", { style: { color: "red" } });
  }

  setLoading(false);
};


const GetUserProfile = (tokenInfo) => {
  axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
    headers: {
      Authorization: `Bearer ${tokenInfo?.access_token}`,
      Accept: 'application/json'
    }
  }).then((resp) => {
    console.log(resp);
    localStorage.setItem('user',JSON.stringify(resp.data));
    setOpenDialog(false);
    onGenerateTrip();
  }).catch((error) => {
    console.error("Error fetching user profile:", error);
  });
};


  return (
    <div className="mx-auto mt-10 max-w-6xl px-5 sm:px-10 md:px-32 lg:px-56 xl:px-10">
      <h2 className="font-bold text-3xl" >Tell us your Travel preferences 🌴</h2>
      <p className="mt-3 text-gray-500" >Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>

      <div className="mt-20 flex flex-col" >
          <div>
            <h2 className="text-xl my-3 font-medium" >What is your destination choice?</h2>
              <GooglePlacesAutocompleteNew
                apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                onSelect={(selected) => {
                  setPlace(selected);
                  handleInputChange("location", selected);
                }}
              />
          </div>    
      </div>
      
      <div className="mt-10" >
        <h2 className="text-xl my-3 font-medium" >How many days are you planning to stay?</h2>
        <Input placeholder={"Ex.3"} type="number"
          onChange={(e)=>handleInputChange('noOfDays',e.target.value)}
        />
      </div>

      <div className="mt-10">
        <h2 className="text-xl my-3 font-medium">What is your Budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item, index) => {
            const isSelected = formData?.budget === item.title;
            return (
              <div
                key={index}
                onClick={() => handleInputChange('budget', item.title)}
                className={`p-4 rounded-lg bg-white cursor-pointer transition-shadow duration-300 ${
                  isSelected ? 'shadow-2xl border-2 border-[#004aad]' : 'shadow-lg border border-gray-300'
                } hover:shadow-[0_4px_20px_rgba(0,74,173,0.7)]`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            );
          })}
        </div>
      </div>

<div className="mt-10">
        <h2 className="text-xl my-3 font-medium">
          Who do you plan to travel with on your next adventure?
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelesList.map((item, index) => {
            const isSelected = formData?.traveler === item.people;
            return (
              <div
                key={index}
                onClick={() => handleInputChange('traveler', item.people)}
                className={`p-4 rounded-lg bg-white cursor-pointer transition-shadow duration-300
                  ${isSelected
                    ? 'shadow-2xl border-2 border-[#004aad]'
                    : 'shadow-lg border border-gray-300'}
                  hover:shadow-[0_4px_20px_rgba(0,74,173,0.7)]`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-20 justify-end flex">
      <Button onClick={onGenerateTrip} className="bg-black text-white px-6 py-3 rounded-md hover:bg-blue-700 transition cursor-pointer">
        {loading?
         <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />:'Generate Trip'
        }
      </Button>
      </div>
      
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>

            <DialogDescription>
                <img className="w-39 h-17" src={logo}/>
                <h2 className="font-bold text-lg mt-7" >Sign in with Google</h2>
                <p>Sign in to the App with Google Authentication securely.</p>

                <Button
                disabled={loading}
                  onClick={login}
                  className=" bg-black w-full mt-5 rounded-md hover:bg-blue-700 transition cursor-pointer text-white flex gap-4 items-center">

                  <FcGoogle className="h-7 w-7" />Sign In with Google.
                </Button>
            </DialogDescription>

          </DialogHeader>
        </DialogContent>
      </Dialog>

      <div className="mt-10">
      </div>
    </div>
  )
}

export default CreateTrip