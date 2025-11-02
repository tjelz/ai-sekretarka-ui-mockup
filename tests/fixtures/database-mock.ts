import { mockUsers } from './users'

export class MockPool {
  private users: any[] = []
  private shouldFail = false
  private failureError: any = null

  constructor() {
    // Initialize with mock users
    this.users = [
      {
        id: mockUsers.validUser.id,
        name: mockUsers.validUser.name,
        email: mockUsers.validUser.email,
        password: mockUsers.validUser.hashedPassword,
        emailVerified: null,
        image: null,
      },
    ]
  }

  async query(sql: string, params?: any[]) {
    if (this.shouldFail) {
      throw this.failureError
    }

    // SELECT query
    if (sql.trim().toUpperCase().startsWith('SELECT')) {
      if (params && params[0]) {
        const email = params[0].toLowerCase()
        const user = this.users.find((u) => u.email === email)
        return { rows: user ? [user] : [] }
      }
      return { rows: this.users }
    }

    // INSERT query
    if (sql.trim().toUpperCase().startsWith('INSERT')) {
      if (params) {
        const [name, email, password] = params
        // Check for duplicate
        if (this.users.find((u) => u.email === email)) {
          const error = new Error('duplicate key value violates unique constraint') as any
          error.code = '23505'
          throw error
        }
        const newUser = {
          id: `user-${Date.now()}`,
          name,
          email,
          password,
          emailVerified: null,
          image: null,
        }
        this.users.push(newUser)
        return { rows: [newUser] }
      }
    }

    // UPDATE query
    if (sql.trim().toUpperCase().startsWith('UPDATE')) {
      return { rows: [], rowCount: 1 }
    }

    // DELETE query
    if (sql.trim().toUpperCase().startsWith('DELETE')) {
      return { rows: [], rowCount: 1 }
    }

    return { rows: [] }
  }

  async connect() {
    if (this.shouldFail) {
      throw this.failureError
    }
    return {
      query: this.query.bind(this),
      release: jest.fn(),
    }
  }

  async end() {
    return Promise.resolve()
  }

  // Test utilities
  setFailure(error: any) {
    this.shouldFail = true
    this.failureError = error
  }

  clearFailure() {
    this.shouldFail = false
    this.failureError = null
  }

  reset() {
    this.users = [
      {
        id: mockUsers.validUser.id,
        name: mockUsers.validUser.name,
        email: mockUsers.validUser.email,
        password: mockUsers.validUser.hashedPassword,
        emailVerified: null,
        image: null,
      },
    ]
    this.clearFailure()
  }

  getUsers() {
    return this.users
  }
}

export const createMockPool = () => new MockPool()
