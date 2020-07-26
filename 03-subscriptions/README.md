# Subscriptions

oftentimes clients want to get pushed updates from the server when data they care about changes. To support that, a third operation was introduced into the GraphQL specification: subscription.

## Event-based subscriptions

Subscriptions parallel mutations; just as the list of mutations that the server supports describes all of the actions that a client can take, the list of subscriptions that the server supports describes all of the events that it can subscribe to. Just as a client can tell the server what data to refetch after it performs a mutation with a GraphQL selection, the client can tell the server what data it wants to be pushed with the subscription with a GraphQL selection

```GraphQL
subscription {
  users {
    full_name
  }
}
```

With GraphQL You can only subscribe to 1 top level field.
