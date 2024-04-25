import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PoBreadcrumb, PoInputComponent, PoNotificationService, PoPageAction } from '@po-ui/ng-components';
import { UsuariosApiService } from '../../services/usuarios-api.service';
import { SituacaoUsuario } from '../../enums/situacao-usuario.enum';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.page.html',
  providers: [UsuariosApiService]
})
export class NovoUsuarioPage implements OnInit {

  
  @ViewChild('inputNome', { static: true })
  inputNome: PoInputComponent | any;

  @ViewChild('inputNome', { static: true })
  inputSobrenome: PoInputComponent | any;

  @ViewChild('inputNome', { static: true })
  inputTelefone: PoInputComponent | any;

  @ViewChild('inputNome', { static: true })
  inputEmail: PoInputComponent | any;

  @ViewChild('inputNome', { static: true })
  inputDataNasc: PoInputComponent | any;

  public form: UntypedFormGroup = this.criarFormulario();
  public selectedOption: any;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private readonly usuariosApiService: UsuariosApiService, 
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
  
  get sobrenomeUsuario(): string {
    return this.form.get('sobrenome')?.value || '';
  }

  get telefoneUsuario(): string {
    return this.form.get('telefone')?.value || '';
  }

  get dataNascUsuario(): string {
    return this.form.get('dataNasc')?.value || '';
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
        Validators.minLength(3),
      ]),
      sobrenome: new UntypedFormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      telefone: new UntypedFormControl(null, [
        Validators.required,
        Validators.minLength(2),
      ]),
      email: new UntypedFormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.email,
      ]),
      dataNasc: new UntypedFormControl(null, [
        Validators.required,
        Validators.minLength(2),
      ]),
    });
  }


  validateFields(): boolean {
    if (this.form) {
      let formKeys = Object.keys(this.form.value);
      let inputs = [this.inputNome, this.inputSobrenome, this.inputTelefone, this.inputEmail, this.inputDataNasc];
        
      formKeys.forEach(key => {
        const formInput = this.form.get(key);
        if (formInput) {
          inputs.forEach( input => {
            if(input.validate(key)){
              formInput.markAsTouched();
              formInput.markAsDirty();
              formInput.updateValueAndValidity();
            }
          })
        }
      });
      return this.form.valid;
    }
    return false;
  }

  validateData(formData: any): boolean{
    let usersCheckEqualData = this.usuariosApiService.getUsers();
    let isEqual = usersCheckEqualData.map(user => {
      if(user.nome === formData.nome || user.email === formData.email){
        return false;
      }
      return;
    });
    if(isEqual.filter( (condition) =>  condition === false).length >= 1){
      this.notification.warning('Há campos inválidos ou já há registros com esses dados!');
      return false;
    }
    return true;
  }

  salvarUsuario(form: any, path: string): void {
    if(this.validateFields() === false){
      return; 
    }
    if (this.validateData(form) === false) {
      return
    }else{
      form.nomeCompleto;
      form.status = SituacaoUsuario.COMUM;
      this.usuariosApiService.addUser(form);
      this.notification.success('Usuário incluído com sucesso!');
      void this.router.navigate([path], { relativeTo: this.activateRoute });
    }
  }

  cancelarCadastro(path: string): void {
    void this.router.navigate([path], { relativeTo: this.activateRoute });
  }
}
