import { ColorProps } from '~/types/color';

export class Color {
  private readonly props: ColorProps;

  constructor(props: ColorProps) {
    this.props = props;
  }

  public get id() {
    return this.props.id;
  }

  public get name() {
    return this.props.name;
  }

  public get color() {
    return this.props.color;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public get updatedAt() {
    return this.props.updatedAt;
  }
}
