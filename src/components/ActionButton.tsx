import React from "react";
import { useNavigate } from "react-router-dom";
import { ActionButtonProps } from "../types/types";

export const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  label,
  bgColor,
  onClick,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (label === "Make Booking") {
      navigate("/make-booking");
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={`flex flex-1 gap-4 px-6 py-4 ${bgColor} rounded-xl max-md:px-4 text-lg font-semibold text-white items-center justify-center`}
      aria-label={label}
      onClick={handleClick}
    >
      <img
        loading="lazy"
        src={icon}
        className="object-contain shrink-0 aspect-square w-[25px]"
        alt=""
      />
      <span className="my-auto text-center">{label}</span>
    </button>
  );
};
