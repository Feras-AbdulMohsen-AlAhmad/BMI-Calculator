/**
 * BMI Calculator - Professional JavaScript
 * Features: Multi-unit support, gender-aware calculations, history tracking,
 * language switching (EN/AR), dark mode, and personalized health tips
 */

// ============ Configuration & Constants ============
const CONFIG = {
  BMI_CATEGORIES: {
    SEVERE_UNDERWEIGHT: { min: 0, max: 16, key: "severeUnderweight" },
    UNDERWEIGHT: { min: 16, max: 18.5, key: "underweight" },
    NORMAL: { min: 18.5, max: 25, key: "normal" },
    OVERWEIGHT: { min: 25, max: 30, key: "overweight" },
    OBESE: { min: 30, max: 40, key: "obese" },
    SEVERE_OBESE: { min: 40, max: 100, key: "severeObese" },
  },
  STORAGE_KEYS: {
    THEME: "bmi-theme",
    LANGUAGE: "bmi-language",
    HISTORY: "bmi-history",
  },
  CONVERSION: {
    LB_TO_KG: 0.453592,
    KG_TO_LB: 2.20462,
    IN_TO_CM: 2.54,
    CM_TO_IN: 0.393701,
    FT_TO_IN: 12,
  },
};

// ============ Translations ============
const TRANSLATIONS = {
  en: {
    // Categories
    severeUnderweight: "Severe Underweight",
    underweight: "Underweight",
    normal: "Normal Weight",
    overweight: "Overweight",
    obese: "Obese",
    severeObese: "Severe Obesity",

    // Icons for categories
    categoryIcons: {
      severeUnderweight: "fa-exclamation-triangle",
      underweight: "fa-arrow-down",
      normal: "fa-check-circle",
      overweight: "fa-arrow-up",
      obese: "fa-exclamation-circle",
      severeObese: "fa-exclamation-triangle",
    },

    // Weight difference messages
    weightDiffMessages: {
      lose: "to lose",
      gain: "to gain",
      ideal: "You're at ideal weight!",
    },

    // Tips by category
    tips: {
      severeUnderweight: [
        "Consult a healthcare professional immediately",
        "Increase caloric intake with nutrient-dense foods",
        "Consider speaking with a nutritionist",
        "Eat smaller, more frequent meals",
      ],
      underweight: [
        "Increase your calorie intake with healthy foods",
        "Add protein-rich foods to your diet",
        "Include healthy fats like nuts and avocados",
        "Consider strength training to build muscle mass",
      ],
      normal: [
        "Maintain a balanced diet with all food groups",
        "Exercise regularly - aim for 150 minutes per week",
        "Stay hydrated with 8 glasses of water daily",
        "Get adequate sleep (7-9 hours)",
        "Keep up the great work! 💪",
      ],
      overweight: [
        "Reduce portion sizes gradually",
        "Increase physical activity to 30 minutes daily",
        "Choose whole grains over refined carbs",
        "Limit sugary drinks and processed foods",
        "Track your food intake for awareness",
      ],
      obese: [
        "Consult a healthcare professional for guidance",
        "Start with low-impact exercises like walking or swimming",
        "Focus on making small, sustainable changes",
        "Consider working with a registered dietitian",
        "Monitor your blood pressure regularly",
      ],
      severeObese: [
        "Seek medical advice as soon as possible",
        "Consider supervised weight management programs",
        "Small steps can lead to big changes over time",
        "Focus on health improvements, not just weight",
        "Build a support system of friends and family",
      ],
    },

    // Toast messages
    toasts: {
      saved: "Result saved successfully!",
      cleared: "History cleared!",
      copied: "Copied to clipboard!",
    },

    // Units
    units: {
      kg: "kg",
      lb: "lb",
      cm: "cm",
      ft: "ft",
      in: "in",
    },
  },
  ar: {
    // Categories
    severeUnderweight: "نحافة شديدة",
    underweight: "نحافة",
    normal: "وزن طبيعي",
    overweight: "زيادة وزن",
    obese: "سمنة",
    severeObese: "سمنة مفرطة",

    // Icons for categories
    categoryIcons: {
      severeUnderweight: "fa-exclamation-triangle",
      underweight: "fa-arrow-down",
      normal: "fa-check-circle",
      overweight: "fa-arrow-up",
      obese: "fa-exclamation-circle",
      severeObese: "fa-exclamation-triangle",
    },

    // Weight difference messages
    weightDiffMessages: {
      lose: "للخسارة",
      gain: "للزيادة",
      ideal: "أنت في الوزن المثالي!",
    },

    // Tips by category
    tips: {
      severeUnderweight: [
        "استشر طبيباً مختصاً فوراً",
        "زِد السعرات الحرارية بأطعمة مغذية",
        "تحدث مع أخصائي تغذية",
        "تناول وجبات صغيرة ومتكررة",
      ],
      underweight: [
        "زِد السعرات الحرارية بأطعمة صحية",
        "أضف أطعمة غنية بالبروتين لنظامك الغذائي",
        "تناول الدهون الصحية كالمكسرات والأفوكادو",
        "مارس تمارين القوة لبناء العضلات",
      ],
      normal: [
        "حافظ على نظام غذائي متوازن",
        "مارس الرياضة بانتظام - 150 دقيقة أسبوعياً",
        "اشرب 8 أكواب ماء يومياً",
        "احصل على نوم كافٍ (7-9 ساعات)",
        "استمر بالعمل الرائع! 💪",
      ],
      overweight: [
        "قلل أحجام الوجبات تدريجياً",
        "زِد النشاط البدني لـ 30 دقيقة يومياً",
        "اختر الحبوب الكاملة بدل المكررة",
        "قلل المشروبات السكرية والأطعمة المصنعة",
        "تتبع طعامك لزيادة الوعي",
      ],
      obese: [
        "استشر متخصصاً للحصول على إرشادات",
        "ابدأ بتمارين خفيفة كالمشي أو السباحة",
        "ركز على التغييرات الصغيرة المستدامة",
        "فكر بالعمل مع أخصائي تغذية معتمد",
        "راقب ضغط دمك بانتظام",
      ],
      severeObese: [
        "اطلب المشورة الطبية في أقرب وقت",
        "فكر ببرامج إدارة الوزن المُشرف عليها",
        "الخطوات الصغيرة تؤدي لتغييرات كبيرة",
        "ركز على تحسين الصحة وليس الوزن فقط",
        "ابنِ نظام دعم من الأصدقاء والعائلة",
      ],
    },

    // Toast messages
    toasts: {
      saved: "تم حفظ النتيجة بنجاح!",
      cleared: "تم مسح السجل!",
      copied: "تم النسخ!",
    },

    // Units
    units: {
      kg: "كجم",
      lb: "رطل",
      cm: "سم",
      ft: "قدم",
      in: "بوصة",
    },
  },
};

