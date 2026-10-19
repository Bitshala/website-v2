/* BOSS Winter 2026 schedule: data + vanilla DOM renderers in the bitshala.org/boss agenda style. Assigns window.BOSS. */
(function () {
  'use strict';

  /* s(start, end, kind, title, speakers, about)
     kind: 'talk' (slate card) | 'workshop' (olive card) | 'open' (plum card)
     times are 24-hour "HH:MM" IST; display converts to 12-hour like the Summer 2026 agenda */
  function s(start, end, kind, title, speakers, about) {
    return { start: start, end: end, kind: kind, title: title, speakers: speakers || [], about: about || '' };
  }

  var schedule = {
    edition: 'Winter 2026',
    city: 'Jaipur',
    range: '26 – 31 October 2026',
    month: 'October',
    lunch: { start: '13:00', end: '14:30' },
    days: [
      { date: '2026-10-26', day: 26, title: 'Orientation & Community Kickoff', start: '10:00', end: '17:00', sessions: [] },
      {
        date: '2026-10-27', day: 27, title: 'AI, Developer Tooling & Bitcoin Core', start: '10:00', end: '17:00',
        sessions: [
          s('10:00', '11:30', 'workshop', 'AI Deep Dive', ['Adi Shankara', 'Abhijay Jain', 'Anmol'],
            'A workshop combining an LLM and transformers primer, tiny models, Goose GDK Bitcoin projects and AI for everyday code.'),
          s('11:30', '12:00', 'talk', 'Don’t trust, attest: an architecture Deep Dive into TEEs for remote Multisig and Auditable AI', ['Yshok'],
            'A practical tour of trusted execution environments (TEEs), the hardware primitives behind secure-enclave cloud signing for multisigs and attested AI inference, from first principles to advanced architecture.'),
          s('12:00', '12:30', 'talk', 'Sovereign Engineering Project Showcase', ['Jo']),
          s('12:30', '13:00', 'talk', 'The Blind Spot in Bitcoin Adoption', ['Paper']),
          s('14:30', '15:30', 'workshop', 'BitcoinKernel Project Workshop', ['Yuvic'],
            'An overview of what BitcoinKernel is, then a hands-on demo of using it through small, basic examples.'),
          s('15:30', '16:00', 'talk', 'What’s new in BDK', ['codingp110'],
            'The changes coming in BDK 4.0. For BDK users, a guide to the next major release; for everyone else, an introduction to some of the nuances of Bitcoin wallet design.'),
          s('16:00', '16:30', 'talk', 'Taproot Assets', ['Raj Sarogi'],
            'A brief introduction to Taproot Assets and what they can be used for.'),
          s('16:30', '17:00', 'talk', 'OpenSwap: Intro + quick Demo', ['Stark'])
        ]
      },
      {
        date: '2026-10-28', day: 28, title: 'Post-Quantum Cryptography & Self-Custody UX', start: '10:00', end: '17:00',
        sessions: [
          s('10:00', '10:30', 'talk', 'Bitcoin After Quantum: Understanding the Threat', ['Anubha Jain'],
            'Quantum computing poses a long-term threat to the cryptographic foundations of Bitcoin, particularly its reliance on elliptic-curve cryptography. This talk explores Bitcoin’s quantum attack surface, the implications for keys and transactions, and the cryptographic, protocol and migration challenges involved in preparing Bitcoin for a post-quantum future.'),
          s('10:30', '11:30', 'workshop', 'Post-Quantum Signatures in Practice: Hash, Lattice, and Isogeny Schemes', ['Jamal'],
            'A 10-minute overview of hash-based, lattice and isogeny-based signature schemes. Participants then sign the same message with one algorithm from each family by completing prepared starter code, and finish by benchmarking the three on signature size, public-key size and verification time (benchmark code provided).'),
          s('11:30', '12:00', 'talk', 'Challenges building Epoch Shield - Cryptography meets Chaos', ['Sameer P'],
            'The challenges of implementing MLS group encryption on Nostr’s unordered relay mesh, where cryptographic assumptions about ordering, reliable delivery and shared state collide with permissionless networks, and what we learned bridging the two.'),
          s('12:00', '12:30', 'talk', 'Shroud: Intro + Quick Demo', ['Anmol']),
          s('12:30', '13:00', 'talk', 'Self-custody UX trade-offs', ['Veronika'],
            'What breaks when a non-technical user tries to run their own self-custodial Lightning wallet.'),
          s('14:30', '15:30', 'workshop', 'Self-Custody Models and Penlock Workshop', ['Rama Gan'],
            'Seed generation, splitting and recovery with Penlock, followed by Q&A.'),
          s('15:30', '16:00', 'talk', 'Krux showcase', ['qlrd'],
            'An integration-test framework for Krux and for hardware wallets in general.'),
          s('16:00', '16:30', 'talk', 'Exploring Zero Knowledge Proofs for Bitcoin', ['sha512rma'],
            'How BitVM enables optimistic off-chain verification of STARK/SNARK proofs, contrasting Ethereum’s on-chain KZG polynomial verification with Bitcoin’s trustless, off-chain client-side validation models.'),
          s('16:30', '17:00', 'open', 'Open Stage', [],
            'A talk on a new kind of Nostr-based generalised market discovery.')
        ]
      },
      {
        date: '2026-10-29', day: 29, title: 'Lightning Network, Ecash & Decentralized Web', start: '10:00', end: '17:00',
        sessions: [
          s('10:00', '10:30', 'talk', 'UI/UX Walkthrough of coconut wallet', ['Louis'],
            'The UI/UX design elements behind Coconut Wallet.'),
          s('10:30', '11:30', 'workshop', 'Creating a Cashu Wallet with CDK', ['Luiz Medina'],
            'How to use the CDK library to build a Cashu wallet.'),
          s('11:30', '12:00', 'talk', 'Smite: Lightning Fuzzing Engine', ['Nishant Bansal']),
          s('12:00', '12:30', 'talk', 'Lightning Sandbox Demo', ['Duggirala Venkata Sai Viswanath'],
            'A demo walking through the whole sandbox.'),
          s('12:30', '13:00', 'talk', 'Zeus Update', ['Ajey Shewal']),
          s('14:30', '15:30', 'workshop', 'Pool Your Spare Disks: Self-Hostable Distributed Storage on Open Protocols', ['Manas'],
            'A demo of a Nostr storage orchestrator that lets people with spare storage pool their resources without running a server or exposing a public IP.'),
          s('15:30', '16:00', 'talk', 'Formstr Drive: Your Cloud Storage Ends Here', ['Sidharth'],
            'How we built a file storage app where nobody monitors your data: entirely client-side encryption, built where Nostr keys meet Blossom servers.'),
          s('16:00', '16:30', 'talk', 'Monetizing APIs with L402 and ngx_l402', ['iam thesvn'],
            'The ngx_l402 Nginx module, with a short introduction to the L402 protocol itself.'),
          s('16:30', '17:00', 'open', 'Open Stage', [], 'Open discussion and wrap-up.')
        ]
      },
      { date: '2026-10-30', day: 30, title: 'To be announced', sessions: [] },
      { date: '2026-10-31', day: 31, title: 'To be announced', sessions: [] }
    ]
  };

  /* ---------- helpers ---------- */
  function esc(v) {
    return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function mins(t) { var p = t.split(':'); return (+p[0]) * 60 + (+p[1]); }
  function clock(t) { var m = mins(t), h = Math.floor(m / 60) % 12 || 12; return h + ':' + ('0' + (m % 60)).slice(-2); }
  function clockAmPm(t) { return clock(t) + (mins(t) >= 720 ? ' PM' : ' AM'); }
  function range(a, b) { return clockAmPm(a) + ' - ' + clockAmPm(b); }
  function two(n) { return (n < 10 ? '0' : '') + n; }
  function names(list) {
    if (!list.length) return '';
    if (list.length === 1) return list[0];
    return list.slice(0, -1).join(', ') + ' & ' + list[list.length - 1];
  }

  /* ---------- SessionCard ---------- */
  function sessionCard(x, opts) {
    opts = opts || {};
    var cut = x.title.indexOf(': ');
    var main = cut > 0 ? x.title.slice(0, cut + 1) : x.title;
    var sub = cut > 0 ? x.title.slice(cut + 2) : '';
    var dur = (mins(x.end) - mins(x.start)) + 'm';
    var inner =
      '<span class="boss-chip">' + esc(clock(x.start)) + '</span>' +
      '<span class="boss-card__body">' +
      '<span class="boss-card__title">' + esc(main) + (sub ? '<span class="boss-card__sub">' + esc(sub) + '</span>' : '') + '</span>' +
      (x.speakers.length ? '<span class="boss-card__by"><span class="boss-card__byword">by</span> ' + esc(names(x.speakers)) + '</span>' : '') +
      '</span>' +
      '<span class="boss-card__dur">' + (x.about ? '<span class="boss-card__more" aria-hidden="true"></span>' : '') + esc(dur) + '</span>';
    var cls = 'boss-card boss-card--' + esc(x.kind);
    if (!x.about) return '<div class="' + cls + '"><div class="boss-card__row">' + inner + '</div></div>';
    return '<details class="' + cls + '"' + (opts.open ? ' open' : '') + '><summary class="boss-card__row">' + inner + '</summary>' +
      '<p class="boss-card__about">' + esc(x.about) + '</p></details>';
  }

  /* ---------- SessionBlock ---------- */
  function sessionBlock(n, list) {
    if (!list.length) return '';
    return '<section class="boss-block" aria-label="Session ' + two(n) + '">' +
      '<header class="boss-block__head"><span>Session ' + two(n) + '</span><span>' + esc(range(list[0].start, list[list.length - 1].end)) + '</span></header>' +
      '<div class="boss-block__list">' + list.map(function (x) { return sessionCard(x); }).join('') + '</div></section>';
  }

  /* ---------- LunchStrip ---------- */
  function lunchStrip(l) {
    return '<div class="boss-lunch" role="note" aria-label="Lunch, ' + esc(range(l.start, l.end)) + '">' +
      '<span class="boss-chip boss-lunch__chip">' + esc(clock(l.start)) + '</span>' +
      '<span class="boss-lunch__label">Lunch</span>' +
      '<span class="boss-lunch__dur">' + (mins(l.end) - mins(l.start)) + 'm</span></div>';
  }

  /* ---------- DayHeader ---------- */
  function dayHeader(data, d, i) {
    return '<header class="boss-dayhead"><h3 class="boss-dayhead__title">' +
      '<span class="boss-dayhead__date">' + esc(data.month.toUpperCase()) + ' ' + two(d.day) + ' • DAY ' + two(i + 1) + '</span>' +
      '<span class="boss-dayhead__sep"> : </span><span class="boss-dayhead__name">' + esc(d.title) + '</span></h3>' +
      (d.start ? '<span class="boss-dayhead__time">' + esc(range(d.start, d.end)) + '</span>' : '') + '</header>';
  }

  /* ---------- Schedule (all days, stacked) ---------- */
  function scheduleHTML(data, only) {
    var n = 0, lunch = data.lunch;
    return data.days.map(function (d, i) {
      var skip = only && only.indexOf(d.date) < 0;
      if (skip) { if (d.sessions.length) n += 2; return ''; }
      var html = '<div class="boss-day" id="boss-day-' + d.day + '">' + dayHeader(data, d, i);
      if (d.sessions.length) {
        var am = d.sessions.filter(function (x) { return mins(x.start) < mins(lunch.start); });
        var pm = d.sessions.filter(function (x) { return mins(x.start) >= mins(lunch.start); });
        html += '<div class="boss-grid">' + sessionBlock(++n, am) + lunchStrip(lunch) + sessionBlock(++n, pm) + '</div>';
      }
      return html + '</div>';
    }).join('');
  }

  /* ---------- Navigation: the bitshala.org/boss nav row and season pills ---------- */
  function nav() {
    return '<nav class="boss-nav" aria-label="BOSS">' +
      '<a class="boss-nav__link boss-nav__link--register" href="#register">Register</a>' +
      '<a class="boss-nav__link boss-nav__link--schedule" href="#agenda">Schedule</a>' +
      '<a class="boss-nav__link boss-nav__link--gallery" href="#gallery">Gallery</a>' +
      '<a class="boss-nav__back" href="https://bitshala.org/">Go back to bitshala</a></nav>';
  }
  function seasonPills(labels, active) {
    return '<div class="boss-pills" role="tablist">' + labels.map(function (l) {
      var on = l === active;
      return '<button type="button" role="tab" aria-selected="' + on + '" class="boss-pill' + (on ? ' is-active' : '') + '">' + esc(l) + '</button>';
    }).join('') + '</div>';
  }
  function heading(data) {
    return '<h2 class="boss-heading">' + esc(data.edition) + ' <mark>Agenda</mark></h2>';
  }

  /* opts: { data, heading:false to drop the section heading, only:['YYYY-MM-DD',…] to render some days (numbering kept) } */
  function renderSchedule(el, opts) {
    opts = opts || {};
    var data = opts.data || schedule;
    el.classList.add('boss');
    el.innerHTML =
      '<div class="boss-schedule">' +
      (opts.heading === false || opts.only ? '' :
        '<div class="boss-top">' + heading(data) +
        '<p class="boss-top__meta">' + esc(data.city) + ' · ' + esc(data.range) + '</p></div>') +
      scheduleHTML(data, opts.only) + '</div>';
  }

  window.BOSS = {
    schedule: schedule,
    renderSchedule: renderSchedule,
    html: { nav: nav, seasonPills: seasonPills, heading: heading, sessionCard: sessionCard, sessionBlock: sessionBlock, lunchStrip: lunchStrip, dayHeader: dayHeader, schedule: scheduleHTML },
    util: { clock: clock, range: range }
  };
})();
