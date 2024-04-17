import React from 'react'
import MarCategoryList from './mar-category-list/MarCategoryList';
import { useAdminMarCategoryListQuery } from '@/redux/features/api/admin/adminApi';

type Props = {}

const MarList = (props: Props) => {

  const { data } = useAdminMarCategoryListQuery({});
console.log(data);
  return (
    <div className="mx-2">
      <h2 className="font-semibold text-lg text-slate-800 my-3 ">
        Mar Course List
      </h2>
      {data && <MarCategoryList marCategoryList={data.marList} />}
    </div>
  )
}

export default MarList