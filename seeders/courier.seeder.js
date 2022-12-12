const { faker } = require('@faker-js/faker');
const { Courier } = require("../models");

module.exports = {
    seed: async (count = 1) => {
        await Courier.deleteMany();
        for(let i = 0; i < count; i++) {
            await Courier.create({
                name: faker.company.name()
            }).then(data => {
                console.log(`Seeded: ${data}`)
            }).catch(err => console.log(`Error seeding: ${err}`));
        }
    }
}