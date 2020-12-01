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
    restaurants: Restaurants!
  }
  type Genres {
    items: [String!]
  }
  type Genre {
    genre: [String!]
  }
  type Restaurants {
    items(search: String = "", genre: String = "", state: String = "", limit: Int = 20, offset: Int = 0): [Restaurant!]!
    genres: [String!]!
    states: [String!]!
    count(search: String = ""): Int!
  }
  type Restaurant {
    id: ID!
    name: String!
    city: String!
    state: String!
    phone: String!
    genre: String!
  }
`;

const resolvers = {
  Query: {
    async restaurants(parent, args, { db }) {
      return [];
    },
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
      return db
        .select("*")
        .from("restaurants")
        .orderBy("name", "asc")
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
  Restaurant: {
    id: (restaurant, _args, _context) => restaurant.restaurant_id,
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: { db },
  playground: true,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
