import Dropdown from "./Dropdown"

const DropdownButton = ({ buttonTitle, contentHead, actions, customStyle }) => {
  return (
    <div className={`w-[100px] px-4 py-2 cursor-pointer rounded-lg bg-[#4B5F8C] text-white text-sm text-center ${customStyle}`}>
        <Dropdown>
            <Dropdown.Trigger>
                { buttonTitle }
            </Dropdown.Trigger>

            <Dropdown.Content>
                { contentHead ?? '' }

                {
                    actions.map(({ label, href }) => (
                        <Dropdown.Link
                            key={label}
                            href={href}
                        >
                            {label}
                        </Dropdown.Link>
                    ))
                }

            </Dropdown.Content>
        </Dropdown>
    </div>
  )
}

export default DropdownButton
