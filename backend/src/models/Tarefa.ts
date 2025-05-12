import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Sessao } from "./Sessao";

@Entity()
export class Tarefa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  titulo: string;

  @Column({ default: false })
  concluida: boolean; // Define se a tarefa foi concluída ou não

  @ManyToOne(() => Sessao, sessao => sessao.tarefas)
  sessao: Sessao; // Cada tarefa pertence a uma seção específica
}
