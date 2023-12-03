type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService {
  constructor(
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  async execute(url: string): Promise<void> {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Error on check service: ${url}`);

      this.successCallback();
    } catch (error) {
      this.errorCallback(`${error}`);
    }
  }
}
