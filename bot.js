const { Telegraf } = require('telegraf');
const axios = require('axios');

// توکن ربات تلگرام
const TELEGRAM_BOT_TOKEN = '7807312929:AAHHxwN9t27Lq0of2m7Lv7KnyujH-1GZnC8';
const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

// URL API DeepSeek
const DEEPSEEK_API_URL = 'https://platform.deepseek.com/api/v1/query';  // از URL صحیح DeepSeek استفاده کنید

// کلید API DeepSeek
const DEEPSEEK_API_KEY = 'sk-63de8f31154245888e70dc283b626ffc';

// دستور start
bot.start((ctx) => ctx.reply('سلام! من ربات شما هستم. برای کمک، پیام خود را ارسال کنید.'));

// دستور help
bot.help((ctx) => ctx.reply('دستورهای کمکی ربات: فقط پیام خود را ارسال کنید و من پاسخ خواهم داد.'));

// دریافت متن از کاربر و ارسال آن به DeepSeek
bot.on('text', async (ctx) => {
    const userMessage = ctx.message.text;  // پیام ارسالی توسط کاربر

    try {
        // ارسال پیام به DeepSeek API
        const response = await axios.post(
            DEEPSEEK_API_URL,
            {
                query: userMessage  // ارسال پیام کاربر به DeepSeek
            },
            {
                headers: {
                    'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,  // ارسال کلید API در هدر
                    'Content-Type': 'application/json'
                }
            }
        );

        // دریافت پاسخ از DeepSeek
        const answer = response.data.answer;  // فرض بر این است که پاسخ از DeepSeek در فیلد 'answer' است

        // ارسال پاسخ DeepSeek به کاربر
        if (answer) {
            ctx.reply(answer);
        } else {
            ctx.reply('متاسفانه پاسخی از DeepSeek دریافت نکردم.');
        }

    } catch (error) {
        // در صورتی که خطایی در ارتباط با API پیش بیاید
        console.error('Error:', error);
        ctx.reply('متاسفانه مشکلی پیش آمده است. لطفاً دوباره تلاش کنید.');
    }
});

// راه‌اندازی ربات
bot.launch().then(() => console.log('ربات راه‌اندازی شد.'));
