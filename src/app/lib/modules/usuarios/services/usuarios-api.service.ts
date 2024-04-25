import { Injectable } from "@angular/core";
import { v4 as uuid } from 'uuid';

interface IUsuario  {
    id: string;
    nome: string;
    email: string; 
};

export class UsuariosApiService {
    private static key: string = 'users';

    static getUsers(): IUsuario[] {
        const data = localStorage.getItem(UsuariosApiService.key);
        return data ? JSON.parse(data) : [];
    }

    static getUserById(id: string): IUsuario | undefined {
        const users = UsuariosApiService.getUsers();
        return users.find(user => user.id === id);
    }

    static addUser(user: IUsuario): void {
        const userUuid = uuid();
        user.id = userUuid;
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

    static deleteUser(id: string): void {
        let users = UsuariosApiService.getUsers();
        users = users.filter(user => user.id !== id);
        localStorage.setItem(UsuariosApiService.key, JSON.stringify(users));
    }
}
