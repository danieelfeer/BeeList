import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Lista } from "./Lista";
import { Tarefa } from "./Tarefa";

@Entity()
export class Sessao {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titulo: string;

  // Cada sessão pertence a uma lista.
  @ManyToOne(() => Lista, lista => lista.sessoes)
  lista: Lista;

  // Uma sessão pode ter várias tarefas.
  @OneToMany(() => Tarefa, tarefa => tarefa.sessao, { cascade: true })
  tarefas: Tarefa[];
}