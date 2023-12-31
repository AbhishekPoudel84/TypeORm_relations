import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { Repository } from 'typeorm';
import { ContactInfo } from './contact-info.entity';
import { Meeting } from './meeting.entity';
import { Task } from './task.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Employee) private employeeRepo: Repository<Employee>,
    @InjectRepository(ContactInfo)
    private contactInfoRepo: Repository<ContactInfo>,
    @InjectRepository(Meeting) private meetingRepo: Repository<Meeting>,
    @InjectRepository(Task) private taskRepo: Repository<Task>,
  ) {}

  async seed() {
    //employee1
    const ceo = this.employeeRepo.create({ name: 'Mr. CEO' });
    await this.employeeRepo.save(ceo); //ceo is now saved in db

    const ceoContactInfo = this.contactInfoRepo.create({
      email: 'a@gmail.com',
      //employeeId: ceo.id,
    });

    ceoContactInfo.employee = ceo;
    await this.contactInfoRepo.save(ceoContactInfo);

    //employee 2
    const manager = this.employeeRepo.create({
      name: 'Abhi',
      manager: ceo,
    });

    const task1 = this.taskRepo.create({ name: 'Hire People' });
    await this.taskRepo.save(task1);
    const task2 = this.taskRepo.create({ name: 'Present to ceo' });
    await this.taskRepo.save(task2);

    manager.tasks = [task1, task2];

    const meeting1 = this.meetingRepo.create({ zoomURL: 'meeting.com' });
    meeting1.attendees = [ceo];
    await this.meetingRepo.save(meeting1);

    manager.meetings = [meeting1];
    await this.employeeRepo.save(manager);
  }

  // getEmployeeId(id: number) {
  //  return this.employeeRepo.findOne(id, {
  //    relations: ['manager','directreports', 'tasks', 'contactInfo', 'meetings']
  //  });
  //return this.employeeRepo
  //  .createQueryBuilder('employee')
  //  .leftJoinAndSelect('employee.directReports', 'directReports');
  // }
  getHello(): string {
    return 'Hello World';
  }
}
