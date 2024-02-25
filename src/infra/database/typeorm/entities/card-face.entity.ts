import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Card } from './card.entity';

@Entity('cards_faces')
export class CardFace {
  @PrimaryColumn('uuid', { name: 'card_id' })
  carId: string;

  @PrimaryColumn('uuid', { name: 'face_id' })
  faceId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Card)
  @JoinColumn({ name: 'card_id' })
  card: Card;

  @ManyToOne(() => Card)
  @JoinColumn({ name: 'face_id' })
  face: Card;
}
