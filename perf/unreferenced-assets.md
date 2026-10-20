# Unreferenced assets in `public/`

Nothing in this list has been deleted. Each file has to be confirmed before it's removed.

Generated on `perf/phase-1-images` from the git-tracked files in `public/`. A file is listed only if:

1. its path (plain and URL-encoded) doesn't appear in `src/`, `data/`, `scripts/`, `.github/`, `astro.config.mjs`, `tailwind.config.cjs`, `README.md`, or any text file in `public/`; and
2. it doesn't appear in the build output (`dist/**/*.{html,css,js}`), which includes client bundles; and
3. it doesn't match the one dynamic path pattern in the code, `` `/people/${member.image}.png` ``. People images count as used when their stem appears as a quoted string in the source.

Some files were flagged because their bare filename or stem appears somewhere in the source. Each of those was checked by hand with `git grep -F '<dir>/<stem>'`. Every hit was unrelated text (for example `highlights` in body copy, `lightning` in URLs) or the `.webp` that replaced the file. None was a reference.

**Outside this repo:**
- No local image paths appear in the data fetched at build time: the `api.bitshala.org/Cohorts/available` response and the X feed on the `x-feed` branch.
- GitHub code search turned up 33 files that link to `bitshala.org`: every file in the Bitshala org, plus the OpenSats, PlebLab, Unsigned-Labs and test-grant sites. None of them references any file below.
- The only image URLs they use are `bitshala.org/cohort/{mb,lbtcl,bpd,pb,ln,rust}.webp`, from the `nonce` app. Those are kept and aren't in this list.
- **Not checkable:** links from places code search can't see, such as social posts, emails, Luma pages or chat. If something there points directly at one of these image URLs, it would show a broken image after deletion.

## A. Originals replaced by an optimized WebP (16 files, 22.90 MB)

`scripts/optimize-images.mjs` converted these and rewrote every reference to the `.webp`. Nothing points at the PNG any more.

| File | Size | Replaced by |
|---|---|---|
| `public/bitspace/7b58c95581e7f39998c740451502734ce9fed499.png` | 8.04 MB | `public/bitspace/7b58c95581e7f39998c740451502734ce9fed499.webp` |
| `public/bitspace/f4ac4e9c7cf58ef665efe9a5eb0bfa9413af9214.png` | 2.51 MB | `public/bitspace/f4ac4e9c7cf58ef665efe9a5eb0bfa9413af9214.webp` |
| `public/bitspace/97d45ffa5a89963414f5ce743f5508bc23a06670.png` | 2.13 MB | `public/bitspace/97d45ffa5a89963414f5ce743f5508bc23a06670.webp` |
| `public/bitspace/940c5c8050d96c3b1adb217933edec0378c9d482.png` | 1.96 MB | `public/bitspace/940c5c8050d96c3b1adb217933edec0378c9d482.webp` |
| `public/bitspace/c30c1dcae410deff8ff7ea187cce26e269dfe533.png` | 1.33 MB | `public/bitspace/c30c1dcae410deff8ff7ea187cce26e269dfe533.webp` |
| `public/bitspace/6bbb00e5066ed71c32f9de87f81f54bc8c363922.png` | 1.32 MB | `public/bitspace/6bbb00e5066ed71c32f9de87f81f54bc8c363922.webp` |
| `public/clubs/cards/kernel.png` | 1.13 MB | `public/clubs/cards/kernel.webp` |
| `public/clubs/cards/tradfi.png` | 1.12 MB | `public/clubs/cards/tradfi.webp` |
| `public/apprenticeship/twitter.png` | 853 KB | `public/apprenticeship/twitter.webp` |
| `public/bitspace/cddedac488fff068d701e2633977a96771bdc400.png` | 473 KB | `public/bitspace/cddedac488fff068d701e2633977a96771bdc400.webp` |
| `public/readingClub/2.png` | 419 KB | `public/readingClub/2.webp` |
| `public/clubs/cards/reading.png` | 377 KB | `public/clubs/cards/reading.webp` |
| `public/clubs/cards/optech.png` | 348 KB | `public/clubs/cards/optech.webp` |
| `public/readingClub/4.png` | 342 KB | `public/readingClub/4.webp` |
| `public/readingClub/3.png` | 319 KB | `public/readingClub/3.webp` |
| `public/readingClub/1.png` | 319 KB | `public/readingClub/1.webp` |

