import axios from "axios";

export class CadenceService {
  private apiUrl: string;
  private apiKey: string;

  constructor() {
    this.apiUrl = process.env.IMOVIEW_API_URL || "";
    this.apiKey = process.env.IMOVIEW_API_KEY || "";
  }

  async triggerMessage(customerId: string, messageType: string) {
    const response = await axios.post(
      `${this.apiUrl}/trigger-cadence`,
      { customerId, messageType },
      { headers: { Authorization: `Bearer ${this.apiKey}` } }
    );
    return response.data.message;
  }

  async getCustomer(customerId: string) {
    const response = await axios.get(`${this.apiUrl}/customers/${customerId}`, {
      headers: { Authorization: `Bearer ${this.apiKey}` },
    });
    return response.data;
  }
}
