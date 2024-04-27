import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  PoDialogService, PoNotificationService, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { UsuariosApiService } from '../../services/usuarios-api.service';
import { StatusUsuario } from '../../enums/status-usuario.enum';

@Component({
  selector: 'grid-usuarios',
  templateUrl: './grid-usuarios.component.html',
  providers: [UsuariosApiService]
})
export class GridUsuariosComponent implements OnInit {

  public carregando: boolean = false;
  public itensTabela: any;

  public readonly acoesTabela: Array<PoTableAction> = [
    {
      label: 'Editar',
      action: (row: any) =>  this.router.navigate(['novo-usuario'], { relativeTo: this.route, queryParams: row}),
    },
    {
      label: 'Ver Detalhes',
      action: (row: any) => this.router.navigate(['detalhes-usuario'], { relativeTo: this.route, queryParams: (row) }),
    },
    {
      label: 'Excluir',
      action: (row: any) =>  this.deleteRow(row.id),
    }
  ];

  public colunasTabela: PoTableColumn[] = [
    { label: 'Nome completo', property: 'nomeCompleto' },
    { label: 'Email', property: 'email' },
    {
      property: 'status',
      type: 'label',
      label: 'Status',
      width: '5%',
      labels: [
        {
          value: StatusUsuario.COMUM!,
          color: 'color-11',
          label: 'Comum',
          textColor: 'white',
        },
        {
          value: StatusUsuario.ADMIN,
          color: 'color-08',
          label: 'Admin',
          textColor: 'white',
        }
      ]
    },
  ];

  constructor( 
    private router: Router,
    private route: ActivatedRoute,
    private readonly usuariosApiService: UsuariosApiService, 
    private poDialog: PoDialogService,
    private notificacao: PoNotificationService,
  ){  }

  ngOnInit(): void {
    this.init();
  }

  private init(): void {
    this.carregando = true;
    setTimeout(() => {
      this.carregando = false
      this.itensTabela = this.usuariosApiService.getUsuarios();
    }, 2000)
  }

  private deleteRow(id: string): void {
    this.poDialog.confirm({
      title: "Excluir usuário",
      message: "Confirma a exclusão do respectivo usuário?",
      confirm: async () => {
        this.carregando = true;
        const observers = [];
        observers.push(this.usuariosApiService.deleteUsuario(id));
        this.notificacao.success('Usuário excluído com sucesso!');
        this.init();
        complete: () => this.carregando = false
      }
    });
  }
}
