"use client"

import Logo from "./logo";
import Link from "next/link";

export default function Header() {
    return (
    <div className="text-center text-4xl not-italic">
        <Link href="/" className="w-full" >
        <div className="flex justify-center max-w-xl mx-auto">
        <Logo />
        </div>
        </Link>
    </div>
    );
  }