"use client"
import { Pacifico } from "next/font/google";

const RampartOneFont = Pacifico({
  weight: "400",
  subsets: ["latin"],
});

const handleHomeClick = () => {
    window.location.href = "/";
};

export default function Header() {
    return (
    <div className="text-center text-4xl not-italic">
       <div className={`${RampartOneFont.className} text-white`}>
        <button type="button" onClick={handleHomeClick}>TripleWin</button>
       </div>
    </div>
    );
}
