import { Entity, BaseEntity, BeforeInsert, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { ApiProperty } from "@nestjs/swagger/dist"
@Entity('users')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()

    id: number


    @Column({
        type: 'varchar'
    })
    name: string


    @Column({
        unique: true,
        type: 'varchar'
    })
    email: string


    @Column({
        type: "varchar"
    })
    password: string



    @Column({
        type: "varchar"
    })
    passwordVerify: string



    @Column({
        type: "varchar"
    })
    role: string

    @Column({
        type: "varchar"
    })
    verifiedAccount: boolean

    @Column({
        type: "varchar"
    })
    passwordReset: boolean


    @CreateDateColumn()
    createdAt: Date


    @UpdateDateColumn()
    updatedAt: Date

    @BeforeInsert()
    async setPassword(password: string) {
        const salt = await bcrypt.genSalt()
        this.password = await bcrypt.hash(password || this.password, salt)
    }

}