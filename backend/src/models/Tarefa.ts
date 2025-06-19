import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Sessao } from "./Sessao";

@Entity()
export class Tarefa {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titulo: string;

  @Column({ default: false })
  concluida: boolean;
  
  // Cada tarefa pertence a uma sessão.
  @ManyToOne(() => Sessao, sessao => sessao.tarefas)
  sessao: Sessao;
}