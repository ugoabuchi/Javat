export default class GraphService {
  graphUrl: any;

  constructor() {
    this.graphUrl = "https://graph.microsoft.com/v1.0";
  }

  async getUserInfo(token: string) {
    const headers = new Headers({ Authorization: `Bearer ${token}` });
    const options = {
      headers,
    };
    try {
      const response = await fetch(`${this.graphUrl}/me`, options);
      return await response.json();
    } catch (err) {
      throw new Error(err.text());
    }
  }

  async getGroups(token: string) {
    const headers = new Headers({ Authorization: `Bearer ${token}` });
    const options = {
      headers,
    };
    try {
      const response = await fetch(
        `${this.graphUrl}/groups?$filter=groupTypes/any(c:c+eq+'Unified')`,
        options
      );
      return await response.json();
    } catch (err) {
      throw new Error(err.text());
    }
  }
}
