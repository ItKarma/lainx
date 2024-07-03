import os from "node:os";
import 'dotenv/config'

export default async function sysInforTools (msg) {
           
    let str = `*OS:* ${os.type() + " " + os.arch()}\n*Host:* ${os.hostname()}\n*Kernel:* ${os.release()}\n*Uptime:* ${parseInt(os.uptime() / 60)} minutes\n*Shell:* ${os.userInfo().shell}\n*Terminal:* ${process.env.TERM}\n*CPU:* ${os.cpus[0]?.model} \n*Free Memory:* ${parseInt(os.freemem() / 1e+6)}MB\n`

    return await msg.reply(str)

}