import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React from "react";
import { FaCalendar, FaCoins, FaLink, FaUniversity } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import { MdVerifiedUser } from "react-icons/md";

type Props = {};

const MobileMoocsTable = (props: Props) => {
  const list = [1, 2, 3, 4];
  const status = "verifying";

  return (
    <div className="bg-slate-100">
      {list.map((item) => (
        <div className="bg-white mx-2 my-4 px-3 py-3 rounded-lg flex flex-col relative overflow-hidden">
          <h3 className="font-semibold text-base">Heading of course </h3>
          <span className="text-slate-600 flex items-center">
            <FaUniversity className="text-slate-400 me-2" size={16} /> Platform
            : NPTEL
          </span>
          <span className="text-slate-600 flex items-center">
            <FaCoins className="text-slate-400 me-2" size={16} /> Credit : 2
          </span>
          <span className="text-slate-600 flex items-center">
            <FaCalendar className="text-slate-400 me-2" size={16} />
            Date of Joining: 05/10/2013
          </span>
          <span className="text-slate-600 flex items-center">
            <FaCalendar className="text-slate-400 me-2" size={16} />
            Date of Completion: 12/03/2024
          </span>
          <span className="text-slate-600 flex items-center">
            <FaLink className="text-slate-400 me-2" size={16} />
            Verification Url: https://www.demo-url.in/
          </span>
          <span className="flex items-center text-green-600 font-medium">
            <MdVerifiedUser className="text-green-600 me-2" size={16} />
            Verified
          </span>

          <div className="absolute right-2 top-2">
            <Dropdown placement="bottom-end" className="dark:bg-slate-900">
              <DropdownTrigger>
                <Button isIconOnly className="bg-transparent rounded-full">
                  <IoIosMore size={25} className="dark:text-slate-200" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Action event example"
                onAction={(key) => alert(key)}
              >
                <DropdownItem key="Edit">Edit</DropdownItem>
                <DropdownItem key="Delete">Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          <div className="bg-green-600 h-1 w-full absolute top-0 left-0"></div>
        </div>
      ))}
    </div>
  );
};

export default MobileMoocsTable;
