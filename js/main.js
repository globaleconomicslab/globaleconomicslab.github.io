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

  // Contact & Join Our Team forms (Contact page): submitted via Formspree
  // (the site is static with no server of its own). Falls back to a
  // mailto: link addressed to the Lab's inbox if the request fails.
  var LAB_EMAIL = 'globaleconomicslab@fas.harvard.edu';

  function submitToFormspree(form, statusEl, mailtoFallback, successMessage) {
    var submitBtn = form.querySelector('button[type="submit"]');
    var originalBtnText = submitBtn ? submitBtn.textContent : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
    }
    statusEl.textContent = '';
    statusEl.classList.remove('form-status-error', 'form-status-success');

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    }).then(function (response) {
      if (response.ok) {
        form.reset();
        statusEl.textContent = successMessage;
        statusEl.classList.add('form-status-success');
        if (submitBtn) submitBtn.textContent = originalBtnText;
      } else {
        throw new Error('Formspree responded with an error');
      }
    }).catch(function () {
      statusEl.textContent = 'Something went wrong sending that. Opening your email app instead — please hit send there.';
      statusEl.classList.add('form-status-error');
      if (submitBtn) submitBtn.textContent = originalBtnText;
      window.location.href = mailtoFallback;
    }).finally(function () {
      if (submitBtn) submitBtn.disabled = false;
    });
  }

  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('name').value;
      var email = document.getElementById('email').value;
      var subject = document.getElementById('subject').value;
      var comment = document.getElementById('comment').value;
      var body = 'Name: ' + name + '\nEmail: ' + email + '\n\n' + comment;
      var mailtoFallback = 'mailto:' + LAB_EMAIL
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(body);
      submitToFormspree(
        contactForm,
        document.getElementById('contact-form-status'),
        mailtoFallback,
        'Thanks — your message has been sent. We’ll be in touch soon.'
      );
    });
  }

  // "Stay informed" notify form (PAGE initiative box, Impact page) and the
  // "Stay Updated" newsletter signup in the footer (every page) share one
  // Formspree endpoint since they're both simple email-capture forms.
  var pageNotifyForm = document.getElementById('page-notify-form');
  if (pageNotifyForm) {
    pageNotifyForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var emailInput = pageNotifyForm.querySelector('input[type="email"]');
      var email = emailInput ? emailInput.value : '';
      var mailtoFallback = 'mailto:' + LAB_EMAIL
        + '?subject=' + encodeURIComponent('Stay Informed — PAGE Initiative')
        + '&body=' + encodeURIComponent('Please add this email to the PAGE updates list: ' + email);
      submitToFormspree(
        pageNotifyForm,
        document.getElementById('page-notify-form-status'),
        mailtoFallback,
        'Thanks — you’re on the list. We’ll be in touch when PAGE launches.'
      );
    });
  }

  var newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var emailInput = newsletterForm.querySelector('input[type="email"]');
      var email = emailInput ? emailInput.value : '';
      var mailtoFallback = 'mailto:' + LAB_EMAIL
        + '?subject=' + encodeURIComponent('Newsletter Signup')
        + '&body=' + encodeURIComponent('Please add this email to the newsletter list: ' + email);
      submitToFormspree(
        newsletterForm,
        document.getElementById('newsletter-form-status'),
        mailtoFallback,
        'Thanks — you’re subscribed.'
      );
    });
  }

  // "Subscribe to Receive Updates" card (homepage hero, next to In the News)
  // shares the same Formspree newsletter endpoint as the footer form above.
  var heroNewsletterForm = document.getElementById('newsletter-form-hero');
  if (heroNewsletterForm) {
    heroNewsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var emailInput = heroNewsletterForm.querySelector('input[type="email"]');
      var email = emailInput ? emailInput.value : '';
      var mailtoFallback = 'mailto:' + LAB_EMAIL
        + '?subject=' + encodeURIComponent('Newsletter Signup')
        + '&body=' + encodeURIComponent('Please add this email to the newsletter list: ' + email);
      submitToFormspree(
        heroNewsletterForm,
        document.getElementById('newsletter-form-hero-status'),
        mailtoFallback,
        'Thanks — you’re subscribed.'
      );
    });
  }

  // Placeholder handler for any other .inquiry-form on the site that isn't
  // wired to a real backend yet.
  var otherForms = document.querySelectorAll('form.inquiry-form:not(#contact-form):not(#join-form):not(#page-notify-form)');
  otherForms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('This is a prototype form. Connect it to an email service or backend before launch.');
    });
  });

  // Affiliated Faculty bio modal (About page only)
  var bioModal = document.getElementById('bio-modal');
  if (bioModal) {
    var bios = {
      gita: {
        name: 'Gita Gopinath',
        role: 'Director; Gregory and Ania Coffey Professor of Economics in the Department of Economics at Harvard University, and Professor of Public Policy at Harvard Kennedy School',
        photo: 'images/gita-gopinath.jpg',
        email: 'gopinath@fas.harvard.edu',
        bio: 'Gita Gopinath is the Gregory and Ania Coffey Professor of Economics in the Department of Economics at Harvard University, and Professor of Public Policy at Harvard Kennedy School. She is the Founding Director of the Global Economics Lab. Her research focuses on International Finance and Macroeconomics where she is a leading voice on dollar dominance, exchange rates, trade and investment, international financial crises, digital currencies, monetary policy and debt. Previously, she was the First Deputy Managing Director (FDMD) of the International Monetary Fund (IMF) from January 2022–August 2025 and prior to that she was the Chief Economist of the IMF from January 2019-January 2022.',
        links: [
          { label: 'Personal website', url: 'https://gitagopinath.github.io/index.html' },
          { label: 'Full biography', url: 'https://gitagopinath.github.io/bio.html' },
          { label: 'X', url: 'https://x.com/GitaGopinath' },
          { label: 'LinkedIn', url: 'https://linkedin.com/in/gitagopinath/?skipRedirect=true' }
        ]
      },
      valere: {
        name: 'Valère Piérard',
        role: 'Chief of Staff to the Director',
        photo: 'images/valere-piarard.jpg',
        email: 'valerepierard@hks.harvard.edu',
        bio: 'Valère Piérard is Chief of Staff to the Global Economics Lab’s Director. He supports Professor Gopinath’s work and oversees the Lab’s operations. Prior to joining the Lab, he worked at Lazard, where he advised governments and public entities on debt and financing matters. He holds graduate degrees from Harvard Kennedy School (MPA/ID) and Sciences Po Paris (MSc), and a bachelor’s degree from the Catholic University of Louvain in Belgium.',
        links: [
          { label: 'LinkedIn', url: 'https://www.linkedin.com/in/valerepierard/' }
        ]
      },
      rogoff: {
        name: 'Kenneth Rogoff',
        role: 'Maurits C. Boas Professor of International Economics, Harvard University',
        photo: 'images/kenneth-rogoff.jpg',
        email: 'krogoff@harvard.edu',
        bio: '<p>Kenneth Rogoff is Maurits C. Boas Professor at Harvard University, and former chief economist at the IMF. His influential 2009 book with Carmen Reinhart, This Time Is Different: Eight Centuries of Financial Folly, shows the remarkable quantitative similarities across time and countries in the roots and aftermath of debt and financial crises. Rogoff is also known for his pioneering work on central bank independence, and on exchange rates. He is co-author of the widely-used graduate text, Foundations of International Macroeconomics. His 2016 book The Curse of Cash looks at the past, present and future of currency from standardized coinage to crypto-currencies. His monthly syndicated column on global economic issues is published in over 50 countries. Rogoff’s 2025 book Our Dollar, Your Problem: An Insider’s View of Seven Turbulent Decades of Global Finance and the Road Ahead offers a sweeping view of the post-war rise of the dollar, the challenges the rest of the world has in dealing with it, and how this experience can help inform the contours of the evolving new global financial system.</p><p>Rogoff is an elected member of the National Academy of Sciences and the American Academy of Arts and Sciences. He has long ranked among the top dozen most cited economists, and is an international grandmaster of chess.</p>',
        links: [
          { label: 'Personal website', url: 'https://rogoff.scholars.harvard.edu/' },
          { label: 'X', url: 'https://x.com/krogoff?lang=fr' }
        ]
      },
      itskhoki: {
        name: 'Oleg Itskhoki',
        role: 'Slusky Family Professor of Economics, Harvard University',
        photo: 'https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img,w_480,h_480/https://itskhoki.com/wp-content/uploads/2021/04/profile_pic_large-scaled-e1619752458162.jpg',
        email: 'itskhoki@fas.harvard.edu',
        bio: '<p>Oleg Itskhoki is the Slusky Family Professor of Economics at Harvard University. Previously, he held the Venu and Ana Kotamraju Endowed Chair in Economics at the University of California, Los Angeles, and was a Professor of Economics and International Affairs at Princeton University. He is a Fellow of the Econometric Society, an NBER research associate, and a CEPR research affiliate. His research interests are in macroeconomics and international economics, where he studies globalization and labor markets, and currencies and exchange rates, as well as other topics.</p><p>He holds a BA in economics from Moscow State University, an MA in economics from the New Economic School, and a PhD in economics from Harvard University. He is the 2022 John Bates Clark Medalist, a participant of the Review of Economic Studies Tour, a Sloan Research Fellow, a recipient of the Excellence Award in Global Economic Affairs from the Kiel Institute for the World Economy, and was on the IMF’s list of 25 influential economists under the age of 45.</p>',
        links: [
          { label: 'Personal website', url: 'https://itskhoki.com/' }
        ]
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
        photo: 'images/pol-antras.jpg',
        email: 'pantras@fas.harvard.edu',
        bio: '<p>Pol Antràs is the Robert G. Ory Professor of Economics at Harvard University, where he has taught since 2003. He is also a Research Associate at the National Bureau of Economic Research (NBER), where he served as Director of the International Trade and Organization (ITO) Working Group. He is also a Research Affiliate at the Centre for Economic Policy Research (CEPR) and is a member of CESifo&rsquo;s Research Network.</p><p>He served as Editor of the Quarterly Journal of Economics from 2015 until 2020, having previously been on the editorial board of the American Economic Review, the Review of Economic Studies, the Journal of International Economics, and the Annual Review of Economics, among other journals. He is a member of the Scientific Council of the Barcelona School of Economics. Among other distinctions, he was awarded an Alfred P. Sloan Research Fellowship in 2007 and the Fundación Banco Herrero Prize in 2009, and he was elected Fellow of the Econometric Society in 2015, and Member of the American Academy of Arts and Sciences in 2024.</p><p>Antràs&rsquo; teaching and research fields are international economics and applied theory. His most recent work is focused on global value chains, on the interplay between globalization and interest rates, on globalization and market power, and on international relations.</p><p>A citizen of Spain, Antràs received his BA and MSc in Economics from Universitat Pompeu Fabra in Barcelona, and his PhD in Economics from the Massachusetts Institute of Technology in 2003.</p>',
        links: [
          { label: 'Personal website', url: 'https://antras.scholars.harvard.edu/' }
        ]
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
        bio: 'Andrea F. Presbitero is Deputy Division Chief of the Multilateral Surveillance Division in the Research Department of the International Monetary Fund. He is also a CEPR Research Fellow in the International Macroeconomics and Finance programme, an Associate Fellow at SAIS Europe, and a member of Money &amp; Finance Research (MoFiR). He previously held faculty positions at Università Politecnica delle Marche and at the Johns Hopkins University School of Advanced International Studies. His research on financial intermediation, development finance, and international finance has been published in leading journals including the Review of Financial Studies, the Journal of Financial Economics, and the Review of Economics and Statistics. He serves as associate editor of the IMF Economic Review, Economía (LACEA), and the Journal of Financial Stability.'
      },
      gourinchas: {
        name: 'Pierre-Olivier Gourinchas',
        role: 'S.K. and Angela Chan Professor of Global Management, Department of Economics and Haas School of Business, UC Berkeley',
        photo: 'images/pierre-olivier-gourinchas.jpg',
        email: 'pog@berkeley.edu',
        bio: '<p>Pierre-Olivier Gourinchas is the S.K. and Angela Chan Professor of Global Management, University of California, Berkeley and director of the Clausen Center for International Business and Policy.</p><p>From 2022 to 2026, he was the Economic Counsellor and Director of the Research Department at the International Monetary Fund.</p><p>Pierre-Olivier Gourinchas grew up in Montpellier, France. He attended Ecole Polytechnique and received his PhD in Economics in 1996 from MIT. He taught at Stanford Graduate School of Business and Princeton University before joining UC Berkeley department of economics.</p><p>Professor Gourinchas&rsquo; main research interests are in international macroeconomics and finance. His recent research focuses on geo-economic fragmentation (with Gita Gopinath, Andrea Presbitero and Petia Topalova), the drivers of global inflation (with Mai Dao, Allan Dizioli, Chris Jackson, Daniel Leigh, Prachi Mishra), covered and uncovered parity deviations (with Mai Chi Dao and Oleg Itskhoki), exchange rate and term premia (with Walker Ray and Dimitri Vayanos), the impact of the COVID-19 pandemic on small and medium sized firms (with Şebnem Kalemli-Özcan, Veronika Penciakova and Nick Sander), the scarcity of global safe assets, global imbalances and currency wars (with Ricardo Caballero and Emmanuel Farhi); on the International Monetary System and the role of the U.S. dollar (with H&eacute;l&egrave;ne Rey); on the Dominant Currency Paradigm (with Gita Gopinath); on the determinants of capital flows to and from developing countries (with Olivier Jeanne); on international portfolios (with Nicolas Coeurdacier); and on the global financial crisis (with Maury Obstfeld).</p><p>Professor Gourinchas is the laureate of the 2007 Bern&agrave;cer Prize for best European economist working in macroeconomics and finance under the age of 40, and of the 2008 Prix du Meilleur Jeune Economiste for best French economist under the age of 40. In 2012-2013, Professor Gourinchas was a member of the French Council of Economic Advisors to the Prime Minister. From 2009 to 2016 he was the editor-in-chief of the IMF Economic Review and from 2017 to 2019 the managing editor of the Journal of International Economics. Between 2019 and 2022, he was co-editor of the American Economic Review. From 2017 to 2022 he served as director of the NBER&rsquo;s International Finance and Macroeconomics Program.</p><p>Professor Gourinchas is a Fellow of the Econometric Society and a Distinguished Fellow of the Center for Economic Policy Research.</p>',
        links: [
          { label: 'Personal website', url: 'https://sites.google.com/view/pgourinchas/home' },
          { label: 'X', url: 'https://x.com/pogourinchas' }
        ]
      },
      kalemliozcan: {
        name: 'Şebnem Kalemli-Özcan',
        role: 'William R. Rhodes Professor of International Economics and Schreiber Family Professor of Economics, Brown University<br>Director of <a href="https://www.globallinkages.org/" target="_blank" rel="noopener">Global Linkages Lab</a>',
        photo: 'https://sebnemkalemliozcan.com/assets/img/sebnem_ciragan2.JPG',
        email: '',
        bio: '<p>Şebnem Kalemli-Özcan is the William R. Rhodes &rsquo;57 Professor of International Economics and the Schreiber Family Professor of Economics at Brown University, where she directs the Global Linkages Lab and the William R. Rhodes Center for International Economics and Finance. She is a Research Associate at the National Bureau of Economic Research and a Research Fellow at the Centre for Economic Policy Research.</p><p>She is co-editor of the American Economic Journal: Macroeconomics and managing editor of Economic Policy: Papers on European and Global Issues, and she serves on the economic advisory panels of the Federal Reserve Bank of New York and the Bank for International Settlements.</p><p>She previously held the Duisenberg Fellowship at the European Central Bank and the Houblon-Norman Fellowship at the Bank of England, served as Lead Economist for the Middle East and North Africa at the World Bank, and was Senior Policy Advisor to IMF Chief Economist Gita Gopinath. She is an elected member of the Council on Foreign Relations, where she was also an International Affairs Fellow. In 2008 she became the first Turkish-American social scientist to win the Marie Curie IRG prize, awarded for research that helps reverse the brain drain from the United States, in her case for work on European financial integration.</p><p>Her research examines how global trade and capital flows shape macroeconomic fluctuations and economic growth.</p>',
        links: [
          { label: 'Personal website', url: 'https://sebnemkalemliozcan.com/' },
          { label: 'X', url: 'https://twitter.com/skalemliozcan' }
        ]
      },
      neiman: {
        name: 'Brent Neiman',
        role: 'Edward Eagle Brown Professor of Economics, Chicago Booth',
        photo: 'https://brentneiman.com/wp-content/uploads/2021/02/Brent_Neiman_1-Download-scaled.jpg',
        email: 'brent.neiman@chicagobooth.edu',
        bio: '<p>Brent Neiman is the Edward Eagle Brown Professor of Economics at Chicago Booth. He served from 2022&ndash;2025 at the U.S. Treasury as Counselor to the Secretary and as the Deputy Undersecretary for International Finance, where he worked on a broad set of international economic issues, including the bilateral relationship with China, the response to Russia’s war in Ukraine, emerging market sovereign debt, IMF governance and programs, and global financial regulation.</p><p>Neiman conducts research on international macroeconomics, finance, and trade. He serves as the co-director of the International Economics and Economic Geography Initiative at the Becker Friedman Institute, participates as a panelist at the U.S. Monetary Policy Forum, and is a member of the Council on Foreign Relations. Neiman is a Research Associate in the International Finance and Macroeconomics and the International Trade and Investment groups at the National Bureau of Economic Research and is a Research Fellow at the Center for Economic Policy Research. He co-founded the Global Capital Allocation Project, previously served as an Executive Board member of the Kent A. Clark Center for Global Markets at Chicago Booth, and was an associate editor of The American Economic Review, The Quarterly Journal of Economics, and The Journal of International Economics.</p><p>Earlier in his career, Neiman was the staff economist for international finance on the White House Council of Economic Advisers and worked at the Federal Reserve Bank of Chicago, at McKinsey and Company, and at the McKinsey Global Institute.</p>',
        links: [
          { label: 'Personal website', url: 'https://brentneiman.com/' }
        ]
      },
      korinek: {
        name: 'Anton Korinek',
        role: 'The Anthropic Institute; Professor of Economics, University of Virginia',
        photo: 'images/anton-korinek.jpg',
        email: 'econtai@virginia.edu',
        bio: '<p>Anton Korinek is a member of The Anthropic Institute, where he leads an effort on the Economic Research team studying how transformative AI could reshape the nature of economic activity. He is a Professor at the University of Virginia, Department of Economics and Darden School of Business, where he is also the Faculty Director of the Economics of Transformative AI (EconTAI) Initiative. He was named to the 2025 TIME100 AI list of the most influential people in artificial intelligence. He is a Nonresident Senior Fellow at Brookings and the Peterson Institute, a Research Associate at the NBER, and a Research Fellow at the CEPR. Anton received his PhD from Columbia University in 2007 after several years of work experience in the IT and financial sectors. He has also worked at Johns Hopkins and at the University of Maryland and has been a visiting scholar at Harvard University, the World Bank, the IMF, the BIS and numerous central banks.</p><p>His research analyzes how to prepare for a world of transformative AI systems and has been featured in the New York Times, Washington Post, Wall Street Journal, the Economist, and TIME Magazine. He investigates the implications of advanced AI for economic growth, labor markets, inequality, and the future of our society. In his past research, he investigated the mechanics of financial crises and developed policy measures to prevent future crises, including an influential framework for capital flow regulation in emerging economies.</p>',
        links: [
          { label: 'Personal website', url: 'https://www.korinek.com/' },
          { label: 'X', url: 'https://x.com/akorinek' }
        ]
      },
      ara: {
        name: 'Ara Patvakanian',
        role: 'Predoctoral Fellow',
        photo: 'images/ara-patvakanian.jpg',
        email: 'arapatvakanian@g.harvard.edu',
        bio: 'Ara Patvakanian is a fellow at Harvard University’s Department of Economics working on international macroeconomics and finance. Prior to joining the Global Economics Lab, he was a senior research associate at the Federal Reserve Bank of Boston. Ara holds a B.A. in Mathematical Economics and Political Science from the University of Pennsylvania.',
        links: [
          { label: 'Personal website', url: 'https://arapatvakanian.github.io/' },
          { label: 'LinkedIn', url: 'https://www.linkedin.com/in/arapatvakanian/' }
        ]
      },
      gernow: {
        name: 'Christoffer Gernow',
        role: 'Research Fellow',
        photo: 'images/christoffer-gernow.jpg',
        email: 'christoffergernow@college.harvard.edu',
        bio: ''
      },
      connor: {
        name: 'Connor Leyden',
        role: 'Research Fellow',
        photo: 'images/connor-leyden.jpg',
        email: 'cleyden@college.harvard.edu',
        bio: ''
      },
      margot: {
        name: 'Margot Berman',
        role: 'Research Fellow',
        photo: 'images/margot-berman.jpg',
        email: 'mberman@hks.harvard.edu',
        bio: 'Margot Berman is a second-year Master in Public Administration candidate at Harvard Kennedy School and a Belfer Young Leader Fellow. She spent the summer in the Markets Group at the Federal Reserve Bank of New York and, prior to graduate school, worked at the U.S. Congressional Budget Office. While working at CBO, she earned a master’s degree in applied economics from George Washington University, where she graduated salutatorian. She holds a bachelor’s degree from Williams College.'
      },
      samuel: {
        name: 'Samuel Ross',
        role: 'Research Fellow',
        photo: 'images/samuel-ross.jpg',
        email: 'samuelross@fas.harvard.edu',
        bio: '',
        links: [
          { label: 'Personal website', url: 'https://samueleross.com' }
        ]
      },
      marianne: {
        name: 'Marianne Wang',
        role: 'Research Fellow',
        photo: 'images/marianne-wang.jpg',
        email: 'mariannewang@college.harvard.edu',
        bio: ''
      },
      caroline: {
        name: 'Caroline Eisenberg',
        role: 'Executive Assistant',
        photo: 'https://www.economics.harvard.edu/sites/g/files/omnuum5991/files/styles/hwp_4_5__320x400/public/2025-06/Caroline%20Eisenberg.jpg?h=8aca6229&itok=BcE_Nvog',
        email: 'carolineeisenberg@fas.harvard.edu',
        bio: ''
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
      modalRole.innerHTML = person.role;
      modalBio.innerHTML = person.bio;
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

  // Topic research modal (Our Work page)
  var topicModal = document.getElementById('topic-modal');
  if (topicModal) {
    var topics = {
      'global-finance': {
        name: 'Stablecoins and Dollar Dominance',
        desc: 'The rise of digital currencies and the dollar’s role in the international monetary system.',
        image: 'images/stablecoins-accent.jpg',
        papers: [
          { label: 'Stablecoins After GENIUS: Private Money, Public Debt, and the Global Dollar', sub: 'Liang & Neiman, Aspen Economic Strategy Group, August 18, 2026', url: 'https://www.economicstrategygroup.org/publication/stablecoins-after-genius-private-money-public-debt-and-the-global-dollar/' },
          { label: 'Pricing Risk Globally: Intermediary Constraints, the Dollar, and the Global Financial Cycle', sub: 'Akinci, Kalemli-Özcan & Queralto, NBER Working Paper 30026, July 2026', url: 'https://www.nber.org/papers/w30026' },
          { label: 'Financial Sanctions and the Global Payments Network', sub: 'Matvos & Neiman, June 2026', url: 'https://brentneiman.com/research/MN.pdf' },
          { label: 'Stablecoins and the Dollar: Historical Parallels and Future Risks', sub: 'Harris & Rogoff, AEA Papers and Proceedings, Vol. 116, May 2026, pp. 53-57', url: 'https://rogoff.scholars.harvard.edu/sites/g/files/omnuum5901/files/2026-01/AEA_Stablecoin%20010226.pdf' },
          { label: 'Patterns of Invoicing Currency in Global Trade in a Fragmenting World Economy', sub: 'Boz, Brüggen, Casas, Georgiadis, Gopinath & Mehl, April 2026', url: 'https://gitagopinath.github.io/files/Trade_invoicing_patterns_2_0.pdf' },
          { label: 'Market Power and Redeemable Loyalty Token Design', sub: 'He, Rogoff & You, NBER Working Paper 33201, Nov 2024 (revised Oct 2025)', url: 'https://www.nber.org/papers/w33201' },
          { label: 'Our Dollar, Your Problem', sub: 'Rogoff, Yale University Press, May 2025 (paperback May 2026)', url: 'https://yalebooks.yale.edu/book/9780300275315/our-dollar-your-problem/', linkLabel: 'Find the book' },
          { label: 'Global Spillovers from Fed Hikes and a Strong Dollar: The Risk Channel', sub: 'Cristi, Kalemli-Özcan, Sans & Unsal, American Economic Association Papers and Proceedings, Vol. 114, May 2024, p.157-62', url: 'https://doi.org/10.1257/pandp.20241070' },
          { label: 'Patterns of Invoicing Currency in Global Trade: New Evidence', sub: 'Boz, Casas, Georgiadis, Gopinath, et al., JIE 2022', url: 'https://www.sciencedirect.com/science/article/pii/S0022199622000368' },
          { label: 'Banking, Trade, and the Making of a Dominant Currency', sub: 'Gopinath & Stein, Quarterly Journal of Economics, 2021', url: 'https://scholar.harvard.edu/files/stein/files/gopinath-stein_qje_2021.pdf' },
          { label: 'Dominant Currency Paradigm', sub: 'Gopinath, Boz, Casas, Díez, Gourinchas & Plagborg-Møller, American Economic Review, 2020', url: 'https://gopinath.scholars.harvard.edu/sites/g/files/omnuum5916/files/gopinath/files/paper_121018h.pdf' },
          { label: 'Global Trade and the Dollar', sub: 'Boz, Gopinath & Plagborg-Møller, NBER Working Paper 23988, 2017', url: 'https://gopinath.scholars.harvard.edu/sites/g/files/omnuum5916/files/gopinath/files/global_trade_dollar_20180331.pdf' }
        ],
        speeches: [
          { label: 'Stablecoins and Anonymous Money', sub: 'Gopinath, 2026 Per Jacobsson Lecture, Bank for International Settlements', url: 'https://www.bis.org/events/agm2026/sp260628_lecture.pdf', linkLabel: 'Read the speech' },
          { label: 'Money and Sovereignty', sub: 'Gopinath, Central Bank of Chile Annual Conference, Nov 2025', url: 'https://www.youtube.com/watch?v=482PmrzqHJg&t=28527s', linkLabel: 'Read the speech' },
          { label: 'The U.S. Cross-Border Payments Agenda', sub: 'Neiman, Remarks by Assistant Secretary for International Finance Brent Neiman, U.S. Department of the Treasury, November 19, 2024', url: 'https://home.treasury.gov/news/press-releases/jy2722', linkLabel: 'Read the speech' },
          { label: 'Geopolitics and its Impact on Global Trade and the Dollar', sub: 'Gopinath, IMF, May 2024', url: 'https://www.imf.org/en/News/Articles/2024/05/07/sp-geopolitics-impact-global-trade-and-dollar-gita-gopinath', linkLabel: 'Read the speech' }
        ],
        media: [
          { label: 'Conflicting Policies, Confused Investors, and the Weak Dollar', sub: 'Kalemli-Özcan, Project Syndicate, February 17, 2026', url: 'https://www.project-syndicate.org/commentary/trump-populism-weakening-the-us-dollar-by-sebnem-kalemli-ozcan-2026-02', linkLabel: 'Read the article' },
          { label: 'How Long Can the Dollar Go?', sub: 'Rogoff, Foreign Policy, June 2025', url: 'https://foreignpolicy.com/2025/06/30/dollar-inflation-growth-renminbi-euro-crypto/', linkLabel: 'Read the article' },
          { label: 'This Time Is Really Different for the Dollar', sub: 'Rogoff, The Economist, May 2025', url: 'https://www.economist.com/by-invitation/2025/05/05/this-time-really-is-different-for-the-dollar-writes-kenneth-rogoff', linkLabel: 'Read the article' }
        ],
        data: [
          { label: 'Stablecoins', sub: 'On-chain holdings of major dollar stablecoins, by owner, blockchain, and jurisdiction', url: 'resources-data.html?tool=stablecoins' }
        ]
      },
      fragmentation: {
        name: 'Trade and Finance',
        desc: 'Global trade and capital flows in an era of geoeconomic fragmentation.',
        image: 'images/topics/trade-finance.webp',
        papers: [
          { label: 'Sanctions and the Exchange Rate', sub: 'Itskhoki & Mukhin, Review of Economic Studies, July 2026, 93(4): 2680–2714', url: 'https://itskhoki.com/papers/sanctionsER.pdf' },
          { label: 'Optimal Exchange Rate Policy', sub: 'Itskhoki & Mukhin, July 2026; also NBER Working Paper No. 31933, Dec 2023', url: 'https://itskhoki.com/papers/ERpolicy.pdf' },
          { label: 'Global Imbalances, Industrial Policy and Tariffs', sub: 'Gourinchas, Kindberg-Hanlon, Patnam, Rotunno & Rutta, Journal of Economic Perspectives, Summer 2026', url: 'https://berkeley.box.com/s/x8hl43abhwlojvrgelf2xmtp1qu1td2m' },
          { label: 'Global Networks, Monetary Policy and Trade', sub: 'Kalemli-Özcan, Soylu & Yıldırım, May 2026', url: 'https://sebnemkalemliozcan.com/assets/workingpapers/GlobalNetwork_Monetary_Policy_and_Trade_latest.pdf' },
          { label: 'The Incidence of Tariffs: Rates and Reality', sub: 'Gopinath & Neiman, Journal of Economic Perspectives, May 2026, Vol. 40, No. 3, pp. 123-144', url: 'https://brentneiman.com/research/GN2.pdf' },
          { label: 'Global Imbalances: A Progress Report', sub: 'Itskhoki & Mukhin, in Paris Report 4: The New Global Imbalances, CEPR Press, Ch. 6, April 2026', url: 'https://cepr.org/chapters/global-imbalances-progress-report' },
          { label: 'Covered Interest Parity in Emerging Markets: Measurement and Drivers', sub: 'Dao & Gourinchas, Journal of International Economics, February 2026 (online)', url: 'https://berkeley.box.com/s/4b4qf5hnr625h8mix8z343iw2v11fybw' },
          { label: 'The Remains of the Trade: The U.S.–China Trade War and Its Aftermath', sub: 'Antràs & Presbitero, February 2026', url: 'https://antras.scholars.harvard.edu/sites/g/files/omnuum5876/files/2026-03/PAAPAlUla_1.pdf', dataUrl: 'https://pantras-hash.github.io/remains_of_the_trade/#rankings' },
          { label: 'The Optimal Macro Tariff', sub: 'Itskhoki & Mukhin, 2026; also NBER Working Paper No. 33839, May 2025', url: 'https://itskhoki.com/papers/OptimalMacroTariff.pdf' },
          { label: 'Financial Repression and the Currency Market Under Sanctions', sub: 'Itskhoki & Mukhin, Economic Policy, 2026, PEGI Conference Paper', url: 'https://itskhoki.com/papers/FinancialRepression.pdf' },
          { label: 'Russian Oil Exports Under International Sanctions', sub: 'Babina, Hilgenstock, Itskhoki, Mironov, Ribakova & Shapoval, Energy Economics, 2026, 153: 109006', url: 'https://www.sciencedirect.com/science/article/abs/pii/S0140988325008369' },
          { label: 'Global Trade, Tariff Uncertainty and the U.S. Dollar', sub: 'Kalemli-Özcan, Soylu & Yıldırım, AEA Papers and Proceedings, 2026, 116: 47–52', url: 'https://sebnemkalemliozcan.com/assets/publications/GtUT_USDOLLARS.pdf' },
          { label: 'Upgrading the Global Financial Safety Net: Implications of a Synthetic Reserve Deposit', sub: "Dell'Ariccia, Farahmand, Gourinchas, Mak, Peralta-Alva & Roldán, IMF Working Paper 135, 2026", url: 'https://doi.org/10.5089/9798229051378.001' },
          { label: 'The Global (Mis)Allocation of Capital', sub: 'Bertaut, Curcuru, Faia & Gourinchas, December 2025', url: 'https://berkeley.box.com/s/dlz175qp96q70eooyeyaoxi5lvqvw75l' },
          { label: 'The Economics of Sovereign Debt, Bailouts and the Eurozone Crisis', sub: 'Gourinchas, Martin & Messer, Journal of the European Economic Association, 23(6), December 2025', url: 'https://berkeley.box.com/s/14ja7sio00nr9vcekn0cb34nbtj1f49u' },
          { label: 'A Preferred-Habitat Model of Term Premia, Exchange Rates and Monetary Spillovers', sub: 'Gourinchas, Ray & Vayanos, American Economic Review, November 2025', url: 'https://berkeley.box.com/s/cqt8pk6vxhpon78i8zlpx8zk57cfw45i' },
          { label: 'Asset Elasticities and Currency Risk Transfer', sub: 'Bertaut, Faia, Kalemli-Özcan, Marchesini, Paetzold & Schmitz, NBER Working Paper 34275, September 2025', url: 'https://sebnemkalemliozcan.com/assets/workingpapers/w34275.pdf' },
          { label: 'Mussa Puzzle Redux', sub: 'Itskhoki & Mukhin, Econometrica, January 2025, 93(1): 1–39', url: 'https://itskhoki.com/papers/Mussa.pdf' },
          { label: 'Changing Global Linkages: A New Cold War?', sub: 'Gopinath, Gourinchas, Presbitero & Topalova, JIE 2025', url: 'https://www.sciencedirect.com/science/article/abs/pii/S0022199624001697' },
          { label: 'The Uncharted Waters of International Trade', sub: 'Antràs, Journal of the European Economic Association, 2025', url: 'https://antras.scholars.harvard.edu/sites/g/files/omnuum5876/files/2025-02/Uncharted_JEEA.pdf' },
          { label: 'Sovereign Vs. Corporate Debt and Default: More Similar Than You Think', sub: 'Gopinath, Meyer, Trebesch & Reinhart, JIE 2025', url: 'https://www.hks.harvard.edu/centers/mrcbg/programs/growthpolicy/sovereign-vs-corporate-debt-and-default-more-similar-you-think' },
          { label: 'The Economics of Sanctions: From Theory into Practice', sub: 'Itskhoki & Ribakova, Brookings Papers on Economic Activity, Fall 2024: 425–470', url: 'https://www.brookings.edu/wp-content/uploads/2024/09/17160-BPEA-BPEA-FA24_WEB_Istkhoki-Ribakova.pdf' },
          { label: 'Long-Run Trends in Long-Maturity Real Rates 1311-2022', sub: 'Rogoff, Rossi & Schmelzing, American Economic Review, 114(8), August 2024, pp. 2271-2307', url: 'https://www.aeaweb.org/articles?id=10.1257/aer.20221352&from=f' },
          { label: 'Changing Central Bank Pressures and Inflation', sub: 'Afrouzi, Halac, Rogoff & Yared, Brookings Papers on Economic Activity, Spring 2024, pp. 205-241', url: 'https://www.brookings.edu/wp-content/uploads/2024/11/16937-BPEA-BPEA-SP24_WEB-Afrouzi-et-al.pdf' },
          { label: 'Corporate Debt Structure with Home and International Currency Bias', sub: 'Maggiori, Neiman & Schreger, IMF Economic Review, 2024, p.1-24', url: 'https://brentneiman.com/research/MNS_IMFER.pdf' },
          { label: "Interest Rates and World Trade: An 'Austrian' Perspective", sub: 'Antràs, AEA Papers and Proceedings, May 2023', url: 'https://antras.scholars.harvard.edu/sites/g/files/omnuum5876/files/antras/files/antras-2023-interest-rates-and-world-trade-an-austrian-perspective.pdf' },
          { label: 'Globalization and Pandemics', sub: 'Antràs, Redding & Rossi-Hansberg, American Economic Review, 2023', url: 'https://antras.scholars.harvard.edu/sites/g/files/omnuum5876/files/antras/files/antras-et-al-2023-globalization-and-pandemics.pdf' },
          { label: 'Global Value Chains', sub: 'Antràs & Chor, Handbook of International Economics, Vol. 5, 2022', url: 'https://antras.scholars.harvard.edu/sites/g/files/omnuum5876/files/antras/files/handbookgvcs.pdf' },
          { label: 'Exchange Rate Reconnect', sub: 'Lilley, Maggiori, Neiman & Schreger, Review of Economics and Statistics, 2022, 104(4), p.845-855', url: 'https://globalcapitalallocation.s3.us-east-2.amazonaws.com/LMNS_Paper.pdf' },
          { label: 'Tariff Passthrough at the Border and at the Store: Evidence from US Trade Policy', sub: 'Cavallo, Gopinath, Neiman & Tang, AEA: Insights, 2021', url: 'https://www.bostonfed.org/-/media/Documents/Workingpapers/PDF/2019/wp1912.pdf' },
          { label: 'De-Globalisation? Global Value Chains in the Post-COVID-19 Age', sub: 'Antràs, 2021 ECB Forum: "Central Banks in a Shifting World" Conference Proceedings', url: 'https://antras.scholars.harvard.edu/sites/g/files/omnuum5876/files/antras/files/ecbsintra.pdf' },
          { label: 'Redrawing the Map of Global Capital Flows: The Role of Cross-Border Financing and Tax Havens', sub: 'Coppola, Maggiori, Neiman & Schreger, Quarterly Journal of Economics, 2021, 136(3), p.1499-1556', url: 'https://globalcapitalallocation.s3.us-east-2.amazonaws.com/CMNS-Paper.pdf' },
          { label: 'Conceptual Aspects of Global Value Chains', sub: 'Antràs, World Bank Economic Review, 2020', url: 'https://antras.scholars.harvard.edu/sites/g/files/omnuum5876/files/antras/files/conceptualaspectsgvcsfinal.pdf' }
        ],
        speeches: [
          { label: 'Cold War II? Preserving Economic Cooperation Amid Geoeconomic Fragmentation', sub: 'Gopinath, 20th World Congress of the IEA, Dec 2023', url: 'https://www.imf.org/en/News/Articles/2023/12/11/sp121123-cold-war-ii-preserving-economic-cooperation-amid-geoeconomic-fragmentation', linkLabel: 'Read the speech' },
          { label: 'Europe in a Fragmented World', sub: 'Gopinath, 2023 Bernhard Harms Prize Acceptance Speech, Nov 2023', url: 'https://www.imf.org/en/News/Articles/2023/11/30/sp-fdmd-remarks-bernhard-harms-prize', linkLabel: 'Read the speech' },
          { label: 'The International Debt Landscape', sub: 'Neiman, speech at the Johns Hopkins School of Advanced International Studies, October 23, 2023', url: 'https://home.treasury.gov/news/press-releases/jy1833', linkLabel: 'Read the speech' },
          { label: 'The U.S.-China Bilateral Financial Relationship', sub: 'Neiman, speech at the Program on International Financial Systems’ U.S.-China Symposium, September 15, 2023', url: 'https://home.treasury.gov/news/press-releases/jy1735', linkLabel: 'Read the speech' },
          { label: 'Policy Challenges for the Financial Sector', sub: 'Neiman, speech at Federal Reserve, IMF, and World Bank Conference, May 31, 2023', url: 'https://home.treasury.gov/news/press-releases/jy1520', linkLabel: 'Read the speech' },
          { label: 'Opening Remarks at the IMF Conference on Geoeconomic Fragmentation', sub: 'Gopinath, IMF, May 2023', url: 'https://www.imf.org/en/News/Articles/2023/05/25/sp052523-FDMD-GGopinath-Geoeconomic-Fragmentation', linkLabel: 'Read the speech' }
        ],
        media: [
          { label: 'The Yuan Is More Than a Symptom of Global Imbalances', sub: 'Gopinath, Gourinchas & Rey, The Economist, August 2026', url: 'https://www.economist.com/by-invitation/2026/08/10/the-yuan-is-more-than-a-symptom-of-global-imbalances', linkLabel: 'Read the article' },
          { label: 'The World’s Superpowers Are Scrambling for an Edge. It Makes All of Us Less Safe', sub: 'Gourinchas, NY Times, July 2026', url: 'https://www.nytimes.com/2026/07/10/opinion/trade-war-economy-globalization.html', linkLabel: 'Read the article' },
          { label: 'Global Imbalances: Old Questions, New Answers?', sub: 'Gourinchas, IMF Blog, April 2026', url: 'https://www.imf.org/en/blogs/articles/2026/04/06/global-imbalances-old-questions-new-answers', linkLabel: 'Read the article' },
          { label: 'Interdependence Bites Back', sub: 'Kalemli-Özcan, Project Syndicate, March 27, 2026', url: 'https://www.project-syndicate.org/onpoint/iran-war-tariffs-risk-turning-economic-interdependence-into-a-liability-by-sebnem-kalemli-ozcan-2026-03', linkLabel: 'Read the article' },
          { label: 'Tariff Wars! What are the Rates? Who Pays? What’s Next?', sub: 'Neiman, February 2026', url: 'https://www.youtube.com/watch?v=QhIwwhKaIys', linkLabel: 'Watch the lecture' },
          { label: 'Trade and Financial Policy for National Security and Supply Chain Resiliency', sub: 'Neiman, Hoover Institution panel with H.R. McMaster and Condoleezza Rice, February 20, 2026', url: 'https://www.youtube.com/watch?v=EctVr5rCJ_w', linkLabel: 'Watch the video' },
          { label: 'Tariffs are Worse Than You Think', sub: 'Kalemli-Özcan, Project Syndicate, January 26, 2026', url: 'https://www.project-syndicate.org/commentary/tariffs-costs-and-damage-to-economy-greater-than-many-understand-by-sebnem-kalemli-ozcan-2026-01', linkLabel: 'Read the article' },
          { label: 'Tariffs, Global Imbalances, and the Dollar', sub: 'Itskhoki & Mukhin, VoxEU (CEPR), Nov 2025', url: 'https://cepr.org/voxeu/columns/tariffs-global-imbalances-and-dollar', linkLabel: 'Read the article' },
          { label: 'The Trump White House Cited My Research To Justify Tariffs. It Got It All Wrong', sub: 'Neiman, NY Times, April 2025', url: 'https://www.nytimes.com/2025/04/07/opinion/trump-tariff-math-formula.html', linkLabel: 'Read the article' },
          { label: 'Sanctions and the Exchange Rate', sub: 'Mukhin & Itskhoki, VoxEU (CEPR), May 2022', url: 'https://cepr.org/voxeu/columns/sanctions-and-exchange-rate', linkLabel: 'Read the article' },
          { label: 'The Mussa Puzzle and the Optimal Exchange Rate Policy', sub: 'Itskhoki & Mukhin, VoxEU (CEPR), Jan 2022', url: 'https://cepr.org/voxeu/columns/mussa-puzzle-and-optimal-exchange-rate-policy', linkLabel: 'Read the article' }
        ],
        data: [
          { label: 'Coming soon', sub: 'Data to be added.' }
        ]
      },
      'emerging-tech': {
        name: 'Artificial Intelligence',
        desc: 'The macroeconomic effects of AI on the global economy.',
        image: 'images/topics/ai3.jpg',
        papers: [
          { label: 'When Does Automating AI Research Produce Explosive Growth? Feedback Loops in Innovation Networks', sub: 'Davidson, Halperin, Houlden & Korinek, Jan. 2026', links: [ { label: 'Read the paper', url: 'https://basilhalperin.com/papers/singularities.pdf' } ] },
          { label: 'Public Finance in the Age of AI: A Primer', sub: 'Korinek & Lockwood, in NBER Volume on the Economics of Transformative AI, Jan. 2026', links: [ { label: 'Find the book', url: 'https://press.uchicago.edu/ucp/books/book/chicago/E/bo280995206.html' }, { label: 'Read the paper', url: 'https://www.brookings.edu/articles/public-finance-age-ai-primer/' }, { label: 'Blog', url: 'https://www.brookings.edu/articles/future-tax-policy-a-public-finance-framework-for-the-age-of-ai/' } ] },
          { label: 'AI Agents for Economic Research', sub: "Korinek, update of \"Generative AI for Economic Research,\" Journal of Economic Literature, Aug. 2025", links: [ { label: 'Read the paper', url: 'https://www.genaiforecon.org/JEL-2025-Aug-AIAgents.pdf' } ] },
          { label: 'Steering Technological Progress', sub: 'Korinek & Stiglitz, updated April 2025', links: [ { label: 'Read the paper', url: 'https://www.nber.org/papers/w34994' }, { label: 'Slides', url: 'https://drive.google.com/file/d/1IvFsfem7KZnqPxn9mTCKH-rDaJyTrldF/view?usp=sharing' } ] },
          { label: 'Concentrating Intelligence: Scaling and Market Structure in Artificial Intelligence', sub: 'Korinek & Vipra, Economic Policy 40(121), pp. 225-256, Jan. 2025', links: [ { label: 'Read the paper', url: 'https://doi.org/10.1093/epolic/eiae057' }, { label: 'Blog', url: 'https://www.ineteconomics.org/perspectives/blog/neural-network-effects-scaling-and-market-structure-in-artificial-intelligence' } ] },
          { label: 'Economic Policy Challenges for the Age of AI', sub: 'Korinek, in Rethinking Economic Policy: Steering Structural Change, MIT Press, 2025', links: [ { label: 'Find the book', url: 'https://mitpress.mit.edu/9780262051910/steering-structural-change/' }, { label: 'Read the paper', url: 'https://www.dropbox.com/scl/fi/ubxmal9cw4xplul8oscto/Economic_Policy_Challenges_Age_of_AI.pdf?rlkey=oiabxrg2wixp4414vv9n1azjh&dl=0' }, { label: 'Podcast', url: 'https://www.dropbox.com/scl/fi/rc2eodbpggwf0a1zscssh/Economic-Policy-Challenges-in-the-Age-of-AI.wav?rlkey=2p11fy6g379k7m3wtuo8vkllb&dl=0' } ] },
          { label: 'Intelligent Financial System: How AI Is Transforming Finance', sub: 'Aldasoro, Korinek et al., BIS Working Paper, Jun. 2024', links: [ { label: 'Read the paper', url: 'https://www.sciencedirect.com/science/article/abs/pii/S1572308925001019' }, { label: 'Podcast', url: 'https://www.dropbox.com/scl/fi/7zfsqzt4at7miqqwnyekd/Intelligent-Financial-System.wav?rlkey=vwga6f3sa25h2xzqj21r0so10&dl=0' } ] },
          { label: 'Preparing for the (Non-Existent?) Future of Work', sub: 'Juelfs & Korinek, Oxford Handbook of AI Governance, pp. 746-776, Apr. 2024', links: [ { label: 'Read the chapter', url: 'https://academic.oup.com/edited-volume/41989/chapter-abstract/403300289' } ] },
          { label: 'Scenarios for the Transition to AGI', sub: 'Korinek & Suh, Mar. 2024', links: [ { label: 'Read the paper', url: 'https://www.dropbox.com/scl/fi/viob7f5yv13zy0ziezlcg/AGI_Scenarios.pdf?rlkey=8hxq9rm82kksocw1zjilcxf8v&dl=0' }, { label: 'Slides', url: 'https://www.dropbox.com/scl/fi/sowhfb1g5fyucplf94r4o/AGI_Scenarios_Slides.pdf?rlkey=zmp07tisbnwd7af26fullvduq&dl=0' } ] },
          { label: 'Scenario Planning for an A(G)I Future', sub: 'Korinek, IMF Finance & Development Magazine 60(4), pp. 30-33, Dec. 2023', links: [ { label: 'Read the piece', url: 'https://www.imf.org/en/Publications/fandd/issues/2023/12/Scenario-Planning-for-an-AGI-future-Anton-korinek' }, { label: 'The piece in PDF', url: 'https://www.imf.org/-/media/Files/Publications/Fandd/Article/2023/December/30-33-korinek-final.ashx' } ] },
          { label: "AI's Economic Peril to Democracy", sub: 'Bell & Korinek, Journal of Democracy, Oct. 2023', links: [ { label: 'Publication', url: 'https://www.journalofdemocracy.org/articles/ais-economic-peril/' } ] },
          { label: 'Artificial Intelligence, Globalization, and Strategies for Economic Development', sub: 'Korinek & Stiglitz, Jan. 2021', links: [ { label: 'Read the paper', url: 'https://drive.google.com/open?id=1FSpOhTkIoNXaFpctkHdWNAPtiZUgP56w' } ] },
          { label: 'Integrating Ethical Values and Economic Value to Steer Progress in Artificial Intelligence', sub: 'Korinek, in Markus Dubber et al. (eds.), Oxford Handbook of Ethics of Artificial Intelligence, Oxford University Press, July 2020', links: [ { label: 'Read the chapter', url: 'https://www.oxfordhandbooks.com/view/10.1093/oxfordhb/9780190067397.001.0001/oxfordhb-9780190067397-e-30' } ] },
          { label: 'Artificial Intelligence and Its Implications for Income Distribution and Unemployment', sub: 'Korinek & Stiglitz, in Ajay Agrawal, Joshua Gans & Avi Goldfarb (eds.), The Economics of Artificial Intelligence, pp. 349-390, NBER and University of Chicago Press, May 2019', links: [ { label: 'Read the chapter', url: 'https://drive.google.com/file/d/1HneWSeHoiPVYAZ7846T5uSlfHf4_EAdk/view?usp=sharing' }, { label: 'Presentation', url: 'https://www.youtube.com/watch?v=1tGHMhyte94&list=PLuCLRVi6Lc6cCzu7nwxUqKwJMykfFklZ3&index=17' } ] }
        ],
        speeches: [
          { label: 'Crisis Amplifier? How to Prevent AI from Worsening the Next Economic Downturn', sub: 'Gopinath, IMF, May 2024', url: 'https://www.imf.org/en/News/Articles/2024/05/30/sp053024-crisis-amplifier-how-to-prevent-ai-from-worsening-the-next-economic-downturn', linkLabel: 'Read the speech' },
          { label: 'The Power and Perils of the "Artificial Hand": Considering AI Through the Ideas of Adam Smith', sub: 'Gopinath, IMF, June 2023', url: 'https://www.imf.org/en/News/Articles/2023/06/05/sp060523-fdmd-ai-adamsmith', linkLabel: 'Read the speech' }
        ],
        media: [
          { label: 'The AI Growth Paradox', sub: 'Rogoff, Foreign Affairs, August 2026', url: 'https://www.foreignaffairs.com/united-states/ai-growth-paradox', linkLabel: 'Read the article' },
          { label: 'The Canary in the AI Coal Mine', sub: 'Rogoff, Project Syndicate, August 2026', url: 'https://www.project-syndicate.org/commentary/openai-hugging-face-breach-should-set-off-alarm-bells-by-kenneth-rogoff-2026-08', linkLabel: 'Read the article' },
          { label: 'AI Could Drive Interest Rates Higher', sub: 'Rogoff, Charlie Rose Global Conversations, April 2026', url: 'https://www.youtube.com/shorts/c2bzI8dSMSk', linkLabel: 'Watch an extract' },
          { label: 'Grandmasters and Growth', sub: 'Rogoff, Project Syndicate, January 2010', url: 'https://www.project-syndicate.org/commentary/grandmasters-and-global-growth', linkLabel: 'Read the article' }
        ],
        data: [
          { label: 'Coming soon', sub: 'Data to be added.' }
        ]
      },
      'econ-policy-governance': {
        name: 'Integrated Economic and Financial Policies',
        desc: 'Economic and Financial Policies to navigate the current international economic order.',
        image: 'images/topics/global-governance.jpg',
        papers: [
          { label: 'The Economic Case for Global Vaccinations: An Epidemiological Model with International Production Networks', sub: 'Cakmakli, Demiralp, Kalemli-Özcan, Yeşiltaş & Yıldırım, Review of Economic Studies, forthcoming', url: 'https://sebnemkalemliozcan.com/assets/workingpapers/COVID_Vaccine_2025.pdf' },
          { label: 'Monetary Policy Without Commitment', sub: 'Afrouzi, Halac, Rogoff & Yared, American Economic Review, 116(7), July 2026, pp. 2422-2425', url: 'https://www.aeaweb.org/articles?id=10.1257/aer.20241925' },
          { label: 'Steering Structural Change: Rethinking Government Policy to Support Fundamental Economic Transformations', sub: 'Gourinchas, Obstfeld & Topalova (eds.), MIT Press, May 2026', url: 'https://mitpress.mit.edu/9780262051910/steering-structural-change/', linkLabel: 'Find the book' },
          { label: 'Integrated Monetary and Financial Policies for Small Open Economies', sub: 'Basu, Boz, Gopinath, Roch & Unsal, Econometrica 2025', url: 'https://www.econometricsociety.org/publications/econometrica/2025/11/01/Integrated-Monetary-and-Financial-Policies-for-Small-Open-Economies' },
          { label: 'Monetary Policy and the Short-Rate Disconnect in Emerging Economies', sub: 'De Leo, Gopinath & Kalemli-Özcan, August 2025', url: 'https://sebnemkalemliozcan.com/assets/workingpapers/DGK_2025-08-20.pdf' },
          { label: 'An Integrated Policy Framework (IPF) Diagram for International Economics', sub: 'Basu & Gopinath, IMF WP 2024', url: 'https://www.imf.org/en/Publications/WP/Issues/2024/02/23/An-Integrated-Policy-Framework-IPF-Diagram-for-International-Economics-545125' },
          { label: 'Preemptive Policies and Risk-Off Shocks in Emerging Markets', sub: 'Das, Gopinath & Kalemli-Özcan, 2022', url: 'https://sebnemkalemliozcan.com/assets/workingpapers/UIPpaper_sep7_GG.pdf' }
        ],
        speeches: [
          { label: 'Steering through the Fog: The Art and Science of Monetary Policy in Emerging Markets', sub: 'Gopinath, IMF, May 2025', url: 'https://www.imf.org/en/News/Articles/2025/05/07/sp050725-science-of-monetary-policy-in-emerging-markets-gita-gopinath', linkLabel: 'Read the speech' },
          { label: 'Five Facts on IMF Governance', sub: 'Neiman, live broadcast by Official Monetary and Financial Institutions Forum (OMFIF), October 1, 2024', url: 'https://home.treasury.gov/news/press-releases/jy2624', linkLabel: 'Read the speech' },
          { label: 'A Strategic Pivot in Global Fiscal Policy', sub: 'Gopinath, Whitaker Lecture, Central Bank of Ireland, Sept 2024', url: 'https://www.imf.org/en/News/Articles/2024/09/17/sp091824-a-strategic-pivot-in-global-fiscal-policy', linkLabel: 'Read the speech' },
          { label: 'Introductory Remarks for the Conference "Fiscal Policy in an Era of High Debt"', sub: 'Gopinath, IMF, Nov 2023', url: 'https://www.imf.org/en/News/Articles/2023/11/17/sp-fdmd-gopinath-remarks-at-fiscal-forum-era-of-high-debt', linkLabel: 'Read the speech' },
          { label: 'Charting a Course Through Rough Seas: How Emerging Markets Can Navigate Tougher External Conditions', sub: 'Gopinath, SARB Biennial Conference, Sept 2023', url: 'https://www.imf.org/en/News/Articles/2023/09/01/sp090123-gita-gopinath-keynote-address-at-the-sarb-biennial-conference', linkLabel: 'Read the speech' }
        ],
        media: [
          { label: 'Responding to the Energy and Food Price Shock: Getting the Policy Details Right', sub: 'Gourinchas, IMF Blog, May 2026', url: 'https://www.imf.org/en/blogs/articles/2026/05/20/responding-to-the-energy-and-food-price-shock-getting-the-policy-details-right', linkLabel: 'Read the article' },
          { label: 'Central Banking in an Age of Global Supply Shocks', sub: 'Kalemli-Özcan, Project Syndicate, May 29, 2026', url: 'https://www.project-syndicate.org/commentary/central-banks-job-much-harder-in-face-of-supply-shocks-by-sebnem-kalemli-ozcan-2026-05', linkLabel: 'Read the article' },
          { label: 'The Age of Stagflation?', sub: 'Kalemli-Özcan, Project Syndicate Quarterly, December 15, 2025', url: 'https://www.project-syndicate.org/magazine/us-tariffs-and-monetary-policy-may-lead-to-stagflation-and-financial-instability-by-sebnem-kalemli-ozcan-2025-12', linkLabel: 'Read the article' },
          { label: 'Why Do Populist Strongmen Love Low Interest Rates?', sub: 'Kalemli-Özcan, Project Syndicate, September 2025', url: 'https://www.project-syndicate.org/commentary/trump-erdogan-strongmen-want-low-interest-rates-for-electoral-purposes-by-sebnem-kalemli-ozcan-2025-09', linkLabel: 'Read the article' }
        ],
        data: [
          { label: 'Coming soon', sub: 'Data to be added.' }
        ]
      }
    };

    var topicName = document.getElementById('topic-modal-name');
    var topicDesc = document.getElementById('topic-modal-desc');
    var topicPapers = document.getElementById('topic-modal-papers');
    var topicResources = document.getElementById('topic-modal-resources');
    var topicMedia = document.getElementById('topic-modal-media');
    var topicModalPanel = topicModal.querySelector('.topic-modal-panel');
    var topicLastFocused = null;

    // Bold mentions of Gita Gopinath, Oleg Itskhoki, and Kenneth Rogoff
    // wherever they appear in citation lines (full name takes priority over
    // surname alone, so "Kenneth Rogoff" doesn't get double-wrapped).
    function boldNames(text) {
      if (!text) return text;
      return text.replace(/Gita Gopinath|Oleg Itskhoki|Kenneth Rogoff|Pol Antràs|Pierre-Olivier Gourinchas|Şebnem Kalemli-Özcan|Brent Neiman|Anton Korinek|Gopinath|Itskhoki|Rogoff|Antràs|Gourinchas|Kalemli-Özcan|Kalemli-Ozcan|Neiman|Korinek/g, function (m) {
        return '<strong>' + m + '</strong>';
      });
    }

    // Renders each item as an accordion row: a compact toggle (label + venue)
    // that expands on click to reveal a "Read the paper" link, growing in
    // place while any previously-expanded row in the same list settles back.
    // Items without a url (placeholders awaiting content) still expand for
    // emphasis but reveal no link.
    function renderTopicList(container, heading, items) {
      if (!container) return;
      if (!items || !items.length) {
        container.innerHTML = '';
        return;
      }
      var html = '<h4>' + heading + '</h4>';
      items.forEach(function (item) {
        html += '<div class="topic-list-item">';
        html += '<button class="topic-list-item-toggle" type="button" aria-expanded="false">';
        html += '<span class="topic-list-item-text"><span class="topic-list-item-label">' + item.label + '</span><span class="topic-list-item-sub">' + boldNames(item.sub || '') + '</span></span>';
        html += '<span class="topic-list-item-chevron" aria-hidden="true"></span>';
        html += '</button>';
        if ((item.links && item.links.length) || item.url) {
          html += '<div class="topic-list-item-expand">';
          if (item.links && item.links.length) {
            // Multi-link items (e.g. PDF + Slides + Blog) render one link per entry.
            item.links.forEach(function (l) {
              html += '<a class="topic-list-item-link" href="' + l.url + '" target="_blank" rel="noopener">' + l.label + ' &rarr;</a>';
            });
          } else {
            html += '<a class="topic-list-item-link" href="' + item.url + '" target="_blank" rel="noopener">' + (item.linkLabel || 'Read the paper') + ' &rarr;</a>';
            if (item.dataUrl) {
              html += '<a class="topic-list-item-link" href="' + item.dataUrl + '" target="_blank" rel="noopener">Data &rarr;</a>';
            }
          }
          html += '</div>';
        }
        html += '</div>';
      });
      container.innerHTML = html;
    }

    // mode: 'papers' shows only the Explore the research (Publications) list;
    // 'resources' shows only the Additional resources (speeches/articles) list.
    function openTopic(id, mode) {
      var topic = topics[id];
      if (!topic) return;
      topicName.textContent = topic.name;
      topicDesc.textContent = topic.desc;
      if (topicModalPanel) {
        topicModalPanel.style.backgroundImage = topic.image
          ? 'linear-gradient(rgba(255,255,255,0.93), rgba(255,255,255,0.97)), url(' + topic.image + ')'
          : '';
      }
      if (mode === 'all') {
        renderTopicList(topicPapers, 'Publications', topic.papers);
        renderTopicList(topicResources, 'Speeches', topic.speeches);
        renderTopicList(topicMedia, 'Media', topic.media);
      } else if (mode === 'resources') {
        renderTopicList(topicPapers, 'Publications', null);
        renderTopicList(topicResources, 'Speeches', topic.speeches);
        renderTopicList(topicMedia, 'Media', topic.media);
      } else {
        renderTopicList(topicPapers, 'Publications', topic.papers);
        renderTopicList(topicResources, 'Speeches', null);
        renderTopicList(topicMedia, 'Media', null);
      }
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
        openTopic(el.getAttribute('data-topic'), 'papers');
      });
    });

    document.querySelectorAll('[data-topic-resources]').forEach(function (el) {
      el.addEventListener('click', function () {
        openTopic(el.getAttribute('data-topic-resources'), 'resources');
      });
    });

    document.querySelectorAll('[data-topic-all]').forEach(function (el) {
      el.addEventListener('click', function () {
        openTopic(el.getAttribute('data-topic-all'), 'all');
      });
    });

    topicModal.querySelectorAll('[data-modal-close]').forEach(function (el) {
      el.addEventListener('click', closeTopic);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !topicModal.hidden) closeTopic();
    });

    // Accordion behavior: clicking a row's toggle expands it (growing the
    // label and revealing its link) and collapses any other expanded row
    // within that same list.
    topicModal.addEventListener('click', function (e) {
      var toggle = e.target.closest('.topic-list-item-toggle');
      if (!toggle) return;
      var item = toggle.closest('.topic-list-item');
      var list = toggle.closest('.topic-modal-list');
      var wasExpanded = item.classList.contains('expanded');
      list.querySelectorAll('.topic-list-item.expanded').forEach(function (el) {
        el.classList.remove('expanded');
        el.querySelector('.topic-list-item-toggle').setAttribute('aria-expanded', 'false');
      });
      if (!wasExpanded) {
        item.classList.add('expanded');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });
  }

  // "Find the research you're looking for" search bar (Resources & Data
  // page): a lightweight client-side search across every paper, speech,
  // and media item in the four topics above, letting visitors jump
  // straight to a specific item without hunting through tabs.
  var researchSearchInput = document.getElementById('research-search-input');
  if (researchSearchInput && typeof topics === 'object' && topics) {
    var researchSearchResults = document.getElementById('research-search-results');
    var researchSearchForm = document.getElementById('research-search-form');
    var searchIndex = [];
    Object.keys(topics).forEach(function (topicId) {
      var topic = topics[topicId];
      ['papers', 'speeches', 'media'].forEach(function (type) {
        (topic[type] || []).forEach(function (item) {
          if (!item.label) return;
          searchIndex.push({
            topicId: topicId,
            topicName: topic.name,
            type: type,
            label: item.label,
            sub: item.sub || ''
          });
        });
      });
    });

    function openSearchResult(match) {
      var selector = match.type === 'papers'
        ? '[data-topic="' + match.topicId + '"]'
        : '[data-topic-resources="' + match.topicId + '"]';
      var trigger = document.querySelector(selector);
      if (trigger) trigger.click();

      researchSearchResults.hidden = true;
      researchSearchInput.value = '';

      // The modal's list items render synchronously inside the click
      // handler above, so by now they're already in the DOM — find the
      // matching row and expand it for the visitor.
      setTimeout(function () {
        var labels = document.querySelectorAll('#topic-modal .topic-list-item-label');
        var target = Array.prototype.filter.call(labels, function (el) {
          return el.textContent === match.label;
        })[0];
        if (target) {
          var toggle = target.closest('.topic-list-item-toggle');
          if (toggle) toggle.click();
          var row = target.closest('.topic-list-item');
          if (row) row.scrollIntoView({ block: 'center' });
        }
      }, 30);
    }

    function renderResults(query) {
      var q = query.trim().toLowerCase();
      if (!q) {
        researchSearchResults.hidden = true;
        researchSearchResults.innerHTML = '';
        return;
      }
      var matches = searchIndex.filter(function (entry) {
        return entry.label.toLowerCase().indexOf(q) !== -1 || entry.sub.toLowerCase().indexOf(q) !== -1;
      }).slice(0, 8);

      if (!matches.length) {
        researchSearchResults.innerHTML = '<div class="research-search-empty">No matches — try a different title, author, or keyword.</div>';
        researchSearchResults.hidden = false;
        return;
      }

      researchSearchResults.innerHTML = matches.map(function (m, i) {
        return '<button class="research-search-result" type="button" data-result-index="' + i + '">'
          + '<span class="research-search-result-title">' + m.label + '</span>'
          + '<span class="research-search-result-meta">' + m.topicName + (m.sub ? ' · ' + m.sub : '') + '</span>'
          + '</button>';
      }).join('');
      researchSearchResults.hidden = false;

      researchSearchResults.querySelectorAll('.research-search-result').forEach(function (btn, i) {
        btn.addEventListener('click', function () {
          openSearchResult(matches[i]);
        });
      });
    }

    researchSearchInput.addEventListener('input', function () {
      renderResults(researchSearchInput.value);
    });
    if (researchSearchForm) {
      researchSearchForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var firstBtn = researchSearchResults.querySelector('.research-search-result');
        if (firstBtn) firstBtn.click();
      });
    }
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.research-search')) {
        researchSearchResults.hidden = true;
      }
    });
  }

  // Homepage featured-projects hero: a 2/3 + 1/3 split. The left panel is
  // the current project in full (image + title + subtitle flowing across
  // as the rotation advances); the right panel is a smaller, dimmed
  // preview of whichever project is coming up next — a teaser that's also
  // a direct link to that project. A single row of 6 dots below (one per
  // project) lets visitors jump straight to any of them. Auto-advances
  // every 10s (first advance sooner, at 8s, so it doesn't feel static on
  // load) and pauses on hover. Both panels flow/fade together each time
  // the rotation advances, reading as one project flowing off (and its
  // "next" preview flowing off with it) while the next pair flows in.
  var projectGrid = document.getElementById('project-grid');
  // The dot bar now sits below the hero image as its own element (a sibling
  // of #project-grid, not a child of it), so the dots must be looked up
  // from the shared parent section rather than from within project-grid
  // itself — otherwise the query comes back empty and neither the clicks
  // nor the auto-rotation ever start.
  var projectHeroSection = projectGrid ? projectGrid.closest('.research-hero-section') : null;
  var projectDotEls = projectHeroSection ? Array.prototype.slice.call(projectHeroSection.querySelectorAll('.research-hero-dot')) : [];
  if (projectGrid && projectDotEls.length) {
    var projects = [
      { title: 'How to Address Global Imbalances?', subtitle: 'The G7 economists’ report proposed solutions that were core to the discussions of the G7 French Presidency in 2026.', href: 'g7-global-imbalances.html', img: 'images/global-network-g7.jpg', alt: 'Illustration of a connected global network over Earth' },
      { title: 'Public Finance in the Age of AI', subtitle: '', href: 'public-finance-age-of-ai.html', img: 'images/topics/ai3.jpg', alt: 'Abstract illustration of an AI circuit brain', objectPosition: 'center 22%' },
      { title: 'Stablecoins and Anonymous Money', subtitle: '', href: 'stablecoins-anonymous-money.html', img: 'images/stablecoins-accent.jpg', alt: 'Abstract illustration representing stablecoins and digital currency' },
      { title: 'U.S.–China Trade War', subtitle: '', href: 'remains-of-the-trade.html', img: 'images/topics/trade-finance.webp', alt: 'Aerial view of cargo ship and cargo containers in harbor' },
      { title: 'Economic Policy Challenges for the Age of AI', subtitle: '', href: 'economic-policy-age-of-ai.html', img: 'images/topics/ai3.jpg', alt: 'Abstract illustration of an AI circuit brain', objectPosition: 'center 22%' }
    ];
    var projectSlot = document.getElementById('project-slot-0');
    var projectSlotImg = document.getElementById('project-slot-0-img');
    var nextSlot = document.getElementById('project-slot-next');
    var nextSlotImg = document.getElementById('project-slot-next-img');
    var nextSlotTitle = document.getElementById('project-slot-next-title');
    var currentPage = 0;
    var projectTimer = null;
    var PROJECT_LEAVE_MS = 800;
    var PROJECT_INITIAL_DELAY_MS = 6000;
    var PROJECT_INTERVAL_MS = 6000;

    function renderPage(pageIndex) {
      var p = projects[pageIndex];
      var upNext = projects[(pageIndex + 1) % projects.length];
      if (projectSlot) {
        var heading = projectSlot.querySelector('h2, h3');
        var sub = projectSlot.querySelector('.research-hero-subtitle');
        if (heading) { heading.textContent = p.title; }
        if (sub) { sub.textContent = p.subtitle || ''; }
        projectSlot.href = p.href;
      }
      if (projectSlotImg) {
        projectSlotImg.src = p.img;
        projectSlotImg.alt = p.alt || '';
        // Most images read fine at the shared default crop (center 55%,
        // tuned for the G7 globe); a few — like the AI circuit-brain image,
        // which is nearly full-height already — need their own crop so the
        // full subject stays in frame instead of getting cut off top/bottom.
        projectSlotImg.style.objectPosition = p.objectPosition || '';
      }
      if (nextSlot) { nextSlot.href = upNext.href; }
      if (nextSlotImg) {
        nextSlotImg.src = upNext.img;
        nextSlotImg.alt = upNext.alt || '';
        nextSlotImg.style.objectPosition = upNext.objectPosition || '';
      }
      if (nextSlotTitle) { nextSlotTitle.textContent = upNext.title; }
      projectDotEls.forEach(function (dot) {
        dot.classList.toggle('is-active', Number(dot.getAttribute('data-page')) === pageIndex);
      });
      currentPage = pageIndex;
    }

    function goToPage(pageIndex) {
      if (pageIndex === currentPage) return;
      if (projectSlot) { projectSlot.classList.add('is-leaving'); }
      if (nextSlot) { nextSlot.classList.add('is-leaving'); }
      setTimeout(function () {
        renderPage(pageIndex);
        if (projectSlot) {
          projectSlot.classList.remove('is-leaving');
          projectSlot.classList.add('is-entering');
        }
        if (nextSlot) {
          nextSlot.classList.remove('is-leaving');
          nextSlot.classList.add('is-entering');
        }
        // Force a reflow so the browser registers the off-screen "entering"
        // position before it's removed — otherwise the transition back to
        // the resting position wouldn't animate.
        void projectGrid.offsetWidth;
        if (projectSlot) { projectSlot.classList.remove('is-entering'); }
        if (nextSlot) { nextSlot.classList.remove('is-entering'); }
      }, PROJECT_LEAVE_MS);
    }

    function nextPage() { goToPage((currentPage + 1) % projects.length); }

    // Steady recurring advance — used both after the initial delayed first
    // advance and whenever auto-rotation resumes (after a hover pause or a
    // manual dot click). Resuming must NOT re-use the fast initial delay,
    // or a manual jump would appear to "skip ahead" to the next page almost
    // immediately instead of waiting the normal interval.
    function startProjectInterval() {
      projectTimer = setInterval(nextPage, PROJECT_INTERVAL_MS);
    }
    function startProjectAuto() {
      projectTimer = setTimeout(function () {
        nextPage();
        startProjectInterval();
      }, PROJECT_INITIAL_DELAY_MS);
    }
    function resumeProjectAuto() {
      startProjectInterval();
    }
    function stopProjectAuto() {
      if (projectTimer) { clearTimeout(projectTimer); clearInterval(projectTimer); projectTimer = null; }
    }

    projectDotEls.forEach(function (dot) {
      dot.addEventListener('click', function () {
        stopProjectAuto();
        goToPage(Number(dot.getAttribute('data-page')));
        resumeProjectAuto();
      });
    });

    startProjectAuto();
    projectGrid.addEventListener('mouseenter', stopProjectAuto);
    projectGrid.addEventListener('mouseleave', resumeProjectAuto);
  }

  // "Our Research" topic tabs (Resources & Data page): a horizontal row of
  // tabs above a two-column panel (text left, image right on desktop;
  // stacked on mobile). Defaults to whichever tab/pane already carries the
  // "active" class in the HTML (Stablecoins and Dollar Dominance).
  document.querySelectorAll('.research-explore-tabs').forEach(function (tabRow) {
    var wrap = tabRow.parentElement;
    var tabs = tabRow.querySelectorAll('.research-tab');
    var panes = wrap.querySelectorAll('.research-pane');
    var order = Array.prototype.map.call(tabs, function (tab) {
      return tab.getAttribute('data-slide');
    });

    function activateSlide(id) {
      panes.forEach(function (pane) {
        pane.classList.toggle('active', pane.getAttribute('data-slide') === id);
      });
      tabs.forEach(function (tab) {
        var isActive = tab.getAttribute('data-slide') === id;
        tab.classList.toggle('active', isActive);
        tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
    }

    function currentIndex() {
      var activeTab = tabRow.querySelector('.research-tab.active');
      var id = activeTab ? activeTab.getAttribute('data-slide') : order[0];
      return order.indexOf(id);
    }

    // Auto-advance to the next topic every 5s (desktop tab view only — on
    // mobile all topics are already shown as stacked cards), with a
    // progress bar filling under the active tab to show time remaining
    // (Stanford Digital Economy Lab-style). Pauses, and resets the bar,
    // on hover.
    var AUTO_MS = 5000;
    var autoTimer = null;

    function clearFills() {
      tabs.forEach(function (tab) {
        var fill = tab.querySelector('.research-tab-fill');
        if (!fill) return;
        fill.style.transitionDuration = '0s';
        fill.style.width = '0%';
      });
    }

    function startFill() {
      var activeTab = tabRow.querySelector('.research-tab.active');
      var fill = activeTab ? activeTab.querySelector('.research-tab-fill') : null;
      if (!fill) return;
      fill.style.transitionDuration = '0s';
      fill.style.width = '0%';
      // Force layout so the reset above is applied before the transition
      // below is re-enabled — otherwise the browser can collapse both
      // changes into one and skip straight to the full width.
      void fill.offsetWidth;
      fill.style.transitionDuration = AUTO_MS + 'ms';
      fill.style.width = '100%';
    }

    function stopAuto() {
      if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
      clearFills();
    }
    function startAuto() {
      stopAuto();
      if (order.length < 2) return;
      if (!window.matchMedia('(min-width: 861px)').matches) return;
      startFill();
      autoTimer = setInterval(function () {
        activateSlide(order[(currentIndex() + 1) % order.length]);
        startFill();
      }, AUTO_MS);
    }
    function goTo(id) {
      activateSlide(id);
      startAuto();
    }
    function step(delta) {
      var nextIndex = (currentIndex() + delta + order.length) % order.length;
      goTo(order[nextIndex]);
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        goTo(tab.getAttribute('data-slide'));
      });
    });

    var controls = wrap.querySelector('.research-explore-controls');
    if (controls) {
      var prevBtn = controls.querySelector('[data-control="prev"]');
      var nextBtn = controls.querySelector('[data-control="next"]');
      if (prevBtn) prevBtn.addEventListener('click', function () { step(-1); });
      if (nextBtn) nextBtn.addEventListener('click', function () { step(1); });
    }

    wrap.addEventListener('mouseenter', stopAuto);
    wrap.addEventListener('mouseleave', startAuto);

    // Deep-link support: arriving via resources-data.html#<slide-id> (e.g.
    // from the homepage's Our Focus tiles) selects that tab and scrolls to
    // it. Harmless no-op if the hash doesn't match a tab on this page.
    var initialTopic = window.location.hash.replace('#', '');
    if (initialTopic && order.indexOf(initialTopic) !== -1) {
      activateSlide(initialTopic);
      setTimeout(function () {
        wrap.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 60);
    }

    startAuto();
  });

  // "Discover our data" screen (Resources & Data page): a clickable list of
  // data tools that swaps a live embedded tool (or a "coming soon"
  // placeholder) into a visualization screen on the right. Defaults to
  // Stablecoins, the first tool in the list.
  var dataScreenItems = document.querySelectorAll('.data-screen-item');
  if (dataScreenItems.length) {
    var dataTools = {
      stablecoins: {
        desc: 'On-chain holdings of major dollar stablecoins, by owner, blockchain, and jurisdiction.',
        extraLink: { label: 'Gita Gopinath’s BIS Per Jacobsson Foundation Lecture', url: 'https://www.bis.org/events/agm2026/sp260628_lecture.pdf' },
        views: [
          { label: 'Holdings by owner — USDC', src: 'data/holdings_owner_all_USDC.html', title: 'Stablecoin holdings by wallet owner:', subtitle: 'USDC', keyMessage: 'Stablecoins are mostly held in more anonymous self-custody wallets.' },
          { label: 'Holdings by owner — USDT', src: 'data/holdings_owner_all_USDT.html', title: 'Stablecoin holdings by wallet owner:', subtitle: 'USDT', keyMessage: 'Stablecoins are mostly held in more anonymous self-custody wallets.' },
          { label: 'Holdings by blockchain — USDC', src: 'data/holdings_blockchain_USDC.html', title: 'Stablecoin holdings by blockchain', subtitle: 'USDC' },
          { label: 'Holdings by blockchain — USDT', src: 'data/holdings_blockchain_USDT.html', title: 'Stablecoin holdings by blockchain', subtitle: 'USDT' },
          { label: 'Holdings by owner jurisdiction — USDC', src: 'data/holdings_owner_jurisdiction_all_USDC.html', title: 'Stablecoin holdings by owner jurisdiction:', subtitle: 'USDC', keyMessage: 'Most holdings sit in self-custody or non-U.S. venues — little is in U.S.-regulated exchanges.' },
          { label: 'Holdings by owner jurisdiction — USDT', src: 'data/holdings_owner_jurisdiction_all_USDT.html', title: 'Stablecoin holdings by owner jurisdiction:', subtitle: 'USDT', keyMessage: 'Most holdings sit in self-custody or non-U.S. venues — little is in U.S.-regulated exchanges.' },
          { label: 'Holdings by owner jurisdiction — Tron, USDT', src: 'data/holdings_owner_jurisdiction_Tron_USDT.html', title: 'Stablecoin holdings by owner jurisdiction:', subtitle: 'USDT (Tron)', keyMessage: 'On Tron, about 95% of USDT — roughly $89B — is held in self-custody wallets.' }
        ]
      },
      invoicing: {
        desc: 'Currency choice in the invoicing of global trade flows (Boz et al., 2026).',
        extraLink: { label: 'Read the paper', url: 'https://gitagopinath.github.io/files/Trade_invoicing_patterns_2_0.pdf' },
        views: [
          { label: 'Global trade and invoicing currency shares over time', src: 'data/BozEtAl(2026)_F3C.html', title: 'Global trade and invoicing currency shares over time', subtitle: 'With share of imports from China and renminbi invoicing share' },
          { label: 'Zooming in on renminbi invoicing', src: 'data/BozEtAl(2026)_F4A.html', title: 'Zooming in on renminbi invoicing', subtitle: 'Imports' },
          { label: 'Changes in invoicing currency and bilateral trade shares for Russia', src: 'data/BozEtAl(2026)_F10.html', title: 'Changes in invoicing currency and bilateral trade shares for Russia' }
        ]
      }
    };

    var dataScreenDesc = document.getElementById('data-screen-desc');
    var dataScreenExtraLink = document.getElementById('data-screen-extra-link');
    var dataScreenViews = document.getElementById('data-screen-views');
    var dataScreenCta = document.getElementById('data-screen-cta');
    var dataScreenFrame = document.getElementById('data-screen-frame');
    var dataScreenPlaceholder = document.getElementById('data-screen-placeholder');
    var dataScreenGraphTitle = document.getElementById('data-screen-graph-title');

    function setGraphTitle(view) {
      if (!dataScreenGraphTitle) return;
      if (view && view.title) {
        dataScreenGraphTitle.innerHTML = '<span class="data-screen-graph-title-main">' + view.title + '</span>'
          + (view.keyMessage ? '<span class="data-screen-graph-title-key">' + view.keyMessage + '</span>' : '')
          + (view.subtitle ? '<span class="data-screen-graph-title-sub">' + view.subtitle + '</span>' : '');
        dataScreenGraphTitle.hidden = false;
      } else {
        dataScreenGraphTitle.innerHTML = '';
        dataScreenGraphTitle.hidden = true;
      }
    }

    function renderDataTool(id) {
      var tool = dataTools[id];
      if (!tool) return;
      dataScreenItems.forEach(function (item) {
        item.classList.toggle('active', item.getAttribute('data-tool') === id);
      });
      dataScreenDesc.textContent = tool.desc;

      if (tool.extraLink) {
        dataScreenExtraLink.hidden = false;
        dataScreenExtraLink.href = tool.extraLink.url;
        dataScreenExtraLink.textContent = tool.extraLink.label;
      } else {
        dataScreenExtraLink.hidden = true;
      }

      // A tool can either point straight at one embeddable file (src) or
      // offer several related views (views[]); the first view is shown by
      // default, with a dropdown to switch between the rest.
      var activeView = tool.views && tool.views.length ? tool.views[0] : null;
      var activeSrc = tool.src || (activeView ? activeView.src : null);

      if (tool.views && tool.views.length) {
        dataScreenViews.innerHTML = tool.views.map(function (v) {
          var selected = v.src === activeSrc ? ' selected' : '';
          return '<option value="' + v.src + '"' + selected + '>' + v.label + '</option>';
        }).join('');
        dataScreenViews.hidden = false;
      } else {
        dataScreenViews.innerHTML = '';
        dataScreenViews.hidden = true;
      }

      setGraphTitle(activeView);

      if (activeSrc) {
        if (dataScreenFrame.getAttribute('src') !== activeSrc) dataScreenFrame.src = activeSrc;
        dataScreenFrame.hidden = false;
        dataScreenPlaceholder.hidden = true;
      } else {
        dataScreenFrame.hidden = true;
        dataScreenPlaceholder.hidden = false;
      }

      if (tool.ctaUrl) {
        dataScreenCta.hidden = false;
        dataScreenCta.href = tool.ctaUrl;
        dataScreenCta.textContent = tool.ctaLabel + ' →';
        dataScreenCta.setAttribute('download', '');
      } else {
        dataScreenCta.hidden = true;
        dataScreenCta.removeAttribute('download');
      }
    }

    dataScreenViews.addEventListener('change', function () {
      var activeTool = dataTools[document.querySelector('.data-screen-item.active').getAttribute('data-tool')];
      var src = dataScreenViews.value;
      var view = activeTool && activeTool.views ? activeTool.views.filter(function (v) { return v.src === src; })[0] : null;
      setGraphTitle(view);
      if (src && dataScreenFrame.getAttribute('src') !== src) dataScreenFrame.src = src;
    });

    dataScreenItems.forEach(function (item) {
      item.addEventListener('click', function () {
        renderDataTool(item.getAttribute('data-tool'));
      });
    });

    // Allow deep-linking into a specific tool from elsewhere on the site,
    // e.g. resources-data.html?tool=stablecoins from a homepage teaser.
    var requestedTool = new URLSearchParams(window.location.search).get('tool');
    var defaultItem = (requestedTool && dataTools[requestedTool] && document.querySelector('.data-screen-item[data-tool="' + requestedTool + '"]'))
      || document.querySelector('.data-screen-item.active')
      || dataScreenItems[0];
    renderDataTool(defaultItem.getAttribute('data-tool'));
    if (requestedTool) {
      setTimeout(function () {
        document.querySelector('.data-screen').scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 60);
    }
  }

  // "What We Bring" pillar modal (Home page)
  var pillarModal = document.getElementById('pillar-modal');
  if (pillarModal) {
    var pillars = {
      research: {
        name: 'Academic Excellence',
        desc: 'The Lab draws on the expertise of its affiliate faculty, staff, and research, providing access to cutting-edge research in macroeconomics that is most relevant to our mission.',
        ctaLabel: 'Explore Our Work',
        ctaUrl: 'resources-data.html'
      },
      experience: {
        name: 'Leadership Experience',
        desc: 'Led by Director Gita Gopinath, the team has experience at the highest levels of economic policymaking. This perspective ensures that our research addresses the questions decision-makers face and provides practical, actionable guidance.',
        ctaLabel: 'Meet Our People',
        ctaUrl: 'about.html#people'
      },
      perspective: {
        name: 'A Global Perspective',
        desc: 'Our network of faculty affiliates, fellows, and partners spans advanced, emerging, and developing economies, bringing together diverse perspectives to address truly global macroeconomic challenges.',
        ctaLabel: 'Meet Our Affiliate Faculty',
        ctaUrl: 'about.html#people'
      }
    };

    var pillarName = document.getElementById('pillar-modal-name');
    var pillarDesc = document.getElementById('pillar-modal-desc');
    var pillarCta = document.getElementById('pillar-modal-cta');
    var pillarLastFocused = null;

    function openPillar(id) {
      var pillar = pillars[id];
      if (!pillar) return;
      pillarName.textContent = pillar.name;
      pillarDesc.textContent = pillar.desc;
      pillarCta.textContent = pillar.ctaLabel + ' →';
      pillarCta.href = pillar.ctaUrl;
      pillarLastFocused = document.activeElement;
      pillarModal.hidden = false;
      pillarModal.querySelector('.bio-modal-close').focus();
    }

    function closePillar() {
      pillarModal.hidden = true;
      if (pillarLastFocused) pillarLastFocused.focus();
    }

    document.querySelectorAll('[data-pillar]').forEach(function (el) {
      el.addEventListener('click', function () {
        openPillar(el.getAttribute('data-pillar'));
      });
    });

    pillarModal.querySelectorAll('[data-modal-close]').forEach(function (el) {
      el.addEventListener('click', closePillar);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !pillarModal.hidden) closePillar();
    });
  }

  // About page sub-tabs (Our team / Our mission)
  // (refreshOpenFaqHeights is assigned below, once the mission FAQ accordion
  // is set up; declared here so activateSubtab can call it regardless of
  // execution order, since panels hidden via [hidden] collapse their
  // descendants' scrollHeight to 0 until they become visible again.)
  var refreshOpenFaqHeights;
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
      // The mission FAQ panel may have been hidden when its default-open
      // item first measured its height (scrollHeight is 0 while a panel
      // has [hidden]), so recompute now that the panel is visible.
      if (typeof refreshOpenFaqHeights === 'function') refreshOpenFaqHeights();
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

    // Default tab: whichever button is already marked active in the HTML,
    // falling back to the first tab.
    var defaultBtn = document.querySelector('.subtab-btn.active') || subtabBtns[0];
    var defaultName = defaultBtn.getAttribute('data-subtab');

    // Applies whatever tab the current URL hash points to. Used both on
    // initial page load and whenever the hash changes afterward — e.g.
    // clicking a footer "Our Mission" / "Our People" link while already
    // sitting on about.html only fires a hashchange event (no page reload),
    // so without this listener the tab would silently stay put.
    function applyHashRouting(scrollOnTabMatch) {
      var hashName = window.location.hash.replace('#', '');
      var hashIsTab = Array.prototype.some.call(subtabBtns, function (btn) {
        return btn.getAttribute('data-subtab') === hashName;
      });

      if (hashIsTab) {
        activateSubtab(hashName, scrollOnTabMatch);
      } else if (hashName) {
        // The hash may point to content nested inside one of the tab panels
        // (e.g. a topic id deep-linked from the homepage) rather than a tab
        // itself — find which panel it lives in and switch to that tab.
        var hashEl = document.getElementById(hashName) || document.querySelector('[data-slide="' + hashName + '"]');
        var panelAncestor = hashEl ? hashEl.closest('[data-panel]') : null;
        if (panelAncestor) {
          activateSubtab(panelAncestor.getAttribute('data-panel'), false);
          // Once the right tab is visible, scroll to the specific nested
          // element (e.g. #people or #mission-faq item) rather than just
          // the top of the tab bar, since that's what the link promised.
          if (hashEl) {
            window.requestAnimationFrame(function () {
              hashEl.scrollIntoView({ block: 'start' });
            });
          }
        } else {
          activateSubtab(defaultName, false);
        }
      } else {
        activateSubtab(defaultName, false);
      }
    }

    applyHashRouting(true);
    window.addEventListener('hashchange', function () {
      applyHashRouting(true);
    });
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

    refreshOpenFaqHeights = function () {
      faqItems.forEach(function (item) {
        if (item.getAttribute('data-open') === 'true') {
          var answer = item.querySelector('.faq-answer');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    };

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

    window.addEventListener('resize', refreshOpenFaqHeights);
  }
});
