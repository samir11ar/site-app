// قاعدة البيانات
let qa = JSON.parse(localStorage.getItem("qa")) || [
  { question: "شنو هو الذكاء الاصطناعي؟", answer: "الذكاء الاصطناعي هو تقنية تمكّن الحواسيب من التعلم واتخاذ القرارات بطريقة تشبه البشر.", category: "علوم" },
  { question: "شنو هو HTML؟", answer: "HTML هي لغة الترميز لإنشاء صفحات الويب.", category: "برمجة" },
  { question: "كيفاش نصاوب تطبيق؟", answer: "باش تصايب تطبيق خاصك تختار لغة برمجة وتصميم واجهة المستخدم وربطها بالمنطق.", category: "برمجة" }
];

const adminPassword = "1234"; // ممكن تغيّر كلمة السر

// البحث المتقدم
function getAnswer() {
  const questionInput = document.getElementById("question").value.trim().toLowerCase();
  const selectedCategory = document.getElementById("category").value;
  const answerDiv = document.getElementById("answer");

  let results = qa.filter(q => 
    q.question.toLowerCase().includes(questionInput) &&
    (selectedCategory === "" || q.category === selectedCategory)
  );

  answerDiv.innerHTML = "";
  if(results.length > 0){
    results.forEach(r => {
      const card = document.createElement("div");
      card.className = "qa-card";
      card.innerHTML = `<strong>${r.question}</strong><br>${r.answer}`;
      answerDiv.appendChild(card);
    });
  } else {
    answerDiv.innerText = "ما لقيتش جواب على هاد السؤال 😅";
  }
}

// إضافة سؤال جديد
function addQuestion() {
  const q = document.getElementById("newQuestion").value.trim();
  const a = document.getElementById("newAnswer").value.trim();
  const c = document.getElementById("newCategory").value;
  const msgDiv = document.getElementById("addMsg");

  if(q && a){
    qa.push({ question: q, answer: a, category: c });
    localStorage.setItem("qa", JSON.stringify(qa));
    msgDiv.innerText = "تمت إضافة السؤال بنجاح ✅";
    document.getElementById("newQuestion").value = "";
    document.getElementById("newAnswer").value = "";
  } else {
    msgDiv.innerText = "عافاك عَمّر السؤال والجواب ✋";
  }
}

// تسجيل دخول المسؤول
function adminLogin() {
  const pass = document.getElementById("adminPass").value;
  const msgDiv = document.getElementById("adminMsg");
  if(pass === adminPassword){
    document.getElementById("adminSection").style.display = "block";
    msgDiv.innerText = "تم تسجيل الدخول كمسؤول ✅";
    document.getElementById("adminPass").value = "";
  } else {
    msgDiv.innerText = "كلمة السر خاطئة ❌";
  }
}

// تسجيل خروج المسؤول
function adminLogout() {
  document.getElementById("adminSection").style.display = "none";
  document.getElementById("adminMsg").innerText = "تم تسجيل الخروج ✅";
}
