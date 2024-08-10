import axios from "axios";

export class ChatProService {
  private apiUrl: string;
  private apiKey: string;

  constructor() {
    this.apiUrl = process.env.CHATPRO_API_URL || "";
    this.apiKey = process.env.CHATPRO_API_KEY || "";
  }

  async sendMessage(phoneNumber: string, message: string) {
    const response = await axios.post(
      `${this.apiUrl}/send-message`,
      { phoneNumber, message },
      { headers: { Authorization: `Bearer ${this.apiKey}` } }
    );
    return response.data;
  }

  async createNewService(phoneNumber: string) {
    const response = await axios.post(
      `${this.apiUrl}/create-service`,
      { phoneNumber },
      { headers: { Authorization: `Bearer ${this.apiKey}` } }
    );
    return response.data;
  }
}
