import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  PoDialogService, PoNotificationService, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { UsuariosApiService } from '../../services/usuarios-api.service';
import { forkJoin } from 'rxjs';

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
      action: (row: any) =>  this.router.navigate(["/editar/", row.id, "editar"])
    },
    {
      label: 'Ver Detalhes',
      action: (row: any) =>   this.router.navigate(["/detalhes/", row.id, "detalhes"])
    },
    {
      label: 'Excluir',
      action: (row: any) =>  this.deleteRow(row.id) //this.router.navigate(["/groups/", row.id, "excluir"])
    }
  ];

  public tableColumns: PoTableColumn[] = [
    { label: 'Nome', property: 'nome' },
    { label: 'Email', property: 'email' },
  ]

  constructor( 
    private router: Router,
    private readonly usuariosApiService: UsuariosApiService, 
    private poDialog: PoDialogService,
    private notification: PoNotificationService
  ){
      UsuariosApiService.initialize();
  }

  ngOnInit(): void {
    this.init();
  }

  private init(): void {
    this.isBusy = true;
    setInterval(() => {
      this.isBusy = false
      this.tableItems = UsuariosApiService.getUsers();
    }, 4000)
  }

  private deleteRow(id: number): void {
    console.log(id)
    this.poDialog.confirm({
      title: "Excluir usuário",
      message: "Confirma a exclusão do respectivo usuário?",
      confirm: async () => {
        this.isBusy = true;
        const observers = [];
        observers.push(UsuariosApiService.deleteUser(id));
        this.notification.success('Usuário excluído com sucesso!');
        this.init();
        complete: () => this.isBusy = false
      }
    });
  }
}
