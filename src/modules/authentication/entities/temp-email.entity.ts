import { Entity, BaseEntity, BeforeInsert, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { ApiProperty } from "@nestjs/swagger/dist"
@Entity('email-urls')
export class TempEmail extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique: true,
        type: 'varchar'
    })
    email_url: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

 

}