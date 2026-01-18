import { API_BASE_URL, API_ENDPOINTS } from "@/shared/constants";
import { ApiError } from "@/shared/types";

class ApiService {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(endpoint: string, options?: RequestInit) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
        ...options,
      });

      const data = await response.json();
      if (!response.ok) {
        throw {
          message: data.message || "An error occurred",
          status: response.status,
        } as ApiError;
      }

      return data as T;
    } catch (error) {
      if ((error as ApiError).message) throw error;
      throw { message: "Network error. Please try again." } as ApiError;
    }
  }

  async get<T>(endpoint: string, token?: string) {
    return this.request<T>(endpoint, {
      method: "GET",
      headers: token ? { Authorization: token } : {},
    });
  }

  async post<T>(endpoint: string, body?: any, token?: string) {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
      headers: token ? { Authorization: token } : {},
    });
  }
}

export const apiService = new ApiService(API_BASE_URL);
