export type FlagShipSDKOptions = {
	apiKey: string;
	baseUrl?: string;
};

export class FlagShipClient {
	private apiKey: string;
	private baseUrl: string;

	constructor(options: FlagShipSDKOptions) {
		this.apiKey = options.apiKey;
		this.baseUrl = options.baseUrl || "https://api.your-org.com/flags";
	}

	private async request(path: string): Promise<any> {
		try {
			const res = await fetch(`${this.baseUrl}${path}`, {
				headers: {
					Authorization: `Bearer ${this.apiKey}`,
				},
			});

			if (!res.ok) {
				throw new Error(`Request failed: ${res.status}`);
			}

			return res.json();
		} catch (err) {
			console.error("[FlagshipSDK] Error:", err);
			return null;
		}
	}

	async allFlags(): Promise<Record<string, any>> {
		const data = await this.request("");
		return data ?? {};
	}

	async getFlag<T = boolean>(key: string, defaultValue: T): Promise<T> {
		const data = await this.request(`/${key}`);
		if (data && typeof data.value !== "undefined") return data.value as T;

		return defaultValue;
	}
}
