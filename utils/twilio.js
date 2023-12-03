const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const senderMobileNum = process.env.TWILIO_SENDER_MOBILE_NUM

const client = require('twilio')(accountSid, authToken)

const sendVerificationCode = async (phoneNum, code) => {
    try {
        const message = await client.messages.create({
            body: `Your verification code is: ${code}`, from: senderMobileNum, to: phoneNum,}
        );
        console.log(message.sid, " message send")
        return message.sid;
    } catch (error) {
        console.log(error)
        throw new Error("Message not send")
    }
}

module.exports = { sendVerificationCode };