import { useEffect, useState } from "react";

const Status = ({ status }) => {
    console.log(status);
    const [ textProps, setTextProps ] = useState({
        text: '',
        backgroundColor: ''
    })

    useEffect(() => {
        
    switch (status) {
        case 1:
            setTextProps({
                text: 'accepted',
                backgroundColor: 'bg-[#6ccd3c]'
            })
            break;
        case 3:
            setTextProps({
                text: 'rejected',
                backgroundColor: 'bg-[#e82646]'
            })
            break;
        case 2:
            setTextProps({
                text: 'pending',
                backgroundColor: 'bg-[#e4a05c]'
            })
            break;
    
        default:
            setTextProps({
                text: '',
                backgroundColor: ''
            })
            break;
    }
    }, [status])
  return (
    <div className={`${textProps.backgroundColor} px-3 py-1 w-[100px] rounded-sm text-white font-semibold text-sm uppercase text-center`}>
      {textProps.text}
    </div>
  )
}

export default Status
