import { collection } from '../utils/colletion.js'

const messageCollection = collection.chatCollection('messages');
const baileysCollection = collection.baileysCollection('infor_connection')

export { messageCollection, baileysCollection } 