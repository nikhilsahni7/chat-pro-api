import axios from "axios";

export class ImoviewService {
  private apiUrl: string;
  private apiKey: string;

  constructor() {
    this.apiUrl = process.env.IMOVIEW_API_URL || "";
    this.apiKey = process.env.IMOVIEW_API_KEY || "";
  }

  async createCustomer(customerData: {
    fullName: string;
    email: string;
    phoneNumber: string;
  }) {
    const response = await axios.post(
      `${this.apiUrl}/customers`,
      customerData,
      {
        headers: { Authorization: `Bearer ${this.apiKey}` },
      }
    );
    return response.data.id;
  }

  async getCustomer(customerId: string) {
    const response = await axios.get(`${this.apiUrl}/customers/${customerId}`, {
      headers: { Authorization: `Bearer ${this.apiKey}` },
    });
    return response.data;
  }
}
