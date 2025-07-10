import { AppDataSource } from "../data-source"
import { seedRoles } from "./role.seed"
import { seedAdminMember } from "./member.seed"

AppDataSource.initialize().then(async () => {
  await seedRoles()
  await seedAdminMember()
  console.log("Seeding completo!")
  process.exit(0)
}).catch((err) => {
  console.error("Erro ao executar seed:", err)
  process.exit(1)
})
