import React from "react";
import MoocsSubmissionList from "./moocsSubmissionList/MoocsSubmissionList";
import { useAdminMoocsDataQuery } from "@/redux/features/api/admin/adminApi";

type Props = {};

const Moocs = (props: Props) => {
  const { data } = useAdminMoocsDataQuery({});

  return (
    <div className="mx-2">
      <h2 className="font-semibold text-lg text-slate-800 my-3 ">Moocs</h2>
      {data && <MoocsSubmissionList moocs={data.moocsData} />}
    </div>
  );
};

export default Moocs;
