import AWS from "aws-sdk";

const ses = new AWS.SES({ region: "ap-southeast-1" });

async function sendMail(event, context) {
  console.log("event", event);

  // SQS batch record in event.Records array
  const record = event.Records[0]; // single record
  console.log("record", record);

  const email = JSON.parse(record.body);
  console.log('email', email);
  const { subject, body, recipient } = email;

  const params = {
    Destination: {
      // BccAddresses: [],
      // CcAddresses: ["recipient3@example.com"],
      ToAddresses: [recipient],
    },
    Message: {
      Body: {
        // Html: {
        //   Charset: "UTF-8",
        //   Data: 'This message body contains HTML formatting. It can, for example, contain links like this one: <a class="ulink" href="http://docs.aws.amazon.com/ses/latest/DeveloperGuide" target="_blank">Amazon SES Developer Guide</a>.',
        // },
        Text: {
          Charset: "UTF-8",
          Data: body,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
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
