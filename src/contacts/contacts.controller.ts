import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Query,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { Contact } from './entities/contact.entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetContactsQuery } from './queries/getContacts.query';
import { GetByIdQuery } from './queries/getById.query';
import { GetBySearchQuery } from './queries/getBySearch.query';
import { AddContactCommand } from './commands/addContact.command';
import { RemoveContactCommand } from './commands/removeContact.command';
import { UpdateContactCommand } from './commands/updateContact.command';



@Controller('contacts')
export class ContactsController {
  constructor(private readonly queryBus: QueryBus,
              private readonly commandBus: CommandBus,) {}

  @Get()
  async getContacts(): Promise<Contact[]> {
      return this.queryBus.execute(
        new GetContactsQuery()
      )
    
  }

  @Get('findByID/:id')
  async getById(@Param('id') id: number) {
    return this.queryBus.execute(
      new GetByIdQuery(id)
    )
  }

  @Get('findBySearch/:critere/:search')
  findBySearch(@Param('critere') critere: string, @Param('search') search: string) {
    return this.queryBus.execute(
      new GetBySearchQuery(critere, search)
    )
  }

  @Post()
  newContact(@Body() body: Contact): Promise<Contact> {
    return this.commandBus.execute(
      new AddContactCommand(body)
    )
  }

  @Patch('set/:id')
  update(@Param('id') id: number, @Body() body: Contact): Promise<Contact> {
    return this.commandBus.execute(
      new UpdateContactCommand(id, body)
    );
  }

  @Delete('delete/:id')
  remove(@Param('id') id: number): Promise<void> {
    return this.commandBus.execute(
      new RemoveContactCommand(id)
    );
  }
}
