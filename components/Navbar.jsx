'use client';

import React from 'react';
import BalanceButton from "@/components/UI/StripePayment";
import { SignedIn, UserButton } from "@clerk/nextjs";

const Navbar = (props) => {
    const { creditBalance } = props

    return (
        <nav className="flex items-center justify-between flex-wrap">
            <div className="flex items-center flex-shrink-0">
                <h1 className="font-semibold text-3xl tracking-tight">__fsdrafter__</h1>
            </div>
            <div className="flex space-x-5 items-center">
                <BalanceButton
                    creditBalance={creditBalance}
                />
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </nav>
    );
};

export default Navbar;