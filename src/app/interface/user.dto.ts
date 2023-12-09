import {RolesDto} from "./roles.dto";

export interface UserDto{

  id: number;

  username: String;

  passwd: String;

  userValido: number;

  fechaCreacionUser: Date;

  roles: RolesDto[];
}
