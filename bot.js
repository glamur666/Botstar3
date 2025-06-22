import { Telegraf } from 'telegraf';
import axios from 'axios';

const bot = new Telegraf(process.env.BOT_TOKEN);
const TON_WALLET = process.env.TON_WALLET;
const TON_API_KEY = process.env.TON_API_KEY;

const processedTxs = new Set();

async function checkTransactions(ctx) {
  try {
    const res = await axios.get(`https://toncenter.com/api/v2/getTransactions`, {
      params: {
        address: TON_WALLET,
        limit: 10,
        to_lt: 0,
        archival: true,
        api_key: TON_API_KEY
      }
    });

    const transactions = res.data.result;

    for (const tx of transactions) {
      const txHash = tx.transaction_id.hash;
      const amount = parseFloat(tx.in_msg.value) / 1e9;
      const sender = tx.in_msg.source;

      if (!processedTxs.has(txHash)) {
        processedTxs.add(txHash);

        if (amount >= 0.0176) {
          const stars = Math.floor(amount / 0.0176);
          await ctx.reply(`✅ Оплата получена от ${sender}\n💫 Начислено звёзд: ${stars}`);
        }
      }
    }
  } catch (err) {
    console.error('Ошибка при проверке транзакций:', err.message);
  }
}

bot.start((ctx) => {
  ctx.reply('Добро пожаловать в naBLOKE STARS!');
});

setInterval(() => {
  bot.telegram.getUpdates().then((updates) => {
    updates.forEach((update) => {
      if (update.message && update.message.chat) {
        checkTransactions({
          reply: (msg) => bot.telegram.sendMessage(update.message.chat.id, msg)
        });
      }
    });
  });
}, 15000); // Проверка каждые 15 секунд

bot.launch();
