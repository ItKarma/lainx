import pingUtils from "../../utils/ping.js";

export default function pingTools (key, msg) {
    return msg.edit(key, `*PONG!*\n*_${pingUtils(msg.messageTimestamp, Date.now())} second(s)_*`);
}