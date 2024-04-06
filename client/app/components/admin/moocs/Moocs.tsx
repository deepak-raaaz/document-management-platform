import React from 'react'
import MoocsSubmissionList from './moocsSubmissionList/MoocsSubmissionList'

type Props = {}

const Moocs = (props: Props) => {
  return (
    <div className='mx-2'>
        <h2 className='font-semibold text-lg text-slate-800 my-3 '>Moocs</h2>
        <MoocsSubmissionList />
    </div>
  )
}

export default Moocs