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

    /*method to get the list of contact*/ 
    getContacts():Promise<Contact[]>{
        return this.contactsRepository.find();
    }

    /*method to find a contact with his id */
    findOneById(id: number): Promise<Contact> {
        return this.contactsRepository.findOneBy({id});
    }

    /*method to find a contact with his name */
    findByName(nom: string): Promise<Contact[]> {
        return this.contactsRepository.findBy({nom});
    }

    /*method to find a contact with his first name */
    findByFirstName(prenom: string): Promise<Contact[]> {
        return this.contactsRepository.findBy({prenom});
    }

    /*method to find a contact with his phone number */
    findByNum(numero: string): Promise<Contact[]> {
        return this.contactsRepository.findBy({numero});
    }

    createContact(contact: Contact):Promise<Contact>{
        return this.contactsRepository.save(contact);
    }

    async remove(id: number): Promise<void> {
        await this.contactsRepository.delete(id);
      }

    update(id: number, contact:Partial<Contact>){
        this.contactsRepository.update(id, contact);
        return this.contactsRepository.findOne({where:{id}});
    }
}
