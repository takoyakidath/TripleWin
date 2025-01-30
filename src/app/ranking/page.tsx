import { Card } from "@/components/ui/card";
import Rankings from "@/components/rankings";
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
    </div>
  );
}

