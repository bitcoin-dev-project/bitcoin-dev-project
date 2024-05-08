import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        accessToken?: string
        user: {
            email: string
            login?: string
            html_url?: string
        } & DefaultSession["user"]
    }

    /**
     * The shape of the user object returned in the OAuth providers' `profile` callback,
     * or the second parameter of the `session` callback, when using a database.
     */
    interface User {
        email: string
        name: string
    }

    interface GhExtendedProfile extends Profile {
        email: string
        login: string
        avatar_url: string
        html_url: string
        [key]?: string
    }
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            GITHUB_ID: string
            GITHUB_SECRET: string
            NEXTAUTH_URL: string
            NEXTAUTH_SECRET: string
        }
    }
}
