import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Contact{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom: string;

    @Column()
    prenom: string;

    @Column()
    numero: string;
}