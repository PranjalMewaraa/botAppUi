import { useState, useEffect } from "react";
import { gsap } from "gsap";
import dolar from "../../assets/Images/dollar.png"
import { useUserStore } from "@/store/user-store";


interface Cell {
  id: number;
  status: "hidden" | "revealed";
  type: "safe" | "mine";
}
interface WalletProps {
  balance: number;
}
const MineGame = () => {
  const [balance, setBalance] = useState<number>(10);
  const [grid, setGrid] = useState<Cell[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [numMines, setNumMines] = useState<number>(3);
  const gridSize = 4; // You can adjust the grid size
  const [isPlaying, setIsplaying] = useState<boolean>(false);
  const [countOpen, setCountOpen] = useState<number>(0);
  const [Earning, setEarning] = useState<number>(0);
  const [chances, setChances] = useState<number>(gridSize * gridSize - numMines);
  const user = useUserStore()
  const profit: { [key: number]: number[] }[] = [
    {
      1: [0.24, 0.5, 0.75, 1, 1.25, 1.45, 1.65, 1.89, 2, 2.35, 2.65, 2.81, 3.21, 3.73, 4],
    },
    {
      2: [0.36, 0.58, 0.8, 1.1, 1.3, 1.55, 1.69, 1.99, 2.35, 2.7, 2.9, 3.31, 3.83, 4.5],
    },
    {
      3: [0.4, 0.6, 0.8, 1, 1.3, 1.55, 1.79, 2.1, 2.45, 2.8, 3.5, 4.1, 4.6],
    },
    { 4: [0.5, 0.71, 0.92, 1.15, 1.61, 1.93, 2.29, 2.75, 2.9, 3.5, 4.6, 5] },
    { 5: [0.55, 0.8, 0.99, 1.25, 1.79, 2.39, 2.88, 3.0, 3.5, 4.7, 5.5] },
    { 6: [0.6, 1.29, 1.55, 2.37, 2.89, 3.29, 3.85, 4.35, 5.2, 6] },
    { 7: [0.8, 1.49, 2.37, 2.99, 3.54, 4.15, 4.85, 5.26, 6.2] },
    { 8: [1.2, 1.79, 2.57, 2.99, 4.54, 5.55, 6.35, 7] },
    { 9: [1.49, 2.17, 2.99, 3.54, 4.9, 6.55, 7.5] },
    { 10: [1.71, 2.37, 3.54, 5.25, 6.9, 8] },
    { 11: [2.57, 3.82, 5.45, 6.5, 8.25] },
    { 12: [3, 5.6, 7.2, 8.5] },
    { 13: [3.5, 7, 9] },
    { 14: [4, 9.5] },
    { 15: [10] },
  ];

  const resetGame = () => {
    const newGrid = generateGrid(gridSize, numMines);
    setGrid(newGrid);
    setGameOver(false);
    setMessage("");
    setEarning(0);
    setCountOpen(0);
    grid.forEach((_, idx) => {
      gsap.set(`#cell-${idx}`, { scale: 1, backgroundColor: "" });
    });
  };

  const generateGrid = (size: number, mines: number): Cell[] => {
    const grid = Array(size * size).fill("safe") as ("safe" | "mine")[];
    const mineIndices = new Set<number>();
    while (mineIndices.size < mines) {
      mineIndices.add(Math.floor(Math.random() * (size * size)));
    }
    mineIndices.forEach((index) => {
      grid[index] = "mine";
    });

    return grid.map((cell, idx) => ({
      id: idx,
      status: "hidden",
      type: cell,
    }));
  };

  const handleClick = (index: number) => {
    if (gameOver) {
      return;
    }

    const newGrid = [...grid];
    const clickedCell = newGrid[index];

    if (clickedCell.type === "mine") {
      clickedCell.status = "revealed";
      setGrid(newGrid);
      setGameOver(true);
      setMessage(`Game Over! You Lost - ${Math.floor(balance)}`);
      user.descreaseBalance(balance);
      setBalance(10);
      gsap.to(`#cell-${index}`, { scale: 1.2, backgroundColor: "#ff0000" }); // Animate mine explosion
    } else {
      revealCell(index);
      setCountOpen(countOpen + 1);
      const currentProfit = profit[numMines - 1][numMines][countOpen];
      setEarning((prev) => prev + balance * currentProfit);
      setBalance(balance + balance * currentProfit);
      setMessage(`Current Profit - ${Math.floor(Earning)}`);
    }
  };

  useEffect(() => {
    setMessage(`Current Profit - ${Math.floor(Earning)}`);
  }, [Earning]);

  useEffect(()=>{
    if (countOpen >= chances) {
        setGrid(grid); // Pass the current grid instead of a newGrid that doesn't exist here
        setGameOver(true);
        setMessage(`Game Over! You Won - ${Earning}`);
        user.IncreaseBalance(balance)
      }
  },[countOpen])
  const revealCell = (index: number) => {
    const newGrid = [...grid];
    newGrid[index].status = "revealed";
    setGrid(newGrid);
    gsap.fromTo(`#cell-${index}`, { opacity: 0 }, { opacity: 1, duration: 0.5 });
  };

  const startGame = () => {
    setIsplaying(true);
    setChances(gridSize * gridSize - numMines);
    user.descreaseBalance(balance)
    resetGame();
  };
  const closeProfit=()=>{
    setGameOver(true);
    setMessage(`Game Over! You Won - ${Earning}`);
    user.IncreaseBalance(balance);
    setIsplaying(false);
  }

  return (
    <div className="w-full flex flex-col items-center justify-center bg-gray-900 p-4"  
     style={{
        background: "radial-gradient(50% 50% at 50% 50%, #1B3251 0%, #161E40 100%)",
        height: "calc(var(--vh, 1vh) * 100)"  
      }}>
       <div className="flex w-full items-center justify-end">
        <Wallet balance={Math.floor(user.balance)} />
      </div>
      <h1 className="text-2xl text-white mb-4">Mine Game</h1>
      
      {isPlaying ? (
        <>
          <h3 className="text-2xl text-white mb-4">{Math.floor(balance)}</h3>
          <div className="grid grid-cols-4 grid-rows-4 gap-2">
            {grid.map((cell, idx) => (
              <div
                id={`cell-${idx}`}
                key={cell.id}
                className={`w-20 h-20 flex items-center justify-center border border-gray-700
              ${cell.status === "revealed"
                  ? cell.type === "mine"
                    ? "bg-red-500"
                    : "bg-green-500"
                  : "bg-gray-800 cursor-pointer"}
            `}
                onClick={() => handleClick(idx)}
              >
                {cell.status === "revealed" && cell.type !== "mine" && (
                  <img src={dolar} alt="coin" width={36} />
                )}
                {cell.status === "revealed" && cell.type === "mine" && "💣"}
              </div>
            ))}
          </div>
          <div className="mt-6 w-full flex flex-col gap-2 items-center">
            <p className="text-xl text-red-400">{message}</p>
            {!gameOver&&<p className="text-xl text-yellow-400">{`Win Multiplier - ${profit[numMines - 1][numMines][countOpen]}`}</p>}
            <div className="flex justify-between">
            {!gameOver && countOpen>0 &&
            <button
              onClick={closeProfit}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500"
            >
              Close Profit
            </button>}
            <button
              onClick={() => setIsplaying(false)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
            >
              Reset Game
            </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-full flex flex-col gap-2">
            <div className="m-4 w-full p-4 border border-white rounded-xl">
              <ul className="w-full text-white text-center list-disc">
                <li>Tiles have either treasure or a Mine </li>
                <li>Every Correct tile increase multiplier </li>
                <li>You can close profit after atleast opening tiles equal to mines planted</li>
                <li>if you hit mine, total profit will be lost</li>
                <li>Try your Luck and Win Huge</li>
              </ul>
            </div>
            <div className="m-4 flex flex-col">
              <label className="text-white mr-2">Select Number of Mines:</label>
              <select
                value={numMines}
                onChange={(e) => setNumMines(Number(e.target.value))}
                className="bg-gray-800 text-white p-2 rounded"
              >
                {Array.from({ length: 15 }, (_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="m-4 flex flex-col">
              <label className="text-white mr-2">
                Select Play Amount ( Max 50 ):
              </label>
              <select
                value={numMines}
                onChange={(e) => setBalance(Number(e.target.value))}
                className="bg-gray-800 text-white p-2 rounded"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={40}>40</option>
                <option value={50}>50</option>
              </select>
            </div>
            <button
              onClick={startGame}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500"
            >
              Start Game
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const Wallet: React.FC<WalletProps> = ({ balance }) => (
  <div className="flex gap-2 items-center pr-2 border bg-slate-700 text-white rounded-3xl">
        <span>
          <img className="w-10" src={dolar} alt="" />
        </span>
        {balance}
      </div>
  );

export default MineGame;
