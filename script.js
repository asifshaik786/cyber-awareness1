/* =========================================================
   CyberSafe Kadapa — Digital Safety Awareness Portal
   Shared script for index.html and awareness.html
   ========================================================= */

/* ===== LANGUAGE TOGGLE (English <-> Telugu) ===== */
let currentLang = 'en';

function setLanguage(lang) {
  currentLang = lang;
  document.querySelectorAll('[data-en][data-te]').forEach(function (el) {
    const val = el.getAttribute('data-' + lang);
    if (val !== null) el.innerHTML = val;
  });
  const btn = document.getElementById('langBtn');
  if (btn) btn.textContent = lang === 'te' ? '🌐 English' : '🌐 తెలుగు';
  document.body.classList.toggle('telugu', lang === 'te');
  document.documentElement.setAttribute('lang', lang === 'te' ? 'te' : 'en');
  try { localStorage.setItem('lang', lang); } catch (e) {}
}

function toggleLanguage() {
  setLanguage(currentLang === 'en' ? 'te' : 'en');
}

document.addEventListener('DOMContentLoaded', function () {
  let saved = 'en';
  try { saved = localStorage.getItem('lang') || 'en'; } catch (e) {}
  setLanguage(saved);
});

/* ===== MOBILE MENU ===== */
function toggleMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger) hamburger.classList.toggle('open');
  if (navLinks) navLinks.classList.toggle('open');
}

/* ===== SCROLL REVEAL ===== */
(function () {
  const targets = document.querySelectorAll('.reveal, .reveal-item');
  if (!targets.length) return;
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  targets.forEach(function (t) { io.observe(t); });
})();

/* ===== ANIMATED COUNTERS ===== */
function animateCounter(el, target, suffix) {
  const isDecimal = target % 1 !== 0;
  let cur = 0;
  const steps = 50;
  const increment = target / steps;
  const timer = setInterval(function () {
    cur += increment;
    if (cur >= target) {
      cur = target;
      clearInterval(timer);
    }
    el.textContent = (isDecimal ? cur.toFixed(2) : Math.round(cur).toLocaleString('en-IN')) + (suffix || '');
  }, 25);
}

(function () {
  const counters = document.querySelectorAll('.info-num[data-target]');
  if (!counters.length) return;
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-target'));
        const suffix = el.getAttribute('data-suffix') || '';
        animateCounter(el, target, suffix);
        io.unobserve(el);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach(function (c) { io.observe(c); });
})();

/* ===== CYBER SAFETY PLEDGE ===== */
function takePledge() {
  const btn = document.getElementById('pledgeBtn');
  const success = document.getElementById('pledgeSuccess');
  if (btn) {
    btn.disabled = true;
    btn.style.opacity = '0.6';
    btn.style.cursor = 'default';
  }
  if (success) success.classList.add('show');
}

/* ===== FAQ ACCORDION ===== */
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = answer.classList.contains('open');
  // Close all
  document.querySelectorAll('.faq-a.open').forEach(function (a) {
    a.classList.remove('open');
  });
  document.querySelectorAll('.faq-q.open').forEach(function (q) {
    q.classList.remove('open');
  });
  if (!isOpen) {
    answer.classList.add('open');
    btn.classList.add('open');
  }
}

