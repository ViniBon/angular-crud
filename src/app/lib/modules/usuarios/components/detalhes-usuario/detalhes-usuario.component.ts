import { Component, Input, OnInit } from '@angular/core';
import { IUsuario, UsuariosApiService } from '../../services/usuarios-api.service';
import { formatarNumeroTelefone } from '../../../../shared/utils/telephone-mask.utils';
import { formatarData } from '../../../../shared/utils/date-mask.utils';

@Component({
  selector: 'detalhes-usuario',
  templateUrl: './detalhes-usuario.component.html',
  providers: []
})
export class DetalhesUsuarioComponent implements OnInit {
  
  @Input() usuarioRegistro: any;

  public telefoneComMascara!: string;
  public dataNascComMascara!: string;
  public nomeFormatado!: string;
  public sobrenomeFormatado!: string;

  constructor( ){  }

  ngOnInit(): void {
    this.formatarRegistros(this.usuarioRegistro)
  }

  private formatarRegistros(data: IUsuario): void{
    this.telefoneComMascara = formatarNumeroTelefone(data.telefone);
    this.dataNascComMascara = formatarData(data.dataNasc);
    this.nomeFormatado = data.nome.toLowerCase();
    this.sobrenomeFormatado = data.sobrenome.toLowerCase();
  }
}
