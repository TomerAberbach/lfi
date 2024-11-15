import { count } from 'lfi'
import { faker } from '@faker-js/faker'

console.log(
  JSON.stringify({
    name: `lfi reserve and zoo`,
    exhibits: faker.helpers.multiple(
      () => ({
        id: faker.string.alpha({ casing: `upper`, length: 3 }),
        animals: faker.helpers.multiple(
          () => ({
            species: faker.animal.type(),
            name: faker.person.firstName().toLowerCase(),
            age: faker.number.int({ min: 1, max: 40 }),
          }),
          { count: { min: 3, max: 6 } },
        ),
      }),
      { count: 5 },
    ),
  }),
)
