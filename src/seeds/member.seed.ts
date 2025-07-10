import { AppDataSource } from "../data-source"
import { Member } from "../entity/Member"
import { Role } from "../entity/Role"
import { Gender } from "../enum/Gender"
import { encrypt } from "../helpers/encrypt"

export async function seedAdminMember() {
  const memberRepo = AppDataSource.getRepository(Member)
  const roleRepo = AppDataSource.getRepository(Role)

  const existing = await memberRepo.findOneBy({ phone: "11999999999" })
  if (existing) return console.log("Admin já existe")

  const adminRole = await roleRepo.findOneBy({ name: "Administrador" })
  if (!adminRole) throw new Error("Role 'Administrador' não encontrada")

  const password = encrypt.encryptpass("admin123")

  const admin = memberRepo.create({
    name: "Administrador",
    phone: "11999999999",
    email: "admin@sistema.com",
    gender: Gender.MALE,
    password,
    role: adminRole
  })

  await memberRepo.save(admin)
  console.log("Administrador criado com sucesso")
}