/* ===== SCAM SIMULATOR ===== */
const scenarios = {
  otp: {
    avatar: '🏦',
    name: { en: 'SBI Bank', te: 'SBI బ్యాంక్' },
    sub: { en: 'Incoming Call · Unknown Number', te: 'వస్తున్న కాల్ · తెలియని నంబర్' },
    msg: {
      en: 'Hello sir, your SBI account will be blocked in 10 minutes due to suspicious activity. Please share the OTP just sent to your phone to verify and cancel the block.',
      te: 'హలో సర్, అనుమానాస్పద కార్యకలాపం కారణంగా మీ SBI ఖాతా 10 నిమిషాల్లో బ్లాక్ అవుతుంది. వెరిఫై చేయడానికి మీ ఫోన్‌కు ఇప్పుడే పంపిన OTP చెప్పండి.'
    },
    options: [
      { en: 'A) Share the OTP to save my account', te: 'A) నా ఖాతాను రక్షించడానికి OTP చెప్పండి', danger: true },
      { en: 'B) Refuse and hang up the call', te: 'B) తిరస్కరించి కాల్ కట్ చేయండి', danger: false }
    ],
    bad: {
      en: { title: '❌ You Got Scammed', body: 'You shared the OTP. ₹40,000 was withdrawn from your account within a minute. Real banks NEVER call asking for OTP — this is their most basic security rule.' },
      te: { title: '❌ మీరు మోసపోయారు', body: 'మీరు OTP చెప్పారు. ఒక నిమిషంలో మీ ఖాతా నుండి ₹40,000 తీసుకోబడింది. నిజమైన బ్యాంకులు OTP కోసం ఎప్పుడూ కాల్ చేయవు.' }
    },
    good: {
      en: { title: '✅ Correct Decision!', body: 'You refused and hung up — this was a scam call. Your bank will never ask for OTP over the phone. Report such calls to 1930 to help others stay safe.' },
      te: { title: '✅ సరైన నిర్ణయం!', body: 'మీరు తిరస్కరించి ఫోన్ పెట్టేశారు — ఇది స్కామ్ కాల్. మీ బ్యాంక్ ఎప్పుడూ ఫోన్‌లో OTP అడగదు. ఇతరులకు సహాయం చేయడానికి 1930 కి నివేదించండి.' }
    }
  },
  upi: {
    avatar: '💸',
    name: { en: 'GPay Collect Request', te: 'GPay కలెక్ట్ రిక్వెస్ట్' },
    sub: { en: 'Payment Request · ₹7,000', te: 'చెల్లింపు అభ్యర్థన · ₹7,000' },
    msg: {
      en: 'A buyer on OLX says: "I am sending ₹7,000 for your phone via GPay right now. Just accept the request and enter your UPI PIN to receive it."',
      te: 'OLX లో ఒక కొనుగోలుదారు: "మీ ఫోన్ కోసం GPay ద్వారా ఇప్పుడే ₹7,000 పంపుతున్నాను. రిక్వెస్ట్ అంగీకరించి స్వీకరించడానికి మీ UPI PIN నమోదు చేయండి."'
    },
    options: [
      { en: 'A) Enter my PIN to receive the ₹7,000', te: 'A) ₹7,000 స్వీకరించడానికి నా PIN నమోదు చేయండి', danger: true },
      { en: 'B) Reject the request — PIN means sending', te: 'B) రిక్వెస్ట్ తిరస్కరించండి — PIN అంటే పంపడం', danger: false }
    ],
    bad: {
      en: { title: '❌ Money Sent to Scammer', body: 'Entering your PIN confirmed a payment OUT, not a receipt. ₹7,000 left your account. Remember: receiving money on UPI never needs a PIN.' },
      te: { title: '❌ స్కామర్‌కు డబ్బు పంపబడింది', body: 'PIN నమోదు చేయడం వల్ల చెల్లింపు పంపబడింది, స్వీకరించలేదు. మీ ఖాతా నుండి ₹7,000 వెళ్ళిపోయింది.' }
    },
    good: {
      en: { title: '✅ Smart Move!', body: 'Correct — entering a PIN on a collect request sends money, it does not receive it. You protected your savings by rejecting it.' },
      te: { title: '✅ తెలివైన నిర్ణయం!', body: 'సరైనది — కలెక్ట్ రిక్వెస్ట్‌పై PIN నమోదు చేయడం డబ్బు పంపుతుంది, స్వీకరించదు. మీరు తిరస్కరించి మీ సేవింగ్స్‌ని రక్షించుకున్నారు.' }
    }
  },
  job: {
    avatar: '💼',
    name: { en: 'WhatsApp Job Offer', te: 'WhatsApp ఉద్యోగ ఆఫర్' },
    sub: { en: 'Unknown Number · Group Message', te: 'తెలియని నంబర్ · గ్రూప్ మెసేజ్' },
    msg: {
      en: 'Work from home data entry job! ₹800/day, no experience needed. Pay ₹299 registration fee to start earning from tomorrow.',
      te: 'ఇంటి నుండి డేటా ఎంట్రీ ఉద్యోగం! రోజుకు ₹800, అనుభవం అవసరం లేదు. రేపటి నుండి సంపాదించడానికి ₹299 రిజిస్ట్రేషన్ ఫీజు చెల్లించండి.'
    },
    options: [
      { en: 'A) Pay the ₹299 registration fee', te: 'A) ₹299 రిజిస్ట్రేషన్ ఫీజు చెల్లించండి', danger: true },
      { en: 'B) Ignore and report the message', te: 'B) నిర్లక్ష్యం చేసి మెసేజ్‌ని నివేదించండి', danger: false }
    ],
    bad: {
      en: { title: '❌ Scam Confirmed', body: 'After paying, the number was blocked. No job ever existed. Legitimate employers never charge a fee to hire you.' },
      te: { title: '❌ స్కామ్ నిర్ధారించబడింది', body: 'చెల్లించిన తర్వాత, నంబర్ బ్లాక్ చేయబడింది. ఉద్యోగం ఎప్పుడూ లేదు. నిజమైన యజమానులు నియమించుకోవడానికి ఎప్పుడూ ఫీజు వసూలు చేయరు.' }
    },
    good: {
      en: { title: '✅ Correct!', body: 'You avoided an advance-fee scam. Real companies never ask for payment to give you a job. Report such messages to cybercrime.gov.in.' },
      te: { title: '✅ సరైనది!', body: 'మీరు అడ్వాన్స్ ఫీజు మోసాన్ని నివారించారు. నిజమైన కంపెనీలు ఉద్యోగం ఇవ్వడానికి ఎప్పుడూ చెల్లింపు అడగవు.' }
    }
  },
  loan: {
    avatar: '📲',
    name: { en: 'QuickCash Loan App', te: 'QuickCash లోన్ యాప్' },
    sub: { en: 'Found via Social Media Ad', te: 'సోషల్ మీడియా ప్రకటన ద్వారా దొరికింది' },
    msg: {
      en: 'Instant loan approved! ₹5,000 in your account in 2 minutes. Just allow access to your Contacts and Photos to complete verification.',
      te: 'తక్షణ రుణం ఆమోదించబడింది! 2 నిమిషాల్లో మీ ఖాతాలో ₹5,000. వెరిఫికేషన్ పూర్తి చేయడానికి మీ పరిచయాలు మరియు ఫోటోలకు యాక్సెస్ అనుమతించండి.'
    },
    options: [
      { en: 'A) Allow access to get the loan quickly', te: 'A) త్వరగా రుణం పొందడానికి యాక్సెస్ అనుమతించండి', danger: true },
      { en: 'B) Deny access and use a verified bank instead', te: 'B) యాక్సెస్ నిరాకరించి ధృవీకరించబడిన బ్యాంక్ వాడండి', danger: false }
    ],
    bad: {
      en: { title: '❌ Data Stolen, Harassment Begins', body: 'The app accessed your contacts and photos. A week later it demanded ₹12,000 and threatened to message your family with morphed images.' },
      te: { title: '❌ డేటా దొంగిలించబడింది, వేధింపులు ప్రారంభం', body: 'యాప్ మీ పరిచయాలు మరియు ఫోటోలను యాక్సెస్ చేసింది. ఒక వారం తర్వాత ₹12,000 డిమాండ్ చేసి బెదిరించింది.' }
    },
    good: {
      en: { title: '✅ Well Protected!', body: 'You avoided a major risk. Unregistered loan apps misuse contact and photo access for harassment. Always check RBI registration at rbi.org.in first.' },
      te: { title: '✅ బాగా రక్షించుకున్నారు!', body: 'మీరు పెద్ద ప్రమాదాన్ని నివారించారు. నమోదు కాని లోన్ యాప్‌లు వేధింపుల కోసం పరిచయాలు మరియు ఫోటో యాక్సెస్‌ను దుర్వినియోగం చేస్తాయి.' }
    }
  }
};

