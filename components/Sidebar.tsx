import SidebarItem from './SidebarItem'
const Sidebar = () => {
  const items = [
    { icon: 'funnel-outline' }
  ]
  return (
    <div className="mx-auto w-auto">
      {items.map(item => <SidebarItem item={item}/>)}
    </div>
  );
}

export default Sidebar