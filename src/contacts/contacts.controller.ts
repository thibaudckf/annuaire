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

  @Get('findByName/:name')
  getByName(@Param('name') name: string) {
    return this.contactsService.findByName(name);
  }

  @Get('findByFirstName/:firstName')
  getByFirstName(@Param('firstName') firstName: string) {
    return this.contactsService.findByFirstName(firstName);
  }

  @Get('findByNum/:num')
  getByNum(@Param('num') num: string) {
    return this.contactsService.findByNum(num);
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
