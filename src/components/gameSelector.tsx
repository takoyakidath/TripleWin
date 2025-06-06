import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
const GameSelector: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Card className="bg-gray-700 text-primary-foreground border border-gray-700 shadow-sm p-4">
        <h1 className="text-4xl font-bold">Select a game</h1>
        <div className="flex flex-col items-center space-y-2">
          <Link href="/friend" className="text-white hover:underline w-full mt-4">
            <Button className="w-full">
              Friend
            </Button>
          </Link>
          <Link href="/bot" className="text-white hover:underline w-full">
            <Button className="w-full">
                BOT
            </Button>
          </Link>
          <Link href="/ranking" className="text-white hover:underline w-full">
            <Button className="w-full">
                Ranking
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default GameSelector;
