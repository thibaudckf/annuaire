
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Contact } from "../entities/contact.entity";
import { UpdateContactCommand } from "./updateContact.command";



@CommandHandler(UpdateContactCommand)
export class UpdateContactHandler implements ICommandHandler<UpdateContactCommand> {
  constructor(
    @InjectRepository(Contact)
    private readonly contactsRepository: Repository<Contact>,
  ) {}
 
  async execute(command: UpdateContactCommand) {
    const id = command.id;
    const contact = command.contact;
    await this.contactsRepository.update(id, contact);
  }
}