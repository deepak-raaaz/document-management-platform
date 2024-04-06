import { Button } from '@nextui-org/react'
import React, { FC } from 'react'
import { toast } from 'react-hot-toast';

type Props = {
  setRoute: (route: string) => void;
}

const Verify:FC<Props> = ({setRoute}) => {
  return (
    <div>
        <h3 className='font-semibold text-lg text-slate-800'>Certificate Verification Confirmation!</h3>
        <span> Proceed with Verification?</span>
        <div className='flex justify-end mt-4'>
        <Button
            size="md"
            variant="solid"
            className='bg-green-600 font-semibold text-white'
            // onPress={setRoute("")}
            onClick={() => {setRoute("a"); toast.success("Verify Successfully!");}}
          >
            Verify
          </Button>
        </div>
    </div>
  )
}

export default Verify