import  { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next'

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;

const client = require('twilio')(accountSid, authToken);

export default async function handler(req, res) {
    let phoneNumber = JSON.parse(req.body)["query"]["From"]
    
    setCookies(JSON.parse(req.body)["query"]["From"], 0, {req, res})

    let message = "Hey, do you want to create or join a group?" + "\n" + "Text 'CREATE' or 'JOIN {Group ID}' to do so."



    client.messages
      .create({body: message, from: twilioNumber, to: phoneNumber})
      .then(message => console.log(message.sid));
}