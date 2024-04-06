import { Button, Checkbox, Chip, Textarea, User, cn } from "@nextui-org/react";
import Link from "next/link";
import React, { FC } from "react";
import { toast } from "react-hot-toast";

type Props = {
  setRoute: (route: string) => void;
};

const Reject: FC<Props> = ({ setRoute }) => {
  const [isSelected, setIsSelected] = React.useState(false);

  const user = {
    name: "Junior Garcia",
    avatar: "https://avatars.githubusercontent.com/u/30373425?v=4",
    username: "jrgarciadev",
    url: "https://twitter.com/jrgarciadev",
    role: "Software Developer",
    status: "Active",
  };
  return (
    <div>
      <h3 className="font-semibold text-lg text-slate-800">
        Account Deactivation!
      </h3>
      <span>
        Please provide a reason for deactivating the account.
      </span>
      <div className="flex flex-col mt-4">
        <div>
          <Textarea
            id="reject"
            //   value={values.verificationUrl}
            //   onChange={handleChange}
            variant="faded"
            labelPlacement="outside"
            placeholder="Enter reason for rejection"
            className=" mb-6 md:mb-0 text-[.88rem]"
          />
          {/* {errors.verificationUrl && touched.verificationUrl && (
              <span className="text-red-500 pt-2 block text-tiny mx-1">
                {errors.verificationUrl}
              </span>
            )} */}
        </div>
        <div className="overflow-hidden">
          <Checkbox
            aria-label="name"
            className="my-2"
            isSelected={isSelected}
            onValueChange={setIsSelected}
          >
            <div className="w-full flex flex-col ms-2">
              <span className=" text-slate-800 text-base">Send deactivation mail to </span>
              <span className="text-tiny text-slate-500">deepakjamui26@gmail.com</span>
            </div>
          </Checkbox>
        </div>
        </div>
        <div className='flex justify-end mt-4'>
        <div className="flex w-full justify-end mt-4 space-x-3">
          <Button
            size="md"
            variant="solid"
            className=" font-semibold"
            // onPress={setRoute("")}
            onClick={() => {
              setRoute("");
            }}
          >
            Cancel
          </Button>
          <Button
            size="md"
            variant="solid"
            className="bg-danger font-semibold text-white"
            // onPress={setRoute("")}
            onClick={() => {
              setRoute("a");
              toast.success("Reject Successfully!");
            }}
          >
            Reject
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Reject;
