import "reflect-metadata";
import { TYPES } from './types';
import { Container } from 'inversify';
import { IEmailService } from "./services/IEmailService";
import { SendGridEmailService } from "./services/SendGridEmailService";

export let myContainer = new Container();

export function resetContainer() {
    myContainer.unbindAll()

    myContainer.bind<string>(TYPES.SEND_GRID_API_KEY).toConstantValue(process.env.SENDGRID_API_KEY!)
    myContainer.bind<string>(TYPES.SEND_GRID_SENDER_EMAIL).toConstantValue(process.env.SEND_GRID_SENDER_EMAIL!)
    
    myContainer.bind<IEmailService>(TYPES.EMAIL_SERVICE).to(SendGridEmailService);
    myContainer.bind<string>(TYPES.RECEIVER_EMAIL).toConstantValue(process.env.RECEIVER_EMAIL!)
}

resetContainer()
export default myContainer