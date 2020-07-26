module.exports = {
  client: {
    service: {
      name: "hasura",
      url: "https://hasura.mk-tag-ui.engineml-dev.com/v1/graphql",
      headers: {
        "x-hasura-admin-secret":
          "eyJhbGciOiJIUzUxMiJ9.eyJkYXQiOnsidG9rZW5UeXBlIjoiRW5naW5lVG9rZW4ifX0.CbiHYnpSVcIryUyenDZGkt15m-C9PbKN_Tx3VGTIEWalR80Xd7Akl17tmkXi5YlPdhR6oL9hHIfBfkSDbTmVyA"
      }
    }
  }
};
