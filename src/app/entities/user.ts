import { Replace } from '@helpers/Replace';
import { randomUUID } from 'crypto';

export interface UserProps {
  name: string;
  password: string;
  email: string;
  permission: number;
  phone: string;
  createdAt: Date;
  deletedAt?: Date | null;
  updatedAt?: Date | null;
}

export class User {
  private _id: string;
  private props: UserProps;

  constructor(
    props: Replace<
      UserProps,
      { createdAt?: Date; deleteAt?: Date; updatedAt?: Date | null }
    >,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      deletedAt: props.deleteAt ?? null,
      updatedAt: props.updatedAt ?? null,
    };
  }

  public get id() {
    return this._id;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }

  public set password(password: string) {
    this.props.password = password;
  }

  public get password(): string {
    return this.props.password;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get email(): string {
    return this.props.email;
  }

  public set permission(permission: number) {
    this.props.permission = permission;
  }

  public get permission(): number {
    return this.props.permission;
  }

  public set phone(phone: string) {
    this.props.phone = phone;
  }

  public get phone(): string {
    return this.props.phone;
  }

  public get createdAt(): Date | null | undefined {
    return this.props.createdAt;
  }

  public get updatedAt(): Date | null | undefined {
    return this.props.updatedAt;
  }

  public get deletedAt(): Date | null | undefined {
    return this.props.deletedAt;
  }

  public softDelete() {
    this.props.deletedAt = new Date();
  }

  public update() {
    this.props.updatedAt = new Date();
  }
}
