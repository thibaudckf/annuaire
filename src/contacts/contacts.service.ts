import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';


@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactsRepository: Repository<Contact>,
  ) {}

  /*method to get the list of contact*/
  getContacts(): Promise<Contact[]> {
    return this.contactsRepository.find();
  }

  findBySearch(critere: string, search: string): Promise<Contact[]>{
    if (critere == 'firstname'){
      const firstname = search;
      return this.contactsRepository.findBy({ firstname });
    } else if (critere == 'name'){
      const name = search;
      return this.contactsRepository.findBy({ name });
    } else if (critere == 'phone'){
      const phone = search;
      return this.contactsRepository.findBy({ phone });
    } else {
      return null;
    }
  }

  /*method to find a contact with his id */
  findOneById(id: number): Promise<Contact> {
    return this.contactsRepository.findOneBy({ id });
  }

  createContact(contact: Contact): Promise<Contact> {
    return this.contactsRepository.save(contact);
  }

  async remove(id: number): Promise<void> {
    await this.contactsRepository.delete(id);
  }

  update(id: number, contact: Partial<Contact>) {
    this.contactsRepository.update(id, contact);
    return this.contactsRepository.findOne({ where: { id } });
  }
}
