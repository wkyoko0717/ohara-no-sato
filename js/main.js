// ============================================================
//  大原の里 — main.js
//  依存: GSAP 3 + ScrollTrigger (CDN or npm)
// ============================================================

gsap.registerPlugin(ScrollTrigger);

// ------------------------------------------------------------
//  INITIAL STATES — アニメーション前の初期値をセット
// ------------------------------------------------------------
gsap.set('#siteNav', { opacity: 0, y: -12 });
gsap.set('#logo-ja', { opacity: 0, y: 18 });
gsap.set('#heroRule', { width: 0, opacity: 0 });
gsap.set('#logo-en', { opacity: 0, letterSpacing: '0.9em' });
gsap.set('#heroBg', { opacity: 0, scale: 1.06 });
gsap.set('#hero-tagline', { opacity: 0, y: 18 });
gsap.set('#scroll-hint', { opacity: 0 });

// ------------------------------------------------------------
//  OPENING TIMELINE — ページ読み込み時の演出
// ------------------------------------------------------------
const intro = gsap.timeline({ delay: 0.4 });

// 1. 漢字ロゴがふわっと浮き上がる
intro.to('#logo-ja', {
  opacity: 1,
  y: 0,
  duration: 1.6,
  ease: 'power2.inOut'
});

// 2. ゴールドの水平線が静かに伸びる
intro.to('#heroRule', {
  opacity: 1,
  width: '50px',
  duration: 0.9,
  ease: 'power2.out'
}, '-=0.8');

// 3. 英字サブタイトル — 字間が縮まりながら現れる
intro.to('#logo-en', {
  opacity: 1,
  letterSpacing: '0.6em',
  duration: 1.3,
  ease: 'power2.out'
}, '-=0.5');

// 4. 背景画像がロゴの奥からゆっくり浮かび上がる
intro.to('#heroBg', {
  opacity: 1,
  scale: 1,
  duration: 2.5,
  ease: 'power1.inOut'
}, 0.5); // ロゴより少し遅れてスタートし、長く重なる

// 5. キャッチコピーが現れる
intro.to('#hero-tagline', {
  opacity: 1,
  y: 0,
  duration: 1.0,
  ease: 'power2.out'
}, 2.8);

// 6. スクロールヒントが現れる
intro.to('#scroll-hint', {
  opacity: 1,
  duration: 0.8
}, 3.2);

// 7. ナビがスライドダウン
intro.to('#siteNav', {
  opacity: 1,
  y: 0,
  duration: 1.5,
  ease: 'power2.out'
}, 2.9);

intro.from('.nav-links li', { // aタグじゃなくliを動かすのがコツ！
  opacity: 0,
  y: -5,           // 下から少し浮き上がる感じ
  duration: 1.0,
  stagger: 0.1,    // これを入れると「旅館について」「温泉」...が順番に出る！
  ease: 'power2.out'
}, '+=0');       // ナビの動き出しから0.2秒遅らせる

// ------------------------------------------------------------
//  HERO PARALLAX
// ------------------------------------------------------------
gsap.to('#heroBg', {
  yPercent: 28,
  ease: 'none',
  scrollTrigger: {
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  }
});

// ------------------------------------------------------------
//  ONSEN PARALLAX
// ------------------------------------------------------------
gsap.to('#onsenBg', {
  yPercent: 28,
  ease: 'none',
  scrollTrigger: {
    trigger: '#onsen',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true
  }
});

// ------------------------------------------------------------
//  NAV — スクロールでスタイルが切り替わる
// ------------------------------------------------------------
const siteNav = document.getElementById('siteNav');

ScrollTrigger.create({
  trigger: '#hero',
  start: 'bottom 92%',
  onEnter: () => siteNav.classList.add('is-scrolled'),
  onLeaveBack: () => siteNav.classList.remove('is-scrolled')
});

// ------------------------------------------------------------
//  SECTION REVEALS — .reveal クラスの要素が下からフェードイン
// ------------------------------------------------------------
gsap.utils.toArray('.reveal').forEach(el => {
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 1.1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 86%',
      toggleActions: 'play none none none'
    }
  });
});

// ------------------------------------------------------------
//  RULED BAR — ゴールドの横線が左から伸びる
// ------------------------------------------------------------
gsap.utils.toArray('.ruled-bar').forEach(bar => {
  gsap.to(bar, {
    width: '55px',
    duration: 1.0,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: bar,
      start: 'top 88%'
    }
  });
});

// ------------------------------------------------------------
//  MISO RULE — 中央から両側に伸びる
// ------------------------------------------------------------
gsap.to('.miso-rule', {
  width: '80px',
  duration: 1.2,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.miso-rule',
    start: 'top 88%'
  }
});

// ------------------------------------------------------------
//  CUISINE GRID — 3枚の画像が時間差で現れる
// ------------------------------------------------------------
gsap.utils.toArray('.cuisine-grid .main-img, .cuisine-grid .sub-img').forEach((el, i) => {
  gsap.from(el, {
    opacity: 0,
    scale: 1.04,
    duration: 1.3,
    delay: i * 0.18,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#cuisine',
      start: 'top 78%'
    }
  });
});

gsap.to('body', {
  scrollTrigger: {
    trigger: '#access',    // このセクションが
    start: 'top 80%',       // 画面の8割くらいの位置に来たら開始
    end: 'top 20%',         // 通り過ぎる頃には完了
    scrub: true,            // スクロールに合わせてじわじわ変える（パッといきたいならfalseに）
  },
  backgroundColor: '#f5f1e9', // $parchmentの色
  ease: 'none'
});

// ------------------------------------------------------------
//  ACCESS ITEMS — 順番に流れ込む
// ------------------------------------------------------------
gsap.utils.toArray('.access-item').forEach((el, i) => {
  gsap.from(el, {
    opacity: 0,
    y: 30,
    duration: 0.9,
    delay: i * 0.12,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#access',
      start: 'top 80%'
    }
  });
});
