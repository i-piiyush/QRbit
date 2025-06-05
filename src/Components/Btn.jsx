import React from 'react'

const Btn = (props) => {
  return (
    
    <a className='bg-black text-white px-10 py-3 rounded-md font-semibold' href={props.contact} target='_blank' >
        lets talk
    </a>
  )
}

export default Btn