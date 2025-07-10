import { AppDataSource } from "../data-source";
import { Family } from "../entity/Family";
import { Member } from "../entity/Member";
import { Role } from "../entity/Role";
import { Gender } from "../enum/Gender";
import { encrypt } from "../helpers/encrypt"

export async function seedMember() {
  const memberRepo = AppDataSource.getRepository(Member);
  const roleRepo = AppDataSource.getRepository(Role);
  const familyRepo = AppDataSource.getRepository(Family);

  const existing = await memberRepo.findOneBy({ phone: '11999999999' });
  if (existing) {
    console.log("⚠️ Membro já existe");
    return;
  }

  const role = await roleRepo.findOneByOrFail({ name: 'Administrador' });
  const family = await familyRepo.findOneByOrFail({ name: 'Geração Eleita' });
  const password = encrypt.encryptpass("admin123");

  const member = memberRepo.create({
    name: 'Administrador do Sistema',
    phone: '11999999999',
    gender: Gender.MALE,
    password: password,
    role,
    family,
    email: 'admin@sistema.com',
  });

  await memberRepo.save(member);
  console.log("✅ Membro administrador seeded");
}
