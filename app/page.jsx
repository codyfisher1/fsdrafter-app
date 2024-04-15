"use client"
import React from "react";
import Body from "@/components/Body";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useUser } from "@clerk/nextjs";

export default function Home() {
    const [creditBalance, setCreditBalance] = React.useState(null);
    const { user } = useUser();

    React.useEffect(()=>{
        if (user?.unsafeMetadata){
            const balance = (user?.unsafeMetadata?.computation_units)? parseInt(user.unsafeMetadata?.computation_units):0
            console.log(balance)
            setCreditBalance(balance)
        }
    },[user])

    const refreshBalance = ()=>{
        user.reload()
    }


    return (
      <>
            <Navbar creditBalance={creditBalance}/>
            <Body creditBalance={creditBalance} refreshBalance={refreshBalance}/>
            <Footer/>
      </>
  );
}
