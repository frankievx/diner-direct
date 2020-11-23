import useSWR from 'swr'
import Table from '../components/Table'
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
  const { data, error } = useSWR('{ users { name } }', fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  const { users } = data
  const columns = [
    { label: 'Name', field: 'name' },
    { label: 'City', field: 'city' },
    { label: 'State', field: 'state' },
    { label: 'Phone', field: 'phone' },
    { label: 'Genre', field: 'genre' }
  ]
  const restaurants = [
    { name: 'Perfect Pizzaria', city: 'Denver', state: 'CO', phone: '(703) 552-2333', genre: 'italian' },
    { name: 'Great Greek', city: 'Boulder', state: 'CO', phone: '(703) 525-2233', genre: 'greek' },
    { name: 'Super Sushi', city: 'Denver', state: 'CO', phone: '(703) 552-2333', genre: 'asian' },
    { name: 'Champion Chinese', city: 'Colorado Sprinngs', state: 'CO', phone: '(703) 352-2433', genre: 'asian' },
    { name: "Papa's Pastas", city: 'Denver', state: 'CO', phone: '(703) 552-2333', genre: 'italian' }
  ]
  return (
    <div className="h-full container">
      <div className="flex pt-8 justify-center ">
        <div className="flex-no-wrap lg:w-3/4  md:w-full justify-between py-1 shadow-md rounded-lg text-lg border border-solid border-gray-300 bg-transparent focus-within:border-primary focus-within:border-solid focus-within:border-2 hover:border-gray-500">
          {/* <i class="ti flex-initial my-auto ml-2 text-gray-600 font-medium group-focus:text-primary1" >ti-search</i> */}
          <input
            className="flex-1 mx-2 bg-light border-0 outline-none bg-transparent text-sm py-1"
          />
        </div>
      </div>
      <div className="flex w-full mt-8">
        <div className="lg:w-3/4  md:w-full m-auto my-auto">
          <Table columns={columns} data={restaurants}/>
        </div>
      </div>
    </div>
  )
}