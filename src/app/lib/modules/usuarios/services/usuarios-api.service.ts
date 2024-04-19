import { Injectable } from "@angular/core";

interface IUsuario  {
    id: number;
    nome: string;
    email: string; 
};

export class UsuariosApiService {
    private static key: string = 'users';

    static initialize() {
        const users: IUsuario[] = [
            { id: 1, nome: 'Alice', email: 'alice@example.com' },
            { id: 2, nome: 'Bob', email: 'bob@example.com' }
        ];
        localStorage.setItem(UsuariosApiService.key, JSON.stringify(users));
    }

    static getUsers(): IUsuario[] {
        const data = localStorage.getItem(UsuariosApiService.key);
        return data ? JSON.parse(data) : [];
    }

    static getUserById(id: number): IUsuario | undefined {
        const users = UsuariosApiService.getUsers();
        return users.find(user => user.id === id);
    }

    static addUser(user: IUsuario): void {
        const users = UsuariosApiService.getUsers();
        users.push(user);
        localStorage.setItem(UsuariosApiService.key, JSON.stringify(users));
    }

    static updateUser(user: IUsuario): void {
        const users = UsuariosApiService.getUsers();
        const index = users.findIndex(u => u.id === user.id);
        if (index !== -1) {
            users[index] = user;
            localStorage.setItem(UsuariosApiService.key, JSON.stringify(users));
        }
    }

    static deleteUser(id: number): void {
        let users = UsuariosApiService.getUsers();
        users = users.filter(user => user.id !== id);
        localStorage.setItem(UsuariosApiService.key, JSON.stringify(users));
    }
}
