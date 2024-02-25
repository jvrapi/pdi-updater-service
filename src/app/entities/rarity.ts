import { RarityProps } from '~/types/rarity';

export class Rarity {
  private readonly props: RarityProps;

  constructor(props: RarityProps) {
    this.props = props;
  }

  public get id() {
    return this.props.id;
  }

  public get name() {
    return this.props.name;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public get updatedAt() {
    return this.props.updatedAt;
  }
}
