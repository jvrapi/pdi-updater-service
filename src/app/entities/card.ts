import { Set } from './set';
import { Face } from './face';
import { Color } from './color';
import { Format } from './format';
import { Version } from './version';
import { CardProps } from '~/types/card';

export class Card {
  private readonly props: CardProps;

  private _faces: Face[] = [];

  private _colors: Color[] = [];

  private _formats: Format[] = [];

  private _versions: Version[] = [];

  private _set: Set;

  constructor(props: CardProps) {
    this.props = props;
  }

  public get id() {
    return this.props.id;
  }

  public get setId() {
    return this.props.setId;
  }

  public get name() {
    return this.props.name;
  }

  public get language() {
    return this.props.language;
  }

  public get layout() {
    return this.props.layout;
  }

  public get manaCost(): string | null {
    return this.props.manaCost;
  }

  public get cmc() {
    return this.props.cmc;
  }

  public get typeLine() {
    return this.props.typeLine;
  }

  public get loyalty() {
    return this.props.loyalty;
  }

  public get collectionId() {
    return this.props.collectionId;
  }

  public get frame() {
    return this.props.frame;
  }

  public get securityStamp() {
    return this.props.securityStamp;
  }

  public get borderColor() {
    return this.props.borderColor;
  }

  public get effectText() {
    return this.props.effectText;
  }

  public get flavorText() {
    return this.props.flavorText;
  }

  public get isReserved() {
    return this.props.isReserved;
  }

  public get isReprint() {
    return this.props.isReprint;
  }

  public get isVariant() {
    return this.props.isVariant;
  }

  public get isFoundInBooster() {
    return this.props.isFoundInBooster;
  }

  public get isStorySpotlight() {
    return this.props.isStorySpotlight;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public get updatedAt() {
    return this.props.updatedAt;
  }

  public get faces() {
    return this._faces;
  }

  public set faces(faces: Face[]) {
    this._faces = faces;
  }

  public get imageUri() {
    return this.props.imageUri;
  }

  public get set() {
    return this._set;
  }

  public set set(set: Set) {
    this._set = set;
  }
}
