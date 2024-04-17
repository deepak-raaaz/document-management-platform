import React from 'react'
import MarSubmissionList from './marSubmissionList/MarSubmissionList';
import { useAdminMarDataQuery } from '@/redux/features/api/admin/adminApi';

type Props = {}

const Mar = (props: Props) => {
  const { data } = useAdminMarDataQuery({});

  return (
    <div className="mx-2">
      <h2 className="font-semibold text-lg text-slate-800 my-3 ">Mar</h2>
      {data && <MarSubmissionList mar={data.marData} />}
    </div>
  )
}

export default Mar