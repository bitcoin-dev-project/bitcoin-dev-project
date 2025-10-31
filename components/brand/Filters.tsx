import { Tag, TagType } from "@bitcoin-dev-project/bdp-ui"
import { Button } from "@bitcoin-dev-project/bdp-ui"
import { Leaf } from "@bitcoin-dev-project/bdp-ui"
import { Search } from "@bitcoin-dev-project/bdp-ui"
import React, { FormEvent } from "react"

const Filters = () => {
    const handleFilter = (e: FormEvent) => {
        e.preventDefault()
        console.log(e)
    }
    return (
        <div className="border bg-brand-gray flex flex-col gap-5 border-brand-gray-100 rounded-xl px-3 py-5">
            <h3 className="font-bold text-xl">Search & Filter by:</h3>

            <div className="flex flex-col gap-5" role="form" id="filter" aria-label="Contact Information">
                <div role="" className="flex flex-col gap-2">
                    <label className="font-semibold" htmlFor="search">Resource name or Description</label>
                    <Search id="search" />
                </div>

                <div className="flex flex-col gap-2">
                     <label className="font-semibold" htmlFor="search">Resource name or Description</label>
                    <div className="flex flex-wrap gap-2">
                      {["guide", "seminar", "tool", "interactive"].map((type) => (
                        <Tag key={type} type={type as TagType} className="capitalize" >
                                {type}
                        </Tag>
                    ))}
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="font-semibold">Resource Difficulty</h3>
                    <div className="flex flex-wrap gap-2">
                      {[1,2,3].map((count) => (
                        <Leaf key={count} leavesCount={count} withBorder/>
                    ))}
                    </div>
                </div>

                <Button label="Clear Filters" variant="rebrand">

                </Button>
            </div>
        </div>
    )
}

export default Filters
