import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Contact } from './entities/contact.entity';
import { GetContactsQuery } from './queries/getContacts.query';
import { GetByIdQuery } from './queries/getById.query';
import { GetBySearchQuery } from './queries/getBySearch.query';
import { RemoveContactCommand } from './commands/removeContact.command';


@Controller('contacts')
export class ContactsController {
  constructor(private readonly queryBus: QueryBus,
              private readonly commandBus: CommandBus,
              @InjectQueue('contact-queue') private readonly contactQueue: Queue) {}

  @Get()
  async getContacts(): Promise<Contact[]> {
      return this.queryBus.execute(
        new GetContactsQuery(),
      );
    
  }

  @Get('findById/:id')
  async getById(@Param('id') id: number) {
    return this.queryBus.execute(
      new GetByIdQuery(id),
    );
  }

  @Get('findBySearch/:critere/:search')
  findBySearch(@Param('critere') critere: string, @Param('search') search: string) {
    return this.queryBus.execute(
      new GetBySearchQuery(critere, search),
    );
  }

  @Post()
  async newContact(@Body() body: Contact){
    /*return this.commandBus.execute(
      new AddContactCommand(body)
    )*/
    await this.contactQueue.add('add', body);
  }

  @Patch('set/:id')
  async update(@Param('id') id: number, @Body() body: Contact){
    /*return this.commandBus.execute(
      new UpdateContactCommand(id, body)
    );*/
    await this.contactQueue.add('update', { idContact: id, contact: body });
  }

  @Delete('delete/:id')
  remove(@Param('id') id: number): Promise<void> {
    return this.commandBus.execute(
      new RemoveContactCommand(id),
    );
  }
}