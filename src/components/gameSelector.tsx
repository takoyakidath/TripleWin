import Link from "next/link";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
const GameSelector: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Card>
        <h1 className="text-4xl font-bold">Select a game</h1>
        <Link href="/friend" className="text-blue-500 hover:underline">
          <Button>Friend</Button>
        </Link>{" "}
        <br />
        <Link href="/bot" className="text-blue-500 hover:underline">
          <Button>BOT</Button>
        </Link>
      </Card>
    </div>
  );
};

export default GameSelector;
