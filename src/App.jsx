import { useState, useEffect } from "react";
import { Trophy, Users, Plus, X, Check, Crown, Sword, Shuffle, Star, Zap, Eye, EyeOff, RefreshCw, ChevronUp, ChevronDown, Award, Target } from "lucide-react";

// ─── Default Data ──────────────────────────────────────────────
const DEFAULT_TEAMS = [{"name":"Пивні Кіборги ","player1":"Дишлюк Денис","player2":"Денисюк Даніл / (au)БУДУ БАНИТЬ","sub":"","id":1778744515616,"color":"#f9c522"},{"name":"ТАБАБА","player1":"Майстренко Олексій / inti","player2":"Сімонов Олександр","sub":"","id":1778744861855,"color":"#ff8c00"},{"name":"Масони","player1":"Радучич Вадим / bozdi","player2":"Кисет Ілля/Top4ik","sub":"","id":1778744964447,"color":"#e84393"},{"name":"Канабіси","player1":"Домінюк Кароліна/ голий їжачок ","player2":"Петренко Ярослав","sub":"","id":1778745004863,"color":"#9b1fde"},{"name":"2-Кусочка сала","player1":"Кіріченко Роман ","player2":"Джерін Костянтин ","sub":"","id":1778745028175,"color":"#22c5f9"},{"name":"GYMBROO","player1":"Яговий Дмитро/Ок","player2":"Секрет Віталій ","sub":"","id":1778745060568,"color":"#22f977"},{"name":"наві","player1":"Циганок Максим / SYNQ1XX ","player2":"Дяченко Вадим/ вадимка🫨☦️","sub":"","id":1778745083071,"color":"#f95252"},{"name":"Ihori","player1":"Simple","player2":"Сокур Роман NeExP_hub","sub":"Томенюк Іван /ролекс ","id":1778745106703,"color":"#c5f922"},{"name":"Гроші в тумбочкі","player1":"Верещака Валерія / Cactus ","player2":"Лизогуб Валерія/<3","sub":"","id":1778745140879,"color":"#f9a522"},{"name":"sixseven","player1":"Потапенко Вікторія/ vixxss07","player2":"Лебідь Ярослав / SHAMEL","sub":"","id":1778754685072,"color":"#2254f9"},{"name":"лопухи","player1":"Буряк Марія/ meet","player2":"Саєнко Емма","sub":"","id":1778754736449,"color":"#f922c5"},{"name":"цвіркуни","player1":"Паламарчук Віталій ","player2":"Українець Віктор / VERFEN","sub":"","id":1778754823864,"color":"#22f9c5"},{"name":"ред бул","player1":"Крапива Назар ","player2":"Nazar Zagorodnij","sub":"","id":1778754851560,"color":"#aef922"},{"name":"Totem","player1":"Салан Єгор / Da1RoYY","player2":"Онойко Андрій / E1xzen ","sub":"","id":1778754946904,"color":"#9922f9"},{"name":"Кракен","player1":"Поцепаєв Іван","player2":"Джунусов Святослав / Tilted|🇺🇦","sub":"","id":1778754989664,"color":"#f97722"},{"name":"99x505","player1":"Голубʼєв Давид / gd | シ","player2":"Рябець Єгор/z0707ss","sub":"","id":1778755029752,"color":"#f9c522"},{"name":"Maslodolb","player1":"Юсупов Максим / симон","player2":"Маттео Горожанкін","sub":"Федорченко Іван / борщик","id":1778755101008,"color":"#ff8c00"},{"name":"квадратік","player1":"Тараненко Олександр","player2":"Іваненко Андрій","sub":"","id":1778755146361,"color":"#e84393"},{"name":"Смердольфіки","player1":"Соломаха Олександр @_саньок_@","player2":"Кримський Діма / Chushka5","sub":"","id":1778755193304,"color":"#9b1fde"},{"name":"гуд зона","player1":"Онофрей, Ростислав / Drago Raymond ","player2":"Артем Маляренко ","sub":"","id":1778755640640,"color":"#22c5f9"}];

const DEFAULT_ROUNDS = [{"id":1778756416209,"day":1,"roundNum":1,"lobbies":[{"id":"A","teamIds":[1778754946904,1778755101008,1778745106703,1778754823864,1778744964447],"results":{"1778754946904":{"placement":2,"kills":3},"1778755101008":{"placement":1,"kills":7},"1778745106703":{"placement":4,"kills":0},"1778754823864":{"placement":3,"kills":2},"1778744964447":{"placement":5,"kills":0}}},{"id":"B","teamIds":[1778754851560,1778755146361,1778755193304,1778745140879,1778755640640],"results":{"1778754851560":{"placement":5,"kills":1},"1778755146361":{"placement":4,"kills":1},"1778755193304":{"placement":2,"kills":0},"1778745140879":{"placement":1,"kills":6},"1778755640640":{"placement":3,"kills":2}}},{"id":"C","teamIds":[1778754736449,1778744861855,1778745060568,1778745083071,1778745004863],"results":{"1778754736449":{"placement":1,"kills":3},"1778744861855":{"placement":4,"kills":0},"1778745060568":{"placement":5,"kills":1},"1778745083071":{"placement":2,"kills":6},"1778745004863":{"placement":3,"kills":3}}},{"id":"L4","teamIds":[1778744515616,1778754989664,1778745028175,1778755029752,1778754685072],"results":{"1778744515616":{"placement":3,"kills":2},"1778754989664":{"placement":2,"kills":6},"1778745028175":{"placement":1,"kills":4},"1778755029752":{"placement":4,"kills":1},"1778754685072":{"placement":5,"kills":0}}}]}];

