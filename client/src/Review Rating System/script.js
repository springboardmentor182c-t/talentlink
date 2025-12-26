let ratings = {};
let submitted = false;

const review = document.getElementById("review");
const counter = document.getElementById("counter");
const submit = document.getElementById("submit");
const edit = document.getElementById("edit");
const toast = document.getElementById("toast");
const preview = document.getElementById("previewText");
const summary = document.getElementById("summary");
const badge = document.getElementById("badge");

document.querySelectorAll(".stars").forEach(container => {
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("span");
    star.innerText = "★";
    star.onclick = () => rate(container, i);
    container.appendChild(star);
  }
});

function rate(container, value) {
  if (submitted) return;
  ratings[container.dataset.type] = value;

  [...container.children].forEach((s, i) =>
    s.classList.toggle("active", i < value)
  );

  if (ratings.overall >= 4) badge.innerText = "Trusted Client";
  checkValid();
}

review.addEventListener("input", () => {
  counter.innerText = `${review.value.length}/500`;
  preview.innerText = review.value || "Your review will appear here…";
  summary.innerText =
    review.value.includes("good") ? "Feedback seems positive 👍" : "";
  checkValid();
});

function checkValid() {
  submit.disabled = !ratings.overall || !review.value.trim();
}

submit.onclick = () => {
  submitted = true;
  toast.style.display = "block";
  setTimeout(() => toast.style.display = "none", 2000);
  submit.classList.add("hidden");
  edit.classList.remove("hidden");
  document.getElementById("card").style.opacity = .8;
};

edit.onclick = () => {
  submitted = false;
  submit.classList.remove("hidden");
  edit.classList.add("hidden");
  document.getElementById("card").style.opacity = 1;
};

function toggleTheme() {
  document.body.classList.toggle("dark");
}