let currentScenario = 'otp';

function loadScenario(key, tabEl) {
  currentScenario = key;
  if (tabEl) {
    document.querySelectorAll('.sim-tab').forEach(function (t) { t.classList.remove('active'); });
    tabEl.classList.add('active');
  }
  const s = scenarios[key];
  const lang = currentLang;

  const avatarEl = document.getElementById('simAvatar');
  const nameEl = document.getElementById('simName');
  const subEl = document.getElementById('simSub');
  const msgEl = document.getElementById('simMsg');
  const resultEl = document.getElementById('simResult');
  const optDiv = document.getElementById('simOptions');

  if (avatarEl) avatarEl.textContent = s.avatar;
  if (nameEl) nameEl.textContent = s.name[lang];
  if (subEl) subEl.textContent = s.sub[lang];
  if (msgEl) msgEl.textContent = s.msg[lang];
  if (resultEl) resultEl.style.display = 'none';

  if (optDiv) {
    optDiv.innerHTML = '';
    optDiv.style.display = 'flex';
    s.options.forEach(function (opt) {
      const b = document.createElement('button');
      b.className = 'sim-btn';
      b.textContent = opt[lang];
      b.onclick = function () { showResult(key, opt.danger); };
      optDiv.appendChild(b);
    });
  }
}

