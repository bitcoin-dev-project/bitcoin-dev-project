import { notFound } from "next/navigation"
import { getCommunity } from "@/lib/utils/communities"
import CommunityDashboardClient from "../../../../components/communities/CommunityDashboardClient"
import { genPageMetadata } from "@/app/seo"
import type { Metadata } from "next"

export async function generateMetadata({
    params
}: {
    params: { communityId: string }
}): Promise<Metadata> {
    const community = getCommunity(params.communityId)
    if (!community) return {}

    return genPageMetadata({
        title: community.name,
        description: community.description
    })
}

// Server Component
export default function CommunityDashboard({
    params
}: {
    params: { communityId: string }
}) {
    const community = getCommunity(params.communityId)

    if (!community) {
        notFound()
    }

    return <CommunityDashboardClient communityData={community} />
}
