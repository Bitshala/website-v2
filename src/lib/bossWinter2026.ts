// BOSS Winter 2026 programme (Jaipur, 26–31 Oct 2026), from the BOSS PM Sheet "BOSS Schedule" tab.
// Times are 24-hour IST "HH:MM"; the agenda shows them 12-hour like the Summer 2026 agenda.
// kind: "workshop" = olive card, "talk" = slate card, "open" = plum Open Stage card.
// Wording matches BOSS_DAYS in the Winter 2026 agenda design; keep it exact.

export type SessionKind = "talk" | "workshop" | "open";

export interface BossSession {
  start: string;
  end: string;
  kind: SessionKind;
  /** Text after the first ": " renders as a smaller subtitle line. */
  title: string;
  /** Joined as "A, B & C" after "by". Empty for Open Stage. */
  speakers: string[];
  /** Optional 1–3 sentence abstract, always shown under the speakers. */
  about: string;
}

export interface BossDay {
  date: string;
  day: number;
  title: string;
  start?: string;
  end?: string;
  /** A day without sessions shows as the kickoff line, not a tab. */
  allDay?: boolean;
  note?: string;
  sessions: BossSession[];
}

export interface BossSchedule {
  edition: string;
  city: string;
  range: string;
  month: string;
  lunch: { start: string; end: string };
  days: BossDay[];
}

