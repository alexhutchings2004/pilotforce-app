"use client";
import React from "react";
import { Navbar } from "./Navbar";
import { StatCard } from "./StatCard";
import { Stat, Inspection, QuickAction as QuickActionType } from "../types/types";
import { InspectionCard } from "./InspectionCard";
import { ActionButton } from "./ActionButton";
import { Link } from "react-router-dom";

export const Dashboard: React.FC = () => {
  const stats: Stat[] = [
    {
      count: "18",
      label: "Total Inspections",
      icon: "https://cdn.builder.io/api/v1/image/assets/57d443971e034b5aa8182c7c5505dac4/2ebef65e9853561666e237ba514f4ddc6deae922724dfe2169a92af91cc99301",
      bgColor: "bg-blue-100",
    },
    {
      count: "5",
      label: "Pending Reports",
      icon: "https://cdn.builder.io/api/v1/image/assets/57d443971e034b5aa8182c7c5505dac4/b357852cf9feba7d5fe4984ee058728d6b5f616d4ccfa457bd0ad0bb554644d1",
      bgColor: "bg-orange-100",
    },
    {
      count: "10",
      label: "Assets",
      icon: "https://cdn.builder.io/api/v1/image/assets/57d443971e034b5aa8182c7c5505dac4/120ad79c899c00d01633295eb235c21adc053a67341313e8b6c8b1ad467ca0e6",
      bgColor: "bg-green-100",
    },
    {
      count: "378",
      label: "Media Captured",
      icon: "https://cdn.builder.io/api/v1/image/assets/57d443971e034b5aa8182c7c5505dac4/50991cb61931548b1af151e39927e0f1946b6656771a4f36bd3c404708c6b945",
      bgColor: "bg-fuchsia-200",
    },
  ];

  const recentInspections: Inspection[] = [
    {
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/57d443971e034b5aa8182c7c5505dac4/d2fd14c7fa965f424d83c5f7a3af610f9eacdc63af145030dfe063f9b4ff9523",
      address: "123 Street",
      date: "Feb 15, 2025",
      imagesCount: 120,
      status: "completed",
    },
    {
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/57d443971e034b5aa8182c7c5505dac4/c60ca97bb1a17b01a2842eb7be997a27eba678b6b08932d96fc630e8d34d5b8f",
      address: "123 Street",
      date: "Feb 15, 2025",
      status: "in progress",
    },
    {
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/57d443971e034b5aa8182c7c5505dac4/1ced6aa194d22271deb217019a7513a97fea5b71d206f7c91dfc93810c36fbc8",
      address: "123 Street",
      date: "Feb 15, 2025",
      status: "scheduled",
    },
  ];

  const quickActions: QuickActionType[] = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/57d443971e034b5aa8182c7c5505dac4/89bfc7503201845c4504b6ba8b184a30c994431c78e5321a8d7f94407d16d21c",
      label: "Make Booking",
      bgColor: "bg-blue-600",
      onClick: () => console.log("Make Booking clicked"),
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/57d443971e034b5aa8182c7c5505dac4/bdbe34a165cbb454e8439bf8539570b887969b60df8c555a956865e8e3c63dda",
      label: "Create Asset",
      bgColor: "bg-slate-500",
      onClick: () => console.log("Create Asset clicked"),
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/57d443971e034b5aa8182c7c5505dac4/c37ad801d76a4147d791b579ea6e8990d20b70f7c4c359d07fcd95958d33c87d",
      label: "View Reports",
      bgColor: "bg-violet-600",
      onClick: () => console.log("View Reports clicked"),
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/57d443971e034b5aa8182c7c5505dac4/4967b04117f2e8214cbdf35c42b517f124bcc79a6b418255ef33abfbab26df99",
      label: "Get Support",
      bgColor: "bg-gray-600",
      onClick: () => console.log("Get Support clicked"),
    },
  ];

  return (
    <div className="flex overflow-hidden flex-col pb-44 max-md:pb-24">
      <Navbar />

      <main className="flex flex-col self-center mt-20 w-full max-w-[1230px] max-md:mt-10 max-md:max-w-full">
        <section className="flex flex-wrap gap-5 justify-between self-center w-full max-w-[1136px] max-md:max-w-full">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </section>

        <section className="mt-20 max-md:mt-10 flex justify-between items-center">
          <h2 className="text-2xl font-extrabold text-black">
            Recent Inspections
          </h2>
          <Link to="/my-bookings" className="text-blue-600 hover:underline">
            View All
          </Link>
        </section>
        <div className="mt-6 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            {recentInspections.map((inspection, index) => (
              <div key={index} className="w-[33%] max-md:ml-0 max-md:w-full">
                <InspectionCard {...inspection} />
              </div>
            ))}
          </div>
        </div>

        <section className="mt-28 max-md:mt-10">
          <h2 className="text-2xl font-extrabold text-black">Quick Actions</h2>
          <div className="flex flex-wrap gap-6 mt-6">
            {quickActions.map((action, index) => (
              <ActionButton key={index} {...action} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
