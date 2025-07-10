import { AppDataSource } from "../data-source";
import { Family } from "../entity/Family";

export async function seedFamily() {
  const familyRepo = AppDataSource.getRepository(Family);

  const existing = await familyRepo.findOneBy({ name: 'Geração Eleita' });
  if (!existing) {
    await familyRepo.save(familyRepo.create({
      name: 'Geração Eleita',
      phone: '11999999999',
      address: 'Av. Brasil, 403 - Vila Correa - Ferraz de Vasconcelos - SP',
      receiveSupport: false,
    }));
    console.log("✅ Família seeded");
  }
}
