import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Card } from './card.entity';
import { Version } from './version.entity';

@Entity('cards_versions')
export class CardVersion {
  @PrimaryColumn({ type: 'uuid', name: 'card_id' })
  cardId: string;

  @PrimaryColumn({ type: 'uuid', name: 'version_id' })
  versionId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Card, (card) => card.cardVersions)
  @JoinColumn({ name: 'card_id' })
  card: Card;

  @ManyToOne(() => Version, (version) => version.cardVersions)
  @JoinColumn({ name: 'version_id' })
  version: Version;
}
