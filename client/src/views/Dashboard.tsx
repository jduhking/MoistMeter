import Navbar from "../components/Navbar";
import Chart from "../components/Chart";
import UpArrow from "../components/UpArrow";
export default function Dashboard() {
  return (
    <div className="flex flex-col">
      <Navbar />
      {/* Chart */}
      <div className="h-[330px] rounded-lg border border-[3px] border-brdr-color mt-3 pt-5 pr-4 shadow-lg">
        <div className="ml-neg-5">
          <Chart />
        </div>
      </div>
      {/* Stats */}
      <div className="flex flex-row mt-3">
        {/* MoistGuard Score */}
        <div className="flex flex-col w-[300px] h-[200px] rounded-lg border border-[3px] border-brdr-color m-2 shadow-lg">
          <p className="underline text-text-color text-[24px] font-bold mx-4 mt-2">
            MoistGuard® Score
          </p>
          <p className="text-[80px] self-center mt-[5px] text-text-color font-bold">
            890
          </p>
        </div>
        {/* Moisture % */}
        <div className="flex flex-col w-[300px] h-[200px] rounded-lg border border-[3px] border-brdr-color m-2 shadow-lg">
          <p className="underline text-text-color text-[28px] font-bold mx-4 mt-2">
            Moisture
          </p>
          <div className="flex flex-row mx-auto">
            <p className="text-[80px] self-center mt-[5px] text-text-color font-bold mr-2">
              11<span className="text-[35px]">%</span>
            </p>
            <div className="flex flex-row items-center">
              <UpArrow />
              <div className="w-[70px] text-text-color font-bold ml-1">
                2% this Month
              </div>
            </div>
          </div>
        </div>
        {/* Mold Likleyhood */}
        <div className="flex flex-col w-[300px] h-[200px] rounded-lg border border-[3px] border-brdr-color m-2 shadow-lg">
          <p className="underline text-text-color text-[28px] font-bold mx-4 mt-2">
            Mold Likleyhood
          </p>
          <div className="flex flex-row text-[80px] self-center mt-[5px] text-text-color font-bold">
            <p>
              3<span className="text-[30px]">%</span>
            </p>
            <p className="underline text-[30px] text-text-color my-auto ml-3">
              LOW
            </p>
          </div>
        </div>
        {/* Sensors Online */}
        <div className="flex flex-col w-[300px] h-[200px] rounded-lg border border-[3px] border-brdr-color m-2 shadow-lg">
          <p className="underline text-text-color text-[28px] font-bold mx-4 mt-2">
            Sensors Online
          </p>
          <p className="text-[80px] self-center mt-[5px] text-text-color font-bold">
            29
            <span className="text-[30px]">/</span>
            <span className="text-[25px]">31</span>
          </p>
        </div>
      </div>
    </div>
  );
}
