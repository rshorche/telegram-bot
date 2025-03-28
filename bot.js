const { Telegraf } = require("telegraf");

// توکن ربات که از BotFather دریافت کردید
const bot = new Telegraf("7807312929:AAHHxwN9t27Lq0of2m7Lv7KnyujH-1GZnC8");

bot.start((ctx) => ctx.reply("سلام! من ربات شما هستم."));
bot.help((ctx) => ctx.reply("دستورهای کمکی ربات."));

bot.on("text", (ctx) => {
  ctx.reply("شما متن ارسال کردید: " + ctx.message.text);
});

bot.launch();
