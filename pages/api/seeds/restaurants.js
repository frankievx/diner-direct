var faker = require('faker')
var _ = require('lodash')
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('restaurants').del()
    .then(function () {
      // Inserts seed entries
      return knex('restaurants').insert(_.times(150, function () {
        return {
          name: faker.company.companyName(),
          city: faker.address.city(),
          state: faker.address.stateAbbr(),
          phone: faker.phone.phoneNumberFormat(),
          genre: faker.commerce.productAdjective()
        }
      }));
    });
};
