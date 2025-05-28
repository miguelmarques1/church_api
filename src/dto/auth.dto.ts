import { Role } from "../enum/RoleType"

export type AuthPayload = {
    id: number,
    role: Role,
}