// ============ State Management ============
const state = {
  currentUnit: "metric", // 'metric' or 'imperial'
  currentLanguage: "en",
  currentTheme: "light",
  lastResult: null,
  history: [],
};

// ============ DOM Elements ============
const elements = {
  // Controls
  themeToggle: document.getElementById("themeToggle"),
  langToggle: document.getElementById("langToggle"),

  // Form
  bmiForm: document.getElementById("bmiForm"),
  unitToggleBtns: document.querySelectorAll(".toggle-btn[data-unit]"),
  genderInputs: document.querySelectorAll('input[name="gender"]'),

  // Age
  ageInput: document.getElementById("age"),
  ageSlider: document.getElementById("ageSlider"),

  // Height (Metric)
  heightInput: document.getElementById("height"),
  heightSlider: document.getElementById("heightSlider"),

  // Height (Imperial)
  heightFtInput: document.getElementById("heightFt"),
  heightInInput: document.getElementById("heightIn"),
  heightSliderFt: document.getElementById("heightSliderFt"),

  // Weight (Metric)
  weightInput: document.getElementById("weight"),
  weightSlider: document.getElementById("weightSlider"),

  // Weight (Imperial)
  weightLbInput: document.getElementById("weightLb"),
  weightSliderLb: document.getElementById("weightSliderLb"),

  // Metric/Imperial inputs
  metricInputs: document.querySelectorAll(".metric-input"),
  imperialInputs: document.querySelectorAll(".imperial-input"),

  // Results
  resultsCard: document.getElementById("resultsCard"),
  bmiValue: document.getElementById("bmiValue"),
  bmiRing: document.getElementById("bmiRing"),
  bmiCategory: document.getElementById("bmiCategory"),
  categoryIcon: document.getElementById("categoryIcon"),
  categoryText: document.getElementById("categoryText"),
  scalePointer: document.getElementById("scalePointer"),
  healthyRange: document.getElementById("healthyRange"),
  idealWeight: document.getElementById("idealWeight"),
  weightDiff: document.getElementById("weightDiff"),
  tipsList: document.getElementById("tipsList"),

  // Actions
  recalculateBtn: document.getElementById("recalculateBtn"),
  saveBtn: document.getElementById("saveBtn"),

  // History
  historySection: document.getElementById("historySection"),
  historyList: document.getElementById("historyList"),
  clearHistoryBtn: document.getElementById("clearHistoryBtn"),

  // Toast
  toast: document.getElementById("toast"),
  toastMessage: document.getElementById("toastMessage"),

  // Scroll to Top
  scrollTopBtn: document.getElementById("scrollTopBtn"),
};

