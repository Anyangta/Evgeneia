(function () {
  const splash = document.getElementById('splash');

  // 탭 닫고 재오픈 시에만 재생
  if (sessionStorage.getItem('splashSeen')) {
    splash.style.display = 'none';
    return;
  }
  sessionStorage.setItem('splashSeen', 'true');

  const canvas = document.getElementById('splash-canvas');
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  // 80×56 픽셀 캔버스 (CSS가 560×392로 확대)
  const W = 80, H = 56;
  canvas.width = W;
  canvas.height = H;

  function px(x, y, w, h, c) { ctx.fillStyle = c; ctx.fillRect(x, y, w, h); }

  // 4×5 픽셀 폰트
  const F = {
    A: [[0,1,1,0],[1,0,0,1],[1,1,1,1],[1,0,0,1],[1,0,0,1]],
    B: [[1,1,1,0],[1,0,0,1],[1,1,1,0],[1,0,0,1],[1,1,1,0]],
    C: [[0,1,1,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[0,1,1,0]],
    D: [[1,1,1,0],[1,0,0,1],[1,0,0,1],[1,0,0,1],[1,1,1,0]],
    E: [[1,1,1,1],[1,0,0,0],[1,1,1,0],[1,0,0,0],[1,1,1,1]],
    F: [[1,1,1,1],[1,0,0,0],[1,1,1,0],[1,0,0,0],[1,0,0,0]],
    G: [[0,1,1,0],[1,0,0,0],[1,0,1,1],[1,0,0,1],[0,1,1,0]],
    H: [[1,0,0,1],[1,0,0,1],[1,1,1,1],[1,0,0,1],[1,0,0,1]],
    I: [[1,1,1],[0,1,0],[0,1,0],[0,1,0],[1,1,1]],
    K: [[1,0,0,1],[1,0,1,0],[1,1,0,0],[1,0,1,0],[1,0,0,1]],
    L: [[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,1,1,1]],
    M: [[1,0,1,0,1],[1,1,0,1,1],[1,0,1,0,1],[1,0,0,0,1],[1,0,0,0,1]],
    N: [[1,0,0,1],[1,1,0,1],[1,0,1,1],[1,0,0,1],[1,0,0,1]],
    O: [[0,1,1,0],[1,0,0,1],[1,0,0,1],[1,0,0,1],[0,1,1,0]],
    P: [[1,1,1,0],[1,0,0,1],[1,1,1,0],[1,0,0,0],[1,0,0,0]],
    Q: [[0,1,1,0],[1,0,0,1],[1,0,1,1],[1,0,0,1],[0,1,1,1]],
    R: [[1,1,1,0],[1,0,0,1],[1,1,1,0],[1,0,1,0],[1,0,0,1]],
    S: [[0,1,1,1],[1,0,0,0],[0,1,1,0],[0,0,0,1],[1,1,1,0]],
    T: [[1,1,1],[0,1,0],[0,1,0],[0,1,0],[0,1,0]],
    U: [[1,0,0,1],[1,0,0,1],[1,0,0,1],[1,0,0,1],[0,1,1,0]],
    W: [[1,0,1,0,1],[1,0,1,0,1],[1,1,1,1,1],[0,1,0,1,0],[0,1,0,1,0]],
    Y: [[1,0,0,1],[1,0,0,1],[0,1,1,0],[0,0,1,0],[0,0,1,0]],
    Z: [[1,1,1,1],[0,0,0,1],[0,1,1,0],[1,0,0,0],[1,1,1,1]],
    '0': [[0,1,1,0],[1,0,0,1],[1,0,0,1],[1,0,0,1],[0,1,1,0]],
    '1': [[0,1,0],[1,1,0],[0,1,0],[0,1,0],[1,1,1]],
    '>': [[1,0,0],[0,1,0],[0,0,1],[0,1,0],[1,0,0]],
    '=': [[0,0,0],[1,1,1],[0,0,0],[1,1,1],[0,0,0]],
    '*': [[1,0,1],[0,1,0],[1,0,1],[0,0,0],[0,0,0]],
    ';': [[0,1],[0,1],[0,0],[0,1],[1,0]],
    '-': [[0,0,0],[0,0,0],[1,1,1],[0,0,0],[0,0,0]],
  };

  function gw(ch) {
    if (ch === ' ') return 3;
    const g = F[ch.toUpperCase()];
    return g ? g[0].length + 1 : 5;
  }

  function txt(str, sx, sy, col, max) {
    let cx = sx;
    const n = max !== undefined ? Math.min(max, str.length) : str.length;
    for (let i = 0; i < n; i++) {
      const ch = str[i].toUpperCase();
      if (ch === ' ') { cx += 3; continue; }
      const g = F[ch];
      if (!g) { cx += 4; continue; }
      g.forEach((row, ry) => row.forEach((bit, rx) => {
        if (bit) px(cx + rx, sy + ry, 1, 1, col);
      }));
      cx += g[0].length + 1;
    }
    return cx;
  }

  // 페이즈 상수 & 시작 시간 (ms)
  const PH = { DARK: 0, LIGHT: 1, RACK: 2, CONNECT: 3, QUERY: 4, DONE: 5, OUT: 6 };
  const PT = [0, 350, 850, 1700, 2350, 3700, 5200];

  // 형광등 깜빡임 패턴
  const FLICK = [0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  const t0 = Date.now();
  let phase = 0, rafId;
  const ptcls = [];

  // ── 메인 드로우 ──────────────────────────
  function draw(ms) {
    // 배경
    px(0, 0, W, H, '#060810');
    ctx.fillStyle = 'rgba(15,35,90,0.12)';
    for (let y = 44; y < H; y += 4) ctx.fillRect(0, y, W, 1);
    ctx.fillStyle = 'rgba(15,35,90,0.06)';
    for (let x = 0; x < W; x += 8) ctx.fillRect(x, 44, 1, 12);

    // 천장 형광등
    let la = 0;
    if (phase === PH.LIGHT) {
      const step = Math.min(FLICK.length - 1, Math.floor((ms - PT[1]) / 55));
      la = FLICK[step];
    } else if (phase >= PH.RACK) la = 1;
    if (la) {
      px(12, 0, 56, 1, `rgba(190,210,255,${la * 0.9})`);
      px(13, 1, 54, 1, `rgba(140,170,255,${la * 0.4})`);
      const g = ctx.createLinearGradient(0, 0, 0, 18);
      g.addColorStop(0, `rgba(80,120,255,${la * 0.16})`);
      g.addColorStop(1, 'rgba(80,120,255,0)');
      ctx.fillStyle = g;
      ctx.fillRect(12, 0, 56, 18);
    }

    // 서버 랙
    rack(0, 6, false, ms);
    rack(63, 6, true, ms);

    // 데이터 파티클
    if (phase >= PH.CONNECT) {
      if (Math.random() < 0.22) {
        const fl = Math.random() > 0.5;
        ptcls.push({
          x: fl ? 18 : 57,
          y: 10 + Math.random() * 24,
          vx: fl ? 0.75 : -0.75,
          vy: (Math.random() - 0.5) * 0.14,
          life: 1,
          r: fl ? [0, 110, 255] : [130, 60, 255],
        });
      }
      for (let i = ptcls.length - 1; i >= 0; i--) {
        const p = ptcls[i];
        p.x += p.vx; p.y += p.vy; p.life -= 0.019;
        if (p.life <= 0 || p.x < 18 || p.x > 57) { ptcls.splice(i, 1); continue; }
        px(p.x | 0, p.y | 0, 1, 1, `rgba(${p.r[0]},${p.r[1]},${p.r[2]},${p.life})`);
      }
      // 점선 연결선
      const dp = Math.floor(ms / 200) % 4;
      ctx.fillStyle = 'rgba(0,80,200,0.18)';
      for (let x = 18; x < 24; x++) if ((x + dp) % 4 < 2) ctx.fillRect(x, 22, 1, 1);
      ctx.fillStyle = 'rgba(110,50,200,0.18)';
      for (let x = 57; x < 63; x++) if ((x - dp) % 4 < 2) ctx.fillRect(x, 22, 1, 1);
    }

    // 모니터
    monitor(ms);

    // DB 실린더
    if (phase >= PH.RACK) {
      cyl(1, 43, [0, 55, 170], [0, 90, 255], Math.min(1, (ms - PT[2]) / 600));
    }
    if (phase >= PH.RACK && ms - PT[2] > 400) {
      cyl(64, 43, [100, 30, 200], [160, 60, 255], Math.min(1, (ms - PT[2] - 400) / 600));
    }

    // 타이틀 & 로딩바
    if (phase >= PH.DONE) {
      const ta = Math.min(1, (ms - PT[5]) / 500);
      const lp = Math.min(1, (ms - PT[5]) / 1100);
      txt('DB LAB', 26, 44, `rgba(0,130,255,${ta})`);
      px(15, 52, 50, 2, '#060c18');
      px(15, 52, Math.floor(50 * lp), 2, '#0055dd');
      if (lp > 0) {
        ctx.fillStyle = 'rgba(0,90,255,0.28)';
        ctx.fillRect(15, 51, Math.floor(50 * lp), 1);
      }
    }
  }

  // ── 서버 랙 ──────────────────────────────
  function rack(rx, ry, right, ms) {
    px(rx, ry, 17, 36, '#090f1e');
    px(rx, ry, 17, 1, '#13203a');
    px(rx, ry + 35, 17, 1, '#13203a');
    px(rx, ry, 1, 36, '#13203a');
    px(rx + 16, ry, 1, 36, '#13203a');
    px(rx + 1, ry + 36, 2, 4, '#07090f');
    px(rx + 13, ry + 36, 2, 4, '#07090f');

    for (let u = 0; u < 4; u++) {
      const uy = ry + 2 + u * 8;
      px(rx + 1, uy, 15, 7, '#0b1728');
      px(rx + 1, uy, 15, 1, '#142238');
      px(rx + 1, uy + 6, 15, 1, '#060b15');
      for (let d = 0; d < 3; d++) px(rx + 2 + d * 4, uy + 2, 3, 3, '#080c16');

      const delay = PT[2] + (right ? u + 3 : u) * 200;
      const on = ms > delay;
      const lx = right ? rx + 1 : rx + 15;
      px(lx, uy + 1, 1, 1, on ? (right ? '#8833ff' : '#00ee77') : '#111');
      px(lx, uy + 3, 1, 1, (on && Math.floor(ms / (75 + u * 40)) % (3 + u) === 0) ? '#ffaa00' : '#150b00');
    }
  }

  // ── 모니터 ──────────────────────────────
  function monitor(ms) {
    px(23, 7, 34, 32, '#0b1220');
    px(23, 7, 34, 1, '#162035'); px(23, 38, 34, 1, '#162035');
    px(23, 7, 1, 32, '#162035'); px(56, 7, 1, 32, '#162035');
    px(24, 8, 32, 30, '#080f1c');
    px(25, 9, 30, 28, '#030810');
    px(36, 39, 8, 2, '#0b1220');
    px(33, 41, 14, 1, '#0b1220');

    if (phase < PH.RACK) return;

    const ga = Math.min(1, (ms - PT[2]) / 600);
    px(25, 9, 30, 28, '#030c1a');
    ctx.fillStyle = `rgba(0,100,220,${ga * 0.1})`;
    for (let sl = 9; sl < 37; sl += 2) ctx.fillRect(25, sl, 30, 1);

    const gr = ctx.createRadialGradient(40, 23, 0, 40, 23, 24);
    gr.addColorStop(0, `rgba(0,80,200,${ga * 0.18})`);
    gr.addColorStop(1, 'rgba(0,80,200,0)');
    ctx.fillStyle = gr;
    ctx.fillRect(0, 0, W, H);
    px(54, 37, 1, 1, `rgba(0,80,220,${ga})`);

    // 화면 클리핑
    ctx.save();
    ctx.beginPath();
    ctx.rect(25, 9, 30, 28);
    ctx.clip();

    if (phase >= PH.QUERY) {
      const SQL = ['SEL *', 'FROM', 'ID=1;'];
      const chs = Math.floor((ms - PT[4]) / 90);
      const cols = ['#3399ff', '#2288ee', '#44aaff'];
      let drawn = 0, curL = -1, curI = 0;

      for (let li = 0; li < SQL.length; li++) {
        const ln = SQL[li];
        const show = Math.max(0, Math.min(ln.length, chs - drawn));
        if (show > 0) txt(ln, 27, 11 + li * 7, cols[li], show);
        if (drawn + ln.length >= chs && curL < 0) { curL = li; curI = chs - drawn; }
        drawn += ln.length;
      }

      // 커서 깜빡임
      const total = SQL.reduce((s, l) => s + l.length, 0);
      if (chs < total && Math.floor(ms / 450) % 2 === 0 && curL >= 0) {
        let cx = 27;
        for (let ci = 0; ci < curI; ci++) cx += gw(SQL[curL][ci]);
        px(cx, 11 + curL * 7, 1, 5, cols[curL]);
      }

      // 결과 표시
      if (phase >= PH.DONE) {
        const ra = Math.min(1, (ms - PT[5]) / 350);
        txt('> OK', 27, 32, `rgba(0,220,110,${ra})`);
      }
    } else if (ga > 0.4) {
      const fa = (ga - 0.4) / 0.6;
      txt('BOOT', 30, 14, `rgba(0,80,200,${fa})`);
      txt('DB', 35, 22, `rgba(0,60,180,${fa * 0.7})`);
    }

    ctx.restore();
  }

  // ── DB 실린더 ─────────────────────────────
  function cyl(cx, cy, body, rim, alpha) {
    const [br, bg, bb] = body, [rr, rg, rb] = rim, a = alpha;
    px(cx, cy, 13, 8, `rgba(${br},${bg},${bb},${a})`);
    px(cx, cy, 13, 1, `rgba(${rr},${rg},${rb},${a})`);
    px(cx, cy + 7, 13, 1, `rgba(${rr},${rg},${rb},${a})`);
    px(cx, cy + 3, 13, 1, `rgba(${Math.max(0, br - 15)},${Math.max(0, bg - 15)},${Math.max(0, bb - 15)},${a * 0.35})`);
    px(cx + 1, cy - 2, 11, 3, `rgba(${br},${bg},${bb},${a * 0.9})`);
    px(cx + 2, cy - 3, 9, 1, `rgba(${rr},${rg},${rb},${a})`);
    px(cx + 1, cy - 2, 11, 1, `rgba(${rr},${rg},${rb},${a * 0.45})`);
  }

  // ── 게임 루프 ─────────────────────────────
  function tick() {
    const ms = Date.now() - t0;
    const ord = [PH.OUT, PH.DONE, PH.QUERY, PH.CONNECT, PH.RACK, PH.LIGHT];
    for (const ph of ord) {
      if (ms >= PT[ph] && phase < ph) { phase = ph; break; }
    }
    if (phase >= PH.OUT) { dismiss(); return; }
    draw(ms);
    rafId = requestAnimationFrame(tick);
  }

  function dismiss() {
    cancelAnimationFrame(rafId);
    splash.classList.add('hide');
    splash.addEventListener('transitionend', () => splash.style.display = 'none', { once: true });
  }

  // 클릭 시 스킵
  splash.addEventListener('click', dismiss);
  requestAnimationFrame(tick);
})();