function showResult(key, isDanger) {
  const s = scenarios[key];
  const lang = currentLang;
  const res = isDanger ? s.bad[lang] : s.good[lang];
  const el = document.getElementById('simResult');
  const optDiv = document.getElementById('simOptions');

  if (el) {
    el.className = 'sim-result ' + (isDanger ? 'bad' : 'good');
    document.getElementById('simResultIcon').textContent = isDanger ? '❌' : '✅';
    document.getElementById('simResultTitle').textContent = res.title;
    document.getElementById('simResultBody').textContent = res.body;
    el.style.display = 'block';
  }
  if (optDiv) optDiv.style.display = 'none';
}

function replayScenario() {
  loadScenario(currentScenario);
}

// Initialize simulator on page load (only present on index.html)
document.addEventListener('DOMContentLoaded', function () {
  if (document.getElementById('simOptions')) {
    loadScenario('otp');
  }
});
/* ===== CYBER QUIZ ===== */

const quizData = [
{
question:"Should you share your OTP with anyone?",
options:["Yes","No","Only Bank Staff","Friends"],
answer:"No"
},
{
question:"Receiving money through UPI requires?",
options:["PIN","OTP","Nothing","Password"],
answer:"Nothing"
},
{
question:"What should you do if a stranger asks for money on WhatsApp?",
options:["Send immediately","Verify first","Share OTP","Ignore warning"],
answer:"Verify first"
}
];

let currentQuestion = 0;
let quizScore = 0;

function loadQuestion(){
const question = document.getElementById("question");
if(!question) return;

question.innerText = quizData[currentQuestion].question;

document.querySelectorAll(".option").forEach((btn,index)=>{
btn.innerText = quizData[currentQuestion].options[index];
});
}

function checkAnswer(btn){

if(btn.innerText === quizData[currentQuestion].answer){
quizScore++;
}
currentQuestion++;

if(currentQuestion < quizData.length){
loadQuestion();
}else{
showQuizResult();
}
}

function showQuizResult(){

document.getElementById("quiz-box").style.display="none";
document.getElementById("result").style.display="block";

document.getElementById("score").innerText =
`Your Score: ${quizScore}/${quizData.length}`;

let badge = "🥉 Cyber Beginner";

if(quizScore === 3){
badge = "🏆 Cyber Security Expert";
}
else if(quizScore >= 2){
badge = "🥈 Cyber Awareness Champion";
}

document.getElementById("badge").innerText = badge;
}

function restartQuiz(){

currentQuestion = 0;
quizScore = 0;

document.getElementById("quiz-box").style.display="block";
document.getElementById("result").style.display="none";

loadQuestion();
}

document.addEventListener("DOMContentLoaded", loadQuestion);
