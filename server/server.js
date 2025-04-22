"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
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
        getIncidentById: (_, { id }) => {
            return incidents.find((incident) => incident.id === id);
        },
    },
    Mutation: {
        addIncident: (_, args) => {
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
        updateIncident: (_, update) => {
            const index = incidents.findIndex(item => item.id === update.id);
            if (index > -1) {
                incidents.splice(index, 1, update);
            }
            return update;
        },
        deleteIncident: (_, args) => {
            const index = incidents.findIndex(item => item.id === args.id);
            if (index > -1) {
                incidents.splice(index, 1);
            }
            return { id: args.id };
        },
    },
};
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const server = new server_1.ApolloServer({ typeDefs, resolvers });
        const { url } = yield (0, standalone_1.startStandaloneServer)(server, {
            listen: { port: 4000 },
        });
        console.log(`Server ready at ${url}`);
    });
}
startServer();
