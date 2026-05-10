import prisma from '../src/lib/prisma'
async function main() {
  const result = await prisma.user.updateMany({
    data: { isAdmin: true }
  })
  console.log(`Updated ${result.count} users to be admins.`)
}

main().catch(console.error).finally(() => prisma.$disconnect())

