import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Card } from './card.entity';
import { Color } from './color.entity';

@Entity('cards_colors')
export class CardColor {
  @PrimaryColumn({ type: 'uuid', name: 'card_id' })
  cardId: string;

  @PrimaryColumn({ type: 'uuid', name: 'color_id' })
  colorId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Card, (card) => card.cardColors)
  @JoinColumn({ name: 'card_id' })
  card: Card;

  @ManyToOne(() => Color, (color) => color.cardColors)
  @JoinColumn({ name: 'color_id' })
  color: Color;
}
