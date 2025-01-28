import TicTacToeF from "@/components/TicTacToe-friend"
import TicTacToeB from "@/components/TicTacToe-bot"

export function Friend() {
    return (
        <div className="text-center text-white mb-40">
        <h1 className="text-4xl font-bold">Friend</h1>
        <TicTacToeF />
        </div>
    );
}
export function Bot() {
    return (
        <div className="text-center text-white mb-40">
        <h1 className="text-4xl font-bold">BOT</h1>
        <TicTacToeB />
        </div>
    );
}