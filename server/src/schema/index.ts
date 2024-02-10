import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
} from "graphql";
import _ from "lodash";

//dummy data

var books = [
  { name: "Name of the Wind", genre: "Fantasy", id: "1", authorId: "1" },
  { name: "Avengers", genre: "Sci-Fi", id: "2", authorId: "2" },
  { name: "Guardians of the Galaxy", genre: "Sci-Fi", id: "3", authorId: "3" },
];

var authors = [
  { name: "Shakespeare", age: 52, id: "1" },
  { name: "Russo Brothers", age: 43, id: "2" },
  { name: "Terry Pratchett", age: 66, id: "3" },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve: (parent, args) => {
        console.log("parent", args, parent);
        return _.find(authors, { id: parent.authorId });
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent: any, args: { id: any }) {
        console.log("pran", parent);
        return _.find(books, { id: args.id });
      },
    },
    authors: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args: { id: any }) {
        console.log("parent", parent);
        return _.find(authors, { id: args.id });
      },
    },
  },
});

export default new GraphQLSchema({ query: RootQuery });
