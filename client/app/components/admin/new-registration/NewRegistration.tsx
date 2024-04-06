import React from 'react'
import NewRegistrationList from './newRegistrationList/NewRegistrationList'

type Props = {}

const NewRegistration = (props: Props) => {
  return (
    <div className='mx-2'>
    <h2 className='font-semibold text-lg text-slate-800 my-3 '>New Registration</h2>
    <NewRegistrationList />
</div>
  )
}

export default NewRegistration