import { FaceProps } from '~/types/card';

export class Face {
  private props: FaceProps;

  constructor(props: FaceProps) {
    this.props = props;
  }

  public get id() {
    return this.props.id;
  }

  public get imageUri() {
    return this.props.imageUri;
  }

  public get name() {
    return this.props.name;
  }

  public get manaCost() {
    return this.props.manaCost;
  }

  public get effectText() {
    return this.props.effectText;
  }

  public get flavorText() {
    return this.props.flavorText;
  }

  public get language() {
    return this.props.language;
  }

  public get typeLine() {
    return this.props.typeLine;
  }

  public get setId() {
    return this.props.setId;
  }

  public get cmc() {
    return this.props.cmc;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public get updatedAt() {
    return this.props.updatedAt;
  }
}
