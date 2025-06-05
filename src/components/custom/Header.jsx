import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import logo from "../../assets/logo.png";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialog,setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false); 

  const getInitials = (name) => {
    if (!name) return "NA";
    const [first, last] = name.trim().split(" ");
    return `${first?.[0] || ""}${last?.[0] || ""}`.toUpperCase();
  };

  const login = useGoogleLogin({
  onSuccess: (tokenResponse) => {
    console.log("Token Info:", tokenResponse);
    GetUserProfile(tokenResponse);
  },
  onError: (error) => {
    console.log("Login Error:", error);
  }
});

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
    window.location.reload();
  }).catch((error) => {
    console.error("Error fetching user profile:", error);
  });
};

  const initials = user ? getInitials(user.name || "") : "";

  const profileImage = user?.image;

  return (
    <div className="p-0 shadow-sm flex justify-between items-center px-5 sticky bg-white z-10">
      <a href="/">
         <img className="w-39 h-18" src={logo} alt="Logo" />
      </a>
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <a href="/create-trip">
              <Button
                variant="outline"
                className="rounded-full cursor-pointer hover:bg-blue-600 hover:text-white transition-colors duration-300"
              >
                CreateTrip
              </Button>
            </a>

            <a href="/my-trips">
              <Button
                variant="outline"
                className="rounded-full cursor-pointer hover:bg-blue-600 hover:text-white transition-colors duration-300"
              >
                MyTrips
              </Button>
            </a>
              <Popover>
                <PopoverTrigger>
                  <div className="h-[40px] w-[40px] rounded-full bg-red-700 flex items-center justify-center text-sm font-bold text-white cursor-pointer">
                    {initials}
                  </div>
                </PopoverTrigger>
                <PopoverContent className="bg-white border-2 border-red-700">
                  <h2
                    className="cursor-pointer"
                    onClick={() => {
                      googleLogout();
                      localStorage.clear();
                      window.location.href = '/';
                    }}
                  >
                    Logout
                  </h2>
                </PopoverContent>
              </Popover>
          </div>
        ) : (
          <Button onClick={()=>{setOpenDialog(true)}} className="bg-[#004aad] text-white px-6 py-3 rounded-md hover:bg-black transition cursor-pointer">
            Sign In
          </Button>
          
        )}
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
    </div>
  );
}

export default Header;
