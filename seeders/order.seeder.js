const { faker } = require('@faker-js/faker');
const { Order, User } = require("../models");

module.exports = {
    seed: async (count = 1) => {
        await Order.deleteMany();
        for(let i = 0; i < count; i++) {
            await Order.create({
                fromAddress: `${faker.address.streetAddress()} ${faker.address.cityName()} Ukraine`,
                toAddress: `${faker.address.streetAddress()} ${faker.address.cityName()} India`,
                items: faker.helpers.uniqueArray(faker.random.word, 5),
                expectedDeliveryDate: faker.date.future(),
                user: (await User.aggregate([{ $sample: { size: 1 } }])).find(() => true),
            }).then(data => {
                console.log(`Seeded: ${data}`)
            }).catch(err => console.log(`Error seeding: ${err}`));
        }
    }
}