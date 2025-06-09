import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Sessao } from "./Sessao";

@Entity()
export class Tarefa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  titulo: string;

  @Column({ default: false })
  concluida: boolean;

  @ManyToOne(() => Sessao, (sessao) => sessao.tarefas)
  sessao: Sessao;
}