// ============ Utility Functions ============

/**
 * Calculate BMI from weight (kg) and height (cm)
 */
function calculateBMI(weightKg, heightCm) {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

/**
 * Get BMI category based on BMI value
 */
function getBMICategory(bmi) {
  for (const [key, category] of Object.entries(CONFIG.BMI_CATEGORIES)) {
    if (bmi >= category.min && bmi < category.max) {
      return category.key;
    }
  }
  return "normal";
}

/**
 * Get category class for styling
 */
function getCategoryClass(categoryKey) {
  const classMap = {
    severeUnderweight: "underweight",
    underweight: "underweight",
    normal: "normal",
    overweight: "overweight",
    obese: "obese",
    severeObese: "obese",
  };
  return classMap[categoryKey] || "normal";
}

/**
 * Calculate ideal weight using Devine formula
 * Adjusted for gender
 */
function calculateIdealWeight(heightCm, gender) {
  const heightInches = heightCm * CONFIG.CONVERSION.CM_TO_IN;
  const baseHeight = 60; // 5 feet in inches

  if (gender === "male") {
    // Devine formula for men
    return 50 + 2.3 * (heightInches - baseHeight);
  } else {
    // Devine formula for women
    return 45.5 + 2.3 * (heightInches - baseHeight);
  }
}

/**
 * Calculate healthy weight range based on BMI 18.5-25
 */
function calculateHealthyWeightRange(heightCm) {
  const heightM = heightCm / 100;
  const minWeight = 18.5 * (heightM * heightM);
  const maxWeight = 25 * (heightM * heightM);
  return { min: minWeight, max: maxWeight };
}

/**
 * Convert imperial height to cm
 */
function imperialHeightToCm(feet, inches) {
  const totalInches = feet * CONFIG.CONVERSION.FT_TO_IN + inches;
  return totalInches * CONFIG.CONVERSION.IN_TO_CM;
}

/**
 * Convert cm to imperial height
 */
function cmToImperialHeight(cm) {
  const totalInches = cm * CONFIG.CONVERSION.CM_TO_IN;
  const feet = Math.floor(totalInches / CONFIG.CONVERSION.FT_TO_IN);
  const inches = Math.round(totalInches % CONFIG.CONVERSION.FT_TO_IN);
  return { feet, inches };
}

/**
 * Convert lb to kg
 */
function lbToKg(lb) {
  return lb * CONFIG.CONVERSION.LB_TO_KG;
}

/**
 * Convert kg to lb
 */
function kgToLb(kg) {
  return kg * CONFIG.CONVERSION.KG_TO_LB;
}

/**
 * Calculate scale pointer position (0-100%)
 * BMI range displayed: 16-40
 */
function calculatePointerPosition(bmi) {
  const minBMI = 16;
  const maxBMI = 40;
  const clampedBMI = Math.max(minBMI, Math.min(maxBMI, bmi));
  return ((clampedBMI - minBMI) / (maxBMI - minBMI)) * 100;
}

/**
 * Calculate ring progress (0-100%)
 * Based on BMI 10-50 range for visual
 */
function calculateRingProgress(bmi) {
  const minBMI = 10;
  const maxBMI = 50;
  const clampedBMI = Math.max(minBMI, Math.min(maxBMI, bmi));
  return ((clampedBMI - minBMI) / (maxBMI - minBMI)) * 100;
}

/**
 * Get color based on BMI category
 */
function getCategoryColor(categoryKey) {
  const colorMap = {
    severeUnderweight: "#1E40AF",
    underweight: "#3B82F6",
    normal: "#10B981",
    overweight: "#F59E0B",
    obese: "#EF4444",
    severeObese: "#B91C1C",
  };
  return colorMap[categoryKey] || "#10B981";
}

/**
 * Format number to specified decimal places
 */
function formatNumber(num, decimals = 1) {
  return Number(num).toFixed(decimals);
}

/**
 * Format date for history
 */
function formatDate(date) {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(date).toLocaleDateString(
    state.currentLanguage === "ar" ? "ar-EG" : "en-US",
    options,
  );
}

/**
 * Show toast notification
 */
function showToast(messageKey) {
  const message = TRANSLATIONS[state.currentLanguage].toasts[messageKey];
  elements.toastMessage.textContent = message;
  elements.toast.classList.add("show");

  setTimeout(() => {
    elements.toast.classList.remove("show");
  }, 3000);
}

// ============ Storage Functions ============

/**
 * Load preferences from localStorage
 */
function loadPreferences() {
  // Load theme
  const savedTheme = localStorage.getItem(CONFIG.STORAGE_KEYS.THEME);
  if (savedTheme) {
    state.currentTheme = savedTheme;
    applyTheme(savedTheme);
  }

  // Load language
  const savedLanguage = localStorage.getItem(CONFIG.STORAGE_KEYS.LANGUAGE);
  if (savedLanguage) {
    state.currentLanguage = savedLanguage;
    applyLanguage(savedLanguage);
  }

  // Load history
  const savedHistory = localStorage.getItem(CONFIG.STORAGE_KEYS.HISTORY);
  if (savedHistory) {
    try {
      state.history = JSON.parse(savedHistory);
      renderHistory();
    } catch (e) {
      state.history = [];
    }
  }
}

/**
 * Save history to localStorage
 */
function saveHistory() {
  localStorage.setItem(
    CONFIG.STORAGE_KEYS.HISTORY,
    JSON.stringify(state.history),
  );
}

// ============ Theme Functions ============

/**
 * Apply theme to document
 */
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(CONFIG.STORAGE_KEYS.THEME, theme);
}

