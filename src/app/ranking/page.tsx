"use client"
import { Card } from "@/components/ui/card";
import Rankings from "@/components/rankings";
import { Button } from "@/components/ui/button";
export default function Ranking() {

  return (
    <div>
      <Card>
        <h1 className="text-4xl font-bold">Ranking</h1>
        <p>This ranking is created based on bot data.</p>
        <table>
            <th>
                <Rankings />
            </th>
        </table>
      </Card>
      <Button
        // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
        onClick={() => window.location.href = "/"}
        className="bg-gray-500 text-white hover:bg-gray-600 transition-colors duration-200 mt-4"
      >
        Home
      </Button>
    </div>
  );
}

