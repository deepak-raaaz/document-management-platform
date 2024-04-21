import { Button } from "@nextui-org/react";
import React from "react";
import { FaFileDownload } from "react-icons/fa";
import { PieChart, Pie, Sector, Cell, Tooltip } from "recharts";

const data = [
  { name: "Verified", value: 400 },
  { name: "Pending", value: 300 },
  { name: "Rejected", value: 300 },
  { name: "Not Submitted", value: 200 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function CustomPieChart() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full flex justify-between items-center">
        <span className=" font-medium">Mar Report</span>
        <Button
          endContent={<FaFileDownload className="text-slate-500"/>}
          variant="bordered"
        >
          Export
        </Button>
      </div>
      <PieChart width={300} height={300}>
        <Tooltip contentStyle={{ background: "white", borderRadius: "5px" }} />
        <Pie
          data={data}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <div className="flex space-x-4">
        {data.map((item: any, index: number) => (
          <div className="flex space-x-2" key={item.name}>
            <div
              className={`h-2 w-2 mt-2 rounded-full`}
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></div>
            <div className="flex flex-col">
              <span className="font-medium">{item.name}</span>
              <span>{item.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
