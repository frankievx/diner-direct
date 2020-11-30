import useSWR from 'swr'
import { useState, useEffect } from "react";
import Table from '../components/table/Table'
import SearchInput from '../components/SearchInput'
const fetcher = (query) =>
  fetch('/api/graphql', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })
    .then((res) => res.json())
    .then((json) => json.data)



export default function Index() {
  let items, count
  const [ filters, setFilters ] = useState([])
  const [ offset, setOffset ] = useState(0)
  const [ limit, setLimit ] = useState(10)
  const [ search, setSearch ] = useState('')
  const { data, mutate, error } = useSWR(
    `{ restaurants { items(offset:${offset}, limit:${limit}, search:"${search}") {name, city, state, phone, genre}, count(search:"${search}") } }`,
    fetcher
  );

  if (error) return <div>Failed to load</div>
  if (!data) {
    items = [], count = 0
  } else {
    const { restaurants } = data
    items = restaurants.items
    count = restaurants.count

    let filters = []
  }
  
  const columns = [
    { label: 'Name', field: 'name' },
    { label: 'City', field: 'city' },
    { label: 'State', field: 'state', filter: true },
    { label: 'Phone', field: 'phone' },
    { label: 'Genre', field: 'genre', filter: true }
  ]

  const config = {
    filters,
    offset,
    limit,
    count,
    data: items,
    columns,
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
    <div className="h-full container">
      <div className="flex pt-8 justify-center">
        <SearchInput onSearch={searchHandler} />
      </div>
      <div className="flex w-full mt-8">
        <div className="lg:w-3/4  md:w-full m-auto my-auto">
          <Table config={config} />
        </div>
      </div>
    </div>
  );
}