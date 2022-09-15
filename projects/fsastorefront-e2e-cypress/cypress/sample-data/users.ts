export const registrationUser = {
  titleCode: 'mr',
  firstName: 'Ben',
  lastName: 'Moore',
  password: 'Password1.',
  email: generateMail('Ben'),
  phoneNumber: '66622299',
  dateOfBirth: '1990-01-12',
};

export const registrationUserWithoutPhone = {
  titleCode: 'mr',
  firstName: 'Alex',
  lastName: 'Moore',
  password: 'Password1.',
  email: generateMail('Alex'),
  dateOfBirth: '1990-12-12',
};

export const createCustomer = {
  titleCode: 'Ms.',
  firstName: generateCustomerName('AKungFu'),
  lastName: 'Panda',
  email: generateMail('AKungFu'),
};

export function generateMail(name: string) {
  const timestamp = Date.now();
  return `user_${name}_${timestamp}@fsatest.com`;
}

export function generateCustomerName(name: string) {
  const timestamp = Date.now();
  return `${name}${timestamp}`;
}

export const donnaMooreUser = {
  email: 'donna@moore.com',
  password: '123456',
};

export const amosAgent = {
  email: 'amos.adkins@sapfsa.com',
  password: '1234',
};

export const rootAdmin = {
  email: 'thomas.schmidt@sapfsa.com',
  password: '123123',
};

export const carGroupAdmin = {
  email: 'kathy.liu@sapfsa.com',
  password: '123123',
};

export const carGroupCustomer = {
  email: 'elena.petrova@sapfsa.com',
  password: '123123',
};

export const createSeller = {
  titleCode: 'Ms.',
  firstName: 'Ana',
  lastName: 'Jones',
  email: generateMail('AnaJones'),
};

export const newSeller = {
  email: createSeller.email,
  password: 'Password1.',
};

export const sellerIndira = {
  email: 'indira.duffy@sap.com',
  password: '123456',
};

export const stephenCustomer = {
  email: 'stephen.bailey@sapfsa.com',
  password: '123456',
};
