import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Lista } from "./Lista";
import { Tarefa } from "./Tarefa";

@Entity()
export class Sessao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  titulo: string;

  @ManyToOne(() => Lista, lista => lista.sessoes)
  lista: Lista; // Cada seção pertence a uma lista

  @OneToMany(() => Tarefa, tarefa => tarefa.sessao)
  tarefas: Tarefa[]; // Cada seção contém várias tarefas
}
