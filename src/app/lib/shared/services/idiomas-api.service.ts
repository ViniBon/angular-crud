import { Injectable } from "@angular/core";
import { IdiomasEnum } from "../enums/idiomas.enum";


export interface IIdioma  {
    idioma: IdiomasEnum;
    situacao: boolean;
};

@Injectable()
export class IdiomasApiService {
    private static nomeTabela: string = 'idiomas';

    initialize(): void{
        if(localStorage.getItem('idiomas')){
            return
        }else{
            const idiomas = [
                { idioma: IdiomasEnum.ingles , situacao: false},
                { idioma: IdiomasEnum.portugues , situacao: true }
            ];
            localStorage.setItem(IdiomasApiService.nomeTabela, JSON.stringify(idiomas));
        }
    }

    getIdiomas(): IIdioma[] {
        try{
            const dados = localStorage.getItem(IdiomasApiService.nomeTabela);
            return dados ? JSON.parse(dados) : [];
        }catch (erro){
            console.error('Erro ao buscar idiomas no local storage:', erro);
            return []
        }
        
    }

    getCurrentIdioma(): string | undefined {
        try{
            const dados: any = localStorage.getItem(IdiomasApiService.nomeTabela)
            const dadosTratados = JSON.parse(dados);
            const idioma = dadosTratados.filter( (dado: any) => dado.situacao === true && dado.idioma === 'ingles' ? 'ingles' : 'portugues');
            return idioma;
        }catch (erro){
            console.error('Erro ao buscar idioma no local storage:', erro);
            return 
        }  
    }

    updateUsuario(idiomaAtivado: IIdioma): void {
        const idiomas = this.getIdiomas();
        const indexIdiomaDesativar = idiomas.findIndex(idioma => idioma.situacao !== idiomaAtivado.situacao);
        const indexIdiomaAtivar = idiomas.findIndex(idioma => idioma.situacao === idiomaAtivado.situacao);
        
        const idiomaDesativar = [...idiomas];
        idiomaDesativar[indexIdiomaDesativar].situacao = false;
        
        const idiomaAtivar = [...idiomas];
        idiomaAtivar[indexIdiomaAtivar].situacao = false;

        const updatedIdiomas = [idiomaAtivar, idiomaDesativar];
        try {
            localStorage.setItem(IdiomasApiService.nomeTabela, JSON.stringify(updatedIdiomas));
        } catch (erro) {
            console.error('Erro ao atualizar idioma no local storage:', erro);
        }
    }
}
