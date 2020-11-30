import Icon from './Icon'
const SidebarItem = (props) => {
  const { item } = props
  return (
    <div className="rounded-full cursor-pointer hover:bg-gray-200 w-8 text-center pt-1">
      <Icon className="text-center" icon={item.icon}/>
      {/* <ion-icon name={item.icon}></ion-icon> */}
    </div>
  )
}

export default SidebarItem