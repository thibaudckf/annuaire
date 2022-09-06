import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Contact } from "../entities/contact.entity";
import { GetBySearchQuery } from "./getBySearch.query";



@QueryHandler(GetBySearchQuery)
export class GetBySearchHandler implements IQueryHandler<GetBySearchQuery> {
  constructor(
    @InjectRepository(Contact)
    private contactsRepository: Repository<Contact>,
  ) {}
 
  async execute(query: GetBySearchQuery) {
    const {critere, search} = query;
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
}