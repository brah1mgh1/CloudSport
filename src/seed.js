require('dotenv').config();
const { sequelize } = require('./config/db');
const { User, Club, Group, Facility, Product, Offer } = require('./models');

async function seed() {
  try {
    await sequelize.sync({ force: true });
    console.log('Database reset');

    const manager = await User.create({
      name: 'Admin Manager',
      email: 'manager@sportsclaude.com',
      password: 'password123',
      role: 'manager'
    });
    console.log('Manager created: manager@sportsclaude.com / password123');

    await User.create({
      name: 'John Leader',
      email: 'leader@sportsclaude.com',
      password: 'password123',
      role: 'leader'
    });
    console.log('Leader created: leader@sportsclaude.com / password123');

    await User.create({
      name: 'Jane Athlete',
      email: 'athlete@sportsclaude.com',
      password: 'password123',
      role: 'athlete'
    });
    console.log('Athlete created: athlete@sportsclaude.com / password123');

    await User.create({
      name: 'Bob Athlete',
      email: 'bob@sportsclaude.com',
      password: 'password123',
      role: 'athlete'
    });

    const club = await Club.create({
      name: 'Eagles FC',
      description: 'Premier football club',
      sportType: 'Football',
      leaderId: 2
    });
    await User.update({ clubId: club.id }, { where: { id: 2 } });
    console.log('Club created: Eagles FC');

    const group1 = await Group.create({
      name: 'Senior Team',
      description: 'Senior competitive team',
      clubId: club.id
    });

    await Group.create({
      name: 'Junior Team',
      description: 'Youth development team',
      clubId: club.id
    });
    console.log('Groups created');

    await Facility.create({
      name: 'Main Stadium',
      description: 'Large capacity multipurpose stadium',
      capacity: 5000,
      pricePerHour: 200,
      location: 'Building A',
      sportType: 'Football',
      available: true
    });

    await Facility.create({
      name: 'Basketball Court',
      description: 'Indoor basketball court',
      capacity: 50,
      pricePerHour: 50,
      location: 'Building B',
      sportType: 'Basketball',
      available: true
    });

    await Facility.create({
      name: 'Tennis Court',
      description: 'Professional tennis court with lighting',
      capacity: 4,
      pricePerHour: 30,
      location: 'Outdoor Area',
      sportType: 'Tennis',
      available: true
    });

    await Facility.create({
      name: 'Swimming Pool',
      description: 'Olympic-sized swimming pool',
      capacity: 100,
      pricePerHour: 80,
      location: 'Building C',
      sportType: 'Swimming',
      available: true
    });
    console.log('Facilities created');

    await Product.create({
      name: 'Sports Water Bottle',
      description: 'Premium 1L sports water bottle',
      price: 12.99,
      category: 'Accessories',
      stock: 50
    });

    await Product.create({
      name: 'Football',
      description: 'Professional match football',
      price: 29.99,
      category: 'Equipment',
      stock: 20
    });

    await Product.create({
      name: 'Sports Jersey',
      description: 'Breathable training jersey',
      price: 39.99,
      category: 'Clothing',
      stock: 30
    });

    await Product.create({
      name: 'Tennis Racket',
      description: 'Pro series tennis racket',
      price: 89.99,
      category: 'Equipment',
      stock: 10
    });
    console.log('Products created');

    await Offer.create({
      title: 'Summer Special',
      description: 'Get amazing discounts on facility bookings this summer!',
      discountPercentage: 20,
      validFrom: '2026-01-01',
      validUntil: '2026-12-31',
      active: true
    });

    await Offer.create({
      title: 'New Member Offer',
      description: 'Special discount for new club members',
      discountPercentage: 15,
      validFrom: '2026-01-01',
      validUntil: '2026-06-30',
      active: true
    });
    console.log('Offers created');

    console.log('\n✅ Seed completed successfully!');
    console.log('\nLogin Credentials:');
    console.log('  Manager: manager@sportsclaude.com / password123');
    console.log('  Leader:  leader@sportsclaude.com / password123');
    console.log('  Athlete: athlete@sportsclaude.com / password123');

    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
}

seed();
