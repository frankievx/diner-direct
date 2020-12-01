import useSWR from 'swr'
import { useState, useEffect } from "react";
import fetcher from '../utils/fetcher'
import Table from '../components/table/Table'
import SearchInput from '../components/SearchInput'
import Sidebar from '../components/Sidebar'



export default function Index() {
  let items, count, genres, states, loading = false
  const [ filters, setFilters ] = useState([])
  const [ offset, setOffset ] = useState(0)
  const [ limit, setLimit ] = useState(10)
  const [ search, setSearch ] = useState('')
  const [term, setTerm] = useState("");
  const [genre, setGenre] = useState("")
  const [state, setState] = useState("");

  // const [ genres, setGenres ] = useState([])

  const { data, mutate, error } = useSWR(
    `{ restaurants { states, genres, items(offset:${offset}, limit:${limit}, search:"${search}", genre: "${genre}", state: "${state}") {name, city, state, phone, genre}, count(search:"${search}", genre: "${genre}", state: "${state}") } }`,
    fetcher
  );

  if (error) return <div>Failed to load</div>
  if (!data) {
    items = [], count = 0, genres = [], states = [], loading = true
  } else {
    const { restaurants } = data
    items = restaurants.items
    count = restaurants.count
    genres = restaurants.genres
    states = restaurants.states
    loading = false
  }
  
  const columns = [
    { label: "Name", field: "name", sortable: true },
    { label: "City", field: "city", sortable: false },
    { label: "State", field: "state", sortable: true },
    { label: "Phone", field: "phone", sortable: false },
    { label: "Genre", field: "genre", sortable: false },
  ];

  const sidebarConfig = {
    searchHandler,
    term,
    setTerm,
    genres,
    states,
    genre,
    state,
    setState,
    setGenre
  }

  const config = {
    filters,
    offset,
    limit,
    count,
    data: items,
    columns,
    loading,
    paginate
  }

  function addFilter(filter) {
    let index = filters.findIndex(item => item.field === filter.field)
    if (index < 0 ) {
      setFilters([...filters, filter]);
    }
    else {
      let newFilters = filters.splice(index, 1)
      setFilters(newFilters)
    }
  }

  function searchHandler(event) {
    if (event.charCode === 13) {
      setSearch(event.target.value);
      addFilter({ field: 'search', value: event.target.value })
    }
  }

  function paginate(value) {
    setOffset(value)
  }
  
  return (
    <div className="h-screen container">
      <div className="flex">
      <div className="w-72 h-screen bg-transparent">
          <Sidebar config={sidebarConfig}/>
        </div>
        <div className="w-full mx-8">
          {/* <div className="pt-8 mx-auto">
            <SearchInput onSearch={searchHandler} />
          </div> */}
          <div className="mt-8">
            <div className="md:w-full m-auto my-auto">
              <Table config={config} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}