import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Contact } from "../entities/contact.entity";
import { GetContactsQuery } from "./getContacts.query";

@QueryHandler(GetContactsQuery)
export class GetContactsHandler implements IQueryHandler<GetContactsQuery> {
  constructor(
    @InjectRepository(Contact)
    private ContactsRepository: Repository<Contact>,
  ) {}
 
  async execute(query: GetContactsQuery) {
    return this.ContactsRepository.find();
  }
}