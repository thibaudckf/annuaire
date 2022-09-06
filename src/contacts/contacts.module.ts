import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { ContactsController } from './contacts.controller';
import { Contact } from './entities/contact.entity';
import { GetByIdQuery } from './queries/getById.query';
import { GetByIdHandler } from './queries/getById.handler';
import { GetContactsHandler } from './queries/getContacts.handler';
import { GetContactsQuery } from './queries/getContacts.query';
import { GetBySearchHandler } from './queries/getBySearch.handler';
import { GetBySearchQuery } from './queries/getBySearch.query';
import { AddContactCommand } from './commands/addContact.command';
import { AddContactHandler } from './commands/addContact.handler';
import { RemoveContactCommand } from './commands/removeContact.command';
import { RemoveContactHandler } from './commands/removeContact.handler';
import { UpdateContactCommand } from './commands/updateContact.command';
import { UpdateContactHandler } from './commands/updateContact.handler';
import { ContactProcessor } from './contacts.processor';


@Module({
  imports:[TypeOrmModule.forFeature([Contact]), CqrsModule, 
            BullModule.registerQueue({
              name: 'contact-queue',
            }),
  ],
  controllers: [ContactsController],
  providers: [GetContactsHandler, GetContactsQuery, 
              GetByIdQuery, GetByIdHandler, GetBySearchHandler, GetBySearchQuery, 
              AddContactCommand, AddContactHandler, RemoveContactCommand, RemoveContactHandler,
              UpdateContactCommand, UpdateContactHandler, 
              ContactProcessor],
})
export class ContactsModule {}
