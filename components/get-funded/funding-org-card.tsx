import Image from "next/image"
import { RightArrowIcon } from "@bitcoin-dev-project/bdp-ui/icons"
import type { FundingOrgDetail } from "@/data/get-funded"

const CornerDots = () => (
    <>
        <div className="absolute top-2 left-2 h-3 w-3 rounded-full bg-brand-gray-100" />
        <div className="absolute top-2 right-2 h-3 w-3 rounded-full bg-brand-gray-100" />
        <div className="absolute bottom-2 left-2 h-3 w-3 rounded-full bg-brand-gray-100" />
        <div className="absolute bottom-2 right-2 h-3 w-3 rounded-full bg-brand-gray-100" />
    </>
)

const Row = ({ label, value }: { label: string; value: string }) => (
    <div className="flex gap-2 text-sm font-quicksand">
        <span className="w-14 shrink-0 font-bold uppercase text-brand-dark/50">
            {label}
        </span>
        <span className="text-brand-dark/80">{value}</span>
    </div>
)

const FundingOrgCard = ({ org }: { org: FundingOrgDetail }) => (
    <div className="relative flex flex-col gap-4 rounded-xl border border-brand-gray-100 bg-brand-card px-5 py-7">
        <CornerDots />

        <div className="flex h-10 items-center">
            {org.logo ? (
                <Image
                    src={org.logo}
                    alt={`${org.name} logo`}
                    width={org.logoWidth ?? 90}
                    height={org.logoHeight ?? 32}
                    className="h-7 w-auto object-contain"
                />
            ) : (
                <span className="font-montserrat text-lg font-bold text-brand-dark/70">
                    {org.name}
                </span>
            )}
        </div>

        <div className="flex flex-col gap-1.5">
            <Row label="Org" value={org.name} />
            <Row label="Focus" value={org.focus} />
            <Row label="Scope" value={org.scope} />
        </div>

        <ul className="flex flex-col gap-1.5 font-quicksand text-sm text-brand-dark/80">
            {org.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-dark/40" />
                    <span>{bullet}</span>
                </li>
            ))}
        </ul>

        <a
            href={org.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex w-max items-center gap-2 self-end rounded-[10px] border border-brand-gray-100 bg-brand px-3 py-2 font-quicksand text-sm font-semibold text-brand-dark transition-colors hover:border-brand-orange-100 hover:text-brand-orange-100"
        >
            View Organization
            <RightArrowIcon width={12} className="text-current" />
        </a>
    </div>
)

export default FundingOrgCard