/**
 * Toggle between light and dark themes
 */
function toggleTheme() {
  state.currentTheme = state.currentTheme === "light" ? "dark" : "light";
  applyTheme(state.currentTheme);
}

// ============ Language Functions ============

/**
 * Apply language to document
 */
function applyLanguage(lang) {
  const isRTL = lang === "ar";
  document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
  document.documentElement.setAttribute("lang", lang);
  localStorage.setItem(CONFIG.STORAGE_KEYS.LANGUAGE, lang);

  // Update language toggle button text
  elements.langToggle.querySelector(".lang-text").textContent =
    lang === "en" ? "AR" : "EN";

  // Update all translatable elements
  document.querySelectorAll("[data-en][data-ar]").forEach((el) => {
    el.textContent = el.getAttribute(`data-${lang}`);
  });

  // Update results if available
  if (state.lastResult) {
    updateResultsDisplay(state.lastResult);
  }

  // Re-render history
  renderHistory();
}

/**
 * Toggle between languages
 */
function toggleLanguage() {
  state.currentLanguage = state.currentLanguage === "en" ? "ar" : "en";
  applyLanguage(state.currentLanguage);
}

// ============ Unit Functions ============

/**
 * Switch unit system
 */
function switchUnit(unit) {
  if (state.currentUnit === unit) return;

  state.currentUnit = unit;

  // Update toggle buttons
  elements.unitToggleBtns.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.unit === unit);
  });

  // Show/hide appropriate inputs
  elements.metricInputs.forEach((el) => {
    el.classList.toggle("hidden", unit !== "metric");
  });
  elements.imperialInputs.forEach((el) => {
    el.classList.toggle("hidden", unit !== "imperial");
  });

  // Convert values when switching
  if (unit === "imperial") {
    // Convert metric to imperial
    const heightCm = parseFloat(elements.heightInput.value) || 170;
    const { feet, inches } = cmToImperialHeight(heightCm);
    elements.heightFtInput.value = feet;
    elements.heightInInput.value = inches;
    elements.heightSliderFt.value = feet * 12 + inches;

    const weightKg = parseFloat(elements.weightInput.value) || 70;
    const weightLb = Math.round(kgToLb(weightKg));
    elements.weightLbInput.value = weightLb;
    elements.weightSliderLb.value = weightLb;
  } else {
    // Convert imperial to metric
    const feet = parseFloat(elements.heightFtInput.value) || 5;
    const inches = parseFloat(elements.heightInInput.value) || 7;
    const heightCm = Math.round(imperialHeightToCm(feet, inches));
    elements.heightInput.value = heightCm;
    elements.heightSlider.value = heightCm;

    const weightLb = parseFloat(elements.weightLbInput.value) || 154;
    const weightKg = Math.round(lbToKg(weightLb) * 10) / 10;
    elements.weightInput.value = weightKg;
    elements.weightSlider.value = weightKg;
  }
}

