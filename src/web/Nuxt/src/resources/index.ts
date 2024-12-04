type ErrorResponse = {
	status: number;
	type: string;
	title: string;
	detail: string;
};

type CreatedResponse = {
	id: string;
};

type UserCreatedResponse = CreatedResponse;

type CreateUserRequest = {
	email: string;
	name: string;
	password: string;
};

type UserResponse = {
	id: string;
	email: string;
	name: string;
	createdTime: Date;
};

type UserDetailsResponse = UserResponse;

export interface IResourceService {
	listUsers(): Promise<UserResponse[]>;
	createUser(request: CreateUserRequest): Promise<UserCreatedResponse>;
	getUser(id: string): Promise<UserDetailsResponse>;
	deleteUser(id: string): Promise<void>;
}

class ResourceService implements IResourceService {
	private static readonly baseAddress = "https://localhost:10000";

	public async listUsers(): Promise<UserResponse[]> {
		const fullUrl = `${ResourceService.baseAddress}/api/v1/users`;

		const response = await fetch(fullUrl, {
			method: "GET",
		});

		if (!response.ok) {
			const errorResponse = (await response.json()) as ErrorResponse;
			throw new Error(
				`Error ${errorResponse.status}: ${errorResponse.title} - ${errorResponse.detail}`,
			);
		}

		return (await response.json()) as UserResponse[];
	}

	public async createUser(
		request: CreateUserRequest,
	): Promise<UserCreatedResponse> {
		return this.invoke<UserCreatedResponse>("POST", "/api/v1/users", request);
	}

	public async getUser(id: string): Promise<UserDetailsResponse> {
		throw new Error("Method not implemented.");
	}

	public async deleteUser(id: string): Promise<void> {
		throw new Error("Method not implemented.");
	}

	private async invoke<TResponse>(
		method: string,
		path: string,
		body?: object,
	): Promise<TResponse> {
		const fullUrl = `${ResourceService.baseAddress}${path}`;

		const response = await fetch(fullUrl, {
			method: method,
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});

		if (!response.ok) {
			const errorResponse = (await response.json()) as ErrorResponse;
			throw new Error(
				`Error ${errorResponse.status}: ${errorResponse.title} - ${errorResponse.detail}`,
			);
		}

		return (await response.json()) as TResponse;
	}
}

export const resourceServiceSingleton =
	new ResourceService() as IResourceService;
