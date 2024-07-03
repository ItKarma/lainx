import config from '../config.js'
import serialize from "../helper/serialize.js";
import { makeMongoStore } from '../repositories/makeMongoStore.js';
import { messageCollection } from '../service/serviceCollections.js';
//import { consultDb, consultUser } from '../commands/clients/consultDb.js';
//import { firstTime } from '../commands/theOfConduct.js';
import pingTools from '../commands/cmd_tools/ping.js';
import sysInforTools from '../commands/cmd_tools/info_system.js';
import { menuCommand } from '../commands/cm_start.js';
//import {commandAWaitSearch,commandAwait,commandAwaitSticker,commandError } from '../commands/clients/comandWait.js'
export default async function chatHandle(m, conn) {

    const prefix = config.prefix
    const owner = config.owner
    const storeUser = await makeMongoStore(messageCollection);

    try {
        if (m.type !== "notify") return;
        let msg = serialize(JSON.parse(JSON.stringify(m.messages[0])), conn);
        if (!msg.message) return;
        if (msg.key && msg.key.remoteJid === "status@broadcast") return;
        if (
            msg.type === "protocolMessage" ||
            msg.type === "senderKeyDistributionMessage" ||
            !msg.type ||
            msg.type === ""
        )
            return;

        let { body } = msg;

        const { isGroup, sender, from } = msg;
        const gcMeta = isGroup ? await conn.groupMetadata(from) : "";
        const gcName = isGroup ? gcMeta.subject : "";
        const isOwner = owner.includes(sender) || msg.isSelf;

        const str = body.startsWith(prefix) ? body : ''
        const args = str.trim().split(/ +/).slice(1);
        const q = args.join(" ");
        const isCommand = body.startsWith(prefix);
        const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()

        switch (command) {
            case 'ping':

                let { key } = await msg.reply('Verificando velocidade..');
                setTimeout(async () => {
                    await pingTools(key, msg);
                }, 2000);
                
                break;

            case 's':


                sysInforTools(msg);
                break;

            case 'users':


                consultDb(msg, conn);
                break;

            case 'agree':
                storeUser.bind(msg, conn)

                setTimeout(() => {
                    msg.reply(`Dados Salvos com sucesso!, aperte no butao e veja meus comandos.`)
                }, 2000)

                break;

            case 'searchdb':
                if (await firstTime(msg, conn)) return;

                consultUser(q, msg, conn)
                break;
            case 'menu':
                // if(await firstTime(msg,conn)) return;
                //   console.log(msg)

                menuCommand(msg, conn)
                break

        }

    } catch (error) {

    }
}