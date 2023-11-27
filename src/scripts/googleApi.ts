export type VideoConfigType = {
  title: string;
  img: string;
  link: string;
}[];

export async function getPlaylistDetails(
  playlistId: string,
  GOOGLE_KEY: string,
): Promise<VideoConfigType> {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?key=${GOOGLE_KEY}&playlistId=${playlistId}&part=snippet,contentDetails&maxResults=50`,
  );
  const data: any = await response.json();
  return data.items
    .map((item: any) => {
      return {
        title: item.snippet.title,
        img: item.snippet.thumbnails?.default?.url,
        link: `https://www.youtube.com/watch?v=${item.contentDetails.videoId}`,
      };
    })
    .filter((item: any) => !!item.img)
    .slice(-6);
}

export const mockedVideoConfig = [
  {
    title:
      "p2p, rpc: Manual block-relay-only connections with addnode #24170",
    img: "https://i.ytimg.com/vi/4YCUHsfFazQ/default.jpg",
    link: "https://www.youtube.com/watch?v=4YCUHsfFazQ",
  },
  {
    title: "Demo 2: A Tour Around Bitcoin Core Codebase",
    img: "https://i.ytimg.com/vi/MbinzItqsXI/default.jpg",
    link: "https://www.youtube.com/watch?v=MbinzItqsXI",
  },
  {
    title: "Demo 1: Compiling and Testing a PR.",
    img: "https://i.ytimg.com/vi/n5CRJRqkAoc/default.jpg",
    link: "https://www.youtube.com/watch?v=n5CRJRqkAoc",
  },
  {
    title:
      "p2p: Allow whitelisting outgoing connections #27114",
    img: "https://i.ytimg.com/vi/EYPfGw9Z14w/default.jpg",
    link: "https://www.youtube.com/watch?v=EYPfGw9Z14w",
  },
  {
    title:
      "p2p: track AddrMan totals by network and table, improve precision of adding fixed seeds #26847",
    img: "https://i.ytimg.com/vi/fp5lmVss--Q/default.jpg",
    link: "https://www.youtube.com/watch?v=fp5lmVss--Q",
  },
  {
    title:
      "Activation logic for testing consensus changes #16",
    img: "https://i.ytimg.com/vi/gXPKYZujeJE/default.jpg",
    link: "https://www.youtube.com/watch?v=gXPKYZujeJE",
  },
  {
    title:
      "Wallet: Add foreign_outputs metadata to support CoinJoin transactions #25991",
    img: "https://i.ytimg.com/vi/oE3pQMK1oTk/default.jpg",
    link: "https://www.youtube.com/watch?v=oE3pQMK1oTk",
  },
  {
    title:
      "Introduce secp256k1 module with field and group classes to test framework #26222",
    img: "https://i.ytimg.com/vi/jdRbTmekF8U/default.jpg",
    link: "https://www.youtube.com/watch?v=jdRbTmekF8U",
  },
  {
    title:
      "wallet: when a block is disconnected, update transactions that are no longer conflicted #27145",
    img: "https://i.ytimg.com/vi/hW1IYpnwzAw/default.jpg",
    link: "https://www.youtube.com/watch?v=hW1IYpnwzAw",
  },
  {
    title: "Add 'sendall' RPC née sweep #24118",
    img: "https://i.ytimg.com/vi/BWIpr2bR1Iw/default.jpg",
    link: "https://www.youtube.com/watch?v=BWIpr2bR1Iw",
  },
  {
    title:
      "p2p: skip netgroup diversity of new connections for tor/i2p/cjdns #27374",
    img: "https://i.ytimg.com/vi/IbU3fAkumJk/default.jpg",
    link: "https://www.youtube.com/watch?v=IbU3fAkumJk",
  },
  {
    title:
      "Add Single Random Draw as an additional coin selection algorithm #17526",
    img: "https://i.ytimg.com/vi/yY2NNIb0YCo/default.jpg",
    link: "https://www.youtube.com/watch?v=yY2NNIb0YCo",
  },
  {
    title: "BIP-325: Signet [consensus] #18267",
    img: "https://i.ytimg.com/vi/_IYvHhGmEXU/default.jpg",
    link: "https://www.youtube.com/watch?v=_IYvHhGmEXU",
  },
  {
    title:
      "Miniscript support in Output Descriptors #24148 (Part 1)",
    img: "https://i.ytimg.com/vi/3q3hlSauoW4/default.jpg",
    link: "https://www.youtube.com/watch?v=3q3hlSauoW4",
  },
  {
    title:
      "Miniscript support in Output Descriptors #24148 (Part 2)",
    img: "https://i.ytimg.com/vi/WRvhLYLZ_Rw/default.jpg",
    link: "https://www.youtube.com/watch?v=WRvhLYLZ_Rw",
  },
  {
    title:
      "crypto: more Span::std::byte modernization & follow-ups #28100",
    img: "https://i.ytimg.com/vi/Pb-IPHv3lCg/default.jpg",
    link: "https://www.youtube.com/watch?v=Pb-IPHv3lCg",
  },
  {
    title: "net: transport abstraction #28165",
    img: "https://i.ytimg.com/vi/H_nQVD5p-UU/default.jpg",
    link: "https://www.youtube.com/watch?v=H_nQVD5p-UU",
  },
];
