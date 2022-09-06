import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { Contact } from './entities/contact.entity';
import { GetContactsHandler } from './queries/getContacts.handler';
import { GetContactsQuery } from './queries/getContacts.query';


@Module({
  imports:[TypeOrmModule.forFeature([Contact]) , CqrsModule],
  controllers: [ContactsController],
  providers: [ContactsService, GetContactsHandler, GetContactsQuery],
})
export class ContactsModule {}
