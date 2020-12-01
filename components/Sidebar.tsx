import GenreFilter from "./GenreFilter";
import SearchInput from "./SearchInput";
import SidebarItem from "./SidebarItem";
import StateFilter from "./StateFilter";
import Button from "./global/Button";
const Sidebar = ({ config }) => {
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
        <div className="mt-8">
          <Button icon="filter-outline" label="Filter" />
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
        <div className="mt-8">
          <Button icon="filter-outline" label="Filter" />
        </div>

      </div>
    </div>
  );
};

export default Sidebar;
