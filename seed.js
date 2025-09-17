const { prisma, defaultUserRoleId, defaultAdminRoleId } = require("./config/db");
const bcrypt = require("bcrypt"); // to hash the default user password

async function main() {
  // --- Create roles if they don't exist ---
  const roles = [
    {
      id: defaultUserRoleId,
      title: "user",
      description: "Default user role",
    },
    {
      id: defaultAdminRoleId,
      title: "admin",
      description: "Administrator role with full permissions",
    },
  ];

  for (const role of roles) {
    const existingRole = await prisma.role.findUnique({ where: { id: role.id } });

    if (!existingRole) {
      await prisma.role.create({ data: role });
      console.log(`Role created: ${role.title}`);
    } else {
      console.log(`Role already exists: ${role.title}`);
    }
  }

  // --- Create a default user if it doesn't exist ---
  const defaultAdminEmail = "admin@dma.com";

  const existingUser = await prisma.user.findUnique({
    where: { email: defaultAdminEmail },
  });

  if (!existingUser) {
    const hashedPassword = await bcrypt.hash("password123", 10);

    const newUser = await prisma.user.create({
      data: {
        name: "Admin",
        email: defaultAdminEmail,
        tel: "+1234567890",
        country: "Unknown",
        address: "Default Address",
        category: "Individual",
        password: hashedPassword,
        role_id: defaultAdminRoleId, // assign default user role
      },
    });

    console.log("Default admin created:", newUser);
  } else {
    console.log("Default user already exists:", existingUser.email);
  }
}

main()
  .catch((err) => {
    console.error("Error seeding:", err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
