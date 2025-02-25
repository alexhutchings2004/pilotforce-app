import React from "react";
import { StatCardProps } from "./types";

export const StatCard: React.FC<StatCardProps> = ({
  count,
  label,
  icon,
  bgColor,
}) => {
  return (
    <article className="flex items-center p-4 rounded-lg">
      <div className="flex flex-col flex-grow">
        <h3 className="text-base font-semibold text-gray-500">{label}</h3>
        <p className="text-3xl font-extrabold text-black">{count}</p>
      </div>
      <div
        className={`flex justify-center items-center w-12 h-12 ${bgColor} rounded-lg ml-8`}
      >
        <img
          loading="lazy"
          src={icon}
          className="object-contain w-6 h-6"
          alt={`${label} icon`}
        />
      </div>
    </article>
  );
};
