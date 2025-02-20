import React from 'react'

const Blob = ({ top, left, height, width, xlh, xlw, xxlh, xxlw , bottom}) => {
  return (
    <div 
      className={`blob -top-[${top}] h-[${height}] w-[${width}] xl:h-[${xlh}] xl:w-[${xlw}] 2xl:h-[${xxlh}] 2xl:w-[${xxlw}] -left-[${left}] b-[${bottom}]`}
    ></div>
  )
}

export default Blob
