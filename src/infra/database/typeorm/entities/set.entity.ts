import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Card } from './card.entity';

@Entity('sets')
export class Set {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar')
  code: string;

  @Column('varchar')
  name: string;

  @Column('varchar', { name: 'released_at' })
  releasedAt: string;

  @Column('varchar')
  type: string;

  @Column('boolean', { name: 'is_digital' })
  isDigital: boolean;

  @Column('boolean', { name: 'is_foil_only' })
  isFoilOnly: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column('varchar', { name: 'icon_uri' })
  iconUri: string;

  @OneToMany(() => Card, (card) => card.set, { cascade: true })
  cards: Card[];
}
