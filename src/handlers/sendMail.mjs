import AWS from "aws-sdk";

const ses = new AWS.SES({ region: "ap-southeast-1" });

async function sendMail(event, context) {
  console.log("event", event);
  const params = {
    Destination: {
      // BccAddresses: [],
      // CcAddresses: ["recipient3@example.com"],
      ToAddresses: ["wongkokwah@gmail.com"],
    },
    Message: {
      Body: {
        // Html: {
        //   Charset: "UTF-8",
        //   Data: 'This message body contains HTML formatting. It can, for example, contain links like this one: <a class="ulink" href="http://docs.aws.amazon.com/ses/latest/DeveloperGuide" target="_blank">Amazon SES Developer Guide</a>.',
        // },
        Text: {
          Charset: "UTF-8",
          Data: "This is the message body in text format.",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Test email from SES",
      },
    },
    Source: "wongkokwah@gmail.com",
    // SourceArn: "",
    // ReplyToAddresses: [],
    // ReturnPath: "",
    // ReturnPathArn: "",
  };


  try {
    const result = await ses.sendEmail(params).promise();
    console.log("result", result);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent" }),
    };
  } catch (error) {
    console.log("error", error);
    
  }
}

export const handler = sendMail;
