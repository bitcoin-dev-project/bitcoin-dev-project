type Props = {
  content: string | React.ReactNode;
  title: string;
};

const Item = ({ content, title }: Props) => (
  <div className="gap-2">
    <h2 className="text-2xl md:text-xl font-medium leading-normal">{title}</h2>
    <p className="text-lg md:text-md">{content}</p>
  </div>
);

export default function About() {
  return (
    <main className="flex flex-col p-14 sm:p-7 mx-auto my-0">
      <div className="flex flex-col mb-24 gap-y-10 w-2/3 md:w-full self-center">
        <h1 className="text-[58px] lg:text-[36px] md:text-center font-bold leading-tight">
          About The Bitcoin Dev Project
        </h1>
        <Item
          content={
            <>
              <></>
              <p className="my-4">
                Our goal is to provide newcomers with resources and support
                for your bitcoin open source development journey. We
                are here to convince you to contribute to{" "}
                <a className="text-orange" href="/projects">
                  bitcoin open source projects
                </a>
                . We measure our success by action, not passive consumption of
                educational materials.
              </p>
              <p>
                There is an oft-repeated sentiment in the community that bitcoin
                does not need you. While bitcoin is designed to be resilient, we{" "}
                <span className="font-style: italic">do</span> need you. Bitcoin
                needs all the talent and energy it can gather to solve some of
                the most difficult technical problems of our time. Bitcoin in
                your hands changes everything.
              </p>
            </>
          }
          title="Why"
        />
        <Item
          content={
            <>
              <></>
              <p className="my-4">
                The Bitcoin Dev Project is a{" "}
                <a
                  className="text-orange"
                  href="https://chaincode.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chaincode Labs
                </a>{" "}
                sponsored initiative geared towards developers at the beginning
                of their bitcoin journey. Chaincode has a{" "}
                <a
                  className="text-orange"
                  href="https://bluematt.bitcoin.ninja/2016/08/08/chaincode/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  long history
                </a>{" "}
                of providing technical education through its{" "}
                <a
                  className="text-orange"
                  href="https://residency.chaincode.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  in-person residencies
                </a>{" "}
                and started offering online programs via the{" "}
                <a
                  className="text-orange"
                  href="https://chaincode.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  seminars
                </a>{" "}
                in 2020.
              </p>
              <ul>
                <li>
                  Design by{" "}
                  <a
                    className="text-orange"
                    href="https://twitter.com/MogashniNaidoo"
                    target="_blank"
                    rel="noopener"
                  >
                    Mogashni Naidoo
                  </a>{" "}
                  and{" "}
                  <a
                    className="text-orange"
                    href="https://twitter.com/StephenDeLorme"
                    target="_blank"
                    rel="noopener"
                  >
                    Stephen DeLorme
                  </a>
                </li>
                <li>
                  Product by{" "}
                  <a
                    className="text-orange"
                    href="https://www.artassoiants.com"
                    target="_blank"
                    rel="noopener"
                  >
                    Art Assoiants
                  </a>
                </li>
                <li>
                  Dev by{" "}
                  <a
                    className="text-orange"
                    href="https://twitter.com/balogunofafrica"
                    target="_blank"
                    rel="noopener"
                  >
                    Balogun
                  </a>
                </li>
                <li>
                  Ideas by{" "}
                  <a
                    className="text-orange"
                    href="https://adamjonas.com"
                    target="_blank"
                    rel="noopener"
                  >
                    Adam Jonas
                  </a>
                </li>
              </ul>
            </>
          }
          title="Who"
        />
      </div>
    </main>
  );
}
