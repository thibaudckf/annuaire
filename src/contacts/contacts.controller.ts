import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { Contact } from './entities/contact.entity';


@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get()
  getContacts(): Promise<Contact[]> {
    return this.contactsService.getContacts();
  }

  @Get('findByID/:id')
  getById(@Param('id') id: number) {
    return this.contactsService.findOneById(id);
  }

  @Get('findBySearch/:critere/:search')
  findBySearch(@Param('critere') critere: string, @Param('search') search: string) {
    return this.contactsService.findBySearch(critere, search);
  }

  @Post()
  newContact(@Body() body: Contact): Promise<Contact> {
    return this.contactsService.createContact(body);
  }

  @Patch('set/:id')
  update(@Param('id') id: number, @Body() body: Contact): Promise<Contact> {
    return this.contactsService.update(id, body);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: number): Promise<void> {
    return this.contactsService.remove(id);
  }
}
