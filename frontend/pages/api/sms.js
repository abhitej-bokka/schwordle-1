import MessagingResponse from 'twilio/lib/twiml/MessagingResponse'
import nextSession from "next-session";
import signature from "cookie-signature"
import  { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next'
import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const secret = "anything-you-want-but-keep-secret";
const userRegex = "[a-zA-z]*"
const wordleRegex = "^[W][o][r][d][l][e][ ][0-9]{3,}[ ][1-6,X]{1}[\/][6][\n]*[ ]*[\n]*((🟩|⬛|🟨|⬜){5}[\n]{0,1}){1,5}"
const solvedRegex = "[🟩]{10}$"
const joinRegex = "[J][O][I][N][ ][a-zA-z0-9]{5}"

const getSession = nextSession({
  decode: (encryptedSid) => signature.unsign(encryptedSid.slice(2), secret),
  encode: (sid) => (sid ? "s:" + signature.sign(sid, secret) : null),
});

function makeid() {
  let text = "";
  let possible = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

const addMemberToGroup = async function (phoneNumber, groupId) {

  let user = {
    userPhone: phoneNumber,
    groupCode: groupId
  }

  await prisma.user.create({
    data: user
  }).catch((e) => {
    return "Member could not be added to group."
  })
  
  let message = "You have joined group " + groupId + ".";
  message += "\n"
  message += "Can you send a solved wordle to check?"

  return message;
} 

const validGroup = async function(groupId) {
  const result = await prisma.user.findMany({
    where: {
      groupCode: groupId, 
    }
  })
  console.log(result)
  return result.length != 0;
}



const addMessage = async function(phoneNumber, wordleText) {

  let message = {
    userPhone: phoneNumber,
    messageString: wordleText,
    wordleGame: extractWordleNumber(wordleText)
  }
  
  await prisma.message.create({
    data: message
  }).catch((e) => {
    return false;
  })
  //
  //console.log(await getLeader(wordleText));
  console.log(await displayQuery());
  //^^comment out if not working^^
  return true
}

function extractWordleNumber(message){
  var messageArray = message.split(" ")
  return messageArray[1]
}

const getLeader = async function(wordleText) {

  console.log(extractWordleSolve(wordleText));
  //const result = await prisma.$queryRaw`SELECT * FROM User` 
  const result = await prisma.$queryRaw`SELECT wordleGame, AVG(wordleScore), COUNT(wordleGame) FROM Message GROUP BY wordleGame` 
//SELECT wordleGame, AVG(wordleScore), COUNT(wordleGame) FROM Message GROUP BY wordleGame;
  return result;
}

function extractWordleSolve(message){
  var messageArray = message.split(" ")
  return messageArray[2].charAt(0)
}

const displayQuery = async function() {
  const showBoard = await prisma.$queryRaw`SELECT wordleGame, AVG(wordleScore), COUNT(wordleGame) FROM Message GROUP BY wordleGame`
  const topGameScorer = await prisma.$queryRaw`SELECT wordleGame, wordleScore, userPhone FROM Message GROUP By wordleGame ORDER By wordleGame`
  const wordleDifficulty = await prisma.$queryRaw`SELECT wordleGame, AVG(wordleScore) FROM Message GROUP By wordleGame ORDER By wordleScore`
  const topScores = await prisma.$queryRaw`SELECT wordleGame, wordleScore, userPhone FROM Message  ORDER By wordleScore`

  return showBoard;
}

export default async function handler(req, res) {
    const session = await getSession(req, res);

     //setCookies(req['query']['From'], 0, {req, res})

    //^^ ADD & DELETE LINE

    let smsCount = getCookie(req['query']['From'], {req, res}) || 0

    let phoneNumber = req['query']['From']
    let message = 'Failed to go through cycle';
    let userMessage = req['query']['Body']
    console.log(userMessage)
    let messageStatus = true;
    let groupCode = "";


    // Start Abhitej - 7:59

    // End Abhitej
    console.log(req['query']['From'])
    console.log(smsCount)

    if(smsCount == 0){
      if(userMessage.match("CREATE")){
        groupCode = makeid();
        let tempMessage = await addMemberToGroup(phoneNumber, groupCode)
        console.log(tempMessage)
        if(tempMessage == "Could not create group." || tempMessage == "Member could not be added to group.") {
          messageStatus = false;
        }else{
          message = tempMessage
        }
        
      }else if(userMessage.match(joinRegex)){
        groupCode = userMessage.split(" ")[1]
        if(!(await validGroup(groupCode))){
          console.log('hit')          
          messageStatus = false;
          message = "Group does not exist."
        }else{
          let tempMessage = addMemberToGroup(phoneNumber, groupCode)
          if(tempMessage == "Member could not be added to group.") {
            messageStatus = false;
          }else{
            message = tempMessage
          }
        }
      }else{
        messageStatus = false
      }
    } else if(smsCount >= 1){
      if(userMessage.match(wordleRegex) && userMessage.match(solvedRegex)){
        if(!addMessage(phoneNumber, userMessage)) message = "Your wordle is invalid, or hasn't been solved :("
        message = "This wordle is valid. Who knows, maybe your friends just did the wordle again lol.\n\nSend a wordle again tomorrow!";
      }else{
        message = "This wordle is invalid. Maybe one of your friends lied and created a fake wordle result...\n\nPlease enter again!"
        messageStatus = false;
      }
        
    }else{
      console.log("count!=0!=1") 
      messageStatus = false;
      console.log("NO_CLUE");
    }
    
    if(messageStatus) {
      setCookies(req['query']['From'], parseInt(smsCount) + 1, {req, res})
    }else {      
      if(getCookie(req['query']['From'], {req, res}) == 0){
        message += "\nInvalid command. You must enter 'CREATE' or 'JOIN {Group ID}'."
      }

      if(getCookie(req['query']['From'], {req, res}) == 1){
        message += "\Re-enter your wordle."
      }
    } 

    const twiml = new MessagingResponse();
    twiml.message(message)
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString()); 
}