import { Injectable } from "@angular/core";
import { v4 as uuid } from 'uuid';
import { StatusUsuarioEnum } from "../enums/status-usuario.enum";
import { gerarIdentificador } from "../../../shared/utils/generate-identificator.utils";

export interface IUsuario  {
    identificador: string;
    id: string;
    nomeCompleto: string;
    nome: string;
    sobrenome: string;
    usuario: string;
    telefone: string;
    email: string;
    dataNasc: string; 
    status: StatusUsuarioEnum;
};

@Injectable()
export class UsuariosApiService {
    private static nomeTabela: string = 'Usuarios';

    getUsuarios(): IUsuario[] {
        try{
            const dados = localStorage.getItem(UsuariosApiService.nomeTabela);
            return dados ? JSON.parse(dados) : [];
        }catch (erro){
            console.error('Erro ao buscar usuários no local storage:', erro);
            return []
        }
    }

    getUserById(id: string): IUsuario | undefined {
        try{
            const usuarios = this.getUsuarios();
            return usuarios.find(user => user.id === id);
        }catch (erro){
            console.error('Erro ao buscar usuário no local storage:', erro);
            return 
        }
    }

    addUsuario(usuario: IUsuario): void {
        const usuarioUuid = uuid();
        usuario.id = usuarioUuid;
        usuario.identificador = gerarIdentificador();
        usuario.nomeCompleto = (usuario.nome).toLowerCase()+ ' ' + (usuario.sobrenome).toLowerCase()

        try{
            const usuarios = this.getUsuarios();
            usuarios.push(usuario);
            localStorage.setItem(UsuariosApiService.nomeTabela, JSON.stringify(usuarios));
        }catch (erro){
            console.error('Erro ao adicionar usuário no local storage:', erro);
        }
    }

    updateUsuario(usuario: IUsuario): void {
        usuario.nomeCompleto = (usuario.nome).toLowerCase()+ ' ' + (usuario.sobrenome).toLowerCase()
        const usuarios = this.getUsuarios();
        const index = usuarios.findIndex(u => u.id === usuario.id);
        
        if (index !== -1) {
            const updatedUsuarios = [...usuarios];
            updatedUsuarios[index] = usuario;
            try {
                localStorage.setItem(UsuariosApiService.nomeTabela, JSON.stringify(updatedUsuarios));
            } catch (erro) {
                console.error('Erro ao atualizar usuário no local storage:', erro);
            }
        } else {
            console.error('Usuário não encontrado com ID:', usuario.id);
        }
    }

    deleteUsuario(id: string): void {
        let usuarios = this.getUsuarios();
        usuarios = usuarios.filter(usuario => usuario.id !== id);

        try{
            localStorage.setItem(UsuariosApiService.nomeTabela, JSON.stringify(usuarios));
        }catch (erro){
            console.error('Erro ao deletar usuário no local storage:', erro);
        }
    }
}
