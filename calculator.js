document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) window.lucide.createIcons();

  // ----- Constants -----
  const GRADE_BOUNDARIES = {
    "Physics": {9: 161/2, 8: 146/2, 7: 131/2, 6: 109/2, 5: 87/2, 4: 66/2},
    "Biology": {9: 166/2, 8: 152/2, 7: 139/2, 6: 116/2, 5: 93/2, 4: 71/2},
    "Chemistry": {9: 148/2, 8: 128/2, 7: 109/2, 6: 87/2, 5: 66/2, 4: 45/2},
    "Maths": {9: 219/2.4, 8: 191/2.4, 7: 163/2.4, 6: 129/2.4, 5: 95/2.4, 4: 61/2.4},
    "English Language": {9: 121/1.6, 8: 111/1.6, 7: 102/1.6, 6: 92/1.6, 5: 82/1.6, 4: 73/1.6},
    "English Literature": {9: 137/1.6, 8: 121/1.6, 7: 106/1.6, 6: 90/1.6, 5: 74/1.6, 4: 58/1.6},
    "Further Maths": {9: 137/1.6, 8: 120/1.6, 7: 103/1.6, 6: 85/1.6, 5: 68/1.6, 4: 59/1.6},
    "Computer Science": {9: 152/1.8, 8: 140/1.8, 7: 128/1.8, 6: 108/1.8, 5: 88/1.8, 4: 68/1.8},
    "Geography": {9: 209/2.56, 8: 193/2.56, 7: 177/2.56, 6: 157/2.56, 5: 138/2.56, 4: 119/2.56},
    "German": {9: 220/2.8, 8: 197/2.8, 7: 174/2.8, 6: 148/2.8, 5: 123/2.8, 4: 98/2.8},
    "RE": {9: 177/2.04, 8: 165/2.04, 7: 154/2.04, 6: 138/2.04, 5: 122/2.04, 4: 107/2.04}
  };

  const SUBJECTS = [
    { name: "Physics", icon: "atom", color: "from-blue-500 to-cyan-500" },
    { name: "Biology", icon: "dna", color: "from-green-500 to-emerald-500" },
    { name: "Chemistry", icon: "flask-conical", color: "from-orange-500 to-red-500" },
    { name: "Maths", icon: "calculator", color: "from-indigo-500 to-purple-500" },
    { name: "English Language", icon: "book-open", color: "from-pink-500 to-rose-500" },
    { name: "English Literature", icon: "pen-tool", color: "from-purple-500 to-violet-500" },
    { name: "Further Maths", icon: "bar-chart-3", color: "from-teal-500 to-cyan-500" },
    { name: "Computer Science", icon: "monitor", color: "from-slate-500 to-gray-500" },
    { name: "Geography", icon: "globe", color: "from-emerald-500 to-teal-500" },
    { name: "German", icon: "languages", color: "from-amber-500 to-yellow-500" },
    { name: "RE", icon: "church", color: "from-violet-500 to-purple-500" }
  ];

  const GRADE_COLORS = {
    9: "from-green-500 to-emerald-600",
    8: "from-green-500 to-emerald-600",
    7: "from-orange-500 to-amber-600",
    6: "from-orange-500 to-amber-600",
    5: "from-red-500 to-red-600",
    4: "from-red-500 to-red-600",
    3: "from-red-500 to-red-600",
    2: "from-red-500 to-red-600",
    1: "from-red-500 to-red-600"
  };

  const GRADE_NAMES = {
    9: "Grade 9 - Outstanding",
    8: "Grade 8 - Excellent",
    7: "Grade 7 - Very Good",
    6: "Grade 6 - Good",
    5: "Grade 5 - Strong Pass",
    4: "Grade 4 - Standard Pass",
    3: "Grade 3 - Below Expected",
    2: "Grade 2 - Low",
    1: "Grade 1 - Very Low"
  };

  // ----- Elements -----
  const step1 = document.getElementById('step1');
  const step2 = document.getElementById('step2');
  const step3 = document.getElementById('step3');

  // Custom subject select
  const subjectTrigger = document.getElementById('subjectTrigger');
  const subjectSelected = document.getElementById('subjectSelected');
  const subjectPanel = document.getElementById('subjectPanel');
  const subjectList = document.getElementById('subjectList');

  const toStep2Btn = document.getElementById('toStep2');
  const subjectName = document.getElementById('subjectName');

  const achieved = document.getElementById('achieved');
  const total = document.getElementById('total');
  const errorBox = document.getElementById('errorBox');
  const calcBtn = document.getElementById('calcBtn');

  const progressBox = document.getElementById('progressBox');
  const progressFill = document.getElementById('progressFill');
  const progressPct = document.getElementById('progressPct');
  const calcBox = document.getElementById('calcBox');

  const trophyWrap = document.getElementById('trophyWrap');
  const resultSubject = document.getElementById('resultSubject');
  const resultPct = document.getElementById('resultPct');
  const resultGradeNum = document.getElementById('resultGradeNum');
  const improveBox = document.getElementById('improveBox');
  const againBtn = document.getElementById('againBtn');

  // ----- Custom dropdown build -----
  let selectedSubject = '';

  function renderSubjectList() {
    subjectList.innerHTML = SUBJECTS.map(s => `
      <li data-value="${s.name}"
          class="px-4 py-3 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 cursor-pointer">
        <div class="flex items-center gap-4">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-r ${s.color} flex items-center justify-center flex-shrink-0">
            <i data-lucide="${s.icon}" class="w-5 h-5 text-white"></i>
          </div>
          <span class="font-medium text-gray-800">${s.name}</span>
        </div>
      </li>
    `).join('');
    if (window.lucide) window.lucide.createIcons();
  }
  renderSubjectList();

  function closePanel() {
    subjectPanel.classList.add('hidden');
    subjectTrigger.querySelector('[data-lucide="chevron-down"]')?.classList.remove('rotate-180');
  }

  function openPanel() {
    subjectPanel.classList.remove('hidden');
    subjectTrigger.querySelector('[data-lucide="chevron-down"]')?.classList.add('rotate-180');
  }

  subjectTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = !subjectPanel.classList.contains('hidden');
    if (isOpen) closePanel(); else openPanel();
  });

  // Click outside to close
  document.addEventListener('click', (e) => {
    if (!subjectPanel.classList.contains('hidden')) {
      if (!subjectPanel.contains(e.target) && !subjectTrigger.contains(e.target)) {
        closePanel();
      }
    }
  });

  // Choose subject
  subjectList.addEventListener('click', (e) => {
    const li = e.target.closest('li[data-value]');
    if (!li) return;
    selectedSubject = li.getAttribute('data-value');

    // Find subject object for icon + color
    const s = SUBJECTS.find(x => x.name === selectedSubject);
    subjectSelected.innerHTML = `
      <span class="flex items-center gap-3 text-lg text-gray-800">
        <span class="w-8 h-8 rounded-lg bg-gradient-to-r ${s.color} flex items-center justify-center">
          <i data-lucide="${s.icon}" class="w-5 h-5 text-white"></i>
        </span>
        <span class="font-medium">${s.name}</span>
      </span>
    `;
    if (window.lucide) window.lucide.createIcons();

    toStep2Btn.disabled = false;
    closePanel();
  });

  // Go to step 2
  toStep2Btn.addEventListener('click', () => {
    if (!selectedSubject) return;
    subjectName.textContent = selectedSubject;
    step1.classList.add('hidden');
    step2.classList.remove('hidden');
    achieved.focus();
  });

  // Validation of inputs
  function canCalculate() {
    const a = parseInt(achieved.value, 10);
    const t = parseInt(total.value, 10);
    if (Number.isNaN(a) || Number.isNaN(t) || t <= 0) return false;
    if (a > t) return false;
    return true;
  }

  function updateValidation() {
    if (achieved.value && total.value && parseInt(achieved.value, 10) > parseInt(total.value, 10)) {
      errorBox.classList.remove('hidden');
    } else {
      errorBox.classList.add('hidden');
    }
    calcBtn.disabled = !canCalculate();
  }

  achieved.addEventListener('input', updateValidation);
  total.addEventListener('input', updateValidation);

  // Calculation functions
  function calculateGrade(percentage, subject, totalMarks, marksAchieved) {
    const boundaries = GRADE_BOUNDARIES[subject];
    let grade = 1;
    for (let g = 9; g >= 4; g--) {
      if (percentage >= boundaries[g]) { grade = g; break; }
    }
    let marksForNext = null;
    if (grade < 9) {
      const nextGradePct = boundaries[grade + 1];
      const marksNeeded = Math.ceil((nextGradePct * totalMarks / 100) - marksAchieved);
      if (marksNeeded > 0) marksForNext = marksNeeded;
    }
    return { grade, marksForNext };
  }

  // Handle calculate (with 4s progress)
  calcBtn.addEventListener('click', async () => {
    if (!canCalculate()) return;

    calcBox.classList.add('hidden');
    progressBox.classList.remove('hidden');

    let progress = 0;
    progressFill.style.width = '0%';
    progressPct.textContent = '0%';

    const timer = setInterval(() => {
      progress = Math.min(100, progress + 2.5); // every 100ms
      progressFill.style.width = `${progress}%`;
      progressPct.textContent = `${Math.round(progress)}%`;
      if (progress >= 100) {
        clearInterval(timer);
        finishCalc();
      }
    }, 100);
  });

  function finishCalc() {
    const a = parseInt(achieved.value, 10);
    const t = parseInt(total.value, 10);
    const percentage = (a / t) * 100;
    const subject = selectedSubject;
    const { grade, marksForNext } = calculateGrade(percentage, subject, t, a);

    // Fill results (percentage rounded to whole number)
    resultSubject.textContent = subject;
    resultPct.textContent = `${Math.round(percentage)}%`;

    resultGradeNum.textContent = `${grade}`;
    const gradClass = GRADE_COLORS[grade] || 'from-red-500 to-red-600';
    resultGradeNum.className = `text-6xl font-bold bg-gradient-to-r ${gradClass} bg-clip-text text-transparent mb-2`;
    trophyWrap.className = `mx-auto w-20 h-20 bg-gradient-to-r ${gradClass} rounded-3xl flex items-center justify-center mb-6 shadow-2xl`;

    // Improvement box
    if (marksForNext) {
      improveBox.innerHTML = `
        <div class="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">+${marksForNext}</div>
        <p class="text-purple-600 font-semibold text-lg">Marks for Grade ${grade + 1}</p>
      `;
    } else {
      improveBox.innerHTML = `
        <div class="text-4xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent mb-2">🎉</div>
        <p class="text-orange-600 font-semibold text-lg">Top Grade!</p>
      `;
    }

    // Switch to step 3
    step2.classList.add('hidden');
    step3.classList.remove('hidden');

    if (window.lucide) window.lucide.createIcons();
  }

  // Again button
  againBtn.addEventListener('click', () => {
    // Reset to original state
    selectedSubject = '';
    subjectSelected.innerHTML = `<span class="opacity-60">Choose your subject...</span>`;
    toStep2Btn.disabled = true;

    achieved.value = '';
    total.value = '';
    errorBox.classList.add('hidden');
    calcBtn.disabled = true;

    progressBox.classList.add('hidden');
    calcBox.classList.remove('hidden');
    progressFill.style.width = '0%';
    progressPct.textContent = '0%';

    step3.classList.add('hidden');
    step1.classList.remove('hidden');

    if (window.lucide) window.lucide.createIcons();
  });
});
