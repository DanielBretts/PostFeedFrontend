import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";

export class ApiConfig {
  static readonly BASE_URL: string = "https://jsonplaceholder.typicode.com";

  private static axiosInstance = axios.create({
    baseURL: ApiConfig.BASE_URL,
  });

  static async get<TResponse>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<TResponse> {
    const response: AxiosResponse<TResponse> = await this.axiosInstance.get(
      url,
      config
    );
    return response.data;
  }

  static async post<TRequest, TResponse>(
    url: string,
    data: TRequest,
    config?: AxiosRequestConfig
  ): Promise<TResponse> {
    const response: AxiosResponse<TResponse> = await this.axiosInstance.post(
      url,
      data,
      config
    );
    return response.data;
  }
}
