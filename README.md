# Express Node TS project for Battle Royale

This project features an HTTP REST API for player management, developed with an Express.js server using TypeScript. The API allows users to perform various actions, including listing players, adding new players, initiating battles between players, and getting attack logs within a battle.

<!-- ⛔️ MD-MAGIC-EXAMPLE:START (TOC:collapse=true&collapseText=Click to expand) -->
<details>
<summary>Table of Contents (click to expand)</summary>

* [Express Node TS Project for Business Lookup API](#express-node-ts-project-for-business-lookup-api)
    * [Getting Started](#getting-started)
        * [Prerequisites](#prerequisites)
        * [Installation](#installation)
        * [Setting up the Database](#setting-up-the-database)
        * [Running the Application](#running-the-application)
    * [API Routes](#api-routes)
        * [GET /discovery](#get-discovery)
            * [Query Parameters](#query-parameters)
            * [Response](#response)
            * [Examples](#examples)
            * [Error Handling](#error-handling)
    * [Available Scripts](#available-scripts)
    * [Technology Stack](#technology-stack)
    * [Project Structure](#project-structure)
    * [Testing](#testing)

</details>
<!-- ⛔️ MD-MAGIC-EXAMPLE:END -->


## Getting Started

### Prerequisites

Please ensure that you have Node.js 20 and pnpm installed for local development. Alternatively, you can use Docker to
run the application in a containerized environment using the included compose file, which eliminates the need for local
Node.js and pnpm installations.

### Installation

1. Clone the repository

```bash
git clone https://github.com/askmrsinh/battle-royale battle-royale
cd battle-royale
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

### Setting up the Database

Run migrations and seed the database:

```
npx mikro-orm migration:fresh && npx mikro-orm seeder:run
```

### Running the Application

To run the application in development mode (watch mode):

```bash
pnpm start:dev
```

The server will be available at `http://localhost:3000`.

## API Routes

### GET /players

Lists all players with all the details of each player.Z

#### Response

```json
[
    {
        "id": "912cb35e-a7f5-46a7-bd75-90f46a7e911c",
        "createdAt": 1726593308147,
        "name": "Player A",
        "gold": 1000000,
        "attack": 98,
        "hit": 55,
        "luck": 40
    },
    {
        "id": "ad8c1dfd-5143-4dd5-950d-7ee120b39e4a",
        "createdAt": 1726593308150,
        "name": "Player B",
        "gold": 1000000,
        "attack": 98,
        "hit": 68,
        "luck": 86
    }
]
```

### POST /players

Adds a player to the database, only 'name' of the player is user provided, other fields are randomly assigned.

#### Request

```json
{
  "name": "Batman"
}
```

#### Response

```json
{
    "id": "03b5aef8-2aea-41fc-9fef-5f4dad8e996a",
    "createdAt": 1726593328519,
    "name": "Batman",
    "gold": 1000000,
    "attack": 17,
    "hit": 44,
    "luck": 92
}
```

### GET /battles

Lists all the battles


### POST /battles

Initiates a battle between two players using their UUIDs.

#### Request

```json
{
  "from": "912cb35e-a7f5-46a7-bd75-90f46a7e911c",
  "to": "ad8c1dfd-5143-4dd5-950d-7ee120b39e4a"
}
```

#### Response

TODO: Fix the response structure. It's too verbose to include in this README.

### GET /battles/{id}/attacks

Lists attacks that were a part of the given battle


#### Response

```json
{
    "id": "843719db-1ef4-4b78-9629-b688c5ff0473",
    "createdAt": 1726594628433,
    "from": "912cb35e-a7f5-46a7-bd75-90f46a7e911c",
    "to": "ad8c1dfd-5143-4dd5-950d-7ee120b39e4a",
    "isFinished": true,
    "attacks": [
        {
            "id": "356ce03f-63e5-4a62-8590-6844d343c176",
            "createdAt": 1726594628444,
            "battle": "843719db-1ef4-4b78-9629-b688c5ff0473",
            "attacker": "912cb35e-a7f5-46a7-bd75-90f46a7e911c",
            "damage": 53.9
        },
        {
            "id": "2d84a6c7-c394-4fd6-8f22-7c0e19d60a9f",
            "createdAt": 1726594628557,
            "battle": "843719db-1ef4-4b78-9629-b688c5ff0473",
            "attacker": "ad8c1dfd-5143-4dd5-950d-7ee120b39e4a",
            "damage": 0
        },
        {
            "id": "38ea21b2-a4e5-4e72-a814-c5d2af223d7c",
            "createdAt": 1726594628573,
            "battle": "843719db-1ef4-4b78-9629-b688c5ff0473",
            "attacker": "912cb35e-a7f5-46a7-bd75-90f46a7e911c",
            "damage": 0
        },
        {
            "id": "58dc14d9-345b-4541-9568-26a6cf428dee",
            "createdAt": 1726594628588,
            "battle": "843719db-1ef4-4b78-9629-b688c5ff0473",
            "attacker": "ad8c1dfd-5143-4dd5-950d-7ee120b39e4a",
            "damage": 49
        },
        {
            "id": "edf5308a-0cdf-4715-ae2e-257c8463098b",
            "createdAt": 1726594628603,
            "battle": "843719db-1ef4-4b78-9629-b688c5ff0473",
            "attacker": "912cb35e-a7f5-46a7-bd75-90f46a7e911c",
            "damage": 0
        },
        {
            "id": "67a04dda-0a1c-4e2f-bbf0-378d2deb197e",
            "createdAt": 1726594628617,
            "battle": "843719db-1ef4-4b78-9629-b688c5ff0473",
            "attacker": "ad8c1dfd-5143-4dd5-950d-7ee120b39e4a",
            "damage": 49
        }
    ]
}
```

#### Error Handling

Some request validation is implemented using class validator package with the player's controller file.
An example request and response is given below, similar pattern can be extended to other api endpoints.

Example:

```
POST /players
```


```json
{
  "name": "Hi"
}
```

```json
{
  "error": {
    "name": [
      "name must be longer than or equal to 3 characters"
    ]
  }
}
```



## Available Scripts

- `pnpm start`: Initializes the Database and start the application in production mode
- `pnpm start:dev`: Start the application in development (watch) mode
- `pnpm start:prod`: Start the application in production mode
- `pnpm test`: Run tests
- `pnpm lint`: Check code style with Prettier and ESLint
- `pnpm format`: Format code with Prettier

## Technology Stack

- Express.js
- TypeScript
- MikroORM
- SQLite
- class-validator (for request validation)
- class-transformer (for request deserialization)
- Pino (for logging)
- Jest (for testing) - not implemented

## Project Structure

The project uses a typical Express.js structure with TypeScript. Key files and directories include:

- `server.ts`: Main application file
- `app/`: Contains application logic
    - `controllers/`: API route handlers
    - `entities/`: Database entity definitions
    - `seeders/`: Database seeders
    - `dtos/`: Request deserialization and validation

## Considerations in the project

- Player Table: This table stores comprehensive information about each player and is used to perform all basic CRUD (Create, Read, Update, Delete) operations on player data.

- Battles Table: This table records the details of each battle, including the participants — attacker and defender. The player who initiates the battle is recorded as the attacker.

- Attacks Table: This table captures the details of each attack, linked to the corresponding battle through a battle ID. It represents a one-to-many relationship, where each battle can have multiple attack entries. This table is used to retrieve all attacks that occurred during a specific battle.

- Player State Table: This table saves teh health state of the players in a battle after each attack.
## Testing

// TODO

```
pnpm test
```

## TODO
- Implement request validation for all endpoints
- Restructure the response for `battles` endpoint
- Implement logic for reducing looser's gold
- Cleanup the battle engine logic (`app/repositories/battle.repository.ts`) 

