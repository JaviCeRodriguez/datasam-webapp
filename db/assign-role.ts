import { config } from 'dotenv';
import { db } from './index';
import { users, roles, userRoles } from './schema';
import { eq, and } from 'drizzle-orm';

config({ path: '.env.local' });

async function assignRole() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.error('❌ Usage: npm run db:assign-role <email> <role>');
    console.error('   Example: npm run db:assign-role user@example.com admin');
    process.exit(1);
  }

  const [email, roleName] = args;

  try {
    console.log(`🔍 Looking up user with email: ${email}`);
    
    // Find user by email
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (user.length === 0) {
      console.error(`❌ User with email "${email}" not found`);
      process.exit(1);
    }

    console.log(`✅ Found user: ${user[0].email} (ID: ${user[0].id})`);

    console.log(`🔍 Looking up role: ${roleName}`);
    
    // Find role by name
    const role = await db
      .select()
      .from(roles)
      .where(eq(roles.name, roleName))
      .limit(1);

    if (role.length === 0) {
      console.error(`❌ Role "${roleName}" not found`);
      console.error('   Available roles: user, admin, collaborator');
      process.exit(1);
    }

    console.log(`✅ Found role: ${role[0].name} (ID: ${role[0].id})`);

    // Check if user-role relationship already exists
    const existingUserRole = await db
      .select()
      .from(userRoles)
      .where(
        and(
          eq(userRoles.userId, user[0].id),
          eq(userRoles.roleId, role[0].id)
        )
      )
      .limit(1);

    if (existingUserRole.length > 0) {
      console.log(`⏭️  User "${email}" already has role "${roleName}", skipping...`);
      process.exit(0);
    }

    // Insert user-role relationship
    await db.insert(userRoles).values({
      userId: user[0].id,
      roleId: role[0].id,
    });

    console.log(`✅ Successfully assigned role "${roleName}" to user "${email}"`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error assigning role:', error);
    process.exit(1);
  }
}

assignRole();