// ============ Input Synchronization ============

/**
 * Sync age input with slider
 */
function syncAgeInputs(source) {
  const value =
    source === "input" ? elements.ageInput.value : elements.ageSlider.value;
  elements.ageInput.value = value;
  elements.ageSlider.value = value;
}

/**
 * Sync height inputs (metric)
 */
function syncHeightInputs(source) {
  const value =
    source === "input"
      ? elements.heightInput.value
      : elements.heightSlider.value;
  elements.heightInput.value = value;
  elements.heightSlider.value = value;
}

/**
 * Sync height inputs (imperial)
 */
function syncHeightImperialInputs(source) {
  if (source === "slider") {
    const totalInches = parseInt(elements.heightSliderFt.value);
    elements.heightFtInput.value = Math.floor(totalInches / 12);
    elements.heightInInput.value = totalInches % 12;
  } else {
    const feet = parseInt(elements.heightFtInput.value) || 0;
    const inches = parseInt(elements.heightInInput.value) || 0;
    elements.heightSliderFt.value = feet * 12 + inches;
  }
}

/**
 * Sync weight inputs (metric)
 */
function syncWeightInputs(source) {
  const value =
    source === "input"
      ? elements.weightInput.value
      : elements.weightSlider.value;
  elements.weightInput.value = value;
  elements.weightSlider.value = value;
}

/**
 * Sync weight inputs (imperial)
 */
function syncWeightImperialInputs(source) {
  const value =
    source === "input"
      ? elements.weightLbInput.value
      : elements.weightSliderLb.value;
  elements.weightLbInput.value = value;
  elements.weightSliderLb.value = value;
}

// ============ Calculation & Display ============

/**
 * Gather form data and calculate BMI
 */
