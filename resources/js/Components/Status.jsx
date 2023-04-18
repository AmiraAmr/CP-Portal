import { useEffect, useState } from "react";

const Status = ({ status, Icon, customStyle, onClick }) => {
    const [ textProps, setTextProps ] = useState({
        text: '',
        backgroundColor: ''
    })
    console.log(status);

    useEffect(() => {
    switch (status) {
        case 0:
            setTextProps({
                text: 'pending',
                backgroundColor: 'bg-[#e4a05c]'
            })
            break;
        case 1:
            setTextProps({
                text: 'accepted',
                backgroundColor: 'bg-[#6ccd3c]'
            })
            break;
            case 2:
                setTextProps({
                    text: 'rejected',
                    backgroundColor: 'bg-[#e82646]'
                })
                break;
            case 3:
                setTextProps({
                    text: 'closed',
                    backgroundColor: 'bg-[#047011]'
                })
                break;
            case 4:
                setTextProps({
                    text: 'warning',
                    backgroundColor: 'bg-[#ffcc00]'
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
    <div
        className={`flex gap-2 justify-center ${textProps.backgroundColor} px-3 py-1 w-[100px] rounded-sm
                    text-white font-semibold text-sm uppercase text-center ${customStyle}`}
        onClick={onClick ?? null}
        >
        {Icon}
      {textProps.text}
    </div>
  )
}

export default Status
