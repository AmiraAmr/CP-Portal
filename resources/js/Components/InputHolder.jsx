import React from 'react'

const InputHolder = ({ Icon, label, htmlFor, Input, disabled, customStyle }) => {
  return (
    <div className={`flex flex-row gap-2 items-center py-2 px-3 max-h-[72px] border border-[#E9E9E9] rounded-xl ${disabled ? "bg-[#F2F2F2]" : "bg-transparent"} ${customStyle}`}>
        <div>
            {Icon}
        </div>
        <div className='flex flex-col gap-1 items-start w-[100%]'>
            <label className='text-[#A8A8A8] font-semibold text-sm' htmlFor={htmlFor}>{label}</label>
            <div className='w-full'>{Input}</div>
        </div>
    </div>
  )
}

export default InputHolder
