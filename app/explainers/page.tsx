import { getExplainerCards } from "@/content/explainers"
import ExplainerBrowser from "@/components/explainers/ExplainerBrowser"

export default function ExplainersPage() {
    // Built on the server — only the lightweight card list (no slide payloads)
    // is sent to the client.
    const cards = getExplainerCards()

    return (
        <div className="min-h-screen bg-vscode-background-light dark:bg-vscode-background-dark">
            {/* Hero — static, server-rendered for SEO */}
            <div className="bg-white dark:bg-gradient-to-b dark:from-black dark:to-vscode-background-dark">
                <div className="max-w-3xl mx-auto px-6 pt-12 pb-10 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
                        Bitcoin Explainers
                    </h1>
                    <p className="text-base text-gray-600 dark:text-gray-400">
                        Visual guides and interactive explanations to help you
                        understand Bitcoin concepts.
                    </p>
                </div>
            </div>

            <ExplainerBrowser cards={cards} />
        </div>
    )
}
