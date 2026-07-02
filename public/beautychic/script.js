/* ============================================================
   BEAUTY CHIC — interactions
   Header, menu mobile, i18n FR/EN, reveals, compteurs,
   slider d'avis, lightbox, parallaxe, indicateur d'ouverture.
   ============================================================ */

(function () {
  "use strict";

  var REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Dictionnaire FR / EN ---------- */
  var I18N = {
    fr: {
      "meta.title": "Beauty Chic — Salon de coiffure afro, perruques & institut de beauté · Paris 10e (Château d'Eau)",
      "meta.desc": "Beauty Chic, salon de coiffure afro à Paris 10e : tresses & braids, perruques, tissage, locks, soins kératine & vapeur, onglerie et regard. Lucie et son équipe vous accueillent du lundi au samedi, 9h30–20h, au 100 rue du Faubourg Saint-Denis, à deux pas de Château d'Eau.",
      "brand.sub": "Coiffure afro · Paris 10ᵉ",
      "nav.services": "Prestations",
      "nav.wigs": "Perruques",
      "nav.gallery": "Galerie",
      "nav.about": "Le salon",
      "nav.reviews": "Avis",
      "nav.contact": "Contact",
      "cta.book": "Réserver",
      "hero.eyebrow": "Salon afro · Perruques · Institut — Paris 10ᵉ",
      "hero.title1": "La beauté afro,",
      "hero.title2": "sublimée.",
      "hero.sub": "Tresses, perruques, tissages et soins par Lucie et son équipe, au cœur du quartier Château d'Eau. Femmes, hommes & enfants — depuis 2014.",
      "hero.ctaBook": "Réserver en ligne",
      "hero.badgeReviews": "· 67 avis vérifiés",
      "hero.badgeSince": "Depuis 2014",
      "hero.badgeHours": "Lun–Sam · 9h30–20h",
      "services.eyebrow": "Nos prestations",
      "services.title": "Des mains expertes, pour chaque texture.",
      "services.intro": "Cheveux crépus, frisés, bouclés ou lisses : chaque prestation commence par une écoute attentive de vos envies et de la nature de votre cheveu.",
      "services.s1.name": "Tresses & Braids",
      "services.s1.desc": "Box braids, knotless, nattes collées, twists, vanilles, locks… des coiffures protectrices réalisées avec précision.",
      "services.s1.price": "Sur devis",
      "services.s2.name": "Perruques & Wigs",
      "services.s2.desc": "Vente, pose et customisation de perruques cheveux afro — lace, coupe et coiffage pour un rendu naturel.",
      "services.s3.name": "Tissage & Extensions",
      "services.s3.desc": "Pose de tissage fermé ou avec closure, extensions et postiches pour une longueur et un volume immédiats.",
      "services.s4.name": "Coupe & Coiffage",
      "services.s4.desc": "Coupe femme, homme et enfant, barbe, brushing, chignons et coiffures de mariage.",
      "services.s5.name": "Coloration & Balayage",
      "services.s5.desc": "Coloration, mèches, balayage, tie & dye — des teintes pensées pour les cheveux texturés.",
      "services.s6.name": "Soins & Rituels",
      "services.s6.desc": "Soin kératine, soin vapeur, protocoles Keralona pour cheveux fragilisés ou en transition.",
      "services.s7.name": "Onglerie",
      "services.s7.desc": "Pose de faux ongles, remplissage et manucure soignée, assortis à votre style.",
      "services.s8.name": "Regard & Sourcils",
      "services.s8.desc": "Faux cils, restructuration des sourcils et maquillage permanent.",
      "misc.from": "dès",
      "misc.onRequest": "Sur demande",
      "services.note": "Prix indicatifs relevés sur Treatwell — le tarif exact dépend de la longueur, de la densité et du style choisi. Devis précis au salon ou à la réservation.",
      "wigs.eyebrow": "L'atelier perruques",
      "wigs.title": "Perruques & lace wigs, posées comme une seconde nature.",
      "wigs.text": "Choisissez votre unité au salon ou apportez la vôtre : nous la préparons, la posons et la personnalisons — découpe de la lace, coupe, coiffage — pour un fini indétectable. Conseils d'entretien inclus, sans jugement et sans pression.",
      "wigs.p1": "Vente de perruques cheveux afro",
      "wigs.p2": "Pose & customisation dès 27,50 €",
      "wigs.p3": "Coupe, coiffage & conseils inclus",
      "wigs.cta": "Demander conseil sur WhatsApp",
      "gallery.eyebrow": "Galerie",
      "gallery.title": "Nos réalisations parlent d'elles-mêmes.",
      "gallery.intro": "Un aperçu des styles que nous réalisons chaque jour au salon — retrouvez-en plus sur notre Instagram.",
      "gallery.cta": "Voir plus sur Instagram",
      "about.eyebrow": "Le salon",
      "about.title": "Chez Lucie, chaque cliente repart sublimée.",
      "about.p1": "Depuis 2014, Beauty Chic accueille le quartier dans une ambiance chaleureuse et joviale. Lucie et son équipe sont spécialistes du cheveu afro — et tout aussi à l'aise sur cheveux européens — pour les femmes, les hommes et les enfants.",
      "about.p2": "Chaque rendez-vous commence par un vrai diagnostic : votre texture, l'état de votre cuir chevelu, vos habitudes. Coiffure, perruques, onglerie, regard — tout est réuni au même endroit, avec des soins Keralona pour les cheveux fragilisés.",
      "about.stat1": "années d'expérience",
      "about.stat2": "note moyenne",
      "about.stat3": "avis vérifiés",
      "about.stat4": "ouvert, 9h30–20h",
      "about.cta": "Venir au salon",
      "quote.text": "« Une coiffeuse au talent hors pair, défiant toute concurrence. Soignée, perfectionniste — elle fait son métier par passion. »",
      "quote.cite": "Evelyne — avis vérifié Treatwell",
      "reviews.eyebrow": "Ils nous font confiance",
      "reviews.title": "sur 67 avis vérifiés",
      "reviews.intro": "Avis authentiques de clientes ayant réservé chez Beauty Chic — publiés sur Treatwell.",
      "reviews.via": "— via Treatwell",
      "reviews.all": "Lire tous les avis sur Treatwell ↗",
      "faq.eyebrow": "Questions fréquentes",
      "faq.title": "Tout ce qu'il faut savoir avant de venir.",
      "faq.q1": "Faut-il prendre rendez-vous ?",
      "faq.a1": "La réservation en ligne (Treatwell) ou par téléphone est conseillée pour garantir votre créneau, mais nous accueillons aussi sans rendez-vous selon l'affluence — le salon est ouvert du lundi au samedi, de 9h30 à 20h.",
      "faq.q2": "Comment préparer mes cheveux avant des tresses ou un tissage ?",
      "faq.a2": "Venez idéalement avec des cheveux propres, secs et démêlés. Un soin vapeur ou kératine peut être réalisé au salon avant la pose. Vous pouvez apporter vos mèches ou en trouver sur place.",
      "faq.q3": "Proposez-vous des perruques personnalisées ?",
      "faq.a3": "Oui : vente de perruques cheveux afro, pose et customisation complète (découpe de la lace, coupe, coiffage) pour un rendu naturel — que la perruque vienne de chez nous ou de chez vous.",
      "faq.q4": "Coiffez-vous les hommes et les enfants ?",
      "faq.a4": "Bien sûr. Beauty Chic est un salon mixte : coupe homme avec barbe, coupes enfants, et coiffures protectrices pour toute la famille.",
      "faq.q5": "Travaillez-vous aussi les cheveux européens ?",
      "faq.a5": "Oui. L'équipe est spécialiste du cheveu afro et coiffe également les cheveux européens : coupes, brushings, colorations, balayages.",
      "faq.q6": "Combien de temps dure une prestation ?",
      "faq.a6": "Cela dépend du style : un brushing prend moins d'une heure, des box braids plusieurs heures. Nous vous donnons une estimation précise à la réservation ou par WhatsApp.",
      "contact.eyebrow": "Nous trouver",
      "contact.title": "Au cœur du 10ᵉ, à deux pas de Château d'Eau.",
      "contact.addrTitle": "Adresse",
      "contact.hoursTitle": "Horaires",
      "contact.monsat": "Lundi – Samedi",
      "contact.sun": "Dimanche",
      "contact.closed": "Fermé",
      "contact.walkin": "Avec ou sans rendez-vous, selon l'affluence.",
      "contact.bookTitle": "Réservation",
      "contact.bookOnline": "Réserver sur Treatwell",
      "footer.tag": "Salon de coiffure afro, perruques & institut de beauté — depuis 2014.",
      "footer.visit": "Le salon",
      "footer.hours": "Lun–Sam · 9h30–20h00",
      "footer.follow": "Suivez-nous",
      "footer.credits": "Photos d'illustration : Unsplash & Pexels",
      "bar.call": "Appeler",
      "bar.directions": "Itinéraire",
      "bar.book": "Réserver",
      "open.until": "Ouvert — jusqu'à 20h00",
      "open.todayAt": "Fermé — ouvre aujourd'hui à 9h30",
      "open.reopens": "Fermé — réouvre {day} à 9h30"
    },
    en: {
      "meta.title": "Beauty Chic — Afro hair salon, wigs & beauty institute · Paris 10th (Château d'Eau)",
      "meta.desc": "Beauty Chic, afro hair salon in Paris 10th: braids, wigs, weaves, locks, keratin & steam treatments, nails and lashes. Lucie and her team welcome you Monday to Saturday, 9:30am–8pm, at 100 rue du Faubourg Saint-Denis, steps from Château d'Eau.",
      "brand.sub": "Afro hair salon · Paris 10th",
      "nav.services": "Services",
      "nav.wigs": "Wigs",
      "nav.gallery": "Gallery",
      "nav.about": "The salon",
      "nav.reviews": "Reviews",
      "nav.contact": "Contact",
      "cta.book": "Book now",
      "hero.eyebrow": "Afro hair salon · Wigs · Beauty — Paris 10th",
      "hero.title1": "Afro beauty,",
      "hero.title2": "elevated.",
      "hero.sub": "Braids, wigs, weaves and treatments by Lucie and her team, in the heart of the Château d'Eau district. Women, men & kids — since 2014.",
      "hero.ctaBook": "Book online",
      "hero.badgeReviews": "· 67 verified reviews",
      "hero.badgeSince": "Since 2014",
      "hero.badgeHours": "Mon–Sat · 9:30am–8pm",
      "services.eyebrow": "Our services",
      "services.title": "Expert hands, for every texture.",
      "services.intro": "Coily, curly, wavy or straight: every service starts with a genuine consultation about your wishes and your hair's nature.",
      "services.s1.name": "Braids & Protective styles",
      "services.s1.desc": "Box braids, knotless, cornrows, twists, Senegalese twists, locks… protective styles crafted with precision.",
      "services.s1.price": "Custom quote",
      "services.s2.name": "Wigs & Lace units",
      "services.s2.desc": "Sale, installation and customisation of afro hair wigs — lace, cut and styling for a natural finish.",
      "services.s3.name": "Weaves & Extensions",
      "services.s3.desc": "Full or closure weave installs, extensions and hair pieces for instant length and volume.",
      "services.s4.name": "Cuts & Styling",
      "services.s4.desc": "Women's, men's and kids' cuts, beard work, blowouts, updos and bridal styling.",
      "services.s5.name": "Colour & Balayage",
      "services.s5.desc": "Colour, highlights, balayage, tie & dye — shades designed for textured hair.",
      "services.s6.name": "Care & Rituals",
      "services.s6.desc": "Keratin treatment, steam therapy, Keralona protocols for damaged or transitioning hair.",
      "services.s7.name": "Nails",
      "services.s7.desc": "Nail extensions, infills and a polished manicure to match your style.",
      "services.s8.name": "Lashes & Brows",
      "services.s8.desc": "Lash extensions, brow shaping and permanent makeup.",
      "misc.from": "from",
      "misc.onRequest": "On request",
      "services.note": "Indicative prices as listed on Treatwell — the exact rate depends on length, density and chosen style. Precise quote in the salon or when booking.",
      "wigs.eyebrow": "The wig atelier",
      "wigs.title": "Wigs & lace units, fitted like second nature.",
      "wigs.text": "Pick your unit at the salon or bring your own: we prep, install and customise it — lace trimming, cutting, styling — for an undetectable finish. Care advice included, no judgement, no pressure.",
      "wigs.p1": "Afro hair wigs for sale",
      "wigs.p2": "Install & customisation from €27.50",
      "wigs.p3": "Cut, styling & advice included",
      "wigs.cta": "Ask for advice on WhatsApp",
      "gallery.eyebrow": "Gallery",
      "gallery.title": "Our work speaks for itself.",
      "gallery.intro": "A glimpse of the styles we create every day at the salon — find more on our Instagram.",
      "gallery.cta": "See more on Instagram",
      "about.eyebrow": "The salon",
      "about.title": "At Lucie's, every client leaves glowing.",
      "about.p1": "Since 2014, Beauty Chic has welcomed the neighbourhood in a warm, joyful atmosphere. Lucie and her team are afro hair specialists — equally at home with European hair — for women, men and children.",
      "about.p2": "Every appointment starts with a real hair diagnosis: your texture, your scalp, your habits. Hair, wigs, nails, lashes — everything under one roof, with Keralona treatments for fragile hair.",
      "about.stat1": "years of experience",
      "about.stat2": "average rating",
      "about.stat3": "verified reviews",
      "about.stat4": "open, 9:30am–8pm",
      "about.cta": "Visit the salon",
      "quote.text": "“A hairdresser with outstanding talent, beyond compare. Meticulous, perfectionist — she does her job out of passion.”",
      "quote.cite": "Evelyne — verified Treatwell review",
      "reviews.eyebrow": "They trust us",
      "reviews.title": "across 67 verified reviews",
      "reviews.intro": "Genuine reviews from clients who booked at Beauty Chic — published on Treatwell.",
      "reviews.via": "— via Treatwell",
      "reviews.all": "Read all reviews on Treatwell ↗",
      "faq.eyebrow": "FAQ",
      "faq.title": "Everything to know before you visit.",
      "faq.q1": "Do I need an appointment?",
      "faq.a1": "Booking online (Treatwell) or by phone is recommended to guarantee your slot, but walk-ins are welcome depending on how busy we are — the salon is open Monday to Saturday, 9:30am to 8pm.",
      "faq.q2": "How should I prepare my hair for braids or a weave?",
      "faq.a2": "Ideally arrive with clean, dry, detangled hair. A steam or keratin treatment can be done in the salon before the install. Bring your own extensions or find some on site.",
      "faq.q3": "Do you offer customised wigs?",
      "faq.a3": "Yes: afro hair wigs for sale, installation and full customisation (lace trimming, cutting, styling) for a natural finish — whether the wig comes from us or from you.",
      "faq.q4": "Do you style men and children?",
      "faq.a4": "Of course. Beauty Chic is a unisex salon: men's cuts with beard work, kids' cuts, and protective styles for the whole family.",
      "faq.q5": "Do you also work with European hair?",
      "faq.a5": "Yes. The team specialises in afro hair and also styles European hair: cuts, blowouts, colour, balayage.",
      "faq.q6": "How long does a service take?",
      "faq.a6": "It depends on the style: a blowout takes under an hour, box braids several hours. We give you a precise estimate when you book or via WhatsApp.",
      "contact.eyebrow": "Find us",
      "contact.title": "In the heart of the 10th, steps from Château d'Eau.",
      "contact.addrTitle": "Address",
      "contact.hoursTitle": "Opening hours",
      "contact.monsat": "Monday – Saturday",
      "contact.sun": "Sunday",
      "contact.closed": "Closed",
      "contact.walkin": "With or without an appointment, depending on how busy we are.",
      "contact.bookTitle": "Booking",
      "contact.bookOnline": "Book on Treatwell",
      "footer.tag": "Afro hair salon, wigs & beauty institute — since 2014.",
      "footer.visit": "The salon",
      "footer.hours": "Mon–Sat · 9:30am–8:00pm",
      "footer.follow": "Follow us",
      "footer.credits": "Illustrative photos: Unsplash & Pexels",
      "bar.call": "Call",
      "bar.directions": "Directions",
      "bar.book": "Book",
      "open.until": "Open now — until 8:00pm",
      "open.todayAt": "Closed — opens today at 9:30am",
      "open.reopens": "Closed — reopens {day} at 9:30am"
    }
  };

  var lang = "fr";
  try {
    var saved = localStorage.getItem("bc-lang");
    if (saved === "en" || saved === "fr") lang = saved;
  } catch (e) { /* stockage indisponible */ }

  function applyLang(next) {
    lang = next;
    var dict = I18N[lang];
    document.documentElement.lang = lang;
    document.title = dict["meta.title"];
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", dict["meta.desc"]);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) el.textContent = dict[key];
    });

    document.querySelectorAll(".lang-switch button").forEach(function (btn) {
      var active = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    try { localStorage.setItem("bc-lang", lang); } catch (e) { /* ignore */ }
    updateOpenIndicator();
  }

  document.querySelectorAll(".lang-switch button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var next = btn.getAttribute("data-lang");
      if (next !== lang) applyLang(next);
    });
  });

  /* ---------- Header : état "scrolled" ---------- */
  var header = document.getElementById("header");
  function onScrollHeader() {
    header.classList.toggle("scrolled", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------- Menu mobile ---------- */
  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("mainNav");

  function closeNav() {
    document.body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Ouvrir le menu");
  }
  navToggle.addEventListener("click", function () {
    var open = document.body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    navToggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
  });
  mainNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeNav);
  });
  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && document.body.classList.contains("nav-open")) closeNav();
  });

  /* ---------- Diaporama du héro ---------- */
  var heroSlides = Array.prototype.slice.call(document.querySelectorAll(".hero-slide"));
  if (!REDUCED_MOTION && heroSlides.length > 1) {
    var heroIndex = 0;
    var heroTimer = null;

    var hydrateSlide = function (img) {
      if (img.getAttribute("data-src") && !img.dataset.hydrated) {
        img.src = img.getAttribute("data-src");
        if (img.getAttribute("data-srcset")) img.srcset = img.getAttribute("data-srcset");
        img.dataset.hydrated = "1";
      }
    };

    var startHero = function () {
      if (heroTimer) return;
      heroTimer = setInterval(function () {
        heroIndex = (heroIndex + 1) % heroSlides.length;
        heroSlides.forEach(function (slide, i) {
          slide.classList.toggle("is-active", i === heroIndex);
        });
      }, 7000);
    };

    var initHero = function () {
      heroSlides.forEach(hydrateSlide);
      startHero();
    };

    // Les visuels 2 et 3 ne se chargent qu'une fois la page prête (LCP préservé).
    if (document.readyState === "complete") initHero();
    else window.addEventListener("load", initHero);

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        if (heroTimer) { clearInterval(heroTimer); heroTimer = null; }
      } else if (document.readyState === "complete") {
        initHero();
      }
    });
  }

  /* ---------- Apparition au scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (!REDUCED_MOTION && "IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Compteurs ---------- */
  var counters = document.querySelectorAll("[data-count-to]");

  function formatCount(value, decimals) {
    var text = value.toFixed(decimals);
    if (lang === "fr") text = text.replace(".", ",");
    return text;
  }

  function animateCounter(el) {
    var target = parseFloat(el.getAttribute("data-count-to"));
    var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var suffix = el.getAttribute("data-suffix") || "";
    if (REDUCED_MOTION) {
      el.textContent = formatCount(target, decimals) + suffix;
      return;
    }
    var duration = 1400;
    var start = null;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = formatCount(target * eased, decimals) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if ("IntersectionObserver" in window) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { counterObserver.observe(el); });
  } else {
    counters.forEach(animateCounter);
  }

  /* ---------- Slider d'avis ---------- */
  var track = document.getElementById("sliderTrack");
  if (track) {
    var slides = track.children;
    var dotsWrap = document.getElementById("sliderDots");
    var current = 0;
    var timer = null;

    for (var i = 0; i < slides.length; i++) {
      (function (index) {
        var dot = document.createElement("button");
        dot.setAttribute("role", "tab");
        dot.setAttribute("aria-label", "Avis " + (index + 1));
        dot.addEventListener("click", function () { goTo(index); restartAuto(); });
        dotsWrap.appendChild(dot);
      })(i);
    }

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      track.style.transform = "translateX(-" + current * 100 + "%)";
      dotsWrap.querySelectorAll("button").forEach(function (d, di) {
        d.classList.toggle("is-active", di === current);
      });
    }

    function restartAuto() {
      if (timer) clearInterval(timer);
      if (!REDUCED_MOTION) {
        timer = setInterval(function () { goTo(current + 1); }, 6500);
      }
    }

    document.getElementById("prevReview").addEventListener("click", function () { goTo(current - 1); restartAuto(); });
    document.getElementById("nextReview").addEventListener("click", function () { goTo(current + 1); restartAuto(); });

    var slider = document.getElementById("reviewSlider");
    slider.addEventListener("pointerenter", function () { if (timer) clearInterval(timer); });
    slider.addEventListener("pointerleave", restartAuto);

    var touchX = null;
    slider.addEventListener("touchstart", function (e) { touchX = e.touches[0].clientX; }, { passive: true });
    slider.addEventListener("touchend", function (e) {
      if (touchX === null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 40) { goTo(dx < 0 ? current + 1 : current - 1); restartAuto(); }
      touchX = null;
    }, { passive: true });

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) { if (timer) clearInterval(timer); }
      else restartAuto();
    });

    goTo(0);
    restartAuto();
  }

  /* ---------- Lightbox galerie ---------- */
  var galleryItems = Array.prototype.slice.call(document.querySelectorAll(".gallery-item"));
  var lightbox = document.getElementById("lightbox");
  var lbImage = document.getElementById("lbImage");
  var lbCaption = document.getElementById("lbCaption");
  var lbIndex = 0;
  var lastFocus = null;

  function largestSrc(img) {
    var srcset = img.getAttribute("srcset");
    if (!srcset) return img.currentSrc || img.src;
    var candidates = srcset.split(",").map(function (s) { return s.trim().split(/\s+/); });
    candidates.sort(function (a, b) { return parseInt(b[1] || "0", 10) - parseInt(a[1] || "0", 10); });
    return candidates[0][0];
  }

  function openLightbox(index) {
    lbIndex = (index + galleryItems.length) % galleryItems.length;
    var item = galleryItems[lbIndex];
    var img = item.querySelector("img");
    lbImage.src = largestSrc(img);
    lbImage.alt = img.alt;
    lbCaption.textContent = item.getAttribute("data-caption") || "";
    lastFocus = document.activeElement;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    document.getElementById("lbClose").focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lbImage.src = "";
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  galleryItems.forEach(function (item, index) {
    item.addEventListener("click", function () { openLightbox(index); });
  });
  document.getElementById("lbClose").addEventListener("click", closeLightbox);
  document.getElementById("lbPrev").addEventListener("click", function () { openLightbox(lbIndex - 1); });
  document.getElementById("lbNext").addEventListener("click", function () { openLightbox(lbIndex + 1); });
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  window.addEventListener("keydown", function (e) {
    if (lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") openLightbox(lbIndex - 1);
    if (e.key === "ArrowRight") openLightbox(lbIndex + 1);
  });
  var lbTouchX = null;
  lightbox.addEventListener("touchstart", function (e) { lbTouchX = e.touches[0].clientX; }, { passive: true });
  lightbox.addEventListener("touchend", function (e) {
    if (lbTouchX === null) return;
    var dx = e.changedTouches[0].clientX - lbTouchX;
    if (Math.abs(dx) > 40) openLightbox(dx < 0 ? lbIndex + 1 : lbIndex - 1);
    lbTouchX = null;
  }, { passive: true });

  /* ---------- Parallaxe douce ---------- */
  var parallaxEls = Array.prototype.slice.call(document.querySelectorAll("[data-parallax]"));
  if (!REDUCED_MOTION && parallaxEls.length) {
    var ticking = false;
    function updateParallax() {
      ticking = false;
      var vh = window.innerHeight;
      parallaxEls.forEach(function (el) {
        var host = el.parentElement;
        var rect = host.getBoundingClientRect();
        if (rect.bottom < -80 || rect.top > vh + 80) return;
        var speed = parseFloat(el.getAttribute("data-parallax")) || 0.15;
        var centerDelta = (rect.top + rect.height / 2) - vh / 2;
        var max = rect.height * 0.06;
        var offset = Math.max(-max, Math.min(max, -centerDelta * speed));
        el.style.transform = "translate3d(0," + offset.toFixed(1) + "px,0)";
      });
    }
    function requestParallax() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateParallax);
      }
    }
    window.addEventListener("scroll", requestParallax, { passive: true });
    window.addEventListener("resize", requestParallax);
    updateParallax();
  }

  /* ---------- Indicateur "ouvert / fermé" (heure de Paris) ---------- */
  var OPEN_MIN = 9 * 60 + 30;   // 09:30
  var CLOSE_MIN = 20 * 60;      // 20:00

  function parisNow() {
    var parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Paris",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      hour12: false
    }).formatToParts(new Date());
    var get = function (type) {
      var p = parts.find(function (x) { return x.type === type; });
      return p ? p.value : "";
    };
    var days = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 0 };
    return {
      day: days[get("weekday")],
      minutes: parseInt(get("hour"), 10) * 60 + parseInt(get("minute"), 10)
    };
  }

  function nextOpenDayName(fromDay) {
    // Ouvre lun (1) à sam (6). Après samedi 20h ou dimanche → lundi.
    var next = fromDay === 6 || fromDay === 0 ? 1 : fromDay + 1;
    // Nom du jour localisé : on prend une date de référence dont le jour est connu.
    var ref = new Date(Date.UTC(2026, 5, 29 + (next - 1))); // 29/06/2026 = lundi
    return new Intl.DateTimeFormat(lang === "fr" ? "fr-FR" : "en-GB", { weekday: "long" }).format(ref);
  }

  function updateOpenIndicator() {
    var wrap = document.getElementById("openIndicator");
    var textEl = document.getElementById("openText");
    if (!wrap || !textEl) return;
    var dict = I18N[lang];
    var now;
    try { now = parisNow(); } catch (e) { return; }

    var isOpenDay = now.day >= 1 && now.day <= 6;
    var open = isOpenDay && now.minutes >= OPEN_MIN && now.minutes < CLOSE_MIN;

    wrap.hidden = false;
    wrap.classList.toggle("is-closed", !open);

    if (open) {
      textEl.textContent = dict["open.until"];
    } else if (isOpenDay && now.minutes < OPEN_MIN) {
      textEl.textContent = dict["open.todayAt"];
    } else {
      textEl.textContent = dict["open.reopens"].replace("{day}", nextOpenDayName(now.day));
    }
  }

  /* ---------- Année du pied de page ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Initialisation ---------- */
  if (lang !== "fr") applyLang(lang);
  else updateOpenIndicator();
})();
