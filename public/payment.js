const infoBlock = document.getElementById("info");
const params = new URLSearchParams(window.location.search);
const stars = parseInt(params.get("stars"));

const tg = window.Telegram.WebApp;
const userId = tg.initDataUnsafe?.user?.id;

if (!userId || !stars) {
  infoBlock.innerHTML = "<p>❌ Ошибка: не передано количество звёзд или userId</p>";
} else {
  (async () => {
    try {
      const res = await fetch("https://nabloke-stars-2.onrender.com/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, stars })
      });

      const data = await res.json();

      if (data.address && data.comment && data.amountTon) {
        infoBlock.innerHTML = `
          <p>💸 Переведите <b>${data.amountTon} TON</b> на адрес:</p>
          <code>${data.address}</code>
          <p>📌 Обязательно укажите комментарий:</p>
          <code>${data.comment}</code>
          <p style="color:gray; margin-top:20px;">После оплаты ожидайте подтверждения...</p>
        `;

        // Эмулируем обновление через 30 сек
        setTimeout(() => {
          infoBlock.innerHTML += `
            <p style="margin-top: 20px; color: green; font-weight: bold;">
              ✅ Оплата успешна. Ожидайте зачисления звёзд!
            </p>
          `;
        }, 30000);
      } else {
        infoBlock.innerHTML = "<p>❌ Ошибка при получении данных оплаты</p>";
      }
    } catch (err) {
      console.error(err);
      infoBlock.innerHTML = "<p>❌ Не удалось связаться с сервером</p>";
    }
  })();
}