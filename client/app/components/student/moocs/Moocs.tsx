import React, { FC } from "react";
import TopHeader from "../dashboard/TopHeader";
import { Divider } from "@nextui-org/react";
import InputTable from "./InputTable";
import StudentData from "./StudentData";
import MoocsTable from "./MoocsTable";

type Props = {};

const Moocs: FC<Props> = ({}) => {
  return (
    <div className="max-w-screen-1300px mx-auto h-auto pb-10">
      <TopHeader />

      <div className="bg-white border-1 border-slate-300 p-2 rounded-lg h-auto">
        <div className="w-full gradient-bg flex justify-center items-center py-2 rounded-md">
          <h3 className="text-white">Moocs Submission</h3>
        </div>
        <StudentData />
        <Divider className="my-2" />
        <div className="">
          <InputTable />
        </div>
        <Divider className="my-2" />
        <div className="">
            <h4 className="ms-2 my-2 font-semibold">Moocs Details -</h4>
                <MoocsTable/>
            <div className="text-slate-700 flex justify-end my-2 mx-2">
              <span>Total Credit Earned : 0</span>
            </div>
        </div>
      </div>

    </div>
  );
};

export default Moocs;
