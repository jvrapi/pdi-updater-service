import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Card } from './card.entity';
import { Format } from './format.entity';

@Entity('cards_formats')
export class CardFormat {
  @PrimaryColumn({ type: 'uuid', name: 'card_id' })
  cardId: string;

  @PrimaryColumn({ type: 'uuid', name: 'format_id' })
  formatId: string;

  @Column()
  status: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Card, (card) => card.cardFormats)
  @JoinColumn({ name: 'card_id' })
  card: Card;

  @ManyToOne(() => Format, (format) => format.cardFormats)
  @JoinColumn({ name: 'format_id' })
  format: Format;
}
