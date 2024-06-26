import { TextIcon } from "lucide-react";

interface SummaryProps {
  summary: string;
}

export default function Summary( {summary} : SummaryProps ) {
  return (
    <div className="bg-[#faf9f7] p-4 rounded-lg border-l-4 border-[#e77429] mb-6">
      <div className="flex items-start space-x-2">
        <div className="flex items-center">
          <TextIcon className="text-[#e77429] w-5 h-5" />
        </div>
        <div>
          <h5 className="text-lg font-semibold text-[#000]">Quick Summary</h5>
          <p className="text-sm">
            {summary}
          </p>
        </div>
      </div>
    </div>
  )
}
