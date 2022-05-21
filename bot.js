require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');

const txt = require('./const');

let nft = '*инфа от сервера*';



const bot = new Telegraf(process.env.BOT_TOKEN);


bot.start((ctx) => ctx.replyWithHTML(`Привет ${ctx.message.from.first_name} Ты выбрал ${nft} NFT. <b>Для оплаты выбери свой кошелёк</b>`, Markup.inlineKeyboard(
    [
        [Markup.button.callback('суперкошель', 'btn_1'),
        Markup.button.callback('другой кошель', 'btn_2'),
        Markup.button.callback('хреновый кошель', 'btn_3')]

    ]
)));

bot.help((ctx) => ctx.reply(txt.commands));


function addActionBot (name, src) {

bot.action(name, async (ctx) => {
    try {
       await ctx.answerCbQuery();

       if (src !== false) {
           await ctx.reply(`переход по ссылке ${src}`)
       }

    } catch (e) {
        console.error(e);
    }
});
}

addActionBot('btn_1', '*ссылка на покупку 1*');

addActionBot('btn_2', '*ссылка на покупку 2*');

addActionBot('btn_3', '*ссылка на покупку 3*');




bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))