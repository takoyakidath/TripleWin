import Link from "next/link";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
const GameSelector: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Card>
      <h1 className="text-4xl font-bold">Select a game</h1>
      <ul className="flex space-x-4 mt-4">
        <li>
          <Link href={{ pathname: "/play", query: { mode: "friend" } }} className="text-blue-500 hover:underline">
            <Button>Friend</Button>
          </Link>
        </li>
        <li>
          <Link href={{ pathname: "/play", query: { mode: "BOT" } }} className="text-blue-500 hover:underline">
           <Button> BOT</Button>
          </Link>
        </li>
      </ul>
      </Card>
    </div>
  );
};

export default GameSelector;
