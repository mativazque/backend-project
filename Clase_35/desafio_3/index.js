import {sendSMS} from './sendSMS.js';

const sendMsg = await sendSMS(process.argv[2], process.argv[3])


