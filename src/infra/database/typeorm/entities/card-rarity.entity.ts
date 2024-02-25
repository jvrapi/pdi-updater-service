import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Card } from './card.entity';
import { Rarity } from './rarity.entity';

@Entity('cards_rarities')
export class CardRarity {
  @PrimaryColumn({ type: 'uuid', name: 'card_id' })
  cardId: string;

  @PrimaryColumn({ type: 'uuid', name: 'rarity_id' })
  rarityId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Card, (card) => card.cardRarity)
  @JoinColumn({ name: 'card_id' })
  card: Card;

  @ManyToOne(() => Rarity, (rarity) => rarity.cardRarities)
  @JoinColumn({ name: 'rarity_id' })
  rarity: Rarity;
}