## B. Not referenced anywhere (78 files, 91.96 MB)

Pairs with the same name in `bitspace/` and `meetups/` are byte-identical duplicates.

| File | Size |
|---|---|
| `public/meetups/f07216c4c1cdc5291197a6b599d193a4afcc2dd7.png` | 12.41 MB |
| `public/meetups/2c758a6eb5443290e079373600a8bb14a4e40c72.png` | 11.24 MB |
| `public/meetups/7ba690e8cc8f034cb76987a70c0010aa86089fac.png` | 10.09 MB |
| `public/meetups/791ecadd79e001f0b908c2ece47bee0bc597428b.png` | 7.23 MB |
| `public/meetups/0d1cdc3ed213d64765fb215ee34c96c33fceb972.png` | 5.62 MB |
| `public/bitspace/0d1cdc3ed213d64765fb215ee34c96c33fceb972.png` | 5.62 MB |
| `public/header/Meetup.webp` | 5.07 MB |
| `public/readingClub/image.png` | 4.44 MB |
| `public/boss/schedule_@.png` | 3.35 MB |
| `public/boss/highlights.webp` | 3.22 MB |
| `public/meetups/1de7fc19a679e2fd77bdf1262e58ccbe1931ab7f.png` | 3.05 MB |
| `public/cohort/masteringBitcoin.webp` | 2.42 MB |
| `public/readingClub/GraduallyThenSuddenly.png` | 2.00 MB |
| `public/meetups/b4ad75c53e6784fb5342386a0f183899a12ae0b6.png` | 1.78 MB |
| `public/boss/gallery1.png` | 1.69 MB |
| `public/meetups/54463f39f29d7c3071cdea3dd246cacfd1e44426.png` | 1.39 MB |
| `public/bitspace/54463f39f29d7c3071cdea3dd246cacfd1e44426.png` | 1.39 MB |
| `public/carousel/discord.webp` | 1021 KB |
| `public/meetups/dd13e8f7a9a53eebe9b68d23ae59b5aa4db2fd3c.png` | 1000 KB |
| `public/carousel/optech.webp` | 792 KB |
| `public/apprenticeship/lightning.png` | 756 KB |
| `public/apprenticeship/optech.png` | 592 KB |
| `public/boss/agenda1.webp` | 536 KB |
| `public/boss/schedule_old.png` | 481 KB |
| `public/header/Deep_dive_hero.webp` | 356 KB |
| `public/meetups/9acaba228aead633ad5f3bdf856ca6987d8fcc31.png` | 288 KB |
| `public/bitspace/9acaba228aead633ad5f3bdf856ca6987d8fcc31.png` | 288 KB |
| `public/apprenticeship/newIdea.webp` | 242 KB |
| `public/bitspace/bitdev.webp` | 240 KB |
| `public/carousel/bitdev.webp` | 217 KB |
| `public/people/Aditya.png` | 216 KB |
| `public/readingClub/onboardingToBitcoinCore.webp` | 193 KB |
| `public/testimonial/1.webp` | 185 KB |
| `public/readingClub/devPhilosophy.webp` | 184 KB |
| `public/testimonial/faisal.webp` | 182 KB |
| `public/apprenticeship/Aditya.webp` | 177 KB |
| `public/meetups/b2c3ea23338144499912f312912e7abed911843a.png` | 174 KB |
| `public/bitspace/b2c3ea23338144499912f312912e7abed911843a.png` | 174 KB |
| `public/carousel/cohort.webp` | 172 KB |
| `public/testimonial/7.webp` | 151 KB |
| `public/carousel/fellowship.webp` | 150 KB |
| `public/carousel/talks.webp` | 144 KB |
| `public/testimonial/3.webp` | 130 KB |
| `public/testimonial/6.webp` | 101 KB |
| `public/header/Meetup_Hero.webp` | 94 KB |
| `public/apprenticeship/readingClub.webp` | 92 KB |
| `public/testimonial/4.webp` | 92 KB |
| `public/apprenticeship/reviewClub.webp` | 84 KB |
| `public/readingClub/readingClubHero.webp` | 83 KB |
| `public/testimonial/shreyan.webp` | 70 KB |
| `public/testimonial/2.webp` | 68 KB |
| `public/fonts/dx-slight/Dx-Slight-Tall.otf` | 61 KB |
| `public/fonts/dx-slight/Dx-Slight-Bold-Tall.otf` | 60 KB |
| `public/boss/talk.webp` | 54 KB |
| `public/footer/bitshala.png` | 42 KB |
| `public/testimonial/5.webp` | 41 KB |
| `public/bitspace/hero.webp` | 40 KB |
| `public/activities/cohort.webp` | 37 KB |
| `public/people/Delcin.png` | 33 KB |
| `public/header/PR_Review_Hero.webp` | 27 KB |
| `public/apprenticeship/rajat.webp` | 18 KB |
| `public/testimonial/background.webp` | 9 KB |
| `public/apprenticeship/neo.png` | 8 KB |
| `public/home/Vector.png` | 4 KB |
| `public/bitspace/twitter.png` | 4 KB |
| `public/meetups/0cc7bf204a4841a67a94a0e5bface0f98bc2e114.svg` | 2 KB |
| `public/bitspace/0cc7bf204a4841a67a94a0e5bface0f98bc2e114.svg` | 2 KB |
| `public/apprenticeship/discord.svg` | 2 KB |
| `public/apprenticeship/github2.png` | 2 KB |
| `public/meetups/611f6e0b025a2b1183de8ef867d574e540e00445.svg` | 2 KB |
| `public/bitspace/611f6e0b025a2b1183de8ef867d574e540e00445.svg` | 2 KB |
| `public/apprenticeship/discord2.png` | 1 KB |
| `public/meetups/a31b2db97324909cdbfbd31251c34171da8ed9ca.svg` | 1 KB |
| `public/bitspace/a31b2db97324909cdbfbd31251c34171da8ed9ca.svg` | 1 KB |
| `public/meetups/e679e37dad881ee4db4c0fc88df207ef9b3824f1.svg` | 1 KB |
| `public/bitspace/e679e37dad881ee4db4c0fc88df207ef9b3824f1.svg` | 1 KB |
| `public/meetups/3f22db01851ea9848ea3bb249526604cf052f8e2.svg` | 0 KB |
| `public/bitspace/3f22db01851ea9848ea3bb249526604cf052f8e2.svg` | 0 KB |

