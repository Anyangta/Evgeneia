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

    // 80×56 픽셀 캔버스 (CSS가 640×448로 확대)
    const W = 80, H = 56;
    canvas.width = W;
    canvas.height = H;

    // 사각형 그리기 헬퍼
    function p(x, y, w, h, c) {
        ctx.fillStyle = c;
        ctx.fillRect(x, y, w, h);
    }

    // 4×5 픽셀 폰트
    const FONT = {
        E: [[1,1,1,1],[1,0,0,0],[1,1,1,0],[1,0,0,0],[1,1,1,1]],
        L: [[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,1,1,1]],
        A: [[0,1,1,0],[1,0,0,1],[1,1,1,1],[1,0,0,1],[1,0,0,1]],
        B: [[1,1,1,0],[1,0,0,1],[1,1,1,0],[1,0,0,1],[1,1,1,0]],
        O: [[0,1,1,0],[1,0,0,1],[1,0,0,1],[1,0,0,1],[0,1,1,0]],
        T: [[1,1,1,1],[0,1,1,0],[0,1,1,0],[0,1,1,0],[0,1,1,0]],
        '>': [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,1,0,0],[1,0,0,0]],
    };

    function drawText(str, sx, sy, col, maxLen) {
        let cx = sx;
        const lim = maxLen !== undefined ? maxLen : str.length;
        for (let i = 0; i < lim && i < str.length; i++) {
            const ch = str[i].toUpperCase();
            if (ch === ' ') { cx += 3; continue; }
            const g = FONT[ch];
            if (!g) { cx += 5; continue; }
            g.forEach((row, ry) => row.forEach((bit, rx) => {
                if (bit) p(cx + rx, sy + ry, 1, 1, col);
            }));
            cx += 5;
        }
    }

    // 페이즈 상수 & 시작 시간 (ms)
    const PH = { ROOM:0, TYPE:1, REACH:2, FLICKER:3, TEXT:4, LOAD:5, OUT:6 };
    const PT = [0, 800, 1600, 2000, 2400, 3900, 4900];

    // 모니터 켜질 때 깜빡임 패턴 (0=꺼짐, 1=켜짐, 50ms 단위)
    const FLICKER = [0,1,0,1,0,1,1,1];

    const t0 = Date.now();
    let phase = 0;
    let rafId;

    function draw(ms) {
        // ── 배경 ──────────────────────────
        p(0, 0, W, 50, '#0a0a16');
        for (let y = 0; y < 50; y += 5) {
            ctx.fillStyle = 'rgba(255,255,255,0.015)';
            ctx.fillRect(0, y, W, 1);
        }
        p(0, 50, W, 6, '#0f0f1e');
        p(0, 50, W, 1, '#1a1a2a');

        // ── 의자 ──────────────────────────
        p(32, 24, 16,  2, '#363648');
        p(32, 26,  2,  9, '#2a2a3a');
        p(46, 26,  2,  9, '#2a2a3a');
        p(28, 37, 24,  3, '#2a2a3a');
        p(28, 37, 24,  1, '#363648');
        p(29, 40,  2, 10, '#222230');
        p(49, 40,  2, 10, '#222230');
        p(34, 44, 12,  1, '#222230');

        // ── 책상 ──────────────────────────
        p(8, 33, 64, 3, '#7a4e28');
        p(8, 36, 64, 1, '#4a2e14');
        p(9, 37,  3, 13, '#4a2e14');
        p(68, 37, 3, 13, '#4a2e14');

        // ── 키보드 ─────────────────────────
        p(26, 31, 28, 2, '#161616');
        for (let k = 0; k < 5; k++) p(27 + k * 5, 31, 4, 1, '#222222');

        // ── 모니터 ─────────────────────────
        p(32, 32, 16, 2, '#1a1a1a'); // 받침
        p(30, 33, 20, 1, '#1a1a1a');
        p(37, 29,  6, 4, '#1a1a1a'); // 목
        p(22, 10, 36, 20, '#1a1a1a'); // 본체
        p(23, 11, 34, 18, '#242424');

        // 화면 상태 계산
        let scrBg = '#050808', glowA = 0, monOn = false;

        if (phase === PH.FLICKER) {
            const step = Math.min(FLICKER.length - 1, Math.floor((ms - PT[PH.FLICKER]) / 50));
            monOn = FLICKER[step] === 1;
            scrBg = monOn ? '#081408' : '#050808';
            glowA = monOn ? 0.5 : 0;
        } else if (phase >= PH.TEXT) {
            monOn = true;
            glowA = Math.min(1, (ms - PT[PH.TEXT]) / 300);
            scrBg = '#081408';
        }

        p(24, 12, 32, 15, scrBg); // 화면

        // 스캔라인
        if (glowA > 0) {
            ctx.fillStyle = `rgba(0,200,70,${glowA * 0.2})`;
            for (let sl = 12; sl < 27; sl += 2) ctx.fillRect(24, sl, 32, 1);
        }

        // 모니터 빛 번짐
        if (glowA > 0) {
            const gr = ctx.createRadialGradient(40, 19, 0, 40, 19, 28);
            gr.addColorStop(0, `rgba(0,200,80,${glowA * 0.15})`);
            gr.addColorStop(1, 'rgba(0,200,80,0)');
            ctx.fillStyle = gr;
            ctx.fillRect(0, 0, W, H);
        }

        // 화면 텍스트 타이핑
        if (phase >= PH.TEXT) {
            const chars = Math.floor((ms - PT[PH.TEXT]) / 130);
            const L1 = 'EL LAB', L2 = '> BOOT';
            drawText(L1, 25, 14, '#00ff66', Math.min(chars, L1.length));
            if (chars > L1.length) {
                drawText(L2, 25, 21, '#00cc44', chars - L1.length);
            }
            // 커서 깜빡임
            if (Math.floor(ms / 400) % 2 === 0) {
                const total = Math.min(chars, L1.length + L2.length);
                const onL2 = total > L1.length;
                const lc  = onL2 ? total - L1.length : total;
                const txt = onL2 ? L2 : L1;
                let cx = 25;
                for (let i = 0; i < lc && i < txt.length; i++) cx += txt[i] === ' ' ? 3 : 5;
                p(cx, onL2 ? 21 : 14, 1, 5, '#00ff66');
            }
        }

        // 전원 LED
        p(53, 28, 2, 1, monOn ? '#00aa44' : '#252525');

        // ── 사람 ──────────────────────────
        // 다리
        p(35, 37, 5, 4, '#1e2030');
        p(40, 37, 5, 4, '#1e2030');

        // 상체
        p(33, 26, 14,  8, '#1a3460');
        p(33, 32, 14,  2, '#0e2040');

        // 왼팔 (키보드 위, 타이핑 애니메이션)
        const tap = phase === PH.TYPE && Math.floor(ms / 180) % 2;
        p(24, 29 + (tap ? 1 : 0), 9, 3, '#1a3460');
        p(24, 31 + (tap ? 1 : 0), 5, 1, '#e8a070');

        // 오른팔 (전원 버튼 향해 올라갔다가 복귀)
        const reach =
            phase === PH.REACH   ? Math.min(1, (ms - PT[PH.REACH]) / 300) :
            phase === PH.FLICKER ? 1 :
            phase === PH.TEXT    ? Math.max(0, 1 - (ms - PT[PH.TEXT]) / 400) : 0;

        const ax = Math.round(46 + reach * 6);
        const ay = Math.round(29 - reach * 3);
        p(ax, ay, 10, 3, '#1a3460');
        if (reach > 0.7) {
            p(56, 27, 3, 1, '#e8a070'); // 버튼 누르는 손
        } else {
            p(46, 31, 5, 1, '#e8a070'); // 키보드 위 손
        }

        // 목
        p(37, 25, 6, 2, '#e8a070');

        // 머리카락
        p(35, 20, 10, 3, '#160a00');
        p(34, 22,  1, 3, '#160a00');
        p(45, 22,  1, 3, '#160a00');

        // 얼굴
        p(35, 22, 10, 6, '#e8a070');

        // 눈
        p(37, 24, 2, 1, '#200a00');
        p(42, 24, 2, 1, '#200a00');

        // 코
        p(39, 26, 2, 1, '#c07850');

        // 입 (모니터 켜진 후 800ms 뒤 미소)
        if (phase >= PH.TEXT && ms - PT[PH.TEXT] > 800) {
            p(37, 27, 1, 1, '#c07850');
            p(38, 28, 4, 1, '#c07850');
            p(42, 27, 1, 1, '#c07850');
        } else {
            p(37, 27, 6, 1, '#c07850');
        }

        // 모니터 빛 얼굴 반사
        if (glowA > 0.4) {
            ctx.fillStyle = `rgba(0,200,80,${(glowA - 0.4) * 0.1})`;
            ctx.fillRect(35, 20, 10, 8);
        }

        // ── 로딩바 ─────────────────────────
        if (phase >= PH.LOAD) {
            const lp = Math.min(1, (ms - PT[PH.LOAD]) / 800);
            p(20, 52, 40,                  2, '#1a1a2a');
            p(20, 52, Math.floor(40 * lp), 2, '#00cc55');
        }
    }

    function tick() {
        const ms = Date.now() - t0;

        // 페이즈 전환
        if      (ms >= PT[PH.OUT]     && phase < PH.OUT)     phase = PH.OUT;
        else if (ms >= PT[PH.LOAD]    && phase < PH.LOAD)    phase = PH.LOAD;
        else if (ms >= PT[PH.TEXT]    && phase < PH.TEXT)    phase = PH.TEXT;
        else if (ms >= PT[PH.FLICKER] && phase < PH.FLICKER) phase = PH.FLICKER;
        else if (ms >= PT[PH.REACH]   && phase < PH.REACH)   phase = PH.REACH;
        else if (ms >= PT[PH.TYPE]    && phase < PH.TYPE)    phase = PH.TYPE;

        if (phase >= PH.OUT) {
            dismiss();
            return;
        }

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