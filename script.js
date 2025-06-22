// Ожидаем, пока весь HTML загрузится
document.addEventListener("DOMContentLoaded", () => {
  const buyButton = document.querySelector(".buy-button");

  if (buyButton) {
    buyButton.addEventListener("click", () => {
      // Перенаправление на страницу выбора звёзд
      window.location.href = "select.html";
    });
  } else {
    console.error("Кнопка .buy-button не найдена на странице!");
  }
});
