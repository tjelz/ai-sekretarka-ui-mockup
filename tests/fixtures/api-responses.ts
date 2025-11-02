export const mockAPIResponses = {
  registration: {
    success: {
      success: true,
      message: 'User registered successfully',
      user: {
        id: 'new-user-789',
        name: 'Nowy Użytkownik',
        email: 'nowy@example.com',
      },
    },
    duplicateEmail: {
      error: 'User with this email already exists',
    },
    missingFields: {
      error: 'Missing required fields: name, email, and password are required',
    },
    invalidEmail: {
      error: 'Invalid email format',
    },
    shortPassword: {
      error: 'Password must be at least 8 characters long',
    },
    databaseError: {
      error: 'Database connection error. Please try again later.',
    },
    genericError: {
      error: 'An error occurred during registration. Please try again.',
    },
  },
  contact: {
    success: {
      success: true,
      message: 'Zgłoszenie zostało wysłane. Skontaktujemy się wkrótce!',
    },
    missingFields: {
      error: 'Missing required fields',
    },
    serverError: {
      error: 'Internal server error',
    },
  },
  auth: {
    signInSuccess: {
      ok: true,
      error: null,
      status: 200,
      url: '/dashboard',
    },
    signInFailure: {
      ok: false,
      error: 'CredentialsSignin',
      status: 401,
      url: null,
    },
  },
}

export const mockDatabaseErrors = {
  duplicateKey: {
    code: '23505',
    message: 'duplicate key value violates unique constraint',
    constraint: 'users_email_key',
  },
  connectionRefused: {
    code: 'ECONNREFUSED',
    message: 'connect ECONNREFUSED 127.0.0.1:5432',
  },
  timeout: {
    code: 'ETIMEDOUT',
    message: 'Connection timeout',
  },
  syntaxError: {
    code: '42601',
    message: 'syntax error at or near',
  },
}
