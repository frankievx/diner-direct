import Logo from './Logo'
import classNames from 'classnames'
import { useState } from 'react'

const LinkItem = ({ label, selected, onSelect }) => {
  const linkClasses = classNames("px-4", "mt-2", "mx-2", "text-center", "flex", "cursor-pointer", "hover:text-primary", {
    "border-b-4": selected, 
    'border-solid': selected,
    "border-primary": selected,
    "text-primary": selected
  });
  return (
    <div className={linkClasses} onClick={() => onSelect(label)}>
      <div className="my-auto">{label}</div>
    </div>
  );
}

const Header = () => {
  const [selected, setSelected] = useState("Diners")
  const items = [
    { label: "Diners", selected: true },
    { label: "Bars", selected: false },
    { label: "Parks", selected: false },
  ];
  return (
    <div className="h-20 bg-white flex">
      <div className="float-left my-auto mx-2 ml-6">
        <Logo />
      </div>
      <div className="flex w-3/4 font-semibold text-xl text-gray-800 ml-24">
        <div className="">
          <div className="flex h-full">
            {items.map((item) => (
              <LinkItem
                label={item.label}
                selected={item.label === selected}
                onSelect={setSelected}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="float-right my-auto  text-gray-800 border-gray-500 mr-24 flex px-4 py-1 rounded-full border cursor-pointer hover:text-primary hover:border-primary">
        <div className="rounded-lg text-sm py-1 mr-2 my-auto">
          Welcome!
        </div>
        <div className="p-4 bg-primary rounded-full my-auto">

        </div>
      </div>
    </div>
  );
}

export default Header