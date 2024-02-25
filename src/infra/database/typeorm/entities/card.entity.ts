import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Set } from './set.entity';
import { CardFace } from './card-face.entity';
import { CardVersion } from './card-version.entity';
import { CardRarity } from './card-rarity.entity';
import { CardFormat } from './card-format.entity';
import { CardColor } from './card-color.entity';

@Entity('cards')
export class Card {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid', { name: 'set_id' })
  setId: string;

  @Column()
  name: string;

  @Column()
  language: string;

  @Column()
  layout: string;

  @Column({ name: 'mana_cost' })
  manaCost: string;

  @Column('decimal')
  cmc: number;

  @Column({ name: 'type_line' })
  typeLine: string;

  @Column()
  loyalty: string;

  @Column({ name: 'collection_id' })
  collectionId: string;

  @Column()
  frame: string;

  @Column({ name: 'security_stamp' })
  securityStamp: string;

  @Column({ name: 'border_color' })
  borderColor: string;

  @Column({ name: 'effect_text' })
  effectText: string;

  @Column({ name: 'flavor_text' })
  flavorText: string;

  @Column({ name: 'is_reserved' })
  isReserved: boolean;

  @Column({ name: 'is_reprint' })
  isReprint: boolean;

  @Column({ name: 'is_variant' })
  isVariant: boolean;

  @Column({ name: 'is_found_in_booster' })
  isFoundInBooster: boolean;

  @Column({ name: 'is_story_spotlight' })
  isStorySpotlight: boolean;

  @Column({ name: 'image_uri' })
  imageUri: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Set, (set) => set.cards)
  @JoinColumn({ name: 'set_id' })
  set: Set;

  @OneToMany(() => CardFace, (cardFace) => cardFace.card, { cascade: true })
  faces: CardFace[];

  @OneToMany(() => CardVersion, (cardVersion) => cardVersion.card, {
    cascade: true,
  })
  cardVersions: CardVersion[];

  @OneToOne(() => CardRarity, (cardRarity) => cardRarity.card, {
    cascade: true,
  })
  cardRarity: CardRarity;

  @OneToMany(() => CardFormat, (cardFormat) => cardFormat.card, {
    cascade: true,
  })
  cardFormats: CardFormat[];

  @OneToMany(() => CardColor, (cardColor) => cardColor.card, { cascade: true })
  cardColors: CardColor[];
}
