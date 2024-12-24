import { notFound } from "next/navigation"
import { getCommunity } from "@/lib/utils/communities"
import CommunityDashboardClient from "../../../../components/communities/CommunityDashboardClient"

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
