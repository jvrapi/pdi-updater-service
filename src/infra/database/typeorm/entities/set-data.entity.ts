import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sets_data')
export class SetData {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'set_code' })
  setCode: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'processed_at' })
  processedAt: Date;
}
