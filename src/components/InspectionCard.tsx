import React from "react";
import { InspectionCardProps } from "../types/types";

export const InspectionCard: React.FC<InspectionCardProps> = ({
  imageUrl,
  address,
  date,
  status,
  imagesCount,
}) => {
  return (
    <article className="flex flex-col p-4 rounded-lg h-full">
      <div className="relative">
        <img
          loading="lazy"
          src={imageUrl}
          className="object-cover w-full rounded-t-2xl"
          alt={`Property at ${address}`}
        />
        {status === "completed" && (
          <span className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full">
            Completed
          </span>
        )}
        {status === "in progress" && (
          <span className="absolute top-2 right-2 bg-blue-500 text-white px-3 py-1 rounded-full">
            In Progress
          </span>
        )}
        {status === "scheduled" && (
          <span className="absolute top-2 right-2 bg-yellow-500 text-white px-3 py-1 rounded-full">
            Scheduled
          </span>
        )}
      </div>
      <div className="flex flex-col mt-6 flex-grow">
        <h3 className="text-lg font-extrabold text-black">{address}</h3>
        <p className="mt-2 text-base font-semibold text-gray-500">
          Inspection Date: {date}
        </p>
        {imagesCount && (
          <p className="mt-2 text-base font-semibold text-gray-500">
            {imagesCount} Images Captured
          </p>
        )}
        <div className="flex items-center justify-end mt-auto gap-2">
          {status === "completed" && (
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              View Report
            </button>
          )}
          {status === "in progress" && (
            <button className="bg-white-500 text-gray-500 px-4 py-2 rounded">
              Pending...
            </button>
          )}
          {status === "scheduled" && (
            <button className="bg-red-500 text-white px-4 py-2 rounded">
              Cancel
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
