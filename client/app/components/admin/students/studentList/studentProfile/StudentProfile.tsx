import { Divider } from "@nextui-org/react";
import React, { FC } from "react";
import { useSelector } from "react-redux";
import StudentMoocs from "./StudentMoocs";
import MobileMoocsTable from "@/app/components/student/moocs/MobileMoocsTable";
import { useStudentDetailsQuery } from "@/redux/features/api/admin/adminApi";

type Props = {
  id: string;
};

const StudentProfile: FC<Props> = ({ id }) => {
  const { user } = useSelector((state: any) => state.auth);

  const { data, isLoading } = useStudentDetailsQuery({id});
  console.log(isLoading);
  console.log(data);

  return (
    <>
      {data && (
        <>
          <div className="w-full gradient-bg flex justify-center items-center py-2 rounded-md">
            <h3 className="text-white">Student Details</h3>
          </div>
          <div className="flex flex-wrap justify-between mx-2 my-2">
            <div className=" flex flex-col">
              <span>
                Name of Student :{" "}
                <span className="font-medium">{user.name}</span>
              </span>
              <span>
                University Roll no. :{" "}
                <span className="font-medium">{user.universityroll}</span>
              </span>
              <span>
                Registration No. :
                <span className="font-medium">
                  {user.registration} OF 2022-23
                </span>
              </span>
            </div>
            <div className=" flex flex-col">
              <span>
                Passing Year : <span className="font-medium">{user.year}</span>
              </span>
              <span>
                Class Roll no. :{" "}
                <span className="font-medium">{user.classroll}</span>
              </span>
            </div>
          </div>
          <Divider className="my-2" />
          <div className=" overflow-auto h-[70vh]">
          <StudentMoocs moocs={data.singleStudent.moocs} id={id}/>
          </div>
        </>
      )}
    </>
  );
};

export default StudentProfile;
