import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const main = async () => {

  const numbers = [
    '+17329567363',
  ].map(
    async (content) =>
      await prisma.user.create({
        data: {
          userPhone: content,
          name: 'ayush',
          groupCode: 'SST89',
        }

      })
  )
  
  console.log(`🌱 Created ${numbers.length} records`)
}

main()
  .catch((err) => {
    console.error(err)
  })
  .finally(async () => {
    await prisma.$disconnect
  })