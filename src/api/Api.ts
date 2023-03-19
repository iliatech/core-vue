import type { RequestConfig } from "@/types/api";
import { RequestMethods } from "@/types/api";
import { localStorageTokenField } from "@/settings/auth";
import axios from "axios";
import lang from "@/lang/lang";
import { apiErrors, apiUrl } from "@/settings/api";
import { showToast } from "@/helpers/toast";
import { ToastType } from "@/types/toasts";

export default class Api {
  static async request(config: RequestConfig): Promise<any> {
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

      if (config.successToast) {
        showToast(config.toast, {
          type: ToastType.Success,
          text: config.successToast,
        });

        config.successCallback();
      }

      return requestResult?.data?.data ?? null;
    } catch (e: any) {
      // TODO: Should refactor it, text is not a code;

      const errorTextCode = e.response.data.errorText;

      switch (errorTextCode) {
        case apiErrors.authTokenIsInvalid:
          localStorage.removeItem(localStorageTokenField);
          console.error(lang.authTokenIsInvalid);
          break;
        case apiErrors.duplicateFound:
          showToast(config.toast, {
            type: ToastType.Error,
            text: lang.errorCreateCategoryTitleDuplicate,
          });
          break;
        default:
          console.error(`Axios error text code: ${errorTextCode} :`, e);
      }

      return false;
    }
  }
}
