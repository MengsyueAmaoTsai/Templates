type CreatedResponse = {
    id: string;
}

type CreateUserRequest = {
    email: string;
    name: string;
    password: string
}

type UserCreatedResponse = CreatedResponse;

type UserResponse = {
    id: string;
    email: string;
    name: string;
    createdTime: Date;
}

type UserDetailsResponse = UserResponse;


export interface IUserService { 
    listUsers(): Promise<UserResponse[]>;
    getUser(id: string): Promise<UserDetailsResponse>;
    createUser(request: CreateUserRequest): Promise<UserCreatedResponse>;
    deleteUser(id: string): Promise<void>;
}

class UserService implements IUserService {
    public constructor(private readonly baseAddress: string) { }
    public listUsers(): Promise<UserResponse[]> {
        throw new Error("Method not implemented.");
    }

    public getUser(id: string): Promise<UserDetailsResponse> {
        throw new Error("Method not implemented.");
    }

    public createUser(request: CreateUserRequest): Promise<UserCreatedResponse> {
        throw new Error("Method not implemented.");
    }

    public deleteUser(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

