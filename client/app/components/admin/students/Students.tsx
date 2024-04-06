import React from 'react'
import StudentsList from './studentList/StudentsList'

type Props = {}

const Students = (props: Props) => {
  return (
    <div className='mx-2'>
        <h2 className='font-semibold text-lg text-slate-800 my-3 '>Students List</h2>
        <StudentsList/>
    </div>
  )
}

export default Students