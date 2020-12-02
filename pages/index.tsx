import useSWR from 'swr'
import { useState, useEffect } from "react";
import fetcher from '../utils/fetcher'
import Table from '../components/table/Table'
import SearchInput from '../components/SearchInput'
import Sidebar from '../components/Sidebar'



export default function Index() {
  let items, count, genres, states, loading = false
  const [ filter, setFilter ] = useState({ state: '', genre: ''})
  const [ offset, setOffset ] = useState(0)
  const [ limit, setLimit ] = useState(10)
  const [ search, setSearch ] = useState('')
  const [ term, setTerm ] = useState("");
  const [ genre, setGenre ] = useState("")
  const [ state, setState ] = useState("");


  const { data, mutate, error } = useSWR(
    `{ restaurants { states, genres, items(offset:${offset}, limit:${limit}, search:"${search}", genre: "${filter.genre}", state: "${filter.state}") {name, city, state, phone, genre}, count(search:"${search}", genre: "${filter.genre}", state: "${filter.state}") } }`,
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
    genres,
    states,
    genre,
    state,
    setTerm,
    setState,
    setGenre,
    setFilter
  }

  const config = {
    offset,
    limit,
    count,
    data: items,
    columns,
    loading,
    paginate
  }

  function searchHandler(event) {
    console.log('event', event);
    if (event.target && event.charCode === 13) {
      setSearch(event.target.value);
    }
    else if (!event.target) setSearch(event)
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