export default function Footer() {
  return (
    <footer className="mt-10 relative bottom-0 text-center bg-pale-orange flex items-center justify-center p-[24px] text-black">
      <p>
        Built with ❤️ by{" "}
        <br/>
        <a
          className="text-orange"
          href="https://chaincode.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Chaincode Labs
        </a>{" "}
        x{" "}
        <a
          className="text-orange"
          href="https://bitcoin.design/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Bitcoin Design Community
        </a>
      </p>
    </footer>
  );
}
