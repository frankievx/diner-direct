import GenreFilter from './GenreFilter';
import SearchInput from './SearchInput'
import SidebarItem from './SidebarItem'
import StateFilter from './StateFilter';
const Sidebar = ({config}) => {
  const items = [
    { icon: 'funnel-outline' }
  ]

  return (
    <div className="">
      <div className="mt-8 mx-2">
        <div className="text-2xl font-semibold mb-4 text-gray-800">Search</div>
        <div className="mt-4">
          <SearchInput
            onSearch={config.searchHandler}
            term={config.term}
            setTerm={config.setTerm}
          />
        </div>
        <div className="flex rounded-lg py-1 mt-4  tracking-wide text-center cursor-pointer bg-primary text-white shadow-md">
          <div className="text-left ml-4 my-auto">
            <ion-icon class="block" name="search-outline"></ion-icon>
          </div>
          <div className="mx-auto">Search</div>
        </div>
      </div>
      <div className="mt-8 mx-2">
        <div className="text-2xl font-semibold mb-4 text-gray-800">Filters</div>
        <div className="mt-4">
          {/* <div className="text-sm font-semibold ">State</div> */}
          <StateFilter
            states={config.states}
            selected={config.state}
            onFilter={config.setState}
          />
        </div>
        <div className="mt-4">
          {/* <div className="text-sm font-semibold">Genre</div> */}
          <GenreFilter
            genres={config.genres}
            selected={config.genre}
            onFilter={config.setGenre}
          />
        </div>
        <div className="flex rounded-lg py-1 mt-4  tracking-wide text-center cursor-pointer bg-primary text-white shadow-md">
          <div className="text-left ml-4 my-auto">
            <ion-icon class="block" name="filter-outline"></ion-icon>
          </div>
          <div className="mx-auto">Filter</div>
        </div>
      </div>
      {/* {items.map(item => <SidebarItem item={item}/>)} */}
    </div>
  );
}

export default Sidebar