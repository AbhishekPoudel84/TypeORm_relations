import { Module } from '@nestjs/common';
import { DataSource, Migration } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Employee } from './employee.entity';
import { ContactInfo } from './contact-info.entity';
import { Meeting } from './meeting.entity';
import { table } from 'console';
import { Task } from './task.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'ormrelations',
      synchronize: true,
      autoLoadEntities: true,
      migrationsTableName: 'migrations',
      migrations: [],
    }),
    TypeOrmModule.forFeature([Employee, ContactInfo, Meeting, Task]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
