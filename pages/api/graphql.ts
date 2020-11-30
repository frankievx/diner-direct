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
    restaurants: Restaurants!
  }
  type Restaurants {
    items(search: String = "", limit: Int = 20, offset: Int = 0): [Restaurant!]!,
    count(search: String = ""): Int!
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
      return db
        .select("*")
        .from("restaurants")
        .orderBy("name", "asc")
        .limit(args.limit)
        .offset(args.offset);
    },
  },
  Restaurants: {
    async items (parent, args, context) {
      return db
        .select("*")
        .from("restaurants")
        .orderBy("name", "asc")
        .where(function () {
          if (args.search) {
            this.where("name", "ILIKE", `%${args.search}%`)
            .orWhere("city", "ILIKE", `%${args.search}%`)
            .orWhere("genre", "ILIKE", `%${args.search}%`)
          }
        })
        .limit(args.limit)
        .offset(args.offset);
    },
    async count (parent, args, context) {
      let count = await  db("restaurants")
      .where(function () {
        if (args.search) {
          this.where("name", "ILIKE", `%${args.search}%`)
          .orWhere("city", "ILIKE", `%${args.search}%`)
          .orWhere("genre", "ILIKE", `%${args.search}%`)
        }
      })
      .count('restaurant_id')
      return Number(count[0].count)
    }
  },
  Restaurant: {
    id: (restaurant, _args, _context) => restaurant.restaurant_id
  }
}

const apolloServer = new ApolloServer({ typeDefs, resolvers, playground: true, })

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: '/api/graphql' })