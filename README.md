This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

# Tango NFT

<a href="https://tangonft.com/" target="_blank">Tango NFT</a> is an ephemeral private message board for every NFT community. No set up required, just log-in with Metamask. Once logged in, you'll see the "rooms" you have access to. Every collection has it's own token-gated "room" where you can leave messages, as your NFT, for others to read.

The second version (code not released yet), is a drawing board for every NFT collection. You can see what people are drawing at <a href="https://tangonft.com/draw" target="blank">TangoNFT.com/draw</a>.

Built using HTML, CSS, jquery, php/MySQL (switching over to React), Metamask API, and OpenSea API.

# Why does this project exist?

I was playing around with the Metamask and OpenSea API trying to figure out if I could build some utility for PixelBeasts (my NFT project). I realized it was just as easy to build for every NFT. After the initial feedback from sharing it, and from from how fun this was to build, I've decided I want to open source it to see where this goes - or at the very least inspire new projects.

In the end, I just want to see cool stuff come to life. Rad if I can be part of it.

# Build Status

I'm just releasing this now, in it's raw format after hacking away at it for two nights (~6 hours), for posterity. Don't worry, someone is already working on switching from php to react. We'll go from there. A few other obvious things:

- Make it deployable from here.
- Escaping characters in messages.
- Message functions (URLs, emojis, etc.)

Maybe?

- Threads/replies
- 1:1 messaging

And yes, I've had people suggest moving messages on-chain to make this fully decentralized and embeddable anywhere. I'm down.

# Contribute

In the meantime, join the <a href="https://discord.gg/YSqMfAnqzX" target="">PixelBeasts discord</a>, where we talk about this project. It's VCs, developers, artists, and collectors - all with an interest in building and experimenting with new tools.

Let's gooooooooooooooooooooo!!!!!

# Quick Note

I'm self-taught and this is my first time sharing code publicly. Be kind please :)

# License

I selected "MIT" from the dropdown. That's open source, right?

Follow me on <a href="https://twitter.com/yoheinakajima.com" target="_blank">Twitter</a>.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
