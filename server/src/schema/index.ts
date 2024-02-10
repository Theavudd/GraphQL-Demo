import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import _ from "lodash";

//dummy data

var books = [
  { name: "Name of the Wind", genre: "Fantasy", id: "1" },
  { name: "Avengers", genre: "Sci-Fi", id: "2" },
  { name: "Guardians of the Galaxy", genre: "Sci-Fi", id: "3" },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent: any, args: { id: string }) {
        // code to get data from db
        return _.find(books, { id: args.id });
      },
    },
  },
});

export default new GraphQLSchema({ query: RootQuery });
