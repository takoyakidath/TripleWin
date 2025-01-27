"use client"
import { Pacifico } from "next/font/google";

const RampartOneFont = Pacifico({
  weight: "400",
  subsets: ["latin"],
});
 
export default function Header() {
    return (
    <div className="text-center text-4xl not-italic">
       <div className={`${RampartOneFont.className} text-white`}>TripleWin</div>
    </div>
    );
  }