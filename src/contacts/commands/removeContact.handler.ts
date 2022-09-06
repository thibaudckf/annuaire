
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Contact } from "../entities/contact.entity";
import { RemoveContactCommand } from "./removeContact.command";



@CommandHandler(RemoveContactCommand)
export class RemoveContactHandler implements ICommandHandler<RemoveContactCommand> {
  constructor(
    @InjectRepository(Contact)
    private contactsRepository: Repository<Contact>,
  ) {}
 
  async execute(command: RemoveContactCommand) {
    const {id} = command;
    await this.contactsRepository.delete(id);
  }
}