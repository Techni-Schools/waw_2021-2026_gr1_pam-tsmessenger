import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export type GetAuthTokenFn<TResult extends string | null = string | null> =
  () => Promise<TResult> | TResult;

export type SetAuthTokenFn<TPayload extends string | null = string | null> = (
  payload: TPayload
) => Promise<void> | void;

export type Options = {
  baseURL: string | (() => string);
  getAuthToken?: GetAuthTokenFn;
  setAuthToken?: SetAuthTokenFn;
  onError?: (
    error: unknown,
    request: AxiosRequestConfig | undefined,
    response: AxiosResponse | undefined
  ) => void;
};

const getAuthorizationHeader = async (
  options: Options
): Promise<string | undefined> => {
  const { getAuthToken } = options;
  if (!getAuthToken) return undefined;
  const token = await getAuthToken();
  return token ? `Bearer ${token}` : undefined;
};

class AxiosManager {
  protected readonly instance: AxiosInstance;

  constructor(protected readonly options: Options) {
    let { baseURL } = options;
    baseURL = typeof baseURL === "string" ? baseURL : baseURL();

    this.instance = axios.create({ baseURL });
    this.instance.interceptors.request.use(this.handleReqFulfilled);
    this.instance.interceptors.response.use(
      this.handleResFulfilled,
      this.handleResRejected
    );
  }

  private handleReqFulfilled = async (config: InternalAxiosRequestConfig) => {
    const { options } = this;
    const { headers } = config;
    const { Authorization } = headers;
    if (!Authorization) {
      config.headers.Authorization = await getAuthorizationHeader(options);
    }
    return config;
  };

  private handleResFulfilled = async (response: AxiosResponse) => response;

  private handleResRejected = async (error: any) => {
    const { options } = this;
    const { onError } = options;
    onError?.(
      error,
      (error as AxiosError).request,
      (error as AxiosError).response
    );
    console.error(error);

    const { setAuthToken } = options;
    if (error?.response.status === 401) {
      await (setAuthToken && setAuthToken(null));
    }
    const message = error.response.data.error || error.response.error;
    throw message;
  };
}

export default AxiosManager;
