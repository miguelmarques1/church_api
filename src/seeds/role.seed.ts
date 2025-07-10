import { AppDataSource } from "../data-source"
import { Role } from "../entity/Role"
import { RoleCredentials } from "../enum/RoleCredentials"

export async function seedRoles() {
  const roleRepo = AppDataSource.getRepository(Role)

  const existing = await roleRepo.findOneBy({ name: "Administrador" })
  if (existing) return console.log("Roles já criadas")

  const roles = [
    { name: "Administrador", credentials: RoleCredentials.PASTOR },
    { name: "Membro", credentials: RoleCredentials.MEMBER },
  ]

  await roleRepo.save(roles)
  console.log("Roles criadas com sucesso")
}
