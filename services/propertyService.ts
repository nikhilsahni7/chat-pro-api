import axios from "axios";

export class PropertyService {
  private apiUrl: string;
  private apiKey: string;

  constructor() {
    this.apiUrl = process.env.IMOVIEW_API_URL || "";
    this.apiKey = process.env.IMOVIEW_API_KEY || "";
  }

  async getPropertyInfo(propertyId: string) {
    const response = await axios.get(
      `${this.apiUrl}/properties/${propertyId}`,
      {
        headers: { Authorization: `Bearer ${this.apiKey}` },
      }
    );
    return response.data;
  }
}
