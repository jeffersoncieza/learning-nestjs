export class ExternalUserDataService {
  async fetchUsers(): Promise<any[]> {
    return Promise.resolve([
      {
        id: 3,
        name: 'External User',
        email: 'external@example.com',
      }
    ]);
  }
}