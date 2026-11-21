const $=s=>document.querySelector(s),A=$('#app'),KEY='toefl500';
let S={xp:0,streak:0,last:'',best:0,stats:{},dark:false},D,R;
try{S={...S,...JSON.parse(localStorage.getItem(KEY))}}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}};
const rank=x=>x<100?'Beginner':x<300?'Explorer':x<700?'Scholar':'Master';
const shuffle=a=>a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]);
const esc=s=>s.replace(/</g,'&lt;');
const acc=t=>{const s=S.stats[t];return s&&s.t?s.c/s.t:null};
const say=['Ayo, 5 soal saja!','Salah itu bahan belajar, bukan aib.','Hoot hoot! Skor 500 makin dekat.','Konsisten lebih kuat daripada lama.'];
const theme=()=>document.body.toggleAttribute('data-dark',S.dark);

function home(){
 const weak=D.topics.filter(t=>acc(t.id)!==null).sort((a,b)=>acc(a.id)-acc(b.id))[0];
 A.innerHTML=`<div class="stats"><div><b>⭐ ${S.xp}</b>XP</div><div><b>🔥 ${S.streak}</b>Streak</div><div><b>🏆 ${S.best}/5</b>Terbaik</div></div>
 <div class="card say"><span class="owl">🦉</span><div><b>${rank(S.xp)} · Level ${Math.floor(S.xp/50)+1}</b><br><span class="mute">${say[new Date().getDate()%say.length]}</span></div></div>
 ${weak?`<div class="card">🎯 Fokus hari ini: <b>${weak.title}</b> (akurasi ${Math.round(acc(weak.id)*100)}%)</div>`:''}
 <h2>Structure &amp; Written Expression</h2>
 <button class="btn" onclick="quiz('mix')">⚡ Latihan campuran (5 soal)</button>
 ${D.topics.map(t=>{const a=acc(t.id);return `<button class="btn alt" onclick="lesson('${t.id}')">📘 ${t.title}<br><span class="mute">${a===null?'Belum dicoba':'Akurasi '+Math.round(a*100)+'%'}</span></button>`}).join('')}
 <p class="mute">Listening &amp; Reading menyusul setelah modul ini kamu konfirmasi.</p>`}

function lesson(id){const t=D.topics.find(x=>x.id==id);
 A.innerHTML=`<h2>${t.title}</h2><div class="card">${t.lesson}</div><div class="card">⚠️ <b>Jebakan TOEFL:</b> ${t.trap}</div>
 <button class="btn" onclick="quiz('${id}')">Latihan topik ini</button><button class="btn alt" onclick="home()">Kembali</button>`}

function quiz(id){R={i:0,h:3,c:0,q:shuffle(D.questions.filter(q=>id=='mix'||q.t==id)).slice(0,5)};ask()}
function ask(){const q=R.q[R.i];R.done=false;R.m=shuffle([0,1,2,3]);
 A.innerHTML=`<div class="bar"><i style="width:${R.i/R.q.length*100}%"></i></div>
 <p>${'❤️'.repeat(R.h)} · Soal ${R.i+1}/${R.q.length}</p>
 <div class="card"><h2>${esc(q.q)}</h2></div>
 ${R.m.map((m,k)=>`<button class="btn alt opt" onclick="pick(${k})">${'ABCD'[k]}. ${esc(q.o[m])}</button>`).join('')}<div id="fb"></div>`}
function pick(k){if(R.done)return;R.done=true;
 const q=R.q[R.i],ok=R.m[k]==q.a,st=S.stats[q.t]||(S.stats[q.t]={c:0,t:0});
 st.t++;if(ok){st.c++;R.c++;S.xp+=10}else R.h--;
 document.querySelectorAll('.opt').forEach((b,j)=>{b.disabled=true;if(R.m[j]==q.a)b.classList.add('ok');else if(j==k)b.classList.add('no')});
 const end=R.h<=0||R.i==R.q.length-1;
 $('#fb').innerHTML=`<div class="card">${ok?'✅ Benar! +10 XP':'❌ Belum tepat.'}<br>${q.e}</div><button class="btn" onclick="${end?'finish()':'next()'}">${end?'Lihat hasil':'Lanjut'}</button>`;
 if(ok)confetti(12);save()}
function next(){R.i++;ask()}
function finish(){const d=new Date(),t=d.toDateString(),y=new Date(d-864e5).toDateString();
 if(S.last!=t){S.streak=S.last==y?S.streak+1:1;S.last=t}
 S.best=Math.max(S.best,R.c);save();
 const win=R.c>=3&&R.h>0;if(win)confetti(40);
 A.innerHTML=`<div class="card say"><span class="owl">${win?'🦉':'😴'}</span><div><h2>${R.c}/${R.q.length} benar</h2>${win?'Keren! Kembali besok biar api 🔥 tetap menyala.':R.h<=0?'Nyawa habis. Baca pelajarannya, lalu coba lagi!':'Hampir! Ulangi biar makin kuat.'}</div></div>
 <button class="btn" onclick="quiz('mix')">Main lagi</button><button class="btn alt" onclick="home()">Beranda</button>`}
function confetti(n){for(let i=0;i<n;i++){const e=document.createElement('span');e.className='conf';e.textContent=['🎉','⭐','✨'][i%3];e.style.left=Math.random()*100+'vw';e.style.animationDelay=Math.random()*.5+'s';document.body.append(e);setTimeout(()=>e.remove(),2800)}}

$('#theme').onclick=()=>{S.dark=!S.dark;theme();save()};theme();
fetch('data/structure.json').then(r=>r.json()).then(d=>{D=d;home()})
 .catch(()=>A.innerHTML='<div class="card">Soal gagal dimuat. Buka lewat GitHub Pages atau server lokal (<code>python -m http.server</code>), bukan klik dua kali file.</div>');
