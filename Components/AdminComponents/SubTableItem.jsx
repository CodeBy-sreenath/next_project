import React from 'react'

const SubTableItem = ({email,mongoId,date,deleteEmail}) => {
    const EmailDate=new Date(date)
  return (
    <tr className='bg-white border-b text-left'>
        <th scope='row' className='px-6 py-2 font-medium text-gray-900 whitespace-nowrap'>
            {
                email?email:"NO email"
            }

        </th>
        <td className='px-6 py-4 hidden sm:block'>{EmailDate.toDateString() }</td>
        <td className='px-6 py-4 cursor-pointer' onClick={()=>deleteEmail(mongoId)} >x</td>

    </tr>
  )
}

export default SubTableItem
