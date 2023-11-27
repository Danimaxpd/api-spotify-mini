class SpotifyService {
  private accessToken: string = "";

  constructor() {}

  async authenticate() {
    // Implement OAuth flow to get access token
    this.accessToken = "";
  }

  async getSomeData() {
    // Example API call
    const response = await fetch("https://api.spotify.com/v1/some-endpoint", {
      headers: { Authorization: `Bearer ${this.accessToken}` },
    });
    return response.json();
  }
}

export default new SpotifyService();
