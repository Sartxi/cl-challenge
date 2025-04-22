# Incident Dashboard Challenge

Setup this application by cloning this repository and following these steps:

## Setup graphql server API
1. Open up a terminal window and `cd server`
2. Run `npm i && npm run api`

## Setup and run react client application
1. Open up another terminal window and `cd client`
2. Run `npm i && npm run start`

## Notes

### API
I started by creating a apollo server application and I built out the basic GraphQL API using the example schema. This provides incidents query and an incedent by ID query to fetch incidents and the create, update, and delete mutations.

### Client

For the front end I decided to use the React context API to create a global state that provides the full list of incidents, edit and add incident form state, and toast messaging. The UI is simple offering a list of items (6 per page) with edit/delete functionality. The add and edit uses the same component with some conditional logic to decide which actions need to be taken. When a mutation is made in the UI a toast is displayed.

### Component Lib:
* header - theme selector and new incident button
* list - pagination and filtering state
* incident tile - edit, delete, and set status elements
* incident editor - form for editing and adding incidents
* error display - display for error boundary
* confirmation dialog - used when a incident is being deleted
* toast component
