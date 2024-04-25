import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PoBreadcrumb, PoInputComponent, PoNotificationService, PoPageAction } from '@po-ui/ng-components';
import { UsuariosApiService } from '../../services/usuarios-api.service';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.page.html',
})
export class NovoUsuarioPage implements OnInit {

  @ViewChild('inputNome', { static: true })
  inputNome!: PoInputComponent;

  public form: UntypedFormGroup = this.criarFormulario();

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    //private readonly usuariosApiService: UsuariosApiService, 
    private notification: PoNotificationService
  ){
  }
  
  actions: Array<PoPageAction> = [
    {
      label: 'Salvar',
      type: 'primary',
      action: () => this.salvarUsuario(this.form.value, '/usuarios')
    },
    {
      label: 'Cancelar',
      type: 'Default',
      action: () => this.cancelarCadastro('/usuarios')
    },
  ];

  breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Inicio', link: '/' },
      { label: 'Usuarios', link: '/usuarios' },
      { label: 'Novo Usuario', link: '/novo-usuario' },
    ],
  };

  get nomeUsuario(): string {
    return this.form.get('nome')?.value || '';
  }
  
  get emailUsuario(): string {
    return this.form.get('email')?.value || '';
  }


  public get titulo(): string {
    return 'Novo Usuário';//`${this.global.i18n.literals.bemVindo}, ${this.nomeUsuario}`;
  }

  ngOnInit(): void {
    //this.buscarIndicador();
  }

 
  criarFormulario(): UntypedFormGroup {
    return new UntypedFormGroup({
      nome: new UntypedFormControl(null, [
        Validators.required,
        Validators.minLength(2),
      ]),
      email: new UntypedFormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.email,
      ]),
    });
  }


  validateFields(): boolean {
    if (this.form) {
      let formKeys = Object.keys(this.form.value);
        
      formKeys.forEach(value => {
        const formInput = this.form.get(value);
        if (formInput) {
          if (this.inputNome.validate(formInput)) {
            formInput.markAsTouched();
            formInput.markAsDirty();
            formInput.updateValueAndValidity();
          }
        }
      });
      
      return this.form.valid;
    }
    return false;
  }

  salvarUsuario(form: any, path: string): void {
    if(this.validateFields() === false){
      return; 
    }
    let usersCheckEqualData = UsuariosApiService.getUsers();
    let isEqual = usersCheckEqualData.map(user => {
      if(user.nome === form.nome || user.email === form.email){
        return false;
      }
      return;
    });
    if(isEqual.filter( (condition) =>  condition === false).length >= 1){
      this.notification.warning('Há campos inválidos ou já há registros com esses dados!')
    }else{
      UsuariosApiService.addUser(form);
      this.notification.success('Usuário incluído com sucesso!');
      void this.router.navigate([path], { relativeTo: this.activateRoute });
    }
  }

  cancelarCadastro(path: string): void {
    void this.router.navigate([path], { relativeTo: this.activateRoute });
  }
}
