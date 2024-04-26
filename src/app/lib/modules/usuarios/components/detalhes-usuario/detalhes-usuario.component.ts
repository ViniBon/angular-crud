import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  PoDialogService, PoNotificationService } from '@po-ui/ng-components';
import { UsuariosApiService } from '../../services/usuarios-api.service';

@Component({
  selector: 'detalhes-usuario',
  templateUrl: './detalhes-usuario.component.html',
  providers: [UsuariosApiService]
})
export class DetalhesUsuarioComponent implements OnInit {
  
  @Input() usuarioRegistro: any;

  constructor( 
    private router: Router,
    private route: ActivatedRoute,
    private readonly usuariosApiService: UsuariosApiService, 
    private poDialog: PoDialogService,
    private notification: PoNotificationService
  ){

  }

  ngOnInit(): void {

  }


}
