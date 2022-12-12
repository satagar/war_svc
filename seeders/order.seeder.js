const { faker } = require('@faker-js/faker');
const { Order, User, Courier } = require("../models");

module.exports = {
    seed: async (count = 1) => {
        await Order.deleteMany();
        for(let i = 0; i < count; i++) {
            const orderStatus = faker.helpers.arrayElement(Order.statuses);
            await Order.create({
                status: orderStatus,
                fromAddress: `${faker.address.streetAddress()} ${faker.address.cityName()} Ukraine`,
                toAddress: `${faker.address.streetAddress()} ${faker.address.cityName()} India`,
                items: faker.helpers.uniqueArray(faker.random.word, 5),
                expectedDeliveryDate: faker.date.future(),
                actualDeliveryDate: orderStatus === 'delivered' ? faker.date.future() : null,
                user: (await User.aggregate([{ $sample: { size: 1 } }])).find(() => true),
                courier: (await Courier.aggregate([{ $sample: { size: 1 } }])).find(() => true),
                airWayBillNumber: faker.random.numeric(10),
                deliveryCharge: faker.commerce.price(100, 250)
            }).then(data => {
                console.log(`Seeded: ${data}`)
            }).catch(err => console.log(`Error seeding: ${err}`));
        }
    }
}