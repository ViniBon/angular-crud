import { Injectable } from "@angular/core";
import { v4 as uuid } from 'uuid';
import { SituacaoUsuario } from "../enums/situacao-usuario.enum";

export interface IUsuario  {
    identificador: number;
    id: string;
    nomeCompleto: string;
    nome: string;
    sobrenome: string;
    usuario: string;
    telefone: number;
    email: string;
    dataNasc: string; 
    status: SituacaoUsuario;
};

@Injectable()
export class UsuariosApiService {
    private static key: string = 'users';

    getUsers(): IUsuario[] {
        const data = localStorage.getItem(UsuariosApiService.key);
        return data ? JSON.parse(data) : [];
    }

    getUserById(id: string): IUsuario | undefined {
        const users = this.getUsers();
        return users.find(user => user.id === id);
    }

    addUser(user: IUsuario): void {
        const userUuid = uuid();
        user.id = userUuid;
        user.nomeCompleto = (user.nome).toLowerCase()+ ' ' + (user.sobrenome).toLowerCase()

        const users = this.getUsers();
        users.push(user);
        localStorage.setItem(UsuariosApiService.key, JSON.stringify(users));
    }

    updateUser(user: IUsuario): void {
        const users = this.getUsers();
        const index = users.findIndex(u => u.id === user.id);
        if (index !== -1) {
            users[index] = user;
            localStorage.setItem(UsuariosApiService.key, JSON.stringify(users));
        }
    }

    deleteUser(id: string): void {
        let users = this.getUsers();
        users = users.filter(user => user.id !== id);
        localStorage.setItem(UsuariosApiService.key, JSON.stringify(users));
    }
}
