import dynamic from "next/dynamic"
import TOCInline from "pliny/ui/TOCInline"
import BlogNewsletterForm from "pliny/ui/BlogNewsletterForm"
import type { MDXComponents } from "mdx/types"
import CustomLink from "./Link"
import Image from "./Image"
import SvgDisplay from "./script-visualizer/SvgDisplay"

const ScriptStackVisualizer = dynamic(
    () => import("./script-visualizer/scriptVisualizer")
)
const TransactionsDisplay = dynamic(
    () => import("./transaction-serializer/TransactionDisplay")
)
const QuickLinks = dynamic(() =>
    import("./QuickLinks").then((m) => ({ default: m.QuickLinks }))
)
const QuickLink = dynamic(() =>
    import("./QuickLinks").then((m) => ({ default: m.QuickLink }))
)
const Hint = dynamic(() => import("./Hints"))
const MinimalVideoPlayer = dynamic(() => import("./minimal-video-player"))
const ExpandableAlert = dynamic(() => import("./expandable-alert"))
const P2SHEncoder = dynamic(() => import("./address-encoder"))
const OpcodeDataVisualizer = dynamic(() => import("./opcode-data-visualizer"))
const OpCodeExplorer = dynamic(() => import("./opcode-explorer"))
const MultisigAnimation = dynamic(() => import("./multisig-animation"))
const SandpackComponent = dynamic(() => import("./sandpack"), { ssr: false })
const Quiz = dynamic(() => import("./Quiz"))
const StackSimulator = dynamic(() => import("./stack-simulator"))
const CodeSnippet = dynamic(() => import("./code-snippet"))
const ExerciseSelector = dynamic(() => import("./exercise-selector"), {
    ssr: false
})
const MailingListSignup = dynamic(() => import("./mailing-list-signup"))
const BitcoinHistory = dynamic(() =>
    import("./bitcoin-history").then((m) => ({ default: m.BitcoinHistory }))
)
const HexTransactionHighlighter = dynamic(
    () => import("./hex-transaction-highlighter")
)
const DiscordInvite = dynamic(() => import("./discord-invite"))
const TransactionCreation = dynamic(
    () => import("@/src/components/TransactionCreation")
)
const TransactionAnimationPlayer = dynamic(
    () => import("@/content/transaction-animation-player")
)
const TransactionDecoder = dynamic(() => import("./transaction-decoder"))
const ReorgCalculator = dynamic(() => import("./reorg-calculator"))
const HashFunctions = dynamic(() => import("./hash-functions"))
const AddressGenerator = dynamic(() => import("./address-generator"))
const ByteTools = dynamic(() =>
    import("./byte-tools").then((m) => ({ default: m.ByteTools }))
)
const InteractiveRoadmap = dynamic(
    () => import("../roadmap/InteractiveRoadmap")
)

export const components: MDXComponents = {
    Image,
    CustomLink,
    TOCInline,
    BlogNewsletterForm,
    ScriptStackVisualizer,
    SvgDisplay,
    TransactionsDisplay,
    QuickLinks,
    QuickLink,
    Hint,
    MinimalVideoPlayer,
    ExpandableAlert,
    P2SHEncoder,
    OpcodeDataVisualizer,
    OpCodeExplorer,
    MultisigAnimation,
    SandpackComponent,
    Quiz,
    StackSimulator,
    CodeSnippet,
    ExerciseSelector,
    BitcoinHistory,
    MailingListSignup,
    HexTransactionHighlighter,
    DiscordInvite,
    TransactionCreation,
    TransactionAnimationPlayer,
    TransactionDecoder,
    ReorgCalculator,
    HashFunctions,
    AddressGenerator,
    ByteTools,
    InteractiveRoadmap
}
