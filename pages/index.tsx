import useSWR from 'swr'
import { useState, useEffect } from "react";
import fetcher from '../utils/fetcher'
import Table from '../components/table/Table'
import SearchInput from '../components/SearchInput'
import Sidebar from '../components/Sidebar'
import { gql } from 'graphql-request'

interface Filter {
  state: string,
  genre: string
}

interface Sort {
  field: string,
  order: string
}

interface Column {
  label: string;
  field: string;
  sortable: boolean;
  sort?: Sort;
}

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

let queryVariables: {
  search: string;
  genre: string;
  state: string;
  offset: number;
  limit: number;
} = {
  search: null,
  genre: null,
  state: null,
  offset: null,
  limit: null
}

const initialColumns: Column[] = [
  { label: "Name", field: "name", sortable: true },
  { label: "City", field: "city", sortable: false },
  { label: "State", field: "state", sortable: true },
  { label: "Phone", field: "phone", sortable: false },
  { label: "Genre", field: "genre", sortable: false },
];

export default function Index() {
  let items, count, genres, states, loading = false
  const [ filter, setFilter ] = useState<Filter>({ state: '', genre: ''})
  const [ offset, setOffset ] = useState(0)
  const [ limit, setLimit ] = useState(10)
  const [ search, setSearch ] = useState('')
  const [ term, setTerm ] = useState("")
  const [ genre, setGenre ] = useState("")
  const [ state, setState ] = useState("")
  const [ columns, setColumns ] = useState<Column[]>(
    initialColumns.map((column:Column): Column => {
      return { ...column, sort: null };
    })
  );
  const [ sort, setSort ] = useState([])

  queryVariables.search = search
  queryVariables.genre = filter.genre;
  queryVariables.state = filter.state;
  queryVariables.offset = offset;
  queryVariables.limit = limit;
  
  const { data, mutate, error } = useSWR(
    [restaurantsQuery, search, filter.genre, filter.state, offset, limit, sort],
    (query, search, genre, state, offset, limit, sort) =>
      fetcher(query, { search, genre, state, offset, limit, sort })
  );

  if (error) return (
    <div className="flex justify-center items-center text-2xl">
      Failed to load
    </div>
  )
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
    let newColumns: Column[] = columns.slice()
    let columnIndex: number = newColumns.findIndex((item) => item.field === field);
    let column: Column = newColumns[columnIndex];

    let newSort: Sort[] = sort.slice()
    let sortIndex: number = newSort.findIndex(item => item.field === field)
    if (sortIndex > -1) {
      let sortItem: Sort = newSort[sortIndex]
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