import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { db } from '../../service/firebaseconfig';
import Footer from '../components/Footer';
import Hotels from '../components/Hotels';
import InfoSection from '../components/infoSection';
import PlacesToVisit from '../components/PlacesToVisit';

function  ViewTrip(){

  const {tripId} = useParams();
  const [trip,setTrip] = useState([]);

  useEffect(()=>{
    tripId&&getTripData();
  },[tripId])

  // Used to get trip information from firebase

  const getTripData=async()=>{
    const docRef = doc(db,'AITrips',tripId);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()){
      console.log("Document:",docSnap.data());
      setTrip(docSnap.data());
    }
    else{
      console.log("No such Document");
      toast('No trip found');
    }
  }

  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      {/* Information Section */}
      <InfoSection trip={trip} />

      {/* Recommended Hotels */}
      <Hotels trip={trip} />

      {/* Daily Plan */}
      <PlacesToVisit trip={trip} />

      {/* Footer */}
      <Footer trip={trip}/>
    </div>
  )
}

export default ViewTrip