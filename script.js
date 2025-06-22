document.addEventListener("DOMContentLoaded", function () {
  const buyButton = document.getElementById("buy-button");

  if (buyButton) {
    buyButton.addEventListener("click", function () {
      // Переход на экран выбора количества звёзд
      window.location.href = "select.html";
    });
  }
});
