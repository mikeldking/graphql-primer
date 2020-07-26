# Type Safety

Types is built in to GraphQL but can become unwieldy when using a dynamic language such as Python and Javascript. The reason being that the shape of the payload changes depending on the query.

```typescript
const restValue: IXResponse = await restApi.requestX(); // You can reasonably deduce the return payload
const gqlValue: any = await graphql.request(query); // Cannot deduce the return type for arbitrary requests
```

To combat this, you can use code-generation tools to take your queries and produce static types to produce reasonable type safety!

```typescript
const gqlValue: Jobs = await graphql.request<JobRequest>(query);
```
