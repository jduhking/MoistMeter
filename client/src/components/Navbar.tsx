// import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  //   const location = useLocation();
  const location = window.location;
  const navigate = useNavigate();
  return (
    <div className="flex flex-row border-solid border-b-[3px] border-brdr-color p-1">
      {/* Logo + Title */}
      <div className="flex flex-row items-center mr-auto">
        <img src="/logo2.png" width="70"></img>
        <p className="text-4xl text-text-color font-bold">
          Moist Meter
        </p>
      </div>
      {/* Dashboard nav item */}
      <div
        onClick={() => navigate("/Dashboard")}
        className="pt-7 mx-2 px-1 rounded-lg text-[26px] text-text-color font-bold hover:underline"
      >
        <span
          className={
            location.pathname === "/Dashboard" ||
            location.pathname === "/"
              ? "border-b-[3px] border-solid border-brdr-color"
              : ""
          }
        >
          Dashboard
        </span>
      </div>
      {/* FloorPlan nav item */}
      <div
        onClick={() => navigate("/FloorPlan")}
        className="pt-7 mx-2 px-1 rounded-lg text-[26px] text-text-color font-bold hover:underline"
      >
        <span
          className={
            location.pathname === "/FloorPlan"
              ? "border-b-[3px] border-solid border-brdr-color"
              : ""
          }
        >
          Floor Plan
        </span>
      </div>
      {/* RealTime nav item */}
      <div
        onClick={() => navigate("/RealTime")}
        className="pt-7 mx-2 px-1 rounded-lg text-[26px] text-text-color font-bold hover:underline"
      >
        <span
          className={
            location.pathname === "/RealTime"
              ? "border-b-[3px] border-solid border-brdr-color"
              : ""
          }
        >
          Real Time
        </span>
      </div>
    </div>
  );
}
