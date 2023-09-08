import type { RequestConfig } from "@/types/api";
import { RequestMethods } from "@/types/api";
import axios from "axios";
import lang from "@/lang/lang";
import { apiErrors, apiUrl } from "@/settings/api";
import { showToast } from "@/helpers/toast";
import { ToastType } from "@/types/toasts";
import { getAuthToken, resetAuthToken } from "@/helpers/auth";

export default class Api {
  static async request(config: RequestConfig): Promise<any> {
    config.method = config.method ?? RequestMethods.Get;
    let requestResult;

    const url = `${apiUrl}/${config.path}`;
    const payload = config.payload || {};
    let headers = {};
    const bearerToken = getAuthToken();

    if (bearerToken) {
      headers = { Authorization: `Bearer ${bearerToken}` };
    }

    const preparedConfig = [RequestMethods.Get, RequestMethods.Delete].includes(
      config.method
    )
      ? { params: payload, headers }
      : { headers };

    try {
      switch (config.method) {
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

      if (config.successToast) {
        showToast({
          type: ToastType.Success,
          text: config.successToast,
        });

        if (typeof config.successCallback === "function")
          config.successCallback();
      }

      return requestResult?.data ?? null;
    } catch (e: any) {
      // TODO: Should refactor it, text is not a code;
      const errorTextCode = e.response.data.errorText;

      switch (errorTextCode) {
        case apiErrors.authTokenIsInvalid:
          resetAuthToken();
          console.error(lang.authTokenIsInvalid);
          break;
        case apiErrors.duplicateFound:
          showToast({
            type: ToastType.Error,
            text: lang.errorDuplicate,
          });
          break;
        default:
          console.error(`Axios error text code: ${errorTextCode} :`, e);
      }

      return false;
    }
  }
}
