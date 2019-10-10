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
  phoneNumber: '',
  dateOfBirth: '1990-12-12',
};

export function generateMail(name: string) {
  const timestamp = Date.now();
  return `user_${name}_${timestamp}@fsatest.com`;
}
