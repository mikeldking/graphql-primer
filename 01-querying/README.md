# querying

Typically with GraphQL, the server provides a schema and a single `POST` endpoint that can resolve queries submitted via the POST body. Caching policies etc. are all handled via clients.

It is important to note that GraphQL is not limited to communicating with servers. Different `links` can be configured such that certain parts of the graph can be resolved via a multitude of transports and resolvers (ex. local storage, websockets etc.)

GraphQL has a uniform error syntax and types that can be extended.

## Basic Types

The GraphQL schema language supports the scalar types of `String`, `Int`, `Float`, `Boolean`, and `ID`, so you can use these directly in the schema.

By default, every type is nullable - it's legitimate to return null as any of the scalar types. Use an exclamation point to indicate a type cannot be nullable, so String! is a non-nullable string.

To use a list type, surround the type in square brackets, so [Int] is a list of integers.

## Basic Syntax

The syntax is very much like JSON without the values filled in

```GraphQL
{
  users {
    first_name
  }
}
```

This will return JSON object that conforms to the schema that you requested

```json
{
  "data": {
    "users": [
      {
        "first_name": "Mikyo"
      },
      {
        "first_name": "Andrew"
      }
    ]
  }
}
```

You cannot make queries that do not conform to the schema

## Making multiple queries at once

You can simply query for multiple things at the root

```GraphQL
{
  users {
    first_name
  }
  projects {
    name
  }
}
```

This produces

```
{
  "data": {
    "users": [
      {
        "first_name": "Mikyo"
      },
      {
        "first_name": "Ben"
      }
    ],
    "projects": [
      {
        "name": "integration-tests"
      },
       {
        "name": "mnist"
      }
    ]
  }
}

```

Alternatively, if you want hierarchical data, you can next the queries

```GraphQL
{
  users {
    first_name
    memberships {
      team {
        projects {
          name
        }
      }
    }
  }
}
```

produces

```json
{
  "data": {
    "users": [
      {
        "first_name": "Mikyo",
        "memberships": [
          {
            "team": {
              "projects": [
                {
                  "name": "integration-tests"
                }
              ]
            }
          }
        ]
      },
      {
        "first_name": "Ben",
        "memberships": [
          {
            "team": {
              "projects": []
            }
          },
          {
            "team": {
              "projects": [
                {
                  "name": "integration-tests"
                },
                {
                  "name": "mnist"
                }
              ]
            }
          }
        ]
      }
    ]
  }
}
```

## Passing parameters in queries

Some queries might support or require parameters.

```GraphQL
{
  user(id: 1) {
    first_name
  }
}
```

## Naming queries with Variables

Sometimes you may want to make a query re-usable. In this case you can name the query and provide variables as input

```GraphQL
query UsersInTeam($teamId: Int!) {
  users(where: { memberships: { team: { id: { _eq: $teamId } } } }) {
    first_name
  }
}
```

In order to execute this query, you must provide the variables along with the query in the post body.

```json
{
  "query": "query UsersInTeam($teamId: Int!) {  users(where: {memberships: {team: {id: {_eq: $teamId }}}}) {   first_name  }}",
  "variables": { "teamId": 1 },
  "operationName": "UsersInTeam"
}
```

Variables support default values

````
```GraphQL
query UsersInTeam($teamName: String = "default") {
  users(where: { memberships: { team: { name: { _eq: $teamName } } } }) {
    first_name
  }
}
```


## Aliases

You may have noticed that, since the result object fields match the name of the field in the query but don't include arguments, you can't directly query for the same field with different arguments. That's why you need aliases - they let you rename the result of a field to anything you want.

```GraphQL
{
  total_job_count: jobs_aggregate {
    aggregate {
      count
    }
  }
  local_job_count: jobs_aggregate(where: { local: { _eq: true } }) {
    aggregate {
      count
    }
  }
}
````

```json
{
  "data": {
    "total_job_count": {
      "aggregate": {
        "count": 30
      }
    },
    "local_job_count": {
      "aggregate": {
        "count": 2
      }
    }
  }
}
```

## Fragments

GraphQL includes reusable units called fragments. Fragments let you construct sets of fields, and then include them in queries where you need to.

```GraphQL
{
  users { ...userDetails }
  teams {
    team_members {
      user {
        ...userDetails
      }
    }
  }
}

fragment userDetails on user {
	id
  first_name
  last_name
}
```

## Directives

We might need a way to dynamically change the structure and shape of our queries using variables. For example, we can imagine a UI component that has a summarized and detailed view, where one includes more fields than the other.

```GraphQL
query Jobs( $withUser: Boolean! = false) {
  jobs {
    engine_id
    user @include(if: $withUser) {
      first_name
    }
  }
}

```

A directive can be attached to a field or fragment inclusion, and can affect execution of the query in any way the server desires. The core GraphQL specification includes exactly two directives, which must be supported by any spec-compliant GraphQL server implementation:

- @include(if: Boolean) Only include this field in the result if the argument is true.
- @skip(if: Boolean) Skip this field if the argument is true.
