import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const incidents = [
  {
    id: "1",
    title: "Suspicious DNS Activity",
    description: "Unusual DNS queries from internal host",
    severity: "HIGH",
    status: "OPEN",
  },
  {
    id: "2",
    title: "Unauthorized Login Attempt",
    description: "Login attempt from unrecognized IP",
    severity: "MEDIUM",
    status: "CLOSED",
  },
];

const typeDefs = `
  type Incident {
    id: ID!
    title: String!
    description: String!
    severity: Severity!
    status: Status!
  }

  enum Severity {
    LOW
    MEDIUM
    HIGH
  }

  enum Status {
    OPEN
    CLOSED
  }

  type Query {
    getIncidents: [Incident!]!
    getIncidentById(id: ID!): Incident
  }

  type Mutation {
    addIncident(title: String!, description: String!, severity: Severity!, status: Status!): Incident!
    updateIncident(id: ID!, title: String, description: String, severity: Severity, status: Status): Incident!
    deleteIncident(id: ID!): Incident!
  }
`;

const resolvers = {
  Query: {
    getIncidents: () => incidents,
    getIncidentById: (_: any, { id }: any) => {
      return incidents.find((incident) => incident.id === id);
    },
  },
  Mutation: {
    addIncident: (_: any, args: any) => {
      const { title, description, severity, status } = args;
      const newIncident = {
        id: (incidents.length + 1).toString(),
        title,
        description,
        severity,
        status,
      };
      incidents.push(newIncident);
      return newIncident;
    },
    updateIncident: (_: any, update: any) => {
      const index = incidents.findIndex(item => item.id === update.id);
      if (index > -1) {
        incidents.splice(index, 1, update);
      }
      return update;
    },
    deleteIncident: (_: any, args: any) => {
      const index = incidents.findIndex(item => item.id === args.id);
      if (index > -1) {
        incidents.splice(index, 1);
      }
      return { id: args.id };
    },
  },
};

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`Server ready at ${url}`);
}

startServer();
