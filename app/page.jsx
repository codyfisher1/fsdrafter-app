"use client"
import React from "react";
import Body from "@/components/Body";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useUser } from "@clerk/nextjs";

export const runtime = 'edge'

export default function Home() {
    const [creditBalance, setCreditBalance] = React.useState(null);
    const { user } = useUser();

    React.useEffect(()=>{
        if (user?.unsafeMetadata){
            if (user?.unsafeMetadata?.computation_units) {
                const balance = parseInt(user.unsafeMetadata.computation_units)
                setCreditBalance(balance)
            } else {
                user.update({
                    unsafeMetadata: {
                        'computation_units': 10
                    },
                }).then(()=>{
                    user.reload()
                })
            }
        }
    },[user])

    const refreshBalance = ()=>{
        user.reload()
    }
    return (
      <div className='max-w-full'>
            <Navbar creditBalance={creditBalance}/>
            <Body creditBalance={creditBalance} refreshBalance={refreshBalance}/>
            <Footer/>
      </div>
  );
}
