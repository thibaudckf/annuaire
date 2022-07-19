import { Body, Controller, Get, Post } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { Contact } from './entities/contact.entity';

@Controller('contacts')
export class ContactsController {
    constructor(private readonly contactsService: ContactsService){}

    @Get()
    getContacts():Promise<Contact[]>{
        return this.contactsService.getContacts();
    }

    @Post()
    newContact(@Body() body:Contact):Promise<Contact>{
        return this.contactsService.createContact(body);
    }
}
