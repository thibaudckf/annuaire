import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactsService {
    constructor(
        @InjectRepository(Contact)
        private contactsRepository: Repository<Contact>,
    ){}

    getContacts():Promise<Contact[]>{
        return this.contactsRepository.find();
    }

    findOne(id: number): Promise<Contact> {
        return this.contactsRepository.findOneBy({ id});
      }

    createContact(contact: Contact):Promise<Contact>{
        return this.contactsRepository.save(contact);
    }
}
