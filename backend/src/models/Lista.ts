import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Sessao } from "./Sessao";

@Entity()
export class Lista {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  nome: string;

  @OneToMany(() => Sessao, (sessao) => sessao.lista)
  sessoes: Sessao[];
}
