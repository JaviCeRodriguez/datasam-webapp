import { config } from 'dotenv';
import { db } from './index';
import { roles } from './schema';
import { eq } from 'drizzle-orm';

config({ path: '.env.local' });

async function seed() {
  try {
    console.log('🌱 Starting seed...');

    // Seed roles
    const rolesToInsert = [
      { name: 'user', description: 'Regular user role' },
      { name: 'admin', description: 'Administrator role' },
      { name: 'collaborator', description: 'Collaborator role' },
    ];

    console.log('📝 Seeding roles...');
    for (const role of rolesToInsert) {
      // Check if role already exists
      const existingRole = await db
        .select()
        .from(roles)
        .where(eq(roles.name, role.name))
        .limit(1);

      if (existingRole.length > 0) {
        console.log(`⏭️  Role "${role.name}" already exists, skipping...`);
        continue;
      }

      // Insert role if it doesn't exist
      await db.insert(roles).values(role);
      console.log(`✅ Inserted role: ${role.name}`);
    }

    console.log('✨ Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seed();
