import useSWR from 'swr'
import { useState, useEffect } from "react";
import fetcher from '../utils/fetcher'
import Table from '../components/table/Table'
import SearchInput from '../components/SearchInput'
import Sidebar from '../components/Sidebar'
import { gql } from 'graphql-request'

const restaurantsQuery = gql`
  query(
    $search: String
    $genre: String
    $state: String
    $limit: Int
    $offset: Int
    $sort: [RestaurantSortInput!]!
  ) {
    restaurants {
      states
      genres
      items(
        search: $search
        genre: $genre
        state: $state
        limit: $limit
        offset: $offset,
        sort: $sort
      ) {
        name
        city
        state
        phone
        genre
      }
      count(search: $search, genre: $genre, state: $state)
    }
  }
`;

let queryVariables = {}

const initialColumns = [
  { label: "Name", field: "name", sortable: true },
  { label: "City", field: "city", sortable: false },
  { label: "State", field: "state", sortable: true },
  { label: "Phone", field: "phone", sortable: false },
  { label: "Genre", field: "genre", sortable: false },
];

export default function Index() {
  let items, count, genres, states, loading = false
  const [ filter, setFilter ] = useState({ state: '', genre: ''})
  const [ offset, setOffset ] = useState(0)
  const [ limit, setLimit ] = useState(10)
  const [ search, setSearch ] = useState('')
  const [ term, setTerm ] = useState("")
  const [ genre, setGenre ] = useState("")
  const [ state, setState ] = useState("")
  const [ columns, setColumns ] = useState(
    initialColumns.map((column) => {
      return { ...column, sort: "" };
    })
  );
  const [ sort, setSort ] = useState([])

  queryVariables.search = search
  queryVariables.genre = filter.genre;
  queryVariables.state = filter.state;
  queryVariables.offset = offset;
  queryVariables.limit = limit;
  

  

  // const sort = columns.filter(item => item.sort).map(item => ({ field: item.field, order: item.sort}))

  // queryVariables = {
  //   search,
  //   genre: filter.genre,
  //   state: filter.state,
  //   offset,
  //   limit
  // }
  // console.log('queryVariables', queryVariables);
  const { data, mutate, error } = useSWR(
    [restaurantsQuery, search, filter.genre, filter.state, offset, limit, sort],
    (query, search, genre, state, offset, limit, sort) =>
      fetcher(query, { search, genre, state, offset, limit, sort })
  );

  // const { data, mutate, error } = useSWR(
  //   `{ restaurants { states, genres, items(offset:${offset}, limit:${limit}, search:"${search}", genre: "${filter.genre}", state: "${filter.state}", sort: "${sort}") {name, city, state, phone, genre}, count(search:"${search}", genre: "${filter.genre}", state: "${filter.state}") } }`,
  //   fetcher
  // );

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
    sort,
    count,
    data: items,
    columns,
    loading,
    paginate,
    sortHandler,
  };

  function searchHandler(event) {
    if (event.target && event.charCode === 13) {
      setSearch(event.target.value);
    }
    else if (!event.target) setSearch(event)
  }

  function sortHandler(field) {
    console.log('field', field);
    let newColumns = columns.slice()
    let columnIndex = newColumns.findIndex((item) => item.field === field);
    let column = newColumns[columnIndex];

    let newSort = sort.slice()
    let sortIndex = newSort.findIndex(item => item.field === field)
    console.log('sortIndex', sortIndex);
    if (sortIndex > -1) {
      let sortItem = newSort[sortIndex]
      newSort.splice(sortIndex, 1);
      if (sortItem.order === "") {
        newSort.push({ field, order: "asc" });
      } else if (sortItem.order === "asc") {
        newSort.push({ field, order: "desc" });
      }
    }
    else newSort.push({ field, order: "asc" });
    setSort(newSort)
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