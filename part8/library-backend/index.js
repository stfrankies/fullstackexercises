const { v1: uuid } = require('uuid')
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')

let persons = [
    {
        name: 'Arto Hellas',
        phone: '040-123543',
        city: 'Espoo',
        street: 'Tapiolankatu 5 A',
        id: '3d594650-3436-11e9-bc57-8b80ba54c431',
    },
    {
        name: 'Matti Luukkainen',
        phone: '040-432342',
        city: 'Helsinki',
        street: 'Malminkaari 10 A',
        id: '3d599470-3436-11e9-bc57-8b80ba54c431',
    },
    {
        name: 'Venla Ruuska',
        street: 'Nallemäentie 22 C',
        city: 'Helsinki',
        id: '3d599471-3436-11e9-bc57-8b80ba54c431',
    },
]

const typeDefs = `
	type Address {
		street: String!
		city: String!
	}

	type Person {
		name: String!
		phone: String
		address: Address!
		id: ID!
	}

    enum YesNo {
        YES
        NO
    }

	type Query {
		personCount: Int!
		allPersons(phone: YesNo): [Person!]!
		findPerson(name: String!): Person
	}

    type Mutation {
        addPerson(
          name: String!
          phone: String
          street: String!
          city: String!
        ): Person
        editPhone(
          name: String!
          phone: String!
        ): Person
      }
`

const resolvers = {
    Query: {
        personCount: () => persons.length,
        allPersons: (root, args) => {
            if (!args.phone) return persons

            return persons.filter((person) =>
                args.phone === 'YES' ? person.phone : !person.phone
            )
        },
        findPerson: (root, args) =>
            persons.find((person) => person.name === args.name),
    },
    Person: {
        address: ({ street, city }) => {
            return {
                street,
                city,
            }
        },
    },
    Mutation: {
        addPerson: (root, args) => {
            if (persons.find((person) => person.name === args.name)) {
                throw new GraphQLError('Name must be unique', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                    },
                })
            }

            const person = { ...args, id: uuid() }
            persons = persons.concat(person)
            return person
        },
        editPhone: (root, args) => {
            const person = persons.find((person) => person.name === args.name)
            if (!person) return null

            const updatedPerson = { ...person, phone: args.phone }
            persons = persons.map((person) =>
                person.name === args.name ? updatedPerson : person
            )
            return updatedPerson
        },
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

startStandaloneServer(server, {
    listen: { port: 4000 },
}).then(({ url }) => console.log(`Server ready at ${url}`))
