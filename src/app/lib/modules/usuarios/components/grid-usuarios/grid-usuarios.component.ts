import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  PoDialogService, PoNotificationService, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { UsuariosApiService } from '../../services/usuarios-api.service';
import { SituacaoUsuario } from '../../enums/situacao-usuario.enum';

@Component({
  selector: 'grid-usuarios',
  templateUrl: './grid-usuarios.component.html',
  providers: [UsuariosApiService]
})
export class GridUsuariosComponent implements OnInit {

  public isBusy: boolean = false;
  public tableItems: any;

  public readonly tableActions: Array<PoTableAction> = [
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

  public tableColumns: PoTableColumn[] = [
    { label: 'Nome completo', property: 'nomeCompleto' },
    { label: 'Email', property: 'email' },
    {
      property: 'status',
      type: 'label',
      label: 'Status',
      width: '5%',
      labels: [
        {
          value: SituacaoUsuario.COMUM!,
          color: 'color-11',
          label: 'Comum',
          textColor: 'white',
        },
        {
          value: SituacaoUsuario.ADMIN!,
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
    private notification: PoNotificationService,
  ){  }

  ngOnInit(): void {
    this.init();
  }

  private init(): void {
    this.isBusy = true;
    setInterval(() => {
      this.isBusy = false
      this.tableItems = this.usuariosApiService.getUsers();
    }, 4000)
  }

  private deleteRow(id: string): void {
    this.poDialog.confirm({
      title: "Excluir usuário",
      message: "Confirma a exclusão do respectivo usuário?",
      confirm: async () => {
        this.isBusy = true;
        const observers = [];
        observers.push(this.usuariosApiService.deleteUser(id));
        this.notification.success('Usuário excluído com sucesso!');
        this.init();
        complete: () => this.isBusy = false
      }
    });
  }
}
