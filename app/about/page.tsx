type Props = {
  content: string | React.ReactNode;
  title: string;
};

const Item = ({ content, title }: Props) => (
  <div className="gap-2">
    <h2 className="text-2xl md:text-lg font-medium leading-normal">{title}</h2>
    <p className="text-lg md:text-md">{content}</p>
  </div>
);

export default function About() {
  return (
    <main className="p-14 sm:p-7 mx-auto my-0">
      <div className="flex flex-col md:items-center mb-24 gap-y-10">
        <h1 className="text-5xl md:text-lg md:text-center font-bold leading-normal">
          About The Bitcoin Dev Project
        </h1>
        <Item
          content={
            <>
              The Bitcoin Dev Project is a{" "} 
              <a className="text-orange" href="https://chaincode.com" target="_blank" rel="noopener noreferrer">Chaincode Labs</a>{" "}
              sponsored initiative geared towards developers at the beginning of their bitcoin journey. Chaincode has a{" "}
              <a className="text-orange" href="https://bluematt.bitcoin.ninja/2016/08/08/chaincode/" target="_blank" rel="noopener noreferrer"> long history</a>{" "}of providing technical education through its{" "}
              <a className="text-orange" href="https://residency.chaincode.com" target="_blank" rel="noopener noreferrer">in-person residencies</a>
              {" "}and started offering online programs via the{" "}
              <a className="text-orange" href="https://chaincode.com" target="_blank" rel="noopener noreferrer">seminars</a>{" "}in 2020.
              <br />
              <br />
              There is an oft-repeated sentiment in the community that bitcoin does not need you. While bitcoin is designed to be resilient, we do need you. Bitcoin needs all the talent and energy it can gather to solve some of the most difficult technical problems of our time. Bitcoin in your hands changes everything.
              <br />
              <br />
              Our goal is to provide newcomers with the resources and support your bitcoin free open source software (FOSS) development journey. Make no mistake, the goal of this project is to convince you to contribute to{" "}
              <a className="text-orange" href="/projects">bitcoin FOSS projects</a>
              . We measure our success by action, not passive consumption of educational materials.
            </>
          }
          title="What"
        />
        <Item
          content={
            <>
              <></>
              <ul>
                <li>
                  Design by{" "}
                  <a className="text-orange" href="https://twitter.com/MogashniNaidoo" target="_blank" rel="noopener">Mogashni Naidoo</a>
                  {" "}and{" "}
                  <a className="text-orange" href="https://twitter.com/StephenDeLorme" target="_blank" rel="noopener">Stephen DeLorme</a>
                </li>
                <li>
                  Product by{" "}
                  <a className="text-orange" href="https://twitter.com/aassoiants" target="_blank" rel="noopener">Art Assoiants</a>
                </li>
                <li>
                  Dev by{" "}
                  <a className="text-orange" href="https://twitter.com/balogunofafrica" target="_blank" rel="noopener">Balogun</a>
                </li>
                <li>
                  Ideas by{" "}
                  <a className="text-orange" href="https://twitter.com/adamcjonas" target="_blank" rel="noopener">Adam Jonas</a>
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
