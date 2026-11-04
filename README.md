![The Bitcoin Dev Project](./public/images/landscape_2_1.jpg)

# The Bitcoin Dev Project

This is the source code for the [Bitcoin Dev Project](https://bitcoindevs.xyz) that serves as a go-to place for aspiring bitcoin developers to learn about the many curriculums and programs that exist.

## Setup

Use Node.js 22 (`nvm use`). Next.js 16 requires Node.js 20.9 or newer.

1. Install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

2. Download submodules:

```bash
npm run submodules:update
# or
yarn submodules:update
# or
pnpm submodules:update
# or
bun submodules:update
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

To run the tests, use `npm run test`

Development and production builds explicitly use Webpack because the Contentlayer
plugin relies on Webpack hooks. React 18 is retained for compatibility with the
current BDP UI package.
