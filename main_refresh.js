document.addEventListener('DOMContentLoaded', function () {
  // News filter buttons (News page only)
  var filterButtons = document.querySelectorAll('.filter-row button');
  var items = document.querySelectorAll('[data-category]');
  if (filterButtons.length && items.length) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterButtons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var cat = btn.getAttribute('data-filter');
        items.forEach(function (item) {
          if (cat === 'all' || item.getAttribute('data-category') === cat) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // Placeholder form submit handler
  var form = document.querySelector('form.inquiry-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('This is a prototype form. Connect it to an email service or backend before launch.');
    });
  }

  // Affiliated Faculty bio modal (About page only)
  var bioModal = document.getElementById('bio-modal');
  if (bioModal) {
    var bios = {
      gita: {
        name: 'Gita Gopinath',
        role: 'Founding Director, Global Economics Lab · Gregory and Ania Coffey Professor of Economics, Harvard University & Professor of Public Policy at Harvard Kennedy School',
        photo: 'https://gitagopinath.github.io/images/gita-gopinath.jpg',
        email: 'gopinath@fas.harvard.edu',
        bio: 'Gita Gopinath is the Gregory and Ania Coffey Professor of Economics in the Department of Economics at Harvard University, and Professor of Public Policy at Harvard Kennedy School. Her research focuses on International Finance and Macroeconomics where she is a leading voice on dollar dominance, exchange rates, trade and investment, international financial crises, monetary policy and debt. Previously, she was the First Deputy Managing Director (FDMD) of the International Monetary Fund (IMF) from January 2022–August 2025 and prior to that she was the Chief Economist of the IMF from January 2019-January 2022.',
        links: [
          { label: 'Read full biography', url: 'https://gitagopinath.github.io/bio.html' },
          { label: 'X', url: 'https://x.com/GitaGopinath' },
          { label: 'LinkedIn', url: 'https://linkedin.com/in/gitagopinath/?skipRedirect=true' }
        ]
      },
      valere: {
        name: 'Valère Piérard',
        role: 'Chief of Staff',
        photo: 'images/valere-piarard.jpg',
        email: 'valerepierard@hks.harvard.edu',
        bio: 'Valère Piérard serves as Chief of Staff to Professor Gita Gopinath, Founding Director of the Global Economics Lab.',
        links: [
          { label: 'LinkedIn', url: 'https://www.linkedin.com/in/valerepierard/' }
        ]
      },
      rogoff: {
        name: 'Kenneth Rogoff',
        role: 'Maurits C. Boas Professor of International Economics, Harvard University',
        photo: 'https://www.economics.harvard.edu/sites/g/files/omnuum5991/files/styles/hwp_4_5__320x400/public/econ/files/rogoff_kenneth048r.jpg?itok=3gn5bmBD',
        email: 'krogoff@harvard.edu',
        bio: 'Kenneth Rogoff writes on international macroeconomics and financial crises. He served as Chief Economist at the International Monetary Fund from 2001 to 2003. His treatise Foundations of International Macroeconomics, co-authored with Maurice Obstfeld, is the standard graduate text in the field worldwide, and his monthly syndicated column on global economic issues is published regularly in more than fifty countries. With Carmen Reinhart, he co-authored This Time Is Different: Eight Centuries of Financial Folly, a New York Times and international bestseller built on a data set spanning 66 countries and 800 years of financial crises. Rogoff is an elected member of the National Academy of Sciences, the American Academy of Arts and Sciences, the Council on Foreign Relations, and the Group of Thirty, and holds the life title of international grandmaster of chess.'
      },
      itskhoki: {
        name: 'Oleg Itskhoki',
        role: 'Slusky Family Professor of Economics, Harvard University',
        photo: 'https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img,w_480,h_480/https://itskhoki.com/wp-content/uploads/2021/04/profile_pic_large-scaled-e1619752458162.jpg',
        email: 'itskhoki@fas.harvard.edu',
        bio: 'Oleg Itskhoki is the Slusky Family Professor of Economics at Harvard University. He previously held the Venu and Ana Kotamraju Endowed Chair in Economics at UCLA and was a Professor of Economics and International Affairs at Princeton University. His research spans macroeconomics and international economics, with a focus on globalization and labor markets, and on currencies and exchange rates. He is the 2022 John Bates Clark Medalist, awarded annually to the American economist under 40 judged to have made the most significant contribution to economic thought, and is a Fellow of the Econometric Society, an NBER research associate, and a CEPR research affiliate.'
      },
      obstfeld: {
        name: 'Maurice Obstfeld',
        role: 'C. Fred Bergsten Senior Fellow, Peterson Institute for International Economics',
        photo: 'https://www.piie.com/sites/default/files/styles/large/public/headshots/maurice-obstfeld-4729.jpg?itok=aL5n35n2',
        email: 'obstfeld@berkeley.edu',
        bio: 'Maurice Obstfeld is the C. Fred Bergsten Senior Fellow at the Peterson Institute for International Economics and the Class of 1958 Professor of Economics Emeritus at UC Berkeley, where he taught from 1991 to 2023. He served as the IMF’s Economic Counsellor and Director of Research from 2015 to 2018, and as a member of the White House Council of Economic Advisers from 2014 to 2015. He is the co-author, with Kenneth Rogoff, of Foundations of International Macroeconomics, and with Paul Krugman and Marc Melitz, of the widely used textbook International Economics. Obstfeld is a Fellow of the Econometric Society and the American Academy of Arts and Sciences, and in 2023 was named a Distinguished Fellow of the American Economic Association.'
      },
      rey: {
        name: 'Hélène Rey',
        role: 'Lord Bagri Professor of Economics, London Business School',
        photo: 'https://images.london.edu/hxo16fanegqh/2b02da29-6a94-4bfa-a435-75f9ac663b4b-asset/e98e8edc364862273431767a9fdedee1/helene-rey-527x347.jpg',
        email: 'hrey@london.edu',
        bio: 'Hélène Rey is the Lord Bagri Professor of Economics at London Business School. Prior to joining LBS, she was a professor at Princeton University, in the Economics Department and the Woodrow Wilson School of Public and International Affairs. She was elected President of the European Economic Association in 2022. Her research focuses on international macroeconomics and finance, including the workings of the international monetary system, capital flows, and financial crises.'
      },
      antras: {
        name: 'Pol Antràs',
        role: 'Robert G. Ory Professor of Economics, Harvard University',
        photo: 'https://www.economics.harvard.edu/sites/g/files/omnuum5991/files/styles/hwp_4_5__480x600/public/econ/files/antras_pol_square_crop_resized_for_website.jpg?itok=b6ASLakS',
        email: 'pantras@fas.harvard.edu',
        bio: 'Pol Antràs is the Robert G. Ory Professor of Economics at Harvard University, working on international economics and applied theory. Some of his work is overviewed in his book Global Production: Firms, Contracts, and Trade Structure, published by Princeton University Press. He is a Research Associate at the National Bureau of Economic Research, where he previously directed the International Trade and Organization Working Group, and has served as Editor of the Quarterly Journal of Economics since 2015. He was elected a Fellow of the Econometric Society in 2015 and was awarded an Alfred P. Sloan Research Fellowship in 2007.'
      },
      reinhart: {
        name: 'Carmen Reinhart',
        role: 'Minos A. Zombanakis Professor of the International Financial System, Harvard Kennedy School',
        photo: 'https://www.hks.harvard.edu/sites/default/files/styles/employee_grayscale/public/bio_images/13074-1769149832.jpg?itok=j00qcM8b',
        email: 'carmen_reinhart@hks.harvard.edu',
        bio: 'Carmen M. Reinhart is the Minos A. Zombanakis Professor of the International Financial System at Harvard Kennedy School. She served as Senior Vice President and Chief Economist of the World Bank Group from 2020 to 2022, and was previously Policy Advisor and Deputy Director at the International Monetary Fund. With Kenneth Rogoff, she co-authored This Time Is Different: Eight Centuries of Financial Folly, a bestseller translated into more than twenty languages that documents the recurring patterns behind financial crises across eight centuries. She is an elected member of the Group of Thirty and a senior fellow at the Council on Foreign Relations, and has been named among Bloomberg Markets’ 50 Most Influential in Finance and Foreign Policy’s Top 100 Global Thinkers.'
      },
      presbitero: {
        name: 'Andrea Presbitero',
        role: 'Deputy Division Chief, Research Department, International Monetary Fund',
        photo: 'https://cepr.org/sites/default/files/styles/logo/public/profile-photos/50364-jhu_d4s_4104_d3f5a2ad4abc264c08a1b5fc8abbb409.jpeg?itok=HiaUC6CP',
        email: '',
        bio: 'Andrea F. Presbitero is Deputy Division Chief of the Multilateral Surveillance Division in the Research Department of the International Monetary Fund. He is also a CEPR Research Fellow in the International Macroeconomics and Finance programme, an Associate Fellow at SAIS Europe, and a member of Money & Finance Research (MoFiR). He previously held faculty positions at Università Politecnica delle Marche and at the Johns Hopkins University School of Advanced International Studies. His research on financial intermediation, development finance, and international finance has been published in leading journals including the Review of Financial Studies, the Journal of Financial Economics, and the Review of Economics and Statistics. He serves as associate editor of the IMF Economic Review, Economía (LACEA), and the Journal of Financial Stability.'
      },
      gourinchas: {
        name: 'Pierre-Olivier Gourinchas',
        role: 'S.K. and Angela Chan Professor of Global Management, University of California, Berkeley',
        photo: 'https://www.imf.org/-/media/images/imf/bios/pierre-olivier-gourinchas.jpg',
        email: 'pog@berkeley.edu',
        bio: 'Pierre-Olivier Gourinchas is the Economic Counsellor and Director of Research at the International Monetary Fund, on leave from his position as the S.K. and Angela Chan Professor of Global Management at UC Berkeley, where he holds appointments in the Department of Economics and the Haas School of Business and directs the Clausen Center for International Business and Policy. His research focuses on international macroeconomics and finance, including geoeconomic fragmentation, the drivers of global inflation, exchange rates and term premia, and the international monetary system. He is the laureate of the 2007 Bernácer Prize for the best European economist under 40 working in macroeconomics and finance, and the 2008 Prix du Meilleur Jeune Économiste for the best French economist under 40. He has served as editor-in-chief of the IMF Economic Review, managing editor of the Journal of International Economics, co-editor of the American Economic Review, and director of the NBER’s International Finance and Macroeconomics Program. He is a Fellow of the Econometric Society and a Distinguished Fellow of CEPR.'
      },
      ara: {
        name: 'Ara Patvakanian',
        role: 'Predoctoral Fellow',
        photo: 'images/ara-patvakanian.jpg',
        email: '',
        bio: 'Ara Patvakanian is a fellow at Harvard University’s Department of Economics working on international macroeconomics and finance. Prior to joining the Global Economics Lab, he was a senior research associate at the Federal Reserve Bank of Boston. Ara holds a B.A. in Mathematical Economics and Political Science from the University of Pennsylvania.'
      }
    };

    var modalName = document.getElementById('bio-modal-name');
    var modalRole = document.getElementById('bio-modal-role');
    var modalBio = document.getElementById('bio-modal-bio');
    var modalPhoto = document.getElementById('bio-modal-photo');
    var modalEmail = document.getElementById('bio-modal-email');
    var modalLinks = document.getElementById('bio-modal-links');
    var mailIcon = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:-2px; margin-right:5px;"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>';
    var lastFocused = null;

    function openBio(id) {
      var person = bios[id];
      if (!person) return;
      modalName.textContent = person.name;
      modalRole.textContent = person.role;
      modalBio.textContent = person.bio;
      modalPhoto.src = person.photo;
      modalPhoto.alt = person.name;
      if (modalEmail) {
        modalEmail.innerHTML = person.email
          ? '<a href="mailto:' + person.email + '">' + mailIcon + person.email + '</a>'
          : '';
      }
      if (modalLinks) {
        modalLinks.innerHTML = (person.links && person.links.length)
          ? person.links.map(function (l) {
              return '<a href="' + l.url + '" target="_blank" rel="noopener">' + l.label + '</a>';
            }).join(' &nbsp;&middot;&nbsp; ')
          : '';
      }
      lastFocused = document.activeElement;
      bioModal.hidden = false;
      bioModal.querySelector('.bio-modal-close').focus();
    }

    function closeBio() {
      bioModal.hidden = true;
      if (lastFocused) lastFocused.focus();
    }

    document.querySelectorAll('[data-person]').forEach(function (el) {
      el.addEventListener('click', function () {
        openBio(el.getAttribute('data-person'));
      });
    });

    bioModal.querySelectorAll('[data-modal-close]').forEach(function (el) {
      el.addEventListener('click', closeBio);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !bioModal.hidden) closeBio();
    });
  }

  // Reserve Currency Tracker placeholder modal (Our Work page)
  var trackerModal = document.getElementById('tracker-modal');
  if (trackerModal) {
    var trackerBtn = document.getElementById('tracker-cta-btn');
    var trackerLastFocused = null;

    function openTracker() {
      trackerLastFocused = document.activeElement;
      trackerModal.hidden = false;
      trackerModal.querySelector('.bio-modal-close').focus();
    }

    function closeTracker() {
      trackerModal.hidden = true;
      if (trackerLastFocused) trackerLastFocused.focus();
    }

    if (trackerBtn) trackerBtn.addEventListener('click', openTracker);

    trackerModal.querySelectorAll('[data-modal-close]').forEach(function (el) {
      el.addEventListener('click', closeTracker);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !trackerModal.hidden) closeTracker();
    });
  }

  // Topic research modal (Our Work page)
  var topicModal = document.getElementById('topic-modal');
  if (topicModal) {
    var topics = {
      fragmentation: {
        name: 'Geoeconomic Fragmentation',
        desc: 'Tariffs, export controls, sanctions, and the reordering of global trade and finance.',
        papers: [
          { label: 'The Incidence of Tariffs: Rates and Reality', sub: 'Gopinath & Neiman, 2025', url: 'https://gitagopinath.github.io/files/Tariffs_Incidence.pdf' },
          { label: 'Changing Global Linkages: A New Cold War?', sub: 'Gopinath, Gourinchas, Presbitero & Topalova, JIE 2025', url: 'https://www.sciencedirect.com/science/article/abs/pii/S0022199624001697' }
        ],
        speeches: [
          { label: 'Cold War II? Preserving Economic Cooperation Amid Geoeconomic Fragmentation', sub: '20th World Congress of the IEA, Dec 2023', url: 'https://www.imf.org/en/News/Articles/2023/12/11/sp121123-cold-war-ii-preserving-economic-cooperation-amid-geoeconomic-fragmentation' },
          { label: 'Opening Remarks at the IMF Conference on Geoeconomic Fragmentation', sub: 'IMF, May 2023', url: 'https://www.imf.org/en/News/Articles/2023/05/25/sp052523-FDMD-GGopinath-Geoeconomic-Fragmentation' }
        ],
        resources: [
          { label: 'The Ages of Globalization: Geography, Technology, and Institutions', sub: 'Jeffrey D. Sachs, Columbia University Press, 2020' },
          { label: '"Slowbalisation": The Future of Global Trade', sub: 'The Economist, Jan 2019' },
          { label: 'Geoeconomic Fragmentation and the Future of Multilateralism', sub: 'IMF Staff Discussion Note, Aiyar et al., 2023' }
        ]
      },
      ai: {
        name: 'Artificial Intelligence',
        desc: 'Macroeconomic effects of AI adoption on growth, labor, trade, and financial markets.',
        papers: [],
        speeches: [
          { label: 'Crisis Amplifier? How to Prevent AI from Worsening the Next Economic Downturn', sub: 'IMF, May 2024', url: 'https://www.imf.org/en/News/Articles/2024/05/30/sp053024-crisis-amplifier-how-to-prevent-ai-from-worsening-the-next-economic-downturn' },
          { label: 'The Power and Perils of the "Artificial Hand": Considering AI Through the Ideas of Adam Smith', sub: 'IMF, June 2023', url: 'https://www.imf.org/en/News/Articles/2023/06/05/sp060523-fdmd-ai-adamsmith' }
        ],
        resources: [
          { label: 'Power and Progress: Our Thousand-Year Struggle Over Technology and Prosperity', sub: 'Daron Acemoglu & Simon Johnson, PublicAffairs, 2023' },
          { label: 'The Coming Wave: Technology, Power, and the Twenty-First Century’s Greatest Dilemma', sub: 'Mustafa Suleyman, Crown, 2023' }
        ]
      },
      'digital-money': {
        name: 'Digital Money',
        desc: 'Innovation in digital currencies balanced against monetary sovereignty and financial stability.',
        papers: [
          { label: 'Patterns of Invoicing Currency in Global Trade: New Evidence', sub: 'Boz, Casas, Georgiadis, Gopinath, et al., JIE 2022', url: 'https://www.sciencedirect.com/science/article/pii/S0022199622000368' }
        ],
        speeches: [
          { label: 'Stablecoins and Anonymous Money', sub: '2026 Per Jacobsson Lecture, Bank for International Settlements', url: 'https://www.bis.org/events/agm2026/sp260628_lecture.pdf' },
          { label: 'Money and Sovereignty', sub: 'Central Bank of Chile Annual Conference, Nov 2025', url: 'https://www.youtube.com/watch?v=482PmrzqHJg&t=28527s' },
          { label: 'Opening Remarks at "At the Frontier: India\'s Digital Payment System and Beyond"', sub: 'IMF Webinar, June 2022', url: 'https://www.imf.org/en/News/Articles/2022/06/02/sp060222-gopinath-opening-remarks-at-india-digital-payment-system-and-beyond' }
        ],
        resources: [
          { label: 'The Future of Money: How the Digital Revolution Is Transforming Currencies and Finance', sub: 'Eswar S. Prasad, Harvard University Press, 2021' },
          { label: 'The Currency Cold War: Cash and Cryptography, Hash Rates and Hegemony', sub: 'David Birch, LSE Press, 2020' }
        ]
      },
      geopolitics: {
        name: 'Geopolitics',
        desc: 'How great-power rivalry, alliances, and conflict are reshaping trade, capital flows, and the global economic order.',
        papers: [
          { label: 'Changing Global Linkages: A New Cold War?', sub: 'Gopinath, Gourinchas, Presbitero & Topalova, JIE 2025', url: 'https://www.sciencedirect.com/science/article/abs/pii/S0022199624001697' }
        ],
        speeches: [
          { label: 'Geopolitics and its Impact on Global Trade and the Dollar', sub: 'IMF, May 2024', url: 'https://www.imf.org/en/News/Articles/2024/05/07/sp-geopolitics-impact-global-trade-and-dollar-gita-gopinath' },
          { label: 'Europe in a Fragmented World', sub: '2023 Bernhard Harms Prize Acceptance Speech, Nov 2023', url: 'https://www.imf.org/en/News/Articles/2023/11/30/sp-fdmd-remarks-bernhard-harms-prize' }
        ]
      },
      governance: {
        name: 'Global Governance',
        desc: 'The evolving role of the WTO, IMF, and other multilateral institutions in a fragmenting order.',
        papers: [
          { label: 'A Global Strategy to Manage the Long-Term Risks of COVID-19', sub: 'Agarwal, Gopinath, Farrar, Hatchett & Sands, IMF WP 2022', url: 'https://www.imf.org/en/Publications/WP/Issues/2022/04/04/A-Global-Strategy-to-Manage-the-Long-Term-Risks-of-COVID-19-516079' },
          { label: "G7 Economists' Report on Global Imbalances", sub: 'Presented to the President of France, March 2026', url: 'https://www.elysee.fr/admin/upload/default/0001/19/e44fddb6550f8d5fa2cc0adcdede5ec490e2e921.pdf' }
        ],
        speeches: [
          { label: 'Remarks at the Ninth IMF-WB-WTO Trade Research Conference', sub: 'IMF-World Bank-WTO, Oct 2023', url: 'https://www.imf.org/en/News/Articles/2023/10/25/sp-fdmd-remarks-at-ninth-imf-wb-wto-trade-research-conf' },
          { label: 'Introductory Remarks at 23rd Jacques Polak Annual Research Conference', sub: 'IMF, Nov 2022', url: 'https://www.imf.org/en/News/Articles/2022/11/10/sp111022-introductory-remarks-by-the-first-deputy-managing-director' }
        ]
      },
      emerging: {
        name: 'Emerging Economies',
        desc: 'How developing and emerging economies shape — and are shaped by — the new global economic order.',
        papers: [
          { label: 'Preemptive Policies and Risk-Off Shocks in Emerging Markets', sub: 'Das, Gopinath & Kalemli-Ozcan, 2022', url: 'https://sebnemkalemliozcan.com/assets/workingpapers/UIPpaper_sep7_GG.pdf' },
          { label: 'Monetary Policy and the Short-Rate Disconnect in Emerging Economies', sub: 'De Leo, Gopinath & Kalemli-Ozcan, 2024', url: 'https://drive.google.com/file/d/1pL2ju8yYC6X8gfRqZJhC0Ng6ATNpwoWY/view' }
        ],
        speeches: [
          { label: 'Steering through the Fog: The Art and Science of Monetary Policy in Emerging Markets', sub: 'IMF, May 2025', url: 'https://www.imf.org/en/News/Articles/2025/05/07/sp050725-science-of-monetary-policy-in-emerging-markets-gita-gopinath' },
          { label: 'Charting a Course Through Rough Seas: How Emerging Markets Can Navigate Tougher External Conditions', sub: 'SARB Biennial Conference, Sept 2023', url: 'https://www.imf.org/en/News/Articles/2023/09/01/sp090123-gita-gopinath-keynote-address-at-the-sarb-biennial-conference' }
        ]
      },
      'financial-markets': {
        name: 'Financial Markets',
        desc: 'Trends in equity markets and financing conditions shaping the global economy.',
        papers: [
          { label: 'Sovereign Vs. Corporate Debt and Default: More Similar Than You Think', sub: 'Gopinath, Meyer, Trebesch & Reinhart, JIE 2025', url: 'https://www.hks.harvard.edu/centers/mrcbg/programs/growthpolicy/sovereign-vs-corporate-debt-and-default-more-similar-you-think' },
          { label: 'Central Banks As Dollar Lenders of Last Resort: Implications for Regulation and Reserve Holdings', sub: 'Das, Gopinath, Hall, Kim & Stein, AEJ: Macroeconomics (forthcoming)', url: 'https://gitagopinath.github.io/publications.html' }
        ],
        speeches: [
          { label: "This Time Must be Different: Lessons from Sri Lanka's Recovery and Debt Restructuring", sub: 'Shangri-La Hotel Colombo, June 2025', url: 'https://www.imf.org/en/News/Articles/2025/06/16/sp061625-gg-this-time-must-be-different-lessons-from-sri-lankas-recovery-and-debt-restructuring' },
          { label: 'Introductory Remarks for the Conference "Fiscal Policy in an Era of High Debt"', sub: 'IMF, Nov 2023', url: 'https://www.imf.org/en/News/Articles/2023/11/17/sp-fdmd-gopinath-remarks-at-fiscal-forum-era-of-high-debt' }
        ]
      },
      'economic-policy': {
        name: 'Economic Policy',
        desc: 'An integrated policy framework for the new world.',
        papers: [
          { label: 'Integrated Monetary and Financial Policies for Small Open Economies', sub: 'Basu, Boz, Gopinath, Roch & Unsal, Econometrica 2025', url: 'https://www.econometricsociety.org/publications/econometrica/2025/11/01/Integrated-Monetary-and-Financial-Policies-for-Small-Open-Economies' },
          { label: 'An Integrated Policy Framework (IPF) Diagram for International Economics', sub: 'Basu & Gopinath, IMF WP 2024', url: 'https://www.imf.org/en/Publications/WP/Issues/2024/02/23/An-Integrated-Policy-Framework-IPF-Diagram-for-International-Economics-545125' }
        ],
        speeches: [
          { label: 'A Strategic Pivot in Global Fiscal Policy', sub: 'Whitaker Lecture, Central Bank of Ireland, Sept 2024', url: 'https://www.imf.org/en/News/Articles/2024/09/17/sp091824-a-strategic-pivot-in-global-fiscal-policy' },
          { label: 'Navigating Fragmentation, Conflict, and Large Shocks', sub: 'NBU-NBP Annual Research Conference, June 2024', url: 'https://www.imf.org/en/News/Articles/2024/06/21/sp062124-fdmd-nbu-nbp-annual-research-conference' }
        ]
      }
    };

    var topicName = document.getElementById('topic-modal-name');
    var topicDesc = document.getElementById('topic-modal-desc');
    var topicPapers = document.getElementById('topic-modal-papers');
    var topicSpeeches = document.getElementById('topic-modal-speeches');
    var topicResources = document.getElementById('topic-modal-resources');
    var topicLastFocused = null;

    function renderTopicList(container, heading, items) {
      if (!container) return;
      if (!items || !items.length) {
        container.innerHTML = '';
        return;
      }
      var html = '<h4>' + heading + '</h4>';
      items.forEach(function (item) {
        // Items with a url render as a link; items without (e.g. a book
        // citation with no verified link) render as plain text.
        var tag = item.url ? 'a' : 'div';
        var attrs = item.url ? ' href="' + item.url + '" target="_blank" rel="noopener"' : '';
        html += '<' + tag + attrs + '>' + item.label + '<span>' + item.sub + '</span></' + tag + '>';
      });
      container.innerHTML = html;
    }

    function openTopic(id) {
      var topic = topics[id];
      if (!topic) return;
      topicName.textContent = topic.name;
      topicDesc.textContent = topic.desc;
      renderTopicList(topicPapers, 'Papers', topic.papers);
      renderTopicList(topicSpeeches, 'Speeches', topic.speeches);
      renderTopicList(topicResources, 'Key Resources', topic.resources);
      topicLastFocused = document.activeElement;
      topicModal.hidden = false;
      topicModal.querySelector('.bio-modal-close').focus();
    }

    function closeTopic() {
      topicModal.hidden = true;
      if (topicLastFocused) topicLastFocused.focus();
    }

    document.querySelectorAll('[data-topic]').forEach(function (el) {
      el.addEventListener('click', function () {
        openTopic(el.getAttribute('data-topic'));
      });
    });

    topicModal.querySelectorAll('[data-modal-close]').forEach(function (el) {
      el.addEventListener('click', closeTopic);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !topicModal.hidden) closeTopic();
    });
  }

  // About page sub-tabs (Our team / Our mission)
  var subtabBtns = document.querySelectorAll('.subtab-btn');
  if (subtabBtns.length) {
    function activateSubtab(name, scroll) {
      subtabBtns.forEach(function (btn) {
        var isActive = btn.getAttribute('data-subtab') === name;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
      document.querySelectorAll('[data-panel]').forEach(function (panel) {
        panel.hidden = panel.getAttribute('data-panel') !== name;
      });
      if (scroll) {
        var target = document.querySelector('.subtab-nav');
        if (target) target.scrollIntoView({ block: 'start' });
      }
    }

    subtabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        activateSubtab(btn.getAttribute('data-subtab'), false);
      });
    });

    if (window.location.hash === '#mission') {
      activateSubtab('mission', true);
    } else {
      activateSubtab('team', false);
    }
  }

  // Mission FAQ accordion (About page)
  var faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length) {
    function setFaqState(item, open) {
      var question = item.querySelector('.faq-question');
      var answer = item.querySelector('.faq-answer');
      item.setAttribute('data-open', open ? 'true' : 'false');
      question.setAttribute('aria-expanded', open ? 'true' : 'false');
      answer.style.maxHeight = open ? answer.scrollHeight + 'px' : '0px';
    }

    faqItems.forEach(function (item) {
      var question = item.querySelector('.faq-question');
      if (item.getAttribute('data-open') === 'true') {
        setFaqState(item, true);
      }
      question.addEventListener('click', function () {
        var isOpen = item.getAttribute('data-open') === 'true';
        setFaqState(item, !isOpen);
      });
    });

    window.addEventListener('resize', function () {
      faqItems.forEach(function (item) {
        if (item.getAttribute('data-open') === 'true') {
          item.querySelector('.faq-answer').style.maxHeight =
            item.querySelector('.faq-answer').scrollHeight + 'px';
        }
      });
    });
  }
});
