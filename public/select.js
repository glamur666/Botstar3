const starsInput = document.getElementById("stars-input");
const quickButtons = document.querySelectorAll(".quick-buttons button");
const payBtn = document.getElementById("pay-btn");

quickButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    starsInput.value = btn.dataset.stars;
  });
});

payBtn.addEventListener("click", () => {
  const stars = parseInt(starsInput.value);
  if (!stars || stars % 50 !== 0) {
    alert("Введите количество звёзд кратное 50");
    return;
  }

  // Переход к оплате
  const params = new URLSearchParams({ stars });
  window.location.href = "payment.html?" + params.toString();
});