import {RolesDto} from "./roles.dto";

export interface UserDto{

  id: number;

  idPerson: number;

  username: String;

  passwd: String;

  userValido: number;

  fechaCreacionUser: Date;

  roles: RolesDto[];

  name: String;

  lastName: String;

  email: String;

  phoneNumber: String;

  photo: String;

}
