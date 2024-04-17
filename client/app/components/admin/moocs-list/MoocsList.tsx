import React from "react";
import MoocsCourseList from "./moocs-course-list/MoocsCourseList";
import { useSelector } from "react-redux";
import { useAdminMoocsCourseListQuery } from "@/redux/features/api/admin/adminApi";

type Props = {};

const MoocsList = (props: Props) => {
  const { data } = useAdminMoocsCourseListQuery({});

  return (
    <div className="mx-2">
      <h2 className="font-semibold text-lg text-slate-800 my-3 ">
        Moocs Course List
      </h2>
      {data && <MoocsCourseList moocsCourse={data.moocsList} />}
    </div>
  );
};

export default MoocsList;
