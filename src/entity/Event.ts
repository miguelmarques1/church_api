import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { Member } from './Member';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column({ length: 255 })
  location: string;

  @Column({ name: 'image_url', length: 255, nullable: true })
  imageUrl: string | null;

  @Column({ default: false })
  recurring: boolean;

  @Column({ 
    name: 'recurrence_pattern', 
    type: 'enum', 
    enum: ['daily', 'weekly', 'monthly', 'yearly'],
    nullable: true 
  })
  recurrencePattern: 'daily' | 'weekly' | 'monthly' | 'yearly' | null;

  @Column({ name: 'end_date', type: 'timestamp', nullable: true })
  endDate: Date | null;

  @ManyToOne(() => Member, { nullable: true })
  @JoinColumn({ name: 'organizer_id' })
  organizer: Member | null;

  @ManyToMany(() => Member)
  @JoinTable({
    name: 'event_attendees',
    joinColumn: { name: 'event_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'member_id', referencedColumnName: 'id' }
  })
  attendees: Member[];

  @Column({ length: 50, nullable: true })
  category: string | null;
}