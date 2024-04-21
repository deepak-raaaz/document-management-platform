import { Button } from "@nextui-org/react";
import React, { FC } from "react";
import { FaFileDownload } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type Props = {
  data: any[];
};

const ExportPdfView: FC<Props> = ({ data }) => {
  const doc = new jsPDF();

  const exportHandler = () => {
    autoTable(doc, { html: "#my-table" });
    doc.save("table.pdf");
  };

  return (
    <div>
      <div className="flex justify-between items-center my-4 px-2">
        <h2 className="text-xl font-medium">Moocs Course</h2>
        <Button
          endContent={<FaFileDownload className="text-white" />}
          variant="solid"
          color="primary"
          onClick={() => {
            exportHandler();
          }}
        >
          Export
        </Button>
      </div>
      <table
        style={{ borderCollapse: "collapse", width: "100%" }}
        id="my-table"
      >
        <thead>
          <tr
            style={{ borderBottom: "1px solid #ddd", background: "orange" }}
            className="text-white"
          >
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Age</th>
            <th className="p-3 text-left">Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any, index: number) => (
            <tr key={item.id} className={index % 2 === 0 ? "bg-gray-200" : ""}>
              <td className="p-3 text-left">{index + 1}</td>
              <td className="p-3 text-left">{item.title}</td>
              <td className="p-3 text-left">{item.platform}</td>
              <td className="p-3 text-left">{item.credit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExportPdfView;
