// import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  //   const location = useLocation();
  const location = window.location;
  const navigate = useNavigate();
  return (
    <div className="flex flex-row mt-2 border-solid border-b-[3px] border-brdr-green p-1">
      <div
        onClick={() => navigate("/Dashboard")}
        className="py-2 mx-2 px-1 rounded-lg text-[22px] text-text-green font-bold hover:bg-brdr-green-50"
      >
        <span
          className={
            location.pathname === "/Dashboard" ||
            location.pathname === "/"
              ? "border-b-[3px] border-solid border-brdr-green"
              : ""
          }
        >
          Dashboard
        </span>
      </div>
      <div
        onClick={() => navigate("/FloorPlan")}
        className="py-2 mx-2 px-1 rounded-lg text-[22px] text-text-green font-bold hover:bg-brdr-green-50"
      >
        <span
          className={
            location.pathname === "/FloorPlan"
              ? "border-b-[3px] border-solid border-brdr-green"
              : ""
          }
        >
          Floor Plan
        </span>
      </div>
      <div
        onClick={() => navigate("/RealTime")}
        className="py-2 mx-2 px-1 rounded-lg text-[22px] text-text-green font-bold hover:bg-brdr-green-50"
      >
        <span
          className={
            location.pathname === "/RealTime"
              ? "border-b-[3px] border-solid border-brdr-green"
              : ""
          }
        >
          Real Time
        </span>
      </div>
    </div>
  );
}
