import knex from "knex";
import knexConfig from "./knexfile"
import { ApolloServer, gql } from 'apollo-server-micro'

const db = knex(knexConfig['development']);

db.raw('select 1+1 as result').then(result => {
  console.log(`Database is connected...`)
  // there is a valid connection in the pool
}).catch (err => {
  console.log('There was an error connecting to the database...', err)
})

const typeDefs = gql`
  type Query {
    restaurants(limit: Int = 20, skip: Int = 0): [Restaurant!]!
  }
  type Restaurant {
    id: ID!,
    name: String!,
    city: String!,
    state: String!,
    phone: String!,
    genre: String!
  }
`

const resolvers = {
  Query: {
    async restaurants(parent, args, context) {
      console.log('args', args);
      return db
        .select("*")
        .from("restaurants")
        .orderBy("name", "asc")
        .limit(args.limit)
        .offset(args.skip);
    },
  },
  Restaurant: {
    id: (restaurant, _args, _context) => restaurant.restaurant_id
  }
}

const apolloServer = new ApolloServer({ typeDefs, resolvers })

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: '/api/graphql' })