export const winter2026: BossSchedule = {
  edition: "Winter 2026",
  city: "Jaipur",
  range: "26 – 31 October 2026",
  month: "October",
  lunch: {
    start: "13:00",
    end: "14:30",
  },
  days: [
    {
      date: "2026-10-26",
      day: 26,
      title: "Check-in and Community Kickoff",
      allDay: true,
      note: "Orientation",
      sessions: [],
    },
    {
      date: "2026-10-27",
      day: 27,
      title: "AI, Developer Tooling & Bitcoin Core",
      start: "10:00",
      end: "17:00",
      sessions: [
        {
          start: "10:00",
          end: "11:30",
          kind: "workshop",
          title: "AI Deep Dive",
          speakers: [
            "Adi Shankara",
            "Abhijay Jain",
            "Anmol",
          ],
          about:
            "A workshop combining an LLM and transformers primer, tiny models, Goose GDK Bitcoin projects and AI for everyday code.",
        },
        {
          start: "11:30",
          end: "12:00",
          kind: "talk",
          title:
            "Don’t trust, attest: an architecture Deep Dive into TEEs for remote Multisig and Auditable AI",
          speakers: ["Yshok"],
          about:
            "A practical tour of trusted execution environments (TEEs), the hardware primitives behind secure-enclave cloud signing for multisigs and attested AI inference, from first principles to advanced architecture.",
        },
        {
          start: "12:00",
          end: "12:30",
          kind: "talk",
          title: "Sovereign Engineering Project Showcase",
          speakers: ["Jo"],
          about: "",
        },
        {
          start: "12:30",
          end: "13:00",
          kind: "talk",
          title: "The Blind Spot in Bitcoin Adoption",
          speakers: ["Paper"],
          about: "",
        },
        {
          start: "14:30",
          end: "15:30",
          kind: "workshop",
          title: "BitcoinKernel Project Workshop",
          speakers: ["Yuvic"],
          about:
            "An overview of what BitcoinKernel is, then a hands-on demo of using it through small, basic examples.",
        },
        {
          start: "15:30",
          end: "16:00",
          kind: "talk",
          title: "What’s new in BDK",
          speakers: ["codingp110"],
          about:
            "The changes coming in BDK 4.0. For BDK users, a guide to the next major release; for everyone else, an introduction to some of the nuances of Bitcoin wallet design.",
        },
        {
          start: "16:00",
          end: "16:30",
          kind: "talk",
          title: "Taproot Assets",
          speakers: ["Raj Sarogi"],
          about:
            "A brief introduction to Taproot Assets and what they can be used for.",
        },
        {
          start: "16:30",
          end: "17:00",
          kind: "talk",
          title: "OpenSwap: Intro + quick Demo",
          speakers: ["Stark"],
          about: "",
        },
      ],
    },
    {
      date: "2026-10-28",
      day: 28,
      title: "Post-Quantum Cryptography & Self-Custody UX",
      start: "10:00",
      end: "17:00",
      sessions: [
        {
          start: "10:00",
          end: "10:30",
          kind: "talk",
          title:
            "Bitcoin After Quantum: Understanding the Threat",
          speakers: ["Anubha Jain"],
          about:
            "Quantum computing poses a long-term threat to the cryptographic foundations of Bitcoin, particularly its reliance on elliptic-curve cryptography. This talk explores Bitcoin’s quantum attack surface, the implications for keys and transactions, and the cryptographic, protocol and migration challenges involved in preparing Bitcoin for a post-quantum future.",
        },
        {
          start: "10:30",
          end: "11:30",
          kind: "workshop",
          title:
            "Post-Quantum Signatures in Practice: Hash, Lattice, and Isogeny Schemes",
          speakers: ["Jamal"],
          about:
            "A 10-minute overview of hash-based, lattice and isogeny-based signature schemes. Participants then sign the same message with one algorithm from each family by completing prepared starter code, and finish by benchmarking the three on signature size, public-key size and verification time (benchmark code provided).",
        },
        {
          start: "11:30",
          end: "12:00",
          kind: "talk",
          title:
            "Challenges building Epoch Shield - Cryptography meets Chaos",
          speakers: ["Sameer P"],
          about:
            "The challenges of implementing MLS group encryption on Nostr’s unordered relay mesh, where cryptographic assumptions about ordering, reliable delivery and shared state collide with permissionless networks, and what we learned bridging the two.",
        },
        {
          start: "12:00",
          end: "12:30",
          kind: "talk",
          title: "Shroud: Intro + Quick Demo",
          speakers: ["Anmol"],
          about: "",
        },
        {
          start: "12:30",
          end: "13:00",
          kind: "talk",
          title: "Self-custody UX trade-offs",
          speakers: ["Veronika"],
          about:
            "What breaks when a non-technical user tries to run their own self-custodial Lightning wallet.",
        },
        {
          start: "14:30",
          end: "15:30",
          kind: "workshop",
          title: "Self-Custody Models and Penlock Workshop",
          speakers: ["Rama Gan"],
          about:
            "Seed generation, splitting and recovery with Penlock, followed by Q&A.",
        },
        {
          start: "15:30",
          end: "16:00",
          kind: "talk",
          title: "Krux showcase",
          speakers: ["qlrd"],
          about:
            "An integration-test framework for Krux and for hardware wallets in general.",
        },
        {
          start: "16:00",
          end: "16:30",
          kind: "talk",
          title:
            "Exploring Zero Knowledge Proofs for Bitcoin",
          speakers: ["sha512rma"],
          about:
            "How BitVM enables optimistic off-chain verification of STARK/SNARK proofs, contrasting Ethereum’s on-chain KZG polynomial verification with Bitcoin’s trustless, off-chain client-side validation models.",
        },
        {
          start: "16:30",
          end: "17:00",
          kind: "open",
          title: "Open Stage",
          speakers: [],
          about:
            "A talk on a new kind of Nostr-based generalised market discovery.",
        },
      ],
    },
    {
      date: "2026-10-29",
      day: 29,
      title: "Lightning Network, Ecash & Decentralized Web",
      start: "10:00",
      end: "17:00",
      sessions: [
        {
          start: "10:00",
          end: "10:30",
          kind: "talk",
          title: "UI/UX Walkthrough of coconut wallet",
          speakers: ["Louis"],
          about:
            "The UI/UX design elements behind Coconut Wallet.",
        },
        {
          start: "10:30",
          end: "11:30",
          kind: "workshop",
          title: "Creating a Cashu Wallet with CDK",
          speakers: ["Luiz Medina"],
          about:
            "How to use the CDK library to build a Cashu wallet.",
        },
        {
          start: "11:30",
          end: "12:00",
          kind: "talk",
          title: "Smite: Lightning Fuzzing Engine",
          speakers: ["Nishant Bansal"],
          about: "",
        },
        {
          start: "12:00",
          end: "12:30",
          kind: "talk",
          title: "Lightning Sandbox Demo",
          speakers: ["Duggirala Venkata Sai Viswanath"],
          about:
            "A demo walking through the whole sandbox.",
        },
        {
          start: "12:30",
          end: "13:00",
          kind: "talk",
          title:
            "Nostr Wallet Connect: How It Works and Its Integration into Zeus",
          speakers: ["Ajay"],
          about: "",
        },
        {
          start: "14:30",
          end: "15:30",
          kind: "workshop",
          title:
            "Pool Your Spare Disks: Self-Hostable Distributed Storage on Open Protocols",
          speakers: ["Manas"],
          about:
            "A demo of a Nostr storage orchestrator that lets people with spare storage pool their resources without running a server or exposing a public IP.",
        },
        {
          start: "15:30",
          end: "16:00",
          kind: "talk",
          title:
            "Formstr Drive: Your Cloud Storage Ends Here",
          speakers: ["Siddhant"],
          about:
            "How we built a file storage app where nobody monitors your data: entirely client-side encryption, built where Nostr keys meet Blossom servers.",
        },
        {
          start: "16:00",
          end: "16:30",
          kind: "talk",
          title: "Monetizing APIs with L402 and ngx_l402",
          speakers: ["iam thesvn"],
          about:
            "The ngx_l402 Nginx module, with a short introduction to the L402 protocol itself.",
        },
        {
          start: "16:30",
          end: "17:00",
          kind: "open",
          title: "Open Stage",
          speakers: [],
          about: "Open discussion and wrap-up.",
        },
      ],
    },
  ],
};
