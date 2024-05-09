/* 
    This file is used to create an Apollo Client instance that will be used in React Server 
    Components and not for Server Side Rendering in Client Components.
    See https://github.com/apollographql/apollo-client-nextjs?tab=readme-ov-file#usage for more details.
*/

import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc"

export const { getClient } = registerApolloClient(() => {
    return new ApolloClient({
        cache: new InMemoryCache(),
        link: new HttpLink({
            uri: "https://api.github.com/graphql",
            fetchOptions: { cache: "cache-and-network" }
        })
    })
})
