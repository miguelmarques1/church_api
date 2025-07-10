import { AppDataSource } from "../data-source";
import { seedRoles } from "./role.seed";
import { seedFamily } from "./family.seed";
import { seedMember } from "./member.seed";

AppDataSource.initialize().then(async () => {
  await seedRoles();
  await seedFamily();
  await seedMember();
  await AppDataSource.destroy();
}).catch((err) => {
  console.error("Erro ao executar seeds:", err);
});