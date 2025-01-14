import type { RequestConfig } from "@/types/api";
import { RequestMethods } from "@/types/api";
import axios from "axios";
import { apiUrl } from "@/settings/api";
import { showToast } from "@/helpers/toast";
import { ToastType } from "@/types/toasts";
import { getAuthToken, resetAuthorization } from "@/helpers/auth";
import { lang } from "@/lang";

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
      }

      if (typeof config.successCallback === "function") {
        config.successCallback();
      }

      // setGlobalError(undefined);

      return (
        (config.isDataResult
          ? requestResult?.data?.data ?? []
          : requestResult?.data) ?? null
      );
    } catch (e: any) {
      // console.error("API request error:", e);
      // throw new Error("Custom API error");

      console.log("SS", e?.response?.status);

      if (e?.response?.status === 401) {
        await resetAuthorization();
        return { validationErrors: ["Incorrect login data"] };
      }

      if (e?.response?.status === 422) {
        return { validationErrors: e.response?.data?.errors ?? [] };
      }

      if (e?.response?.status === 400) {
        if (e.response?.data?.message[0] === "password is not strong enough") {
          return {
            validationErrors: [
              {
                path: "password",
                customMessage: "Password is not strong enough",
              },
            ],
          };
        }

        return { validationErrors: e.response?.data?.message ?? [] };
      }

      if (e?.response?.status === 409) {
        return {
          validationErrors: e.response?.data?.errors ?? [
            { customMessage: lang.error.duplicateFound },
          ],
        };
      }

      throw new Error("Unexpected server error");

      //   // In case when API is not accessible the HTTP status is undefined.
      //   // TODO Is it correct for such a case clean the authorization?
      //   //setGlobalError(RegisteredError.ServerNotAccessible);
      //   return;
      // }
      //
      //const { status } = e.response;
      //
      //const validationErrors = e.response?.data?.errors ?? [];
      //
      //switch (status) {
      //case 401:
      //     await resetAuthorization();
      //     break;
      //   case 409:
      //     console.log(e.response);
      //     showErrorToast({
      //       text: e.response?.data?.error ?? lang.error.duplicateFound,
      //     });
      //     break;
      //   default:
      //     console.error(`HTTP error status ${status}:`, e);
      //
      //     if (validationErrors.length) {
      //       return { validationErrors };
      //     } else {
      //       showErrorToast({
      //         text: lang.error.unknownError,
      //       });
      //    }
      //}
    } finally {
      // if (!config.withoutLoader) {
      //   stopLoading();
      // }
    }
  }
}
