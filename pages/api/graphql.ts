import knex from "knex";
import knexConfig from "./knexfile";
import { ApolloServer, gql } from "apollo-server-micro";

const db = knex(knexConfig["development"]);

db.raw("select 1+1 as result")
  .then((result) => {
    console.log(`Database is connected...`);
    // there is a valid connection in the pool
  })
  .catch((err) => {
    console.log("There was an error connecting to the database...", err);
  });

const typeDefs = gql`
  type Query {
    restaurants(
      search: String
      genre: String
      state: String
      offset: Int
      limit: Int
      sort: [RestaurantSortInput]
    ): Restaurants!
  }
  type Mutation {
    createRestaurants(input: CreateRestaurantsInput): CreateRestaurantPayload!
  }
  input FetchRestaurantsInput {
    search: String
    genre: String
    state: String
    offset: Int
    limit: Int
    # sort: [RestaurantSortInput]
  }
  input CountRestaurantsInput {
    search: String
    genre: String
    state: String
  }
  input CreateRestaurantsInput {
    restaurants: [RestaurantInput!]
  }
  input RestaurantInput {
    name: String!
    city: String!
    state: String!
    phone: String!
    genre: String!
  }
  type CreateRestaurantPayload {
    items: [Restaurant!]!
  }
  type Genres {
    items: [String!]
  }
  type Genre {
    genre: [String!]
  }
  type Restaurants {
    items(
      search: String = ""
      genre: String = ""
      state: String = ""
      limit: Int = 20
      offset: Int = 0
      sort: [RestaurantSortInput!]!
    ): [Restaurant!]!
    genres: [String!]!
    states: [String!]!
    count(search: String = "", genre: String = "", state: String = ""): Int!
  }
  type RestaurantItemField {
    field: String
    sort: String
  }
  type Restaurant {
    restaurant_id: ID!
    name: String!
    city: String!
    state: String!
    phone: String!
    genre: String!
  }
  input RestaurantSortInput {
    field: String
    order: String!
  }
  enum Sort {
    asc
    desc
  }
`;

const resolvers = {
  Query: {
    async restaurants(parent, args, { db }) {
      return [];
    },
  },
  Mutation: {
    async createRestaurants (parent, args) {
      console.log('args', args.input.restaurants);
      await db("restaurants").del()
      let data = await db("restaurants")
        .returning("*")
        .insert(args.input.restaurants);
      return { items: data }
    }
  },
  Genres: {
    async items(parent, args, { db }) {
      return db.distinct("genre").from("restaurants").orderBy("genre", "asc");
    },
  },
  Restaurants: {
    async states(parent, args, { db }) {
      const data = await db
        .distinct("state")
        .from("restaurants")
        .orderBy("state", "asc");
      const states = data.map((item) => item.state);
      return states;
    },
    async genres(parent, args, { db }) {
      const data = await db
        .distinct("genre")
        .from("restaurants")
        .orderBy("genre", "asc");
      const genres = data.map((item) => item.genre);
      return genres;
    },
    async items(parent, args, { db }) {
      console.log('args', args);
      let order = (args.sort.length > 0 ) ? args.sort.map(item => ({ column: item.field, order: item.order })) : []
      console.log('order', order);
      // let order = []
      return db
        .select("*")
        .from("restaurants")
        .orderBy(order)
        .where(function (qb) {
          if (args.search) {
            qb.where("name", "ILIKE", `%${args.search}%`);
            qb.orWhere("city", "ILIKE", `%${args.search}%`);
            qb.orWhere("phone", "ILIKE", `%${args.search}%`);
          }
        })
        .andWhere("genre", "ILIKE", `%${args.genre}%`)
        .andWhere("state", "ILIKE", `%${args.state}%`)
        .limit(args.limit)
        .offset(args.offset);
    },
    async count(parent, args, { db }) {
      let count = await db("restaurants")
        .where(function () {
          if (args.search) {
            this.where("name", "ILIKE", `%${args.search}%`)
              .orWhere("city", "ILIKE", `%${args.search}%`)
              .orWhere("genre", "ILIKE", `%${args.search}%`);
          }
        })
        .andWhere("genre", "ILIKE", `%${args.genre}%`)
        .andWhere("state", "ILIKE", `%${args.state}%`)
        .count("restaurant_id");
      return Number(count[0].count);
    },
  },
  Genre: {
    genre: (genre, _args, _context) => {
      console.log("genre", genre);
      genre.genre;
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: { db },
  playground: true,
});


/* 
  This config is some really bad design that is not documented at all in the apollo-server-micro documentation.
  If body parser is not false, the api and useSWR fails to work. 
*/
export const config = {
  api: {
    bodyParser: false,
  },
};


export default apolloServer.createHandler({ path: "/api/graphql" });
