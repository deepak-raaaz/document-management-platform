import React, { FC } from "react";
import DashboardCard from "./DashboardCard";
import TopHeader from "./TopHeader";

type Props = {};

const Dashboard: FC<Props> = ({}) => {
  
  const cardData = [
    {
      title: "Moocs",
      url: "/student/moocs",
    },
    {
      title: "Mar",
      url: "/student/mar",
    },
  ];

  return (
    <div className="max-w-screen-1300px mx-auto h-[70vh]">
      <TopHeader title="Student Dashboard"/>

      <div className="bg-white border-1 border-slate-300 p-8 rounded-lg h-full mx-4">
        <div className="flex flex-wrap  gap-8 max-sm:justify-center">
          {cardData.map((itmes) => (
            <div className="w-28">
              <DashboardCard title={itmes.title} url={itmes.url} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
