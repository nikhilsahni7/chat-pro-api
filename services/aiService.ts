import axios from "axios";

export class AIService {
  private apiUrl: string;
  private apiKey: string;

  constructor() {
    this.apiUrl = process.env.AI_API_URL || "";
    this.apiKey = process.env.AI_API_KEY || "";
  }

  async generateResponse(query: string, propertyInfo: any) {
    const response = await axios.post(
      `${this.apiUrl}/generate`,
      { query, propertyInfo },
      { headers: { Authorization: `Bearer ${this.apiKey}` } }
    );
    return response.data.response;
  }
}
