import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Employee } from './employee.entity';

@Entity()
export class Meeting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  zoomURL: string;

  @ManyToMany(() => Employee, (employee) => employee.meetings)
  attendees: Employee[];
}