// ─── Constants ────────────────────────────────────────────────
const PLACEMENT_PTS = { 1: 10, 2: 7, 3: 5, 4: 3, 5: 1 };
const LOBBY_LABELS = ["A", "B", "C"];
const TEAM_COLORS = [
  "#f9c522","#ff8c00","#e84393","#9b1fde","#22c5f9",
  "#22f977","#f95252","#c5f922","#f9a522","#2254f9",
  "#f922c5","#22f9c5","#aef922","#9922f9","#f97722",
];
const DAY_COLORS = { 1: "#f9c522", 2: "#ff8c00", 3: "#e84393" };

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function computeStandings(teams, rounds) {
  const pts = {}, kills = {}, wins = {}, gamesPlayed = {};
  teams.forEach(t => { pts[t.id] = 0; kills[t.id] = 0; wins[t.id] = 0; gamesPlayed[t.id] = 0; });

  rounds.forEach(r => {
    r.lobbies.forEach(lobby => {
      if (!lobby.results || Object.keys(lobby.results).length === 0) return;
      Object.entries(lobby.results).forEach(([tid, res]) => {
        if (!pts[tid] && pts[tid] !== 0) return;
        pts[tid] += (PLACEMENT_PTS[res.placement] || 0) + (res.kills || 0);
        kills[tid] += res.kills || 0;
        if (res.placement === 1) wins[tid]++;
        gamesPlayed[tid]++;
      });
    });
  });

  return teams
    .map(t => ({ ...t, points: pts[t.id] || 0, kills: kills[t.id] || 0, wins: wins[t.id] || 0, gamesPlayed: gamesPlayed[t.id] || 0 }))
    .sort((a, b) => b.points - a.points || b.kills - a.kills || b.wins - a.wins);
}

