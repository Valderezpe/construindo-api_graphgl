const {gql,ApolloServer } = require ('apollo-server')

//DATABASE
let books=[];

//TYPES
const  typeDefs = gql`
    type  Book {
        id: ID!
        title: String
        author: String
        publishedAt: Int
    }

    type Query{
        books:[Book]
        book(id: ID!): Book
    }

    type Mutation{
        create(id: ID!, title: String!, author: String!, publishedAt: Int!): Book
        delete(id: ID!): Boolean
        update(id: ID!, title: String, author: String, publishedAt: Int): Book
    }
`

//RESOLVERS
const resolvers ={
    Query: {
        books: () => {
            return books;
        },
        book: (_, { id}) =>{
            return books.find(book => book.id === id)
        }
    },
    Mutation: {
        create: (_,{id, title, author, publishedAt}) =>{
            const book = { id, title, author, publishdAt};
            books.push(book)
            return book;
        },
        delete: (_, {id}) =>{
            const filteredBooks = books.filter((book) => book.id !==id);
            books = filteredBooks;
            return true;
        },
        update: (_, {id, title, author, publishedAt}) =>{
            const book = books.find(book => book.id === id);
            book.id = book.id;
            book.title = title ? title: book.title;
            book.author = author? author: book.author;
            book.publishdAt = publishedAt? publishedAt: book.publishdAt;
            return book;
        },
    },
}

//SERVER
const app = new ApolloServer({ typeDefs, resolvers});
//RUN SERVER
app.listen().then(({ url }) => console.log(`server running on ${url}`));


