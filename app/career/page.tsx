import Button from "@/components/button";

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

export default function Career() {
  return (
    <main className="p-14 sm:p-7 mx-auto my-0">
      <div className="flex flex-col md:items-center mb-24 gap-y-10">
        <h1 className="text-5xl md:text-lg md:text-center font-bold leading-normal">
          Start Your Career in Bitcoin Open Source Development
        </h1>
        <Item
          content={
            <>
              <p className="my-4">
                Funding for Free Open Source Software (FOSS) projects is a historical problem that goes back to the beginning of FOSS. Bitcoin funding is different from other open-source and other cryptocurrency projects. Getting a grant in bitcoin is pretty straightforward. You either need someone to vouch for you or you need to do work - ideally both. While grant programs often have open applications, the secret to getting funding is not much of a secret. Start doing the job for free. It establishes you as a contributor and proves your motivation to do the work. It shows that you are a good investment. Applicants will have much more success if they do the work and then apply. For most jobs, the applicant is trying to convince the employer that they are capable of doing the job. But the job-seeker has no idea what the work or environment is actually like. In open-source, one does not have to guess. Do the work. Demonstrate capability. Then ask for support.
              </p>
              <p className="my-4">
                Doing the work also means demonstrating your work. Not all work in open-source work is as visible as writing code. The less visible work is not less valuable, but it is in your best interest to create artifacts of your effort. Transparency is your friend. If you learn something, it is helpful to codify it by writing a blog post or keeping a running log. I have seen some write a bi-weekly summary email tracking their progress. Code reviews used to be hard to track, but now GitHub does a better job crediting a green square. Taking long walks to reflect on how to approach a problem is necessary, but writing up your conclusions in a public place is valuable collateral that can forever serve as evidence of your progress.
              </p>
              <p>
                (Excerpt from {" "}
                <a className="text-orange" href="https://chaincode.com" target="_blank" rel="noopener noreferrer">A guide for bitcoin open-source grant seekers</a>)
              </p>
            </>
          }
          title="Do the work and good things will happen"
        />
        <Item
          content={
            <>
              <></>
              <ul className="my-4">
                <li>
                  <a className="text-orange" href="https://spiral.xyz/#grants" target="_blank" rel="noopener noreferrer">Spiral</a>{" "}is the Bitcoin/LN R&D arm of Block who have been distributing grants since 2019.
                </li>
                <li>
                  <a className="text-orange" href="https://brink.homerun.co/grants" target="_blank" rel="noopener noreferrer">Brink</a>{" "}is a 501c3, mostly focused on funding Bitcoin Core developers, established in 2020.
                </li>
                <li>
                  <a className="text-orange" href="https://opensats.org/apply" target="_blank" rel="noopener noreferrer">OpenSats</a>{" "}is a 501c3, established in 2021.
                </li>
                <li>
                  <a className="text-orange" href="https://forms.monday.com/forms/57019f8829449d9e729d9e3545a237ea" target="_blank" rel="noopener noreferrer">Human Rights Foundation</a>{" "}is a 501c3 that has been distributing grants since 2020.
                </li>                
              </ul>
              <p className="my-4">
                Various exchanges and individuals have sponsored devs in the past, but the above orgs have become the main distributors of grants over the last couple of years.
              </p>
            </>
          }
          title="Funding Organizations"
        />
        <Item
          content={
            <>
              <></>
              <p className="my-4">
                If you are ready to begin a career in Bitcoin FOSS, Chaincode Labs is hosting a three-month program to put you in the best position to acheive your goals. {" "}
                <span className="font-bold">DEADLINE TO APPLY IS DECEMBER 31st, 2023.</span>
              </p>
              <Button href="https://learning.chaincode.com/#FOSS" className="w-full">
                APPLY
              </Button>
            </>
          }
          title="Change your life in 2024"
        />
      </div>
    </main>
  );
}
