import TOCInline from "pliny/ui/TOCInline"
import BlogNewsletterForm from "pliny/ui/BlogNewsletterForm"
import type { MDXComponents } from "mdx/types"
import CustomLink from "../markdown-ui/Link"
import Image from "../markdown-ui/Image"
import SvgDisplay from "./script-visualizer/SvgDisplay"
import ScriptStackVisualizer from "./script-visualizer/scriptVisualizer"
import TransactionsDisplay from "./transaction-serializer/TransactionDisplay"
import { QuickLink, QuickLinks } from "./QuickLinks"
import Hint from "./Hints"
import MinimalVideoPlayer from "./minimal-video-player"
import ExpandableAlert from "./expandable-alert"
import P2SHEncoder from "./address-encoder"
import OpcodeDataVisualizer from "./opcode-data-visualizer"
import OpCodeExplorer from "./opcode-explorer"
import MultisigAnimation from "./multisig-animation"
import SandpackComponent from "./sandpack"
import Quiz from "./Quiz"
import StackSimulator from "./stack-simulator"
import { CodeSnippet } from "./code-snippet"
import MailingListSignup from "./mailing-list-signup"
import { BitcoinHistory } from "./bitcoin-history"
import HexTransactionHighlighter from "./hex-transaction-highlighter"
import DiscordInvite from "./discord-invite"
import ExerciseSelector from "./exercise-selector"

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
    ExerciseSelector
}
