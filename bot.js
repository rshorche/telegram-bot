import OpenAI from 'openai';
import { Telegraf } from 'telegraf';
import express from 'express';

const app = express();

// توکن ربات تلگرام
const TELEGRAM_BOT_TOKEN = '7807312929:AAHHxwN9t27Lq0of2m7Lv7KnyujH-1GZnC8';
const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

// تنظیمات OpenAI (DeepSeek)
const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: 'sk-63de8f31154245888e70dc283b626ffc',
});

// تنظیم Webhook برای ربات تلگرام
bot.telegram.setWebhook('https://telegram-bot-o2a1.onrender.com/webhook');

// Webhook callback
app.use(bot.webhookCallback('/webhook'));

// دستور start
bot.start((ctx) => ctx.reply('سلام! من ربات شما هستم. پیام خود را ارسال کنید.'));

// دستور help
bot.help((ctx) => ctx.reply('من در اینجا هستم تا به شما کمک کنم!'));

// دریافت متن از کاربر و ارسال آن به DeepSeek
bot.on('text', async (ctx) => {
  const userMessage = ctx.message.text;  // پیام کاربر

  try {
    // ارسال پیام به DeepSeek
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: userMessage }],
      model: 'deepseek-chat',
    });

    const answer = completion.choices[0].message.content;

    // ارسال پاسخ به کاربر
    ctx.reply(answer);

  } catch (error) {
    console.error('Error:', error);
    ctx.reply('متاسفانه مشکلی پیش آمده است. لطفاً دوباره تلاش کنید.');
  }
});

// راه‌اندازی سرور Express
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
