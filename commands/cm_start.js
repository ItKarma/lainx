import config  from '../config.js';

export async function menuCommand (msg, conn) {

    let templateMessage = `☰ \`\`\` MENU \`\`\`

♺ date :

> ❏ ${config.prefix}sticker [ _reply midia_ ] [ OFF ]
> ❏ ${config.prefix}sauce [ _reply midia_ ][ OFF ]
> ❏ ${config.prefix}report [ _reason_ ] [ OFF ]`

const buttons = [
    {buttonId: '!repo', buttonText: {displayText: 'My repo'}, type: 1},
    {buttonId: `!dev`, buttonText: {displayText: 'Contact developer'}, type: 1},
]
      
      const buttonMessage = {
          image: {url: 'https://telegra.ph/file/53f5d97b8fbe3535d4485.png' },
          caption: templateMessage ,
          footer: config.footer,
          buttons: buttons,
          headerType: 4
      }

      /* */

      await conn.sendMessage(msg.from, { text: 'Hi, this was sent using https://github.com/ItKarma' });
      await sock.sendMessage(msg.from, {
        text: 'updated text goes here',
        edit: msg.from
      });

      
      return await msg.reply(templateMessage)
   


}