import LastMatches from "@/components/lastMatches/lastMatches";
import Podium from "@/components/podium/podium";

export default function Home() {
  

  return (
    <div className="flex justify-center mt-10 w-auto">
      <div className="flex flex-col items-center">
        <h1 className="text-6xl font-extrabold tracking-tight">
          Welcome to A3RANKER
        </h1>
        <h2 className="text-2xl font-extrabold tracking-tight">
          Find out who the king of table tennis is.
        </h2>
        <div className="mt-10">
          <Podium />
        </div>
        <div className="flex flex-col items-center justify-center mt-10">
          <h2 className="text-2xl font-semibold mb-4">Last Matches</h2>
          <LastMatches />
        </div>
      </div>
    </div>
  );
}
