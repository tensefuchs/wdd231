/* ========= CONFIGURE YOUR CITY + API KEY ========= */
const OWM_CITY   = "Duesseldorf, DE";           
const OWM_UNITS  = "metric";           
const OWM_API_KEY = "f089b2dcdc3abdd5882b15f86ed1e13e"; 
/* ================================================ */

/* ========== WEATHER (current + 3-day) ========== */
(async function loadWeather(){
  const weatherBox  = document.getElementById('weather');
  const forecastBox = document.getElementById('forecast');

  try {
    // Current conditions
    const wRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(OWM_CITY)}&units=${OWM_UNITS}&appid=${OWM_API_KEY}`);
    if (!wRes.ok) throw new Error("Weather fetch failed");
    const w = await wRes.json();

    const temp = Math.round(w.main.temp);
    const desc = w.weather?.[0]?.description ?? "weather";
    const icon = w.weather?.[0]?.icon ?? "01d";
    const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;

    weatherBox.innerHTML = `
      <div class="current">
        <img src="${iconUrl}" alt="${desc}" width="48" height="48" loading="lazy">
        <div class="temp">${temp}°</div>
        <div class="desc" style="text-transform:capitalize">${desc}</div>
      </div>
    `;

    // 5-day / 3h forecast → pick ~midday for next 3 days
    const fRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(OWM_CITY)}&units=${OWM_UNITS}&appid=${OWM_API_KEY}`);
    if (!fRes.ok) throw new Error("Forecast fetch failed");
    const f = await fRes.json();

    const byDate = {};
    f.list.forEach(item=>{
      const d = new Date(item.dt*1000);
      const key = d.toISOString().slice(0,10);
      (byDate[key] ||= []).push(item);
    });

    const todayKey = new Date().toISOString().slice(0,10);
    const futureDays = Object.keys(byDate).filter(k => k > todayKey).sort().slice(0,3);
    const labels = ["Tomorrow","Day 2","Day 3"];

    forecastBox.innerHTML = "";
    futureDays.forEach((dayKey, idx)=>{
      const entries = byDate[dayKey];
      let chosen = entries[0];
      let bestDiff = Infinity;
      entries.forEach(e=>{
        const hour = new Date(e.dt*1000).getHours();
        const diff = Math.abs(12 - hour);
        if (diff < bestDiff){ bestDiff = diff; chosen = e; }
      });
      const t   = Math.round(chosen.main.temp);
      const dsc = chosen.weather?.[0]?.description ?? "";
      const ic  = chosen.weather?.[0]?.icon ?? "01d";
      const icUrl = `https://openweathermap.org/img/wn/${ic}.png`;

      const card = document.createElement('div');
      card.className = 'day';
      card.innerHTML = `
        <div><strong>${labels[idx] ?? dayKey}</strong></div>
        <img src="${icUrl}" alt="${dsc}" width="40" height="40" loading="lazy">
        <div style="text-transform:capitalize">${dsc}</div>
        <div><strong>${t}°</strong></div>
      `;
      forecastBox.append(card);
    });

  } catch (err) {
    console.error(err);
    weatherBox.innerHTML = `<p>Weather unavailable.</p>`;
  }
})();

/* ========== SPOTLIGHTS (2–3 random Silver/Gold) ========== */
(async function loadSpotlights(){
  const grid = document.getElementById('spotGrid');
  try {
    const res = await fetch('data/members.json');
    const members = await res.json();

    const premium = members.filter(m => Number(m.membership) >= 2); // Silver (2) or Gold (3)
    const count = 2 + Math.floor(Math.random()*2); // 2 or 3
    const picks = shuffle(premium).slice(0, count);

    grid.innerHTML = "";
    picks.forEach(m => {
      const card = document.createElement('article');
      card.className = 'spot';
      card.innerHTML = `
        <div class="head">
          <img class="logo" src="${imgPath(m.image)}" alt="${m.name} logo" width="56" height="56" loading="lazy" onerror="this.src='images/icons/shop.webp'">
          <div>
            <h3>${m.name}</h3>
            <span class="badge">${levelLabel(m.membership)}</span>
          </div>
        </div>
        <p>${m.tagline ?? ''}</p>
        <p><strong>Phone:</strong> <a href="tel:${cleanPhone(m.phone)}">${m.phone}</a></p>
        <p><strong>Address:</strong> ${m.address}</p>
        <p><a href="${m.url}" target="_blank" rel="noopener">Visit website</a></p>
      `;
      grid.append(card);
    });
  } catch (err) {
    console.error(err);
    grid.innerHTML = `<p>Unable to load spotlights right now.</p>`;
  }
})();

function shuffle(arr){
  return arr.map(a=>({r:Math.random(),v:a})).sort((a,b)=>a.r-b.r).map(o=>o.v);
}
function imgPath(p){ return p?.startsWith('images/') ? p : `images/${p}`; }
function cleanPhone(p){ return (p||'').replace(/[^0-9+]/g,''); }
function levelLabel(lvl){
  return Number(lvl) === 3 ? 'Gold Member'
       : Number(lvl) === 2 ? 'Silver Member'
       : 'Bronze Member';
}
