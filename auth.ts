import {
    GetServerSidePropsContext,
    NextApiRequest,
    NextApiResponse
} from "next"
import { getServerSession } from "next-auth"

import { authOptions } from "./app/api/auth/[...nextauth]/options"

export function auth(
    ...args:
        | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
        | [NextApiRequest, NextApiResponse]
        | []
) {
    return getServerSession(...args, authOptions)
}
