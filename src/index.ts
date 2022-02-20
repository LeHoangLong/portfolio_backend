import bodyParser from 'body-parser';
import express from 'express';
import myContainer from './inversify.config';
import { IEmailService } from './services/IEmailService';
import { TYPES } from './types';

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json())
app.get('/', (req, res) => {
  res.send('Hello World!');
});

console.log('process.env.DEBUG')
console.log(process.env.DEBUG === 'true')
console.log(process.env.DEBUG)

app.post('/email', async (req, res) => {
  try {
    let emailService = myContainer.get<IEmailService>(TYPES.EMAIL_SERVICE)
    let receiverEmail = myContainer.get<string>(TYPES.RECEIVER_EMAIL)
    await emailService.sendEmail(receiverEmail, req.body.content, 'portfolio_contact')
    return res.status(200).send()
  } catch (exception) {
    console.log('exception')
    console.log(exception)
    if (process.env.DEBUG === 'true') {
      return res.status(500).send(exception)
    } else {
      return res.status(500).send()
    }
  }
})

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
