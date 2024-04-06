import React, { FC } from 'react'
import { toast } from 'react-hot-toast';
import { Button, Checkbox } from "@nextui-org/react";
import Link from "next/link";

type Props = {
  setRoute: (route: string) => void;
}

const Verify:FC<Props> = ({setRoute}) => {
  const [isSelected, setIsSelected] = React.useState(true);

  return (
    <div>
        <h3 className='font-semibold text-lg text-slate-800'>Account Activation!</h3>
        <div className="overflow-hidden">
          <Checkbox
            aria-label="name"
            className="my-2"
            isSelected={isSelected}
            onValueChange={setIsSelected}
          >
            <div className="w-full flex flex-col ms-2">
              <span className=" text-slate-800 text-base">Send activation mail to </span>
              <span className="text-tiny text-slate-500">deepakjamui26@gmail.com</span>
            </div>
          </Checkbox>
        </div>
        <div className='flex justify-end mt-4'>

        <Button
            size="md"
            variant="solid"
            className='bg-green-600 font-semibold text-white'
            onClick={() => {setRoute("a"); toast.success("Verify Successfully!");}}
          >
            Activate
          </Button>
        </div>
    </div>
  )
}

export default Verify