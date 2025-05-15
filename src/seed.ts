import { PrismaClient, UserRole, Status, PaymentMethod } from '@prisma/client' // Import PrismaClient and enums from Prisma Client
import argon2 from 'argon2' // Import Argon2 for password hashing

// Initialize Prisma Client
const prisma = new PrismaClient()

async function main() {
  console.log('Launching the seed...');

  // Hashing the default password for all users
  const hashedPassword = await argon2.hash('Senha@123');

  // --- Creating users and related entities ---

  // Create a CHEF user with CNPJ
  const chefUser = await prisma.user.create({
    data: {
      name: 'João Chef',
      email: 'joao.chef@example.com',
      password: hashedPassword,
      userRole: UserRole.CHEF,
      cnpj: '12.345.678/0001-90',
    },
  });

  // Create a RESTAURANT user with CNPJ
  const restaurantUser = await prisma.user.create({
    data: {
      name: 'Restaurante Saboroso',
      email: 'contato@saboroso.com',
      password: hashedPassword,
      userRole: UserRole.RESTAURANT,
      cnpj: '98.765.432/0001-10',
    },
  });

  // Create a SUPPLIER user with two products
  const supplierUser = await prisma.user.create({
    data: {
      name: 'Fornecedor Alimentos',
      email: 'vendas@fornecedor.com',
      password: hashedPassword,
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
  });

  // Create a kitchen associated with the RESTAURANT user
  const kitchen = await prisma.kitchen.create({
    data: {
      name: 'Cozinha Central',
      location: 'Rua das Flores, 123',
      capacity: 10,
      equipment: ['Fogão industrial', 'Geladeira', 'Freezer'],
      restaurantId: restaurantUser.id,
    },
  });

  // Create a booking for the CHEF user in the kitchen, with a payment
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
  });

  // Create a review for the kitchen from the CHEF user
  await prisma.review.create({
    data: {
      rating: 5,
      comment: 'Excelente cozinha, muito bem equipada!',
      userId: chefUser.id,
      kitchenId: kitchen.id,
    },
  });

  console.log('Seed successfully completed!');
}

// Execute the seed and handle errors
main()
  .catch((e) => {
    console.error('Error running seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect(); // Always disconnect from the database
  });
