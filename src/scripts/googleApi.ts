export type VideoConfigType = {
  title: string;
  img: string;
  link: string;
  index: number;
  description: string;
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
    .map((item: any, index: number) => {
      return {
        index,
        title: item.snippet.title,
        description: item.snippet.description,
        img: item.snippet.thumbnails?.medium?.url,
        link: `https://www.youtube.com/watch?v=${item.contentDetails.videoId}`,
      };
    })
    .filter((item: any) => !!item.img)
    .slice(-6);
}

export const mockedVideoConfig = [
  {
    index: 1,
    title:
      "The Thriving Career of Bitcoin Development in India | Coin Selection | Summer of Bitcoin | E01",
    description:
      "In this episode, we talk with Anmol Sharma. Anmol is an\n" +
      " - IIIT Jabalpur student and 3rd-year Electronics and Telecom engineering\n" +
      "- SOB alumn and  FOSS contributor to [bcoin](https://twitter.com/bcoin)\n" +
      "- working as a Bitcoin Engineer in [Bold](https://twitter.com/Bold).\n" +
      "\n" +
      "In this episode, we covered\n" +
      " - His Background and Introduction to SOB\n" +
      " - His journey into the rabbit hole.\n" +
      " - His work with @bcoin on coin-selection\n" +
      " - The emerging Indian Bitcoin Dev community.\n" +
      " - Required developer resources and materials.\n" +
      "\n" +
      "\n" +
      "Related links:\n" +
      " - Summer of Bitcoin: https://www.summerofbitcoin.org/\n" +
      " - Murch's Coin Selection Thesis: https://murch.one/wp-content/uploads/2016/11/erhardt2016coinselection.pdf\n" +
      " - Anmol's SOB Project on Coin Selection: https://blog.summerofbitcoin.org/coin-selection-waste-metric/\n" +
      " - Mastering Bitcoin: https://github.com/bitcoinbook/bitcoinbook\n" +
      " - Connect with Anmol: https://twitter.com/theanmolsharma_",
    img: "https://i.ytimg.com/vi/Gjovpq2eCYw/mqdefault.jpg",
    link: "https://www.youtube.com/watch?v=Gjovpq2eCYw",
  },
  {
    index: 2,
    title:
      "Empowering Africa with Bitcoin: Insights from a Bitcoin FOSS Developer | E02",
    description:
      "In this episode, we walked with Vladimir Fomene, who is an open-source Bitcoin developer working on BDK and other rust-based Bitcoin projects.\n" +
      "\n" +
      "In this conversation, we covered:\n" +
      " - His Bitcoin rabbit hole journey.\n" +
      " - His path of getting into Bitcoin development full-time.\n" +
      " - Qala Africa and related programs.\n" +
      " - Bitcoin and African Adoption.\n" +
      "\n" +
      "Related links:\n" +
      " - Qala Africa: https://qala.dev/\n" +
      " - BDK: https://bitcoindevkit.org/\n" +
      " - Bitcoin Africa Conference: https://www.afrobitcoin.org/\n" +
      " - Mastering Bitcoin: https://github.com/bitcoinbook/bitcoinbook\n" +
      " - Connect with Vlad: https://twitter.com/Vlad_kwasi",
    img: "https://i.ytimg.com/vi/agmUQGx36gE/mqdefault.jpg",
    link: "https://www.youtube.com/watch?v=agmUQGx36gE",
  },
  {
    index: 3,
    title:
      "Journey of non-CS grad to working with Blockstream | Core Lightning | Summer of Bitcoin | E04",
    description:
      "In this episode, we talk with Aditya Sharma, who is a final-year student at IITBHU and interned with Blockstream via Summer of Bitcoin.\n" +
      "\n" +
      "In this we covered:\n" +
      " - His journey of Bitcoin development\n" +
      " - Summer of Bitcoin experience\n" +
      " - Working with Blockstream\n" +
      " - Static Channel Backup in CLN\n" +
      " - Demo of SCB working with two CLN regtest nodes\n" +
      " - Path ahead for future aspirants to get into Bitcoin\n" +
      "\n" +
      "Related Links:\n" +
      " - Core LN: https://lightning.readthedocs.io/\n" +
      " - Summer of Bitcoin: https://www.summerofbitcoin.org/\n" +
      " - Blockstream: https://blockstream.com/\n" +
      " - Connect with Aditya: https://twitter.com/adityaa2011",
    img: "https://i.ytimg.com/vi/T_IsZN2w7zY/mqdefault.jpg",
    link: "https://www.youtube.com/watch?v=T_IsZN2w7zY",
  },
  {
    index: 4,
    title:
      "Bitcoin Design Career & Bitcoin Core's New UI | Summer of Bitcoin | EP 05",
    description:
      "We bring a new episode of Bitcoin Talk, wherein we join Shashwat Vangani,  a final-year student at IIT Roorkee and Summer of Bitcoin intern with Bitcoin Core, and discuss his journey and design Career. \n" +
      "\n" +
      "⏱️ Timestamps:\n" +
      "\n" +
      "00:00 Introduction\n" +
      "02:40 Getting into Summer of Bitcoin\n" +
      "03:37 Physics Background & Transition to Bitcoin\n" +
      "06:12 Summer of Bitcoin Experience\n" +
      "11:13 Work on Bitcoin Core's New UI\n" +
      "12:32 Presentation on UI Revamp\n" +
      "22:03 Live Project Demo\n" +
      "34:22 Bitcoin Core's Mobile Potential\n" +
      "36:22 Contributing to Bitcoin as Designers & Developers\n" +
      "39:20 Shashwat's Future Path\n" +
      "41:44 Fostering Indian Developer Community in Bitcoin\n" +
      "45:59 Personal Perspective on Bitcoin\n" +
      "\n" +
      "🌐 Related Links:\n" +
      "- Grokking Bitcoin by Karly Rosenbaum: https://github.com/kallerosenbaum/grokkingbitcoin\n" +
      "- Bitcoin Core GUI GitHub Repo: https://github.com/bitcoin-core/gui-qml\n" +
      "- Bitcoin Design community: https://bitcoin.design/\n" +
      "- Programming Bitcoin by Jimmy Song: https://github.com/jimmysong/programmingbitcoin\n" +
      "- Mastering Bitcoin by Andreas M. Antonopoulos: https://github.com/bitcoinbook/bitcoinbook\n" +
      "- BitShala community: https://www.bitshala.org/\n" +
      "\n" +
      "👥 Connect with us and delve into the Bitcoin universe. Subscribe for more exciting insights! 🚀",
    img: "https://i.ytimg.com/vi/hMlaFXwPV-o/mqdefault.jpg",
    link: "https://www.youtube.com/watch?v=hMlaFXwPV-o",
  },
  {
    index: 5,
    title:
      "Becoming a Self-Taught Bitcoin Dev: The Desi Version | EP 06",
    description:
      'Join us in this exciting episode of Bitcoin Talk as we sit down with Saravanan Mani, and find out about how to become a self-taught Bitcoin Developer, "The Desi Version" \n' +
      "\n" +
      "Timestamps:\n" +
      "\n" +
      "00:00 Introduction\n" +
      "03:55 Experience with Bitgo \n" +
      "05:23 First Encounter to Bitcoin\n" +
      "08:41 Is Bitcoin Obvious for CS students \n" +
      "14:19 Proof of Work vs Proof of XYZ\n" +
      "20:08 Fallacy of Proof of Useful Work\n" +
      "24:28 Working on Bitcoin seriously\n" +
      "32:28 Resources to get started with\n" +
      "33:20 Challenges in the Bitcoin/LN Dev Ecosystem\n" +
      "36:24 Missing Educational Material Styles\n" +
      "39:20 Learning Crypto as Bitcoin Dev\n" +
      "43:20 Learning via a Community \n" +
      "51:35 Community Activities \n" +
      "53:30 Bitcoin and Politics\n" +
      "57:20 Path Forward\n" +
      "\n" +
      "Related Links:\n" +
      "Mastering Bitcoin: https://github.com/bitcoinbook/bitcoinbook\n" +
      "Programming Bitcoin: https://github.com/jimmysong/programmingbitcoin\n" +
      "LightHouse: https://lnlighthouse.online/",
    img: "https://i.ytimg.com/vi/h5Fz9GZo9ck/mqdefault.jpg",
    link: "https://www.youtube.com/watch?v=h5Fz9GZo9ck",
  },
  {
    index: 6,
    title:
      "The Hard Path to Bitcoin Dev | Frontend Development | FOSS Career | EP 07",
    description:
      "Join us in this episode of Bitcoin Talk with Saiyasodharan as we explore his journey to becoming a UI/UX Developer in Bitcoin.\n" +
      "\n" +
      "Timestamps:\n" +
      "\n" +
      "00:00 Introduction\n" +
      "02:50 Transition to Bitcoin Career\n" +
      "04:50 POW Project, Lighthouse.\n" +
      "06:40 Life as a Bitcoin Dev\n" +
      "07:20 UI/UX Landscape of Bitcoin\n" +
      "10:45 Cutting-edge Bitcoin UI/UX\n" +
      "12:10 Where to start from for UI/UX devs\n" +
      "13:50 Getting Involved in the Community\n" +
      "15:45 Design Tools\n" +
      "18:20 What is Bitcoin?\n" +
      "21:30 How Bitcoin Changed You.\n" +
      "25:25 Why should young people care about Bitcoin?\n" +
      "28:20 Why Bitcoin is Hope?\n" +
      "29:30 Implications of Bitcoin to Nation States.\n" +
      "32:00 Bitcoin India Community.\n" +
      "\n" +
      "Related Links:\n" +
      "https://lnlighthouse.online/",
    img: "https://i.ytimg.com/vi/MTd0EVrzOHc/mqdefault.jpg",
    link: "https://www.youtube.com/watch?v=MTd0EVrzOHc",
  },
];
