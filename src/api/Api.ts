import type { RequestConfig } from "@/types/api";
import { RequestMethods } from "@/types/api";
import { localStorageTokenField } from "@/settings/auth";
import axios from "axios";
import lang from "@/lang";
import { apiErrors, apiUrl } from "@/settings/api";

export default class Api {
  static async request<T>(config: RequestConfig): Promise<T> {
    const requestMethod = config.method ?? RequestMethods.Get;
    let requestResult;

    const url = `${apiUrl}/${config.path}`;
    const payload = config.payload || {};
    let headers = {};
    const bearerToken = localStorage.getItem(localStorageTokenField);
    if (bearerToken) {
      headers = { Authorization: `Bearer ${bearerToken}` };
    }

    const preparedConfig = [RequestMethods.Get, RequestMethods.Delete].includes(
      requestMethod
    )
      ? { params: payload, headers }
      : { headers };

    try {
      switch (requestMethod) {
        case RequestMethods.Get:
          requestResult = await axios.get(url, preparedConfig);
          break;

        case RequestMethods.Post:
          requestResult = await axios.post(url, payload, preparedConfig);
          break;

        case RequestMethods.Put:
          requestResult = await axios.put(url, payload, preparedConfig);
          break;

        case RequestMethods.Patch:
          // TODO: Check, if is it correct call for patch?
          requestResult = await axios.patch(url, payload, preparedConfig);
          break;

        case RequestMethods.Delete:
          requestResult = await axios.delete(url, preparedConfig);
          break;
      }

      return requestResult?.data?.data ?? null;
    } catch (e: any) {
      const errorTextCode = e.response.data.error;
      if (errorTextCode === apiErrors.authTokenIsInvalid) {
        localStorage.removeItem(localStorageTokenField);
        console.error(lang.authTokenIsInvalid);
      } else {
        // TODO: Error processing should be done;
        console.error(`Axios error text code: ${errorTextCode} :`, e);
      }
    }
  }
}
