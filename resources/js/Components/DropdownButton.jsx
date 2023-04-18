import Dropdown from "./Dropdown"

const DropdownButton = ({ buttonTitle, contentHead, actions, customStyle }) => {
    const textStyle = 'no-underline text-[#4B5F8C] hover:text-gray-700 hover:bg-gray-100'
  return (
    <div className={`w-[100px] px-4 py-2 cursor-pointer rounded-lg bg-[#4B5F8C] text-white text-sm text-center ${customStyle}`}>
        <Dropdown>
            <Dropdown.Trigger>
                { buttonTitle }
            </Dropdown.Trigger>

            <Dropdown.Content>
                { contentHead ?? '' }

                {
                    actions.map(({ label, href, action }) => (
                        href ? (
                            <Dropdown.Link
                                key={label}
                                href={href}
                                target="_blank"
                                customStyle={textStyle}
                            >
                                {label}
                            </Dropdown.Link>
                        ) :
                        (
                            <div
                                key={label}
                                className={`${textStyle} block w-full px-4 py-2
                                            text-left text-sm leading-5
                                            focus:outline-none focus:bg-gray-100
                                            transition duration-150 ease-in-out`}
                                onClick={action}
                            >
                                {label}
                            </div>
                        )
                    )
                    )
                }

            </Dropdown.Content>
        </Dropdown>
    </div>
  )
}

export default DropdownButton
