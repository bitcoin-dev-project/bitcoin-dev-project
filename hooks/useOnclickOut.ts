import React, { useRef, useState } from "react"

const useOnclickOut = () => {
    const contentRef = useRef<any>(null)
    const wrapperRef = useRef<HTMLDivElement>(null)

    const [isOpen, setOpen] = useState(false)

    const toggle = () => setOpen(!isOpen)

    React.useEffect(() => {
        document.addEventListener("mousedown", (event) => {
            if (
                contentRef.current &&
                !contentRef.current.contains(event.target as Node) &&
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setOpen(false)
            }
        })
        return () => {
            document.removeEventListener("mousedown", () => {
                setOpen(false)
            })
        }
    }, [isOpen])

    return {
        isOpen,
        setOpen,
        toggle,
        contentRef,
        wrapperRef
    }
}

export default useOnclickOut
