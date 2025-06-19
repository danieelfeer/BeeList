import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Sessao } from "./Sessao";

@Entity()
export class Lista {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titulo: string;

  // Uma lista pode ter várias sessões.
  @OneToMany(() => Sessao, sessao => sessao.lista, { cascade: ["remove"], onDelete: "CASCADE" })
  sessoes: Sessao[];
}
