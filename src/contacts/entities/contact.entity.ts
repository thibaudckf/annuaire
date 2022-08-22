import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Contact{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    firstname: string;

    @Column()
    phone: string;
}