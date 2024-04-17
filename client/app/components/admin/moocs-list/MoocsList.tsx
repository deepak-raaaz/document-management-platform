import React from 'react'
import MoocsCourseList from './moocs-course-list/MoocsCourseList'
import { useSelector } from 'react-redux';

type Props = {}

const MoocsList = (props: Props) => {
  const { allUsers } = useSelector((state: any) => state.admin);

  return (
    <div className='mx-2'>
      <MoocsCourseList users={allUsers}/>
    </div>
  )
}

export default MoocsList