function calculateAndDisplay() {
  // Get gender
  const gender = document.querySelector('input[name="gender"]:checked').value;

  // Get age
  const age = parseInt(elements.ageInput.value) || 25;

  // Get height and weight based on unit
  let heightCm, weightKg;

  if (state.currentUnit === "metric") {
    heightCm = parseFloat(elements.heightInput.value) || 170;
    weightKg = parseFloat(elements.weightInput.value) || 70;
  } else {
    const feet = parseFloat(elements.heightFtInput.value) || 5;
    const inches = parseFloat(elements.heightInInput.value) || 7;
    heightCm = imperialHeightToCm(feet, inches);
    weightKg = lbToKg(parseFloat(elements.weightLbInput.value) || 154);
  }

  // Calculate BMI
  const bmi = calculateBMI(weightKg, heightCm);
  const categoryKey = getBMICategory(bmi);
  const categoryClass = getCategoryClass(categoryKey);

  // Calculate additional info
  const idealWeight = calculateIdealWeight(heightCm, gender);
  const healthyRange = calculateHealthyWeightRange(heightCm);
  const weightDifference = weightKg - idealWeight;

  // Store result
  state.lastResult = {
    bmi,
    categoryKey,
    categoryClass,
    idealWeight,
    healthyRange,
    weightDifference,
    gender,
    age,
    heightCm,
    weightKg,
    timestamp: new Date().toISOString(),
  };

  // Update display
  updateResultsDisplay(state.lastResult);

  // Show results card
  elements.resultsCard.classList.remove("hidden");

  // Scroll to results
  elements.resultsCard.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * Update results display with calculated values
 */
function updateResultsDisplay(result) {
  const lang = state.currentLanguage;
  const trans = TRANSLATIONS[lang];
  const isMetric = state.currentUnit === "metric";

  // Animate BMI value
  animateValue(elements.bmiValue, 0, result.bmi, 1000);

  // Update ring progress
  const progress = calculateRingProgress(result.bmi);
  const circumference = 2 * Math.PI * 90; // r=90
  const offset = circumference - (progress / 100) * circumference;
  elements.bmiRing.style.strokeDashoffset = offset;
  elements.bmiRing.style.stroke = getCategoryColor(result.categoryKey);

  // Update category display
  elements.bmiCategory.className = `bmi-category ${result.categoryClass}`;
  elements.categoryIcon.innerHTML = `<i class="fas ${trans.categoryIcons[result.categoryKey]}"></i>`;
  elements.categoryText.textContent = trans[result.categoryKey];

  // Update BMI number color
  elements.bmiValue.style.color = getCategoryColor(result.categoryKey);

  // Update scale pointer
  const pointerPosition = calculatePointerPosition(result.bmi);
  elements.scalePointer.style.left = `calc(${pointerPosition}% - 8px)`;

  // Update healthy range
  const unit = isMetric ? trans.units.kg : trans.units.lb;
  const minWeight = isMetric
    ? result.healthyRange.min
    : kgToLb(result.healthyRange.min);
  const maxWeight = isMetric
    ? result.healthyRange.max
    : kgToLb(result.healthyRange.max);
  elements.healthyRange.textContent = `${formatNumber(minWeight)} - ${formatNumber(maxWeight)} ${unit}`;

  // Update ideal weight
  const idealDisplay = isMetric
    ? result.idealWeight
    : kgToLb(result.idealWeight);
  elements.idealWeight.textContent = `${formatNumber(idealDisplay)} ${unit}`;

  // Update weight difference
  const diffDisplay = isMetric
    ? result.weightDifference
    : kgToLb(result.weightDifference);
  if (Math.abs(result.weightDifference) < 1) {
    elements.weightDiff.textContent = trans.weightDiffMessages.ideal;
    elements.weightDiff.style.color = getCategoryColor("normal");
  } else if (result.weightDifference > 0) {
    elements.weightDiff.textContent = `-${formatNumber(Math.abs(diffDisplay))} ${unit} ${trans.weightDiffMessages.lose}`;
    elements.weightDiff.style.color = getCategoryColor("overweight");
  } else {
    elements.weightDiff.textContent = `+${formatNumber(Math.abs(diffDisplay))} ${unit} ${trans.weightDiffMessages.gain}`;
    elements.weightDiff.style.color = getCategoryColor("underweight");
  }

  // Update tips
  updateTips(result.categoryKey);
}

/**
 * Animate numeric value
 */
function animateValue(element, start, end, duration) {
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function (ease-out)
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = start + (end - start) * easeOut;

    element.textContent = formatNumber(current);

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

/**
 * Update health tips based on category
 */
function updateTips(categoryKey) {
  const tips = TRANSLATIONS[state.currentLanguage].tips[categoryKey];
  elements.tipsList.innerHTML = tips.map((tip) => `<li>${tip}</li>`).join("");
}

// ============ History Functions ============

/**
 * Save current result to history
 */
function saveToHistory() {
  if (!state.lastResult) return;

  const historyItem = {
    ...state.lastResult,
    id: Date.now(),
  };

  state.history.unshift(historyItem);

  // Keep only last 10 items
  if (state.history.length > 10) {
    state.history = state.history.slice(0, 10);
  }

  saveHistory();
  renderHistory();
  showToast("saved");

  // Show history section if hidden
  elements.historySection.classList.remove("hidden");
}

/**
 * Render history list
 */
function renderHistory() {
  if (state.history.length === 0) {
    elements.historySection.classList.add("hidden");
    return;
  }

  elements.historySection.classList.remove("hidden");

  const trans = TRANSLATIONS[state.currentLanguage];
  const isMetric = state.currentUnit === "metric";
  const unit = isMetric ? trans.units.kg : trans.units.lb;

  elements.historyList.innerHTML = state.history
    .map((item) => {
      const weight = isMetric ? item.weightKg : kgToLb(item.weightKg);
      const height = isMetric
        ? item.heightCm
        : `${Math.floor(item.heightCm / 2.54 / 12)}'${Math.round((item.heightCm / 2.54) % 12)}"`;
      const heightUnit = isMetric ? trans.units.cm : "";

      return `
            <div class="history-item">
                <div class="history-item-left">
                    <div class="history-bmi" style="background: ${getCategoryColor(item.categoryKey)}">
                        ${formatNumber(item.bmi)}
                    </div>
                    <div class="history-details">
                        <span class="history-category">${trans[item.categoryKey]}</span>
                        <span class="history-date">${formatDate(item.timestamp)}</span>
                    </div>
                </div>
                <div class="history-stats">
                    <div>${formatNumber(weight)} ${unit}</div>
                    <div>${isMetric ? formatNumber(height) : height} ${heightUnit}</div>
                </div>
            </div>
        `;
    })
    .join("");
}

/**
 * Clear all history
 */
function clearHistory() {
  state.history = [];
  saveHistory();
  renderHistory();
  showToast("cleared");
}

// ============ Event Listeners ============

function initEventListeners() {
  // Theme toggle
  elements.themeToggle.addEventListener("click", toggleTheme);

  // Language toggle
  elements.langToggle.addEventListener("click", toggleLanguage);

  // Unit toggle
  elements.unitToggleBtns.forEach((btn) => {
    btn.addEventListener("click", () => switchUnit(btn.dataset.unit));
  });

  // Age synchronization
  elements.ageInput.addEventListener("input", () => syncAgeInputs("input"));
  elements.ageSlider.addEventListener("input", () => syncAgeInputs("slider"));

  // Height synchronization (metric)
  elements.heightInput.addEventListener("input", () =>
    syncHeightInputs("input"),
  );
  elements.heightSlider.addEventListener("input", () =>
    syncHeightInputs("slider"),
  );

  // Height synchronization (imperial)
  elements.heightFtInput.addEventListener("input", () =>
    syncHeightImperialInputs("input"),
  );
  elements.heightInInput.addEventListener("input", () =>
    syncHeightImperialInputs("input"),
  );
  elements.heightSliderFt.addEventListener("input", () =>
    syncHeightImperialInputs("slider"),
  );

  // Weight synchronization (metric)
  elements.weightInput.addEventListener("input", () =>
    syncWeightInputs("input"),
  );
  elements.weightSlider.addEventListener("input", () =>
    syncWeightInputs("slider"),
  );

  // Weight synchronization (imperial)
  elements.weightLbInput.addEventListener("input", () =>
    syncWeightImperialInputs("input"),
  );
  elements.weightSliderLb.addEventListener("input", () =>
    syncWeightImperialInputs("slider"),
  );

  // Form submission
  elements.bmiForm.addEventListener("submit", (e) => {
    e.preventDefault();
    calculateAndDisplay();
  });

  // Recalculate button
  elements.recalculateBtn.addEventListener("click", () => {
    elements.resultsCard.classList.add("hidden");
    elements.bmiForm.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // Save button
  elements.saveBtn.addEventListener("click", saveToHistory);

  // Clear history
  elements.clearHistoryBtn.addEventListener("click", clearHistory);

  // Keyboard accessibility
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.target.matches('input[type="number"]')) {
      e.preventDefault();
      calculateAndDisplay();
    }
  });
}

// ============ Scroll to Top Functionality ============

function initScrollToTop() {
  const scrollThreshold = 300;

  window.addEventListener("scroll", () => {
    if (window.scrollY > scrollThreshold) {
      elements.scrollTopBtn.classList.add("visible");
    } else {
      elements.scrollTopBtn.classList.remove("visible");
    }
  });

  elements.scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// ============ Initialization ============

function init() {
  loadPreferences();
  initEventListeners();
  initScrollToTop();

  // Check system preference for dark mode
  if (!localStorage.getItem(CONFIG.STORAGE_KEYS.THEME)) {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      state.currentTheme = "dark";
      applyTheme("dark");
    }
  }

  // Listen for system theme changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem(CONFIG.STORAGE_KEYS.THEME)) {
        state.currentTheme = e.matches ? "dark" : "light";
        applyTheme(state.currentTheme);
      }
    });
}

// Start the application
document.addEventListener("DOMContentLoaded", init);
