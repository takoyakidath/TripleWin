"use client"
import { useSearchParams } from "next/navigation";
import { Friend , Bot } from "@/components/game";
export default function Play() {
    const searchParams = useSearchParams();
    const mode = searchParams.get("mode")
    console.log(mode) // Output: bot | friend
    let Component = null;
    switch (mode) {
      case "bot":
        console.log("Input is bot.");
        Component = <Bot />;
        break;
    
      case "friend":
        console.log("Input is friend.");
        Component = <Friend />;
        break;
    }
  return (<div>
    {Component || <h1>null</h1>}
</div>
  );
}