## D. Referenced only by code that no page renders (42 files, 20.86 MB): not proposed for deletion

These are referenced in source, but only from components that no page imports, or from data entries that are commented out. Delete them only together with that code. Phase 4 may propose removing the dead components.

| File | Size | Referenced from |
|---|---|---|
| `public/bitdev/Gallery/8.webp` | 1.41 MB | `src/components/meetup/gallery.jsx` |
| `public/bitdev/Gallery/2.webp` | 1.36 MB | `src/components/meetup/gallery.jsx` |
| `public/bitdev/Gallery/7.webp` | 1.33 MB | `src/components/meetup/gallery.jsx` |
| `public/bitdev/Gallery/9.webp` | 1.23 MB | `src/components/meetup/gallery.jsx` |
| `public/bitdev/Gallery/5.webp` | 1.20 MB | `src/components/meetup/gallery.jsx` |
| `public/bitdev/Gallery/10.webp` | 1.15 MB | `src/components/meetup/gallery.jsx` |
| `public/bitdev/Gallery/6.webp` | 1.11 MB | `src/components/meetup/gallery.jsx` |
| `public/bitdev/Gallery/4.webp` | 1.09 MB | `src/components/meetup/gallery.jsx` |
| `public/bitspace/Gallery/11.webp` | 1.03 MB | `src/components/bitspace/gallery.jsx`, `src/components/meetup/gallery.jsx` |
| `public/bitdev/Gallery/11.webp` | 998 KB | `src/components/meetup/gallery.jsx` |
| `public/bitdev/Gallery/1.webp` | 965 KB | `src/components/meetup/gallery.jsx` |
| `public/bitspace/Gallery/4.webp` | 896 KB | `src/components/bitspace/gallery.jsx`, `src/components/meetup/gallery.jsx` |
| `public/bitdev/Gallery/3.webp` | 893 KB | `src/components/meetup/gallery.jsx` |
| `public/bitspace/Gallery/5.webp` | 761 KB | `src/components/bitspace/gallery.jsx`, `src/components/meetup/gallery.jsx` |
| `public/bitspace/Gallery/12.webp` | 650 KB | `src/components/bitspace/gallery.jsx`, `src/components/meetup/gallery.jsx` |
| `public/bitspace/Gallery/10.webp` | 529 KB | `src/components/bitspace/gallery.jsx`, `src/components/meetup/gallery.jsx` |
| `public/bitspace/Gallery/13.webp` | 489 KB | `src/components/bitspace/gallery.jsx`, `src/components/meetup/gallery.jsx` |
| `public/bitdev/bitdevs_3.webp` | 455 KB | `src/components/meetup/About.astro`, `src/components/meetup/slider.jsx` |
| `public/bitdev/bitdevs_2.webp` | 388 KB | `src/components/meetup/About.astro`, `src/components/meetup/slider.jsx` |
| `public/bitdev/bitdevs_1.webp` | 364 KB | `src/components/meetup/About.astro`, `src/components/meetup/slider.jsx` |
| `public/bitspace/Gallery/6.webp` | 338 KB | `src/components/bitspace/gallery.jsx`, `src/components/meetup/gallery.jsx` |
| `public/bitspace/bengaluruBitdev.webp` | 337 KB | `src/components/bitspace/PreviousEvents.astro` |
| `public/bitspace/Gallery/14.webp` | 259 KB | `src/components/bitspace/gallery.jsx`, `src/components/meetup/gallery.jsx` |
| `public/bitspace/bb_nov.webp` | 233 KB | `src/components/bitspace/UpcomingEvents.astro` |
| `public/bitdev/Gallery/12.webp` | 226 KB | `src/components/meetup/gallery.jsx` |
| `public/bitspace/Gallery/2.webp` | 195 KB | `src/components/bitspace/gallery.jsx`, `src/components/meetup/gallery.jsx` |
| `public/bitspace/Gallery/1.webp` | 195 KB | `src/components/bitspace/gallery.jsx`, `src/components/meetup/gallery.jsx` |
| `public/bitspace/blrBitdev.webp` | 184 KB | `src/components/bitspace/PreviousEvents.astro` |
| `public/bitspace/memebook.webp` | 140 KB | `src/components/bitspace/PreviousEvents.astro` |
| `public/bitspace/bitcoinNode.webp` | 70 KB | `src/components/bitspace/PreviousEvents.astro` |
| `public/cohort/checkerboard3.webp` | 67 KB | `src/components/cohort/Checkerboard.astro` |
| `public/bitspace/Gallery/8.webp` | 62 KB | `src/components/bitspace/gallery.jsx`, `src/components/meetup/gallery.jsx` |
| `public/cohort/checkerboard2.webp` | 59 KB | `src/components/cohort/Checkerboard.astro` |
| `public/bitspace/Gallery/9.webp` | 57 KB | `src/components/bitspace/gallery.jsx`, `src/components/meetup/gallery.jsx` |
| `public/bitspace/nostr.webp` | 55 KB | `src/components/bitspace/PreviousEvents.astro` |
| `public/cohort/checkerboard1.webp` | 39 KB | `src/components/cohort/Checkerboard.astro` |
| `public/boss/btrust.webp` | 16 KB | `src/components/boss/BackedBy.astro` |
| `public/people/stratospher.png` | 96 KB | commented-out entries in `src/components/common/list.js` |
| `public/people/Faisal.png` | 61 KB | none (`"Faisal"` only appears as a name string) |
| `public/people/emil.png` | 59 KB | `list.js` entry (`image: "emil"`) in a list no page renders |
| `public/people/Shreyan.png` | 46 KB | none (`"Shreyan"` only appears as a name string) |
| `public/people/keraliss.png` | 9 KB | commented-out entry in `src/components/common/list.js` |

## Done

- `public/people/Sourav.png`, a case-only duplicate of `sourav.png`, was removed from git with your approval (`a7674a7`).

## Summary

Deleting sections A and B removes **94 files (114.86 MB)** from `public/`, and from every future deploy artifact. Page weight doesn't change, because none of these files is requested. Git history keeps every file, so reverting the deletion commit restores them.

