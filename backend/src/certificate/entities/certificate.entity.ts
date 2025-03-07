import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Certificate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  companyName: string;

  @Column()
  issueDate: string;

  @Column({ nullable: true })
  logoPath: string;

  @Column('text')
  certificateContent: string;

  @Column({ nullable: true })
  generatedImagePath: string;
}
