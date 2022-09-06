import { Process, Processor } from '@nestjs/bull';
import { CommandBus } from '@nestjs/cqrs';
import { Job } from 'bull';
import { AddContactCommand } from './commands/addContact.command';
import { UpdateContactCommand } from './commands/updateContact.command';


@Processor('contact-queue')
export class ContactProcessor {
    constructor(private readonly commandBus: CommandBus) {}

    @Process('add')
    addContact(job: Job) {
        return this.commandBus.execute(
            new AddContactCommand(job.data),
        );
    }

    @Process('update')
    updateContact(job: Job) {
        const id = job.data.idContact;
        const contact = job.data.contact;
        return this.commandBus.execute(
            new UpdateContactCommand(id, contact),
        );
        
    }
}