// ─── Styles ────────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Russo+One&family=Barlow:wght@400;600;700;800;900&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #07071a; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #10102a; }
  ::-webkit-scrollbar-thumb { background: #f9c52244; border-radius: 2px; }
  .bs-card { transition: border-color .18s, transform .18s, box-shadow .18s; }
  .bs-card:hover { border-color: rgba(249,197,34,.45) !important; transform: translateY(-1px); box-shadow: 0 6px 24px rgba(249,197,34,.07); }
  .bs-btn { transition: all .15s; cursor: pointer; }
  .bs-btn:hover { filter: brightness(1.1); transform: translateY(-1px); }
  .bs-btn:active { transform: translateY(0); }
  .tab { transition: all .15s; cursor: pointer; }
  .tab:hover { background: rgba(255,255,255,.06) !important; }
  .rank-1 { background: linear-gradient(135deg,rgba(249,197,34,.15),rgba(255,140,0,.08)); border-color: rgba(249,197,34,.5) !important; }
  .rank-2 { background: linear-gradient(135deg,rgba(200,200,220,.1),rgba(180,180,200,.05)); border-color: rgba(200,200,220,.3) !important; }
  .rank-3 { background: linear-gradient(135deg,rgba(205,127,50,.12),rgba(180,100,30,.06)); border-color: rgba(205,127,50,.35) !important; }
  input, select { font-family: 'Barlow', sans-serif; }
  input:focus, select:focus { outline: none; border-color: #f9c522 !important; box-shadow: 0 0 0 2px rgba(249,197,34,.15); }
  .pulse { animation: pulse 2s ease-in-out infinite; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.6} }
  .spin { animation: spin .8s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .fade-in { animation: fadeIn .3s ease; }
  @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
  
  /* Mobile Responsive */
  @media (max-width: 768px) {
    .bs-card { border-radius: 10px; padding: 12px; }
    .bs-btn { padding: 8px 16px; font-size: 12px; }
  }
  @media (max-width: 480px) {
    body { font-size: 13px; }
    .bs-card { border-radius: 8px; padding: 10px; }
    .bs-btn { padding: 6px 12px; font-size: 11px; }
  }
`;
  @keyframes spin { to { transform: rotate(360deg); } }
  .fade-in { animation: fadeIn .3s ease; }
  @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
`;

const C = {
  bg: "#07071a",
  card: "#0e0e26",
  card2: "#13132e",
  border: "rgba(255,255,255,.08)",
  borderHover: "rgba(249,197,34,.4)",
  primary: "#f9c522",
  secondary: "#ff8c00",
  pink: "#e84393",
  purple: "#9b1fde",
  text: "#fff",
  muted: "rgba(255,255,255,.45)",
  dim: "rgba(255,255,255,.18)",
};

// ─── Shared UI ────────────────────────────────────────────────
const Card = ({ children, style, className = "", onClick }) => (
  <div
    className={`bs-card ${className}`}
    onClick={onClick}
    style={{
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 14,
      padding: 16,
      ...style,
    }}
  >{children}</div>
);

const Btn = ({ children, onClick, color = C.primary, style, small, disabled, variant = "fill" }) => (
  <button
    className="bs-btn"
    onClick={onClick}
    disabled={disabled}
    style={{
      background: variant === "fill" ? color : "transparent",
      color: variant === "fill" ? "#0a0a1a" : color,
      border: `2px solid ${color}`,
      borderRadius: 100,
      padding: small ? "6px 14px" : "10px 22px",
      fontFamily: "Russo One",
      fontSize: small ? 11 : 13,
      cursor: disabled ? "not-allowed" : "pointer",
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      opacity: disabled ? .45 : 1,
      whiteSpace: "nowrap",
      ...style,
    }}
  >{children}</button>
);

const Badge = ({ children, color = C.primary }) => (
  <span style={{
    background: color + "22",
    color,
    border: `1px solid ${color}44`,
    borderRadius: 100,
    padding: "2px 10px",
    fontSize: 11,
    fontWeight: 700,
    fontFamily: "Barlow",
    whiteSpace: "nowrap",
  }}>{children}</span>
);

const SectionTitle = ({ icon, children }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
    <span style={{ fontSize: 18 }}>{icon}</span>
    <span style={{ fontFamily: "Russo One", fontSize: 15, color: C.primary, letterSpacing: 1.5, textTransform: "uppercase" }}>{children}</span>
    <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${C.primary}44,transparent)` }} />
  </div>
);

// ─── Leaderboard Tab ──────────────────────────────────────────
function LeaderboardTab({ standings, rounds, fullscreen, setFullscreen }) {
  const totalRounds = rounds.filter(r => r.lobbies.some(l => Object.keys(l.results || {}).length > 0)).length;

  const rankStyle = (i) => {
    if (i === 0) return "rank-1";
    if (i === 1) return "rank-2";
    if (i === 2) return "rank-3";
    return "";
  };

  const rankIcon = (i) => {
    if (i === 0) return <Crown size={16} color={C.primary} />;
    if (i === 1) return <span style={{ color: "#c8c8dc", fontFamily: "Russo One", fontSize: 14 }}>2</span>;
    if (i === 2) return <span style={{ color: "#cd7f32", fontFamily: "Russo One", fontSize: 14 }}>3</span>;
    return <span style={{ color: C.muted, fontFamily: "Russo One", fontSize: 13 }}>{i + 1}</span>;
  };

  return (
    <div className="fade-in">
      {/* Stats bar */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 20 }}>
        {[
          { label: "Команд", value: standings.length, icon: "👥" },
          { label: "Зіграно раундів", value: totalRounds, icon: "⚔️" },
          { label: "Лідер", value: standings[0]?.name || "—", icon: "👑" },
        ].map(s => (
          <Card key={s.label} style={{ textAlign: "center", padding: "12px 8px" }}>
            <div style={{ fontSize: 20, marginBottom: 4 }}>{s.icon}</div>
            <div style={{ fontFamily: "Russo One", fontSize: s.label === "Лідер" ? 13 : 22, color: C.primary, lineHeight: 1.1 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 3, fontFamily: "Barlow", fontWeight: 600 }}>{s.label}</div>
          </Card>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <SectionTitle icon="🏆">Рейтингова таблиця</SectionTitle>
        <Btn small variant="outline" color={C.muted} onClick={() => setFullscreen(true)}>
          <Eye size={13} /> Режим спостерігача
        </Btn>
      </div>

      {standings.length === 0 ? (
        <Card style={{ textAlign: "center", padding: 40 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🎮</div>
          <div style={{ color: C.muted, fontFamily: "Barlow", fontWeight: 700 }}>Додай команди і почни турнір!</div>
        </Card>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {standings.map((team, i) => (
            <Card key={team.id} className={rankStyle(i)} style={{ padding: "12px 16px", cursor: "default" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 32, display: "flex", justifyContent: "center", flexShrink: 0 }}>
                  {rankIcon(i)}
                </div>
                <div style={{ width: 6, height: 36, borderRadius: 3, background: team.color, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "Russo One", fontSize: 14, color: C.text, lineHeight: 1.2 }}>{team.name}</div>
                  <div style={{ fontSize: 11, color: C.muted, fontFamily: "Barlow", fontWeight: 600, marginTop: 2 }}>
                    {team.player1} · {team.player2}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 11, color: C.muted, fontFamily: "Barlow" }}>Ігор</div>
                    <div style={{ fontFamily: "Russo One", fontSize: 14, color: C.text }}>{team.gamesPlayed}</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 11, color: C.muted, fontFamily: "Barlow" }}>Кіли</div>
                    <div style={{ fontFamily: "Russo One", fontSize: 14, color: C.secondary }}>{team.kills}</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 11, color: C.muted, fontFamily: "Barlow" }}>Перем.</div>
                    <div style={{ fontFamily: "Russo One", fontSize: 14, color: C.pink }}>{team.wins}</div>
                  </div>
                  <div style={{ background: i === 0 ? `${C.primary}22` : "rgba(255,255,255,.05)", border: `1px solid ${i === 0 ? C.primary + "55" : C.dim}`, borderRadius: 10, padding: "6px 14px", textAlign: "center", minWidth: 60 }}>
                    <div style={{ fontFamily: "Russo One", fontSize: 20, color: i === 0 ? C.primary : C.text, lineHeight: 1 }}>{team.points}</div>
                    <div style={{ fontSize: 9, color: C.muted, fontFamily: "Barlow", fontWeight: 700, letterSpacing: 1 }}>БАЛІВ</div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Fullscreen Observer ──────────────────────────────────────
function FullscreenLeaderboard({ standings, onClose }) {
  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "linear-gradient(160deg,#07071a,#0d0a2a)",
      zIndex: 9999, overflow: "auto", padding: "clamp(16px, 5%, 32px)",
    }}>
      <style>{`
        @keyframes slideIn { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }
        .row-anim { animation: slideIn .4s ease both; }
        @media (max-width: 768px) {
          .row-anim { animation: slideIn .3s ease both; }
        }
      `}</style>
      <div style={{ maxWidth: "clamp(320px, 100%, 900px)", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "clamp(16px, 4%, 32px)", gap: 16, flexWrap: "wrap" }}>
          <div style={{ minWidth: 0 }}>
            <h1 style={{ fontFamily: "Russo One", fontSize: "clamp(20px, 6vw, 36px)", color: C.primary, textShadow: `0 0 30px ${C.primary}66`, lineHeight: 1.1 }}>
              ⚡ BRAWL STARS ТУРНІР
            </h1>
            <p style={{ color: C.muted, fontFamily: "Barlow", fontWeight: 600, fontSize: "clamp(12px, 2.5vw, 14px)", marginTop: "clamp(4px, 1%, 8px)" }}>Режим спостерігача • Live Leaderboard</p>
          </div>
        </div>

        {standings.map((team, i) => (
          <div key={team.id} className="row-anim bs-card" style={{
            animationDelay: `${i * 0.04}s`,
            display: "flex", alignItems: "center", gap: "clamp(12px, 3%, 20px)",
            background: i === 0 ? "linear-gradient(135deg,rgba(249,197,34,.12),rgba(255,140,0,.06))" : i === 1 ? "rgba(200,200,220,.05)" : i === 2 ? "rgba(205,127,50,.06)" : "rgba(255,255,255,.03)",
            border: `1px solid ${i === 0 ? C.primary + "55" : i === 1 ? "rgba(200,200,220,.2)" : i === 2 ? "rgba(205,127,50,.25)" : "rgba(255,255,255,.07)"}`,
            borderRadius: "clamp(8px, 2%, 14px)", padding: "clamp(12px, 3%, 24px)", marginBottom: "clamp(6px, 1%, 8px)",
            transition: "transform .2s", flexWrap: "wrap",
          }}>
            <div style={{ width: "clamp(36px, 8%, 52px)", textAlign: "center", flexShrink: 0 }}>
              {i === 0 ? <span style={{ fontSize: "clamp(24px, 6vw, 28px)" }}>👑</span>
                : i === 1 ? <span style={{ fontFamily: "Russo One", fontSize: "clamp(24px, 6vw, 28px)", color: "#c8c8dc" }}>2</span>
                : i === 2 ? <span style={{ fontFamily: "Russo One", fontSize: "clamp(24px, 6vw, 28px)", color: "#cd7f32" }}>3</span>
                : <span style={{ fontFamily: "Russo One", fontSize: "clamp(18px, 5vw, 24px)", color: C.muted }}>{i + 1}</span>}
            </div>
            <div style={{ width: 6, height: "clamp(36px, 8vw, 48px)", borderRadius: 4, background: team.color, flexShrink: 0, boxShadow: `0 0 10px ${team.color}88` }} />
            <div style={{ flex: 1, minWidth: 0, minWidth: "150px" }}>
              <div style={{ fontFamily: "Russo One", fontSize: "clamp(14px, 4vw, 20px)", color: C.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{team.name}</div>
              <div style={{ fontSize: "clamp(11px, 2.5vw, 13px)", color: C.muted, fontFamily: "Barlow", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginTop: "clamp(2px, 0.5%, 4px)" }}>
                {team.player1} · {team.player2}
              </div>
            </div>
            <div style={{ display: "flex", gap: "clamp(12px, 3%, 24px)", alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ textAlign: "center", minWidth: "50px" }}>
                <div style={{ fontFamily: "Russo One", fontSize: "clamp(14px, 4vw, 18px)", color: C.secondary }}>{team.kills}</div>
                <div style={{ fontSize: "clamp(8px, 2vw, 10px)", color: C.muted, fontFamily: "Barlow", letterSpacing: 0.5 }}>КІЛИ</div>
              </div>
              <div style={{ textAlign: "center", minWidth: "50px" }}>
                <div style={{ fontFamily: "Russo One", fontSize: "clamp(14px, 4vw, 18px)", color: C.pink }}>{team.wins}</div>
                <div style={{ fontSize: "clamp(8px, 2vw, 10px)", color: C.muted, fontFamily: "Barlow", letterSpacing: 0.5 }}>ПЕРЕМОГИ</div>
              </div>
              <div style={{ background: i === 0 ? `${C.primary}22` : "rgba(255,255,255,.07)", border: `2px solid ${i === 0 ? C.primary + "88" : "rgba(255,255,255,.12)"}`, borderRadius: "clamp(8px, 2%, 12px)", padding: "clamp(6px, 2%, 10px) clamp(12px, 3%, 20px)", textAlign: "center", minWidth: "clamp(60px, 15%, 80px)" }}>
                <div style={{ fontFamily: "Russo One", fontSize: "clamp(18px, 5vw, 28px)", color: i === 0 ? C.primary : C.text, textShadow: i === 0 ? `0 0 20px ${C.primary}88` : "none" }}>{team.points}</div>
                <div style={{ fontSize: "clamp(7px, 1.5vw, 9px)", color: C.muted, fontFamily: "Barlow", fontWeight: 700, letterSpacing: 1 }}>БАЛІВ</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Teams Tab ────────────────────────────────────────────────
function TeamsTab({ teams, standings, onAdd, onDelete, onEdit }) {
  const standingsMap = {};
  standings.forEach((t, i) => { standingsMap[t.id] = { rank: i + 1, points: t.points }; });

  return (
    <div className="fade-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <SectionTitle icon="👥">Команди ({teams.length} зареєстровано)</SectionTitle>
        <Btn onClick={onAdd} >
          <Plus size={14} /> Додати команду
        </Btn>
      </div>

      {teams.length === 0 ? (
        <Card style={{ textAlign: "center", padding: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>👾</div>
          <div style={{ color: C.muted, fontFamily: "Barlow", fontWeight: 700, fontSize: 15 }}>Немає зареєстрованих команд</div>
          <div style={{ color: C.dim, fontFamily: "Barlow", marginTop: 4, fontSize: 13 }}>Додай перших учасників турніру!</div>
        </Card>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 10 }}>
          {teams.map((team) => {
            const info = standingsMap[team.id];
            return (
              <Card key={team.id} style={{ padding: "14px 16px", position: "relative" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ width: 5, height: 52, borderRadius: 3, background: team.color, flexShrink: 0, marginTop: 2, boxShadow: `0 0 8px ${team.color}88` }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{ fontFamily: "Russo One", fontSize: 14, color: C.text }}>{team.name}</span>
                      {info?.points > 0 && <Badge color={C.primary}>{info.points} балів</Badge>}
                    </div>
                    <div style={{ fontSize: 12, color: "#fff", fontFamily: "Barlow", fontWeight: 700, marginBottom: 2 }}>
                      🎮 {team.player1} · {team.player2}
                    </div>
                    <div style={{ fontSize: 11, color: C.muted, fontFamily: "Barlow" }}>
                      🔄 Запасний: {team.sub || <span style={{ color: C.dim, fontStyle: "italic" }}>не вказано</span>}
                    </div>
                  </div>
                  <button
                    className="bs-btn"
                    onClick={() => onEdit(team)}
                    style={{
                      background: "rgba(249,197,34,.12)",
                      border: "1px solid rgba(249,197,34,.2)",
                      borderRadius: 8,
                      width: 28,
                      height: 28,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginRight: 6,
                    }}
                  >
                    ✏️
                  </button>

                  <button
                    className="bs-btn"
                    onClick={() => onDelete(team.id)}
                    style={{ background: "rgba(255,80,80,.12)", border: "1px solid rgba(255,80,80,.2)", borderRadius: 8, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                  ><X size={12} color="rgba(255,120,120,.8)" /></button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Rounds Tab ───────────────────────────────────────────────
function RoundsTab({ rounds, teams, onGenerate, onDeleteRound, onEnterResults }) {
  const [activeDay, setActiveDay] = useState(1);

  const dayRounds = rounds.filter(r => r.day === activeDay);
  const canGenerate = teams.length >= 2 && dayRounds.length < 3;
  const lobbyComplete = (lobby) => lobby.results && Object.keys(lobby.results).length === lobby.teamIds.length;
  const roundComplete = (round) => round.lobbies.every(lobbyComplete);

  return (
    <div className="fade-in">
      {/* Day selector */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {[1, 2].map(d => (
          <button key={d} className="tab bs-btn" onClick={() => setActiveDay(d)} style={{
            background: activeDay === d ? DAY_COLORS[d] : "rgba(255,255,255,.05)",
            color: activeDay === d ? "#0a0a1a" : C.muted,
            border: `1px solid ${activeDay === d ? DAY_COLORS[d] : C.border}`,
            borderRadius: 100, padding: "8px 20px",
            fontFamily: "Russo One", fontSize: 13,
          }}>
            День {d}
          </button>
        ))}
      </div>

      {/* Scoring legend */}
      <Card style={{ background: "rgba(249,197,34,.05)", border: `1px solid rgba(249,197,34,.15)`, marginBottom: 20, padding: "12px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <span style={{ fontSize: 12, color: C.primary, fontFamily: "Russo One", letterSpacing: 1 }}>БАЛИ:</span>
          {Object.entries(PLACEMENT_PTS).map(([p, pts]) => (
            <span key={p} style={{ fontSize: 12, color: C.muted, fontFamily: "Barlow", fontWeight: 700 }}>
              <span style={{ color: p === "1" ? C.primary : C.text }}>{p}-е місце</span> = {pts} бал.
            </span>
          ))}
          <span style={{ fontSize: 12, color: C.muted, fontFamily: "Barlow", fontWeight: 700 }}>
            + <span style={{ color: C.secondary }}>1 бал</span> за кіл
          </span>
        </div>
      </Card>

      {/* Generate button */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <SectionTitle icon="⚔️">Раунди — День {activeDay} ({dayRounds.length}/3)</SectionTitle>
        <Btn onClick={() => onGenerate(activeDay)} disabled={!canGenerate} color={DAY_COLORS[activeDay]}>
          <Shuffle size={14} /> Генерувати раунд
        </Btn>
      </div>

      {teams.length < 5 && (
        <Card style={{ background: "rgba(232,67,147,.06)", border: "1px solid rgba(232,67,147,.2)", marginBottom: 16, padding: "12px 16px" }}>
          <span style={{ fontSize: 13, color: C.pink, fontFamily: "Barlow", fontWeight: 700 }}>
            ⚠️ При малій кількості команд лобі можуть бути неповними. Зараз зареєстровано: {teams.length}
          </span>
        </Card>
      )}

      {dayRounds.length === 0 ? (
        <Card style={{ textAlign: "center", padding: 40 }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🎯</div>
          <div style={{ color: C.muted, fontFamily: "Barlow", fontWeight: 700 }}>Ще не згенеровано раундів</div>
          <div style={{ color: C.dim, fontFamily: "Barlow", marginTop: 4, fontSize: 13 }}>Натисни «Генерувати раунд» щоб перемішати команди по лобі</div>
        </Card>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {dayRounds.map((round, ri) => (
            <Card key={round.id} style={{ padding: 0, overflow: "hidden" }}>
              {/* Round header */}
              <div style={{ background: `linear-gradient(135deg,${DAY_COLORS[round.day]}22,transparent)`, borderBottom: `1px solid ${C.border}`, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: DAY_COLORS[round.day], display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Russo One", fontSize: 16, color: "#0a0a1a" }}>
                    {round.roundNum}
                  </div>
                  <div>
                    <span style={{ fontFamily: "Russo One", fontSize: 14, color: C.text }}>Раунд {round.roundNum}</span>
                    <div style={{ fontSize: 11, color: C.muted, fontFamily: "Barlow" }}>День {round.day}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  {roundComplete(round) && <Badge color="#22f977">✓ Завершено</Badge>}
                  <button
                    className="bs-btn"
                    onClick={() => onDeleteRound(round.id)}
                    style={{ background: "rgba(255,80,80,.1)", border: "1px solid rgba(255,80,80,.18)", borderRadius: 8, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center" }}
                  ><X size={12} color="rgba(255,120,120,.7)" /></button>
                </div>
              </div>

              {/* Lobbies */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 0 }}>
                {round.lobbies.map((lobby, li) => {
                  const complete = lobbyComplete(lobby);
                  return (
                    <div key={li} className="bs-btn" onClick={() => onEnterResults(round.id, li)} style={{
                      borderRight: li < 2 ? `1px solid ${C.border}` : "none",
                      padding: "14px 16px",
                      cursor: "pointer",
                      background: complete ? "rgba(34,249,119,.03)" : "transparent",
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                        <span style={{ fontFamily: "Russo One", fontSize: 13, color: complete ? "#22f977" : C.primary }}>
                          Лобі {LOBBY_LABELS[li]}
                        </span>
                        {complete ? <Check size={13} color="#22f977" /> : <Zap size={13} color={C.muted} />}
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        {lobby.teamIds.map(tid => {
                          const team = teams.find(t => t.id === tid);
                          const res = lobby.results?.[tid];
                          return (
                            <div key={tid} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 5, minWidth: 0 }}>
                                <div style={{ width: 4, height: 4, borderRadius: "50%", background: team?.color || C.muted, flexShrink: 0 }} />
                                <span style={{ fontSize: 11, color: C.text, fontFamily: "Barlow", fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{team?.name || "?"}</span>
                              </div>
                              {res && (
                                <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                                  <Badge color={res.placement === 1 ? C.primary : C.muted}>#{res.placement}</Badge>
                                  {res.kills > 0 && <Badge color={C.secondary}>⚔{res.kills}</Badge>}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Finals Tab ───────────────────────────────────────────────
function FinalsTab({ standings, rounds, teams, saveRounds }) {
  const [topN, setTopN] = useState(10);
  const finalsRounds = rounds.filter(r => r.day === 3);
  const topTeams = standings.slice(0, topN);

  const generateFinals = () => {
    if (standings.length < 5) return alert("Потрібно більше команд!");

    const teamIds = topTeams.map(t => t.id);
    const lobbies = [];
    for (let i = 0; i < teamIds.length; i += 5) {
      lobbies.push({
        id: LOBBY_LABELS[lobbies.length],
        teamIds: teamIds.slice(i, i + 5),
        results: {},
      });
    }

    const newRound = {
      id: Date.now(),
      day: 3,
      roundNum: finalsRounds.length + 1,
      lobbies,
      isFinal: true,
    };
    saveRounds([...rounds, newRound]);
  };

  return (
    <div className="fade-in">
      <Card style={{ background: "linear-gradient(135deg,rgba(232,67,147,.1),rgba(155,31,222,.08))", border: "1px solid rgba(232,67,147,.25)", marginBottom: 20, padding: "20px 24px" }}>
        <div style={{ fontFamily: "Russo One", fontSize: 18, color: C.pink, marginBottom: 6 }}>👑 ФІНАЛЬНИЙ ДЕНЬ</div>
        <div style={{ fontSize: 13, color: C.muted, fontFamily: "Barlow", fontWeight: 600 }}>
          Відбираємо топ команди з рейтингової таблиці і проводимо фінальне лобі!
        </div>
      </Card>

      <SectionTitle icon="🏅">Налаштування фіналу</SectionTitle>

      <Card style={{ marginBottom: 20 }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: C.muted, fontFamily: "Barlow", fontWeight: 700, marginBottom: 8, letterSpacing: 1 }}>КІЛЬКІСТЬ ФІНАЛІСТІВ</div>
          <div style={{ display: "flex", gap: 8 }}>
            {[5, 10].map(n => (
              <button key={n} className="bs-btn" onClick={() => setTopN(n)} style={{
                background: topN === n ? C.pink : "transparent",
                color: topN === n ? "#0a0a1a" : C.muted,
                border: `2px solid ${topN === n ? C.pink : C.border}`,
                borderRadius: 100, padding: "8px 20px",
                fontFamily: "Russo One", fontSize: 13,
              }}>
                Топ {n}
              </button>
            ))}
          </div>
        </div>
        <div style={{ fontSize: 12, color: C.dim, fontFamily: "Barlow", marginBottom: 16 }}>
          {topN === 5 ? "1 фінальне лобі • 5 команд" : "2 фінальних лобі • по 5 команд"}
        </div>
        <Btn onClick={generateFinals} color={C.pink} disabled={standings.length < 5}>
          <Crown size={14} /> Генерувати фінал
        </Btn>
      </Card>

      <SectionTitle icon="🔥">Топ {topN} — фіналісти</SectionTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {topTeams.map((team, i) => (
          <Card key={team.id} style={{ padding: "12px 16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 28, textAlign: "center" }}>
                {i === 0 ? <span>👑</span> : <span style={{ fontFamily: "Russo One", fontSize: 14, color: C.muted }}>{i + 1}</span>}
              </div>
              <div style={{ width: 5, height: 32, borderRadius: 3, background: team.color }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "Russo One", fontSize: 13 }}>{team.name}</div>
                <div style={{ fontSize: 11, color: C.muted, fontFamily: "Barlow" }}>{team.player1} · {team.player2}</div>
              </div>
              <div style={{ fontFamily: "Russo One", fontSize: 18, color: C.primary }}>{team.points} <span style={{ fontSize: 10, color: C.muted }}>балів</span></div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Add Team Modal ───────────────────────────────────────────
function AddTeamModal({ onClose, onSave, teamCount }) {
  const [form, setForm] = useState({ name: "", player1: "", player2: "", sub: "" });
  const valid = form.name.trim() && form.player1.trim() && form.player2.trim();

  const inputStyle = {
    background: "rgba(255,255,255,.05)", border: `1px solid ${C.border}`,
    borderRadius: 10, padding: "10px 14px", color: "#fff",
    fontSize: 14, width: "100%", fontFamily: "Barlow", fontWeight: 600,
    transition: "all .2s",
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.7)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={onClose}>
      <div className="fade-in" style={{ background: C.card, border: `1px solid ${C.borderHover}`, borderRadius: 18, padding: 28, width: "100%", maxWidth: 400 }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <span style={{ fontFamily: "Russo One", fontSize: 18, color: C.primary }}>➕ Нова команда</span>
          <button className="bs-btn" onClick={onClose} style={{ background: "rgba(255,255,255,.08)", border: "none", borderRadius: 8, width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <X size={14} color={C.muted} />
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { key: "name", label: "🏴 Назва команди", ph: "Наприклад: Storm Riders" },
            { key: "player1", label: "🎮 Гравець 1", ph: "Ім'я гравця" },
            { key: "player2", label: "🎮 Гравець 2", ph: "Ім'я гравця" },
            { key: "sub", label: "🔄 Запасний (опціонально)", ph: "Ім'я запасного" },
          ].map(f => (
            <div key={f.key}>
              <label style={{ fontSize: 11, color: C.muted, fontFamily: "Barlow", fontWeight: 700, letterSpacing: 1, display: "block", marginBottom: 6 }}>{f.label}</label>
              <input
                style={inputStyle}
                placeholder={f.ph}
                value={form[f.key]}
                onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
              />
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <Btn variant="outline" color={C.muted} onClick={onClose} style={{ flex: 1 }}>Скасувати</Btn>
          <Btn onClick={() => valid && onSave(form)} disabled={!valid} style={{ flex: 1 }}>
            <Check size={14} /> Додати
          </Btn>
        </div>
      </div>
    </div>
  );
}


function EditTeamModal({ team, onClose, onSave }) {
  const [form, setForm] = useState({
    name: team.name || "",
    player1: team.player1 || "",
    player2: team.player2 || "",
    sub: team.sub || "",
  });

  const valid = form.name.trim() && form.player1.trim() && form.player2.trim();

  const inputStyle = {
    background: "rgba(255,255,255,.05)",
    border: `1px solid ${C.border}`,
    borderRadius: 10,
    padding: "10px 14px",
    color: "#fff",
    fontSize: 14,
    width: "100%",
    fontFamily: "Barlow",
    fontWeight: 600,
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.7)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
      onClick={onClose}
    >
      <div
        className="fade-in"
        style={{
          background: C.card,
          border: `1px solid ${C.borderHover}`,
          borderRadius: 18,
          padding: 28,
          width: "100%",
          maxWidth: 400,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <span
            style={{
              fontFamily: "Russo One",
              fontSize: 18,
              color: C.primary,
            }}
          >
            ✏️ Редагування команди
          </span>

          <button
            className="bs-btn"
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,.08)",
              border: "none",
              borderRadius: 8,
              width: 30,
              height: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={14} color={C.muted} />
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { key: "name", label: "🏴 Назва команди" },
            { key: "player1", label: "🎮 Гравець 1" },
            { key: "player2", label: "🎮 Гравець 2" },
            { key: "sub", label: "🔄 Запасний" },
          ].map((f) => (
            <div key={f.key}>
              <label
                style={{
                  fontSize: 11,
                  color: C.muted,
                  fontFamily: "Barlow",
                  fontWeight: 700,
                  display: "block",
                  marginBottom: 6,
                }}
              >
                {f.label}
              </label>

              <input
                style={inputStyle}
                value={form[f.key]}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    [f.key]: e.target.value,
                  }))
                }
              />
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <Btn
            variant="outline"
            color={C.muted}
            onClick={onClose}
            style={{ flex: 1 }}
          >
            Скасувати
          </Btn>

          <Btn
            onClick={() =>
              valid &&
              onSave({
                ...team,
                ...form,
              })
            }
            style={{ flex: 1 }}
          >
            <Check size={14} /> Зберегти
          </Btn>
        </div>
      </div>
    </div>
  );
}

// ─── Results Entry Modal ──────────────────────────────────────

function ResultsModal({ round, lobby, lobbyIdx, teams, onClose, onSave }) {
  const lobbyTeams = lobby.teamIds.map(id => teams.find(t => t.id === id)).filter(Boolean);
  const [results, setResults] = useState(() => {
    const init = {};
    lobbyTeams.forEach(t => {
      init[t.id] = lobby.results?.[t.id] || { placement: "", kills: 0 };
    });
    return init;
  });

  const setPlacement = (tid, val) => setResults(p => ({ ...p, [tid]: { ...p[tid], placement: val } }));
  const setKills = (tid, val) => setResults(p => ({ ...p, [tid]: { ...p[tid], kills: Math.max(0, parseInt(val) || 0) } }));

  const placements = lobbyTeams.map(t => results[t.id]?.placement).filter(Boolean);
  const allAssigned = placements.length === lobbyTeams.length;
  const noDups = new Set(placements).size === placements.length;
  const valid = allAssigned && noDups;

  const usedPlacements = placements.map(Number);

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.75)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={onClose}>
      <div className="fade-in" style={{ background: C.card, border: `1px solid ${C.borderHover}`, borderRadius: 18, padding: 24, width: "100%", maxWidth: 460 }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <div style={{ fontFamily: "Russo One", fontSize: 16, color: C.primary }}>Результати — Лобі {LOBBY_LABELS[lobbyIdx]}</div>
            <div style={{ fontSize: 12, color: C.muted, fontFamily: "Barlow" }}>День {round.day} • Раунд {round.roundNum}</div>
          </div>
          <button className="bs-btn" onClick={onClose} style={{ background: "rgba(255,255,255,.08)", border: "none", borderRadius: 8, width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <X size={14} color={C.muted} />
          </button>
        </div>

        {/* Legend */}
        <div style={{ background: "rgba(249,197,34,.06)", border: "1px solid rgba(249,197,34,.15)", borderRadius: 10, padding: "8px 14px", marginBottom: 16, display: "flex", gap: 16, flexWrap: "wrap" }}>
          {Object.entries(PLACEMENT_PTS).map(([p, pts]) => (
            <span key={p} style={{ fontSize: 11, fontFamily: "Barlow", fontWeight: 700, color: C.muted }}>
              {p}🥇 = <span style={{ color: C.primary }}>{pts}б</span>
            </span>
          ))}
          <span style={{ fontSize: 11, fontFamily: "Barlow", fontWeight: 700, color: C.muted }}>
            кіл = <span style={{ color: C.secondary }}>+1б</span>
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {lobbyTeams.map(team => {
            const res = results[team.id];
            const pts = (PLACEMENT_PTS[res.placement] || 0) + (res.kills || 0);
            return (
              <div key={team.id} style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,.03)", border: `1px solid ${C.border}`, borderRadius: 12, padding: "10px 14px" }}>
                <div style={{ width: 5, height: 36, borderRadius: 3, background: team.color, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "Russo One", fontSize: 12, color: C.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{team.name}</div>
                  <div style={{ fontSize: 10, color: C.muted, fontFamily: "Barlow" }}>{team.player1} · {team.player2}</div>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 10, color: C.muted, fontFamily: "Barlow", marginBottom: 3 }}>Місце</div>
                    <select
                      value={res.placement}
                      onChange={e => setPlacement(team.id, Number(e.target.value))}
                      style={{ background: "#1a1a36", border: `1px solid ${res.placement ? C.primary + "66" : C.border}`, borderRadius: 8, color: res.placement ? C.primary : C.muted, padding: "5px 8px", fontSize: 13, fontFamily: "Russo One", width: 64 }}
                    >
                      <option value="">—</option>
                      {[1, 2, 3, 4, 5].map(p => (
                        <option key={p} value={p} disabled={usedPlacements.includes(p) && res.placement !== p}>
                          #{p}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: C.muted, fontFamily: "Barlow", marginBottom: 3 }}>Кіли</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <button className="bs-btn" onClick={() => setKills(team.id, res.kills - 1)} style={{ background: "rgba(255,255,255,.07)", border: "none", borderRadius: 6, width: 24, height: 28, display: "flex", alignItems: "center", justifyContent: "center", color: C.muted, fontSize: 16 }}>−</button>
                      <span style={{ fontFamily: "Russo One", fontSize: 16, color: C.secondary, minWidth: 22, textAlign: "center" }}>{res.kills}</span>
                      <button className="bs-btn" onClick={() => setKills(team.id, res.kills + 1)} style={{ background: "rgba(255,255,255,.07)", border: "none", borderRadius: 6, width: 24, height: 28, display: "flex", alignItems: "center", justifyContent: "center", color: C.muted, fontSize: 16 }}>+</button>
                    </div>
                  </div>
                  <div style={{ textAlign: "center", minWidth: 36 }}>
                    <div style={{ fontSize: 10, color: C.muted, fontFamily: "Barlow", marginBottom: 3 }}>Разом</div>
                    <div style={{ fontFamily: "Russo One", fontSize: 16, color: pts > 0 ? C.primary : C.dim }}>{pts}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {!noDups && placements.length > 0 && (
          <div style={{ color: C.pink, fontSize: 12, fontFamily: "Barlow", fontWeight: 700, marginTop: 10 }}>⚠️ Кожне місце можна вибрати тільки один раз!</div>
        )}

        <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
          <Btn variant="outline" color={C.muted} onClick={onClose} style={{ flex: 1 }}>Скасувати</Btn>
          <Btn onClick={() => valid && onSave(results)} disabled={!valid} style={{ flex: 1 }}>
            <Check size={14} /> Зберегти результати
          </Btn>
        </div>
      </div>
    </div>
  );
}

// ─── Main App ──────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("leaderboard");
  const [teams, setTeams] = useState([]);
  const [rounds, setRounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddTeam, setShowAddTeam] = useState(false);
  const [entryModal, setEntryModal] = useState(null);
  const [fullscreen, setFullscreen] = useState(true);
  const [editTeam, setEditTeam] = useState(null);

  useEffect(() => {
    try {
      const savedTeams = localStorage.getItem("bs_t3");
      const savedRounds = localStorage.getItem("bs_r3");

      setTeams(savedTeams ? JSON.parse(savedTeams) : DEFAULT_TEAMS);
      setRounds(savedRounds ? JSON.parse(savedRounds) : DEFAULT_ROUNDS);
    } catch (e) {
      console.error("Помилка завантаження даних:", e);
      setTeams(DEFAULT_TEAMS);
      setRounds(DEFAULT_ROUNDS);
    }

    setLoading(false);
  }, []);

  const saveTeams = async (v) => {
    setTeams(v);

    try {
      localStorage.setItem("bs_t3", JSON.stringify(v));
    } catch (e) {
      console.error("Помилка збереження команд:", e);
    }
  };

  const saveRounds = async (v) => {
    setRounds(v);

    try {
      localStorage.setItem("bs_r3", JSON.stringify(v));
    } catch (e) {
      console.error("Помилка збереження раундів:", e);
    }
  };

  const standings = computeStandings(teams, rounds);

  const generateRound = (day) => {
    const dayRounds = rounds.filter(r => r.day === day);

    // максимум 3 раунди на день
    if (dayRounds.length >= 3) return;

    // мінімум 2 команди
    if (teams.length < 2) {
      alert("Потрібно мінімум 2 команди!");
      return;
    }

    // перемішуємо команди
    const shuffled = shuffle(teams.map(t => t.id));

    const lobbies = [];

    // автоматично створюємо лобі по 5 команд
    for (let i = 0; i < shuffled.length; i += 5) {
      lobbies.push({
        id: LOBBY_LABELS[lobbies.length] || `L${lobbies.length + 1}`,
        teamIds: shuffled.slice(i, i + 5),
        results: {},
      });
    }

    // створення раунду
    const newRound = {
      id: Date.now(),
      day,
      roundNum: dayRounds.length + 1,
      lobbies,
    };

    saveRounds([...rounds, newRound]);
  };

  const saveResults = (roundId, lobbyIdx, results) => {
    const newRounds = rounds.map(r =>
      r.id !== roundId ? r : {
        ...r,
        lobbies: r.lobbies.map((l, i) => i === lobbyIdx ? { ...l, results } : l),
      }
    );
    saveRounds(newRounds);
    setEntryModal(null);
  };

  const TABS = [
    { id: "leaderboard", icon: "🏆", label: "Таблиця" },
    { id: "rounds", icon: "⚔️", label: "Раунди" },
    { id: "teams", icon: "👥", label: "Команди" },
    { id: "finals", icon: "👑", label: "Фінал" },
  ];

  if (loading) return (
    <div style={{ background: C.bg, height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>⚡</div>
        <div style={{ fontFamily: "Russo One", color: C.primary, fontSize: 18 }}>Завантаження...</div>
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: "Barlow, sans-serif", background: C.bg, minHeight: "100vh", color: C.text }}>
      <style>{STYLES}</style>

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,#f9c522,#ff8c00 50%,#e84393)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(45deg,transparent,transparent 10px,rgba(0,0,0,.05) 10px,rgba(0,0,0,.05) 20px)" }} />
        <div style={{ position: "relative", zIndex: 1, padding: "18px 20px 0", maxWidth: 840, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <div>
              <h1 style={{ fontFamily: "Russo One", fontSize: 22, color: "#fff", textShadow: "0 2px 8px rgba(0,0,0,.3)", letterSpacing: .5 }}>
                ⚡ BRAWL STARS ТУРНІР
              </h1>
              <p style={{ fontSize: 12, color: "rgba(0,0,0,.55)", fontWeight: 700, marginTop: 2 }}>
                Duo Showdown • 3 лобі паралельно • орієнтовно 15 команд
              </p>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ background: "rgba(0,0,0,.2)", borderRadius: 10, padding: "6px 12px", textAlign: "center" }}>
                <div style={{ fontFamily: "Russo One", fontSize: 18, color: "#fff" }}>{teams.length}</div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,.7)", letterSpacing: 1 }}>КОМАНД</div>
              </div>
              <div style={{ background: "rgba(0,0,0,.2)", borderRadius: 10, padding: "6px 12px", textAlign: "center" }}>
                <div style={{ fontFamily: "Russo One", fontSize: 18, color: "#fff" }}>{rounds.length}</div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,.7)", letterSpacing: 1 }}>РАУНДІВ</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 4 }}>
            {TABS.filter(t => t.id === "leaderboard").map(t => (
              <button key={t.id} className="tab" onClick={() => setTab(t.id)} style={{
                background: tab === t.id ? "#fff" : "rgba(0,0,0,.2)",
                color: tab === t.id ? "#0a0a1a" : "#fff",
                border: "none", borderRadius: "10px 10px 0 0",
                padding: "9px 18px", fontFamily: "Russo One",
                fontSize: 13, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 6,
                boxShadow: tab === t.id ? "0 -2px 10px rgba(0,0,0,.1)" : "none",
              }}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "20px 16px", maxWidth: 840, margin: "0 auto" }}>
        {tab === "leaderboard" && <LeaderboardTab standings={standings} rounds={rounds} fullscreen={fullscreen} setFullscreen={setFullscreen} />}
        {tab === "rounds" && (
          <RoundsTab
            rounds={rounds} teams={teams}
            onGenerate={generateRound}
            onDeleteRound={id => saveRounds(rounds.filter(r => r.id !== id))}
            onEnterResults={(roundId, lobbyIdx) => setEntryModal({ roundId, lobbyIdx })}
          />
        )}
        {tab === "teams" && (
          <TeamsTab
            teams={teams} standings={standings}
            onAdd={() => setShowAddTeam(true)}
            onDelete={id => saveTeams(teams.filter(t => t.id !== id))}
            onEdit={(team) => setEditTeam(team)}
          />
        )}
        {tab === "finals" && <FinalsTab standings={standings} rounds={rounds} teams={teams} saveRounds={saveRounds} />}
      </div>

      {/* Modals */}
      {showAddTeam && (
        <AddTeamModal
          teamCount={teams.length}
          onClose={() => setShowAddTeam(false)}
          onSave={team => {
            saveTeams([...teams, { ...team, id: Date.now(), color: TEAM_COLORS[teams.length % TEAM_COLORS.length] }]);
            setShowAddTeam(false);
          }}
        />
      )}

      {entryModal && (() => {
        const round = rounds.find(r => r.id === entryModal.roundId);
        const lobby = round?.lobbies[entryModal.lobbyIdx];
        if (!round || !lobby) return null;
        return (
          <ResultsModal
            round={round} lobby={lobby}
            lobbyIdx={entryModal.lobbyIdx}
            teams={teams}
            onClose={() => setEntryModal(null)}
            onSave={results => saveResults(entryModal.roundId, entryModal.lobbyIdx, results)}
          />
        );
      })()}

      {editTeam && (
        <EditTeamModal
          team={editTeam}
          onClose={() => setEditTeam(null)}
          onSave={(updatedTeam) => {
            saveTeams(
              teams.map((t) =>
                t.id === updatedTeam.id ? updatedTeam : t
              )
            );
            setEditTeam(null);
          }}
        />
      )}

      {fullscreen && <FullscreenLeaderboard standings={standings} onClose={() => setFullscreen(false)} />}
    </div>
  );
}
