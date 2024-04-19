import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PoBreadcrumb, PoPageAction } from '@po-ui/ng-components';
import { UsuariosApiService } from '../../services/usuarios-api.service';

@Component({
  selector: 'grid-usuarios',
  templateUrl: './grid-usuarios.component.html',
  providers: [UsuariosApiService]
})
export class GridUsuariosComponent implements OnInit {

  public gridGetAllData;

  constructor( 
    private router: Router,
    private readonly usuariosApiService: UsuariosApiService, ){
      UsuariosApiService.initialize();
      this.gridGetAllData = UsuariosApiService.getUsers();
      console.log(this.gridGetAllData)
  }

  columns = [
    { property: 'id', label: 'Código', align: 'right', readonly: true, freeze: true, width: 120 },
    { property: 'nome', label: 'Nome', width: 100, readonly: true, required: true },
    //{ property: 'occupation', label: 'Cargo', width: 150 },
    { property: 'email', label: 'E-mail', width: 100, readonly: true, required: true },
    //{ property: 'status', label: 'Status', align: 'center', readonly: true, width: 80 },
    //{ property: 'lastActivity', label: 'Última atividade', align: 'center', readonly: true, width: 140 }
  ];

  data = [
    {
      id: 629131,
      name: 'Jhonatas Silvano',
      occupation: 'Developer',
      email: 'jhonatas.silvano@po-ui.com.br',
      status: 'Active',
      lastActivity: '2018-12-12'
    },
    {
      id: 78492341,
      name: 'Rafael Gonçalvez',
      occupation: 'Engineer',
      email: 'rafael.goncalvez@po-ui.com.br',
      status: 'Active',
      lastActivity: '2018-12-10'
    },
    {
      id: 986434,
      name: 'Nicoli Pereira',
      occupation: 'Developer',
      email: 'nicoli.pereira@po-ui.com.br',
      status: 'Active',
      lastActivity: '2018-12-12'
    },
    {
      id: 4235652,
      name: 'Mauricio João Mendez',
      occupation: 'Developer',
      email: 'mauricio.joao@po-ui.com.br',
      status: 'Active',
      lastActivity: '2018-11-23'
    },
    {
      id: 629131,
      name: 'Leandro Oliveira',
      occupation: 'Engineer',
      email: 'leandro.oliveira@po-ui.com.br',
      status: 'Active',
      lastActivity: '2018-11-30'
    }
  ];
  

  public get titulo(): string {
    return 'Inicio';//`${this.global.i18n.literals.bemVindo}, ${this.nomeUsuario}`;
  }

  private nomeUsuario = '';




  ngOnInit(): void {

  }

  novoUsuario() {
    //void this.router.navigate(['novo-processo'], { relativeTo: this.activateRoute });
  }


}
