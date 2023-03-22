import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum TrackingEventType {
  LegacyRaceStarted = 'legacy_race_started',
  RaceStarted = 'race_started',
  RaceCompleted = 'race_completed',
}

@Entity()
export class TrackingEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    unique: true,
    type: 'enum',
    enum: TrackingEventType,
  })
  event: TrackingEventType;
  @Column({
    default: 0,
  })
  count: number;
}
