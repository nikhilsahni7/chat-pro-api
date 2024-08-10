import axios from "axios";

export class InvoiceService {
  private apiUrl: string;
  private apiKey: string;

  constructor() {
    this.apiUrl = process.env.IMOVIEW_API_URL || "";
    this.apiKey = process.env.IMOVIEW_API_KEY || "";
  }

  async verifyCustomer(customerId: string, phoneNumber: string) {
    const response = await axios.post(
      `${this.apiUrl}/verify-customer`,
      { customerId, phoneNumber },
      { headers: { Authorization: `Bearer ${this.apiKey}` } }
    );
    return response.data.isValid;
  }

  async generateAndSendInvoice(customerId: string) {
    const response = await axios.post(
      `${this.apiUrl}/generate-invoice`,
      { customerId },
      { headers: { Authorization: `Bearer ${this.apiKey}` } }
    );
    return response.data.invoiceUrl;
  }
}
