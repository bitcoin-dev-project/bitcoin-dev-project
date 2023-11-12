import Image from "next/image";
import Button from "./button";

type Props = {
  alt: string;
  description: string;
  btnText: string;
  className?: string;
  slug: string;
  src: string;
  title: string;
};

export default function SectionCard({
  alt,
  btnText,
  description,
  className,
  slug,
  src,
  title,
}: Props) {
  return (
    <div
      className={`flex flex-col bg-pale-orange rounded-xl shadow-normal hover:shadow-raised transition-[box-shadow] duration-500 ease-in-out overflow-hidden w-[32%] md:w-full ${className}`}
    >
      <div className={`relative h-[200px] w-full`}>
        <Image
          className="object-cover"
          src={src}
          alt={alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6 md:p-4 flex flex-col items-center gap-y-4 text-center">
        <h2 className="text-[38px] md:text-xl font-semibold leading-[100%]">
          {title}
        </h2>
        <p className="text-xl md:text-sm">{description}</p>
        <Button
          className="w-[55%]"
          href={{
            pathname: `/${slug}/curriculum`,
          }}
        >
          {btnText}
        </Button>
      </div>
    </div>
  );
}
