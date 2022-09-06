import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsModule } from './contacts/contacts.module';
import { Contact } from './contacts/entities/contact.entity';


@Module({
  imports: [ContactsModule, 
            TypeOrmModule.forRoot({
              type: 'postgres',
              host: 'localhost',
              port: 5432,
              username: 'postgres',
              password: 'THch2001',
              database: 'DB_Contacts',
              entities: [Contact],
              synchronize: true,
            }),
            BullModule.forRoot({
              redis: {
                host: 'localhost',
                port: 6379,
              },
            }),
            
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

