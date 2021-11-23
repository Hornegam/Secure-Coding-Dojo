export interface IUserRepository {
    get_user (id: Number): Promise<IUserRepository>;
}
