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
}

export class User {
  private _id: string;
  private props: UserProps;

  constructor(
    props: Replace<UserProps, { createdAt?: Date; deleteAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      deletedAt: props.deleteAt ?? null,
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

  public softDelete() {
    this.props.deletedAt = new Date();
  }
}
