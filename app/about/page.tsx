type Props = {
  content: string;
  title: string;
};

const Item = ({ content, title }: Props) => (
  <div className="gap-2">
    <li className="list-disc font-medium text-xl md:text-base">{title}</li>
    <p className="text-lg md:text-sm">{content}</p>
  </div>
);

export default function About() {
  return (
    <main className="p-14 sm:p-7 mx-auto my-0">
      <div className="flex flex-col md:items-center mb-24 gap-y-10">
        <h1 className="text-5xl md:text-lg md:text-center font-bold leading-normal">
          About The Bitcoin Dev Project
        </h1>
        <ul className="flex flex-col gap-5">
          <Item
            content="The Bitcoin Dev Project is a collaborative and
          open-source initiative that aims to demystify and advance Bitcoin and
          Lightning Network technologies. By focusing on Free and Open Source
          Software (FOSS), we are building a community where developers and
          enthusiasts can learn, contribute, and create a solid foundation for
          the future of money."
            title="Empowering Innovation"
          />
          <Item
            content="We believe in a future where financial systems are open,
            transparent, and accessible to everyone. The Bitcoin Dev Project
            serves as a hub for education and development, fostering a space where
            individuals can dive into the complexities of the bitcoin technology
            and emerge as innovators in the field."
            title="Our Vision"
          />
          <Item
            content="Our journey is
            about continuous learning, building, and sharing knowledge with a
            growing global community."
            title="Our Journey"
          />
          <Item
            content="Whether you're a seasoned
            developer or just starting, there's a place for you in The Bitcoin Dev
            Project. Explore our projects, interact with educational content, and
            join the journey toward a decentralized financial future."
            title="Get Involved"
          />
          <Item
            content="Join our efforts to shape the financial technology landscape. Dive
            into our resources, contribute to our projects, and take part in
            discussions that push the boundaries of what's possible with Bitcoin
            and the Lightning Network."
            title="Connect with Us"
          />
        </ul>
      </div>
    </main>
  );
}
