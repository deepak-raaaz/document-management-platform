import React, { FC } from "react";
import TopHeader from "../dashboard/TopHeader";
import { Divider } from "@nextui-org/react";
import InputTable from "./InputTable";
import StudentData from "./StudentData";
import MoocsTable from "./MoocsTable";
import MoocsSubmissionForm from "./MoocsSubmissionForm";
import { useMediaQuery, useTheme } from "@mui/material";
import MobileMoocsTable from "./MobileMoocsTable";
import { useLoadMoocsListQuery, useMyMoocsQuery } from "@/redux/features/api/moocs/moocsSlice";
import { useSelector } from "react-redux";

type Props = {};

const Moocs: FC<Props> = ({}) => {
  const theme = useTheme();
  const greaterThanMid = useMediaQuery(theme.breakpoints.up("md"));

  const { isLoading,error } = useMyMoocsQuery({});
  const {} = useLoadMoocsListQuery({});
  const { myMoocs } = useSelector((state: any) => state.moocs);
  console.log(myMoocs);

  return (
    <div className="max-w-screen-1300px mx-auto h-auto pb-10">
      <TopHeader title="" />

      <div className="bg-white border-1 border-slate-300 p-2 rounded-lg h-auto">
        <div className="w-full gradient-bg flex justify-center items-center py-2 rounded-md">
          <h3 className="text-white">Student Details</h3>
        </div>
        <StudentData />
        <Divider className="my-2" />
        <div className="">
          {/* <InputTable /> */}
          <MoocsSubmissionForm />
        </div>
        <Divider className="my-2" />
        <div className="bg-white max-md:bg-slate-100 py-2">
          <h4 className="ms-3 my-2 font-semibold">Moocs Details -</h4>
          {greaterThanMid ? <MoocsTable /> : <MobileMoocsTable />}
          <div className="text-slate-700 flex justify-end my-2 mx-2">
            <span>Total Credit Earned : 0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Moocs;
