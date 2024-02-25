import { SetProps } from '~/types/set';
import { Card } from './card';

export class Set {
  private readonly props: SetProps;
  private _cards: Card[];

  constructor(props: SetProps) {
    this.props = props;
  }

  public get id() {
    return this.props.id;
  }

  public get code() {
    return this.props.code;
  }

  public set code(code: string) {
    this.props.code = code;
  }

  public get name() {
    return this.props.name;
  }

  public get type() {
    return this.props.type;
  }

  public get releasedAt() {
    return this.props.releasedAt;
  }

  public get isDigital() {
    return this.props.isDigital;
  }

  public get isFoilOnly() {
    return this.props.isFoilOnly;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public get updatedAt() {
    return this.props.updatedAt;
  }

  public get iconUri() {
    return this.props.iconUri;
  }

  public get cards() {
    return this._cards;
  }

  public set cards(cards: Card[]) {
    this._cards = cards;
  }
}
