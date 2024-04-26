import { Injectable } from "@angular/core";
import { v4 as uuid } from 'uuid';
import { SituacaoUsuario } from "../enums/situacao-usuario.enum";
import { generateIdentifier } from "../../../shared/utils/generate-identificator.utils";

export interface IUsuario  {
    identificador: string;
    id: string;
    nomeCompleto: string;
    nome: string;
    sobrenome: string;
    usuario: string;
    telefone: number;
    email: string;
    dataNasc: number; 
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
        user.identificador = generateIdentifier();
        user.nomeCompleto = (user.nome).toLowerCase()+ ' ' + (user.sobrenome).toLowerCase()

        const users = this.getUsers();
        users.push(user);
        localStorage.setItem(UsuariosApiService.key, JSON.stringify(users));
    }

    updateUser(user: IUsuario): void {
        user.nomeCompleto = (user.nome).toLowerCase()+ ' ' + (user.sobrenome).toLowerCase()
        const users = this.getUsers();
        const index = users.findIndex(u => u.id === user.id);
        console.log(index)
        
        if (index !== -1) {
            // Create a new array with the updated user
            const updatedUsers = [...users];
            updatedUsers[index] = user;
            
            try {
                // Update local storage
                localStorage.setItem(UsuariosApiService.key, JSON.stringify(updatedUsers));
            } catch (error) {
                console.error('Error updating user in local storage:', error);
            }
        } else {
            console.error('User not found with ID:', user.id);
        }
    }

    deleteUser(id: string): void {
        let users = this.getUsers();
        users = users.filter(user => user.id !== id);
        localStorage.setItem(UsuariosApiService.key, JSON.stringify(users));
    }
}
