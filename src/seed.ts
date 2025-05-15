import { PrismaClient, UserRole, Status, PaymentMethod } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // --- Apaga os dados na ordem correta ---
  await prisma.payment.deleteMany()
  await prisma.booking.deleteMany()
  await prisma.review.deleteMany()
  await prisma.product.deleteMany()
  await prisma.kitchen.deleteMany()
  await prisma.user.deleteMany()

  // --- Cria usuários e dados relacionados ---

  // Criando um usuário do tipo CHEF com CNPJ
  const chefUser = await prisma.user.create({
    data: {
      name: 'João Chef',
      email: 'joao.chef@example.com',
      password: 'senha123',
      userRole: UserRole.CHEF,
      cnpj: '12.345.678/0001-90',
    },
  })

  // Criando um usuário do tipo RESTAURANT com CNPJ
  const restaurantUser = await prisma.user.create({
    data: {
      name: 'Restaurante Saboroso',
      email: 'contato@saboroso.com',
      password: 'senha123',
      userRole: UserRole.RESTAURANT,
      cnpj: '98.765.432/0001-10',
    },
  })

  // Criando um usuário do tipo SUPPLIER com produtos
  const supplierUser = await prisma.user.create({
    data: {
      name: 'Fornecedor Alimentos',
      email: 'vendas@fornecedor.com',
      password: 'senha123',
      userRole: UserRole.SUPPLIER,
      cnpj: '11.222.333/0001-44',
      products: {
        create: [
          {
            name: 'Arroz',
            description: 'Arroz branco tipo 1',
            price: 20.5,
          },
          {
            name: 'Feijão',
            description: 'Feijão carioca',
            price: 8.75,
          },
        ],
      },
    },
  })

  // Criando uma cozinha associada ao restaurante
  const kitchen = await prisma.kitchen.create({
    data: {
      name: 'Cozinha Central',
      location: 'Rua das Flores, 123',
      capacity: 10,
      equipment: ['Fogão industrial', 'Geladeira', 'Freezer'],
      restaurantId: restaurantUser.id,
    },
  })

  // Criando uma reserva (booking) para o chef na cozinha
  const booking = await prisma.booking.create({
    data: {
      userId: chefUser.id,
      kitchenId: kitchen.id,
      date: new Date('2025-05-10'),
      startTime: new Date('2025-05-10T10:00:00Z'),
      endTime: new Date('2025-05-10T14:00:00Z'),
      status: Status.CONFIRMED,
      payment: {
        create: {
          value: 150.0,
          status: Status.CONFIRMED,
          paymentMethod: PaymentMethod.PIX,
        },
      },
    },
  })

  // Criando uma avaliação (review) para a cozinha
  await prisma.review.create({
    data: {
      rating: 5,
      comment: 'Excelente cozinha, muito bem equipada!',
      userId: chefUser.id,
      kitchenId: kitchen.id,
    },
  })

  console.log('Seed concluído com sucesso!')
}

main()
  .catch((e) => {
    console.error('Erro ao executar o seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
