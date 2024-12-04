type ErrorResponse = {
	status: number;
	type: string;
	title: string;
	detail: string;
};

type CreatedResponse = {
	id: string;
};

export type UserCreatedResponse = CreatedResponse;

export type CreateUserRequest = {
	email: string;
	name: string;
	password: string;
};

export type UserResponse = {
	id: string;
	email: string;
	name: string;
	createdTime: Date;
};

export type UserDetailsResponse = UserResponse;

export interface IResourceService {
	listUsers(): Promise<UserResponse[]>;
	createUser(request: CreateUserRequest): Promise<UserCreatedResponse>;
	getUser(id: string): Promise<UserDetailsResponse>;
	deleteUser(id: string): Promise<void>;
}

type ResourceOptions = {
	baseAddress: string;
};

class ResourceService implements IResourceService {
	public constructor(private readonly options: ResourceOptions) {}

	public async listUsers(): Promise<UserResponse[]> {
		return await this.invoke<UserResponse[]>("GET", "/api/v1/users");
	}

	public async createUser(
		request: CreateUserRequest,
	): Promise<UserCreatedResponse> {
		return this.invoke<UserCreatedResponse>("POST", "/api/v1/users", request);
	}

	public async getUser(id: string): Promise<UserDetailsResponse> {
		return await this.invoke<UserDetailsResponse>("GET", `/api/v1/users/${id}`);
	}

	public async deleteUser(id: string): Promise<void> {
		throw new Error("Method not implemented.");
	}

	private async invoke<TResponse>(
		method: string,
		path: string,
		body?: object,
	): Promise<TResponse> {
		const fullUrl = `${this.options.baseAddress}${path}`;

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

export const resourceServiceSingleton = new ResourceService({
	baseAddress: "https://localhost:10000",
}) as IResourceService;
