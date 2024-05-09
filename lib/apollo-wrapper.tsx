"use client"

/* 
    This file is used to create an Apollo Client instance that will be used in Server Side Rendering i.e. 
    Client Components and not for React Server Components because we're using the app directory.
    See https://github.com/apollographql/apollo-client-nextjs?tab=readme-ov-file#in-ssr
*/
import React from "react"
import { ApolloLink, HttpLink, useApolloClient } from "@apollo/client"
import {
    ApolloNextAppProvider,
    NextSSRApolloClient,
    NextSSRInMemoryCache
} from "@apollo/experimental-nextjs-app-support/ssr"
import { setContext } from "@apollo/client/link/context"

function makeClient() {
    const authLink = setContext(async (_, { headers, token }) => {
        return {
            headers: {
                ...headers,
                ...(token ? { authorization: `Bearer ${token}` } : {})
            }
        }
    })
    const httpLink = new HttpLink({
        uri: "https://api.github.com/graphql"
    })

    return new NextSSRApolloClient({
        cache: new NextSSRInMemoryCache(),
        link: authLink.concat(httpLink)
    })
}

export function ApolloWrapper({
    children,
    token
}: {
    children: React.ReactNode
    token: string
}) {
    return (
        <ApolloNextAppProvider makeClient={makeClient}>
            <UpdateAuth token={token}>{children}</UpdateAuth>
        </ApolloNextAppProvider>
    )
}

const UpdateAuth = ({
    children,
    token
}: {
    children: React.ReactNode
    token: string
}) => {
    const apolloClient = useApolloClient()
    apolloClient.defaultContext.token = token
    return children
}
