import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PoBreadcrumb, PoDialogService, PoInputComponent, PoNotificationService, PoPageAction, PoSearchComponent, PoSelectComponent, PoSelectOption } from '@po-ui/ng-components';
import { UsuariosApiService } from '../../services/usuarios-api.service';
import { SituacaoUsuario } from '../../enums/situacao-usuario.enum';
import { isValidDate } from '../../../../shared/utils/check-date.utils';

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

  @ViewChild('selectStatus', { static: true })
  selectDataNasc: PoSelectComponent | any;

  public form: UntypedFormGroup = this.criarFormulario();
  public usuarioRegistro: any;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private readonly usuariosApiService: UsuariosApiService, 
    private notification: PoNotificationService,
    private poDialog: PoDialogService,
  ){
  }

  actions: Array<PoPageAction> = []
  
  normalActions: Array<PoPageAction> = [
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

  editActions: Array<PoPageAction> = [
    {
      label: 'Salvar edição',
      type: 'primary',
      action: () => this.editarUsuario(this.form.value, '/usuarios')
    },
    {
      label: 'Cancelar',
      type: 'Default',
      action: () => this.cancelarCadastro('/usuarios')
    },
  ]

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

  get statusUsuario(): string {
    return this.form.get('status')?.value || '';
  }


  public get titulo(): string {
    return 'Novo Usuário';//`${this.global.i18n.literals.bemVindo}, ${this.nomeUsuario}`;
  }

  ngOnInit(): void {
    this.usuarioRegistro = this.activateRoute.snapshot.queryParams;
    console.log(this.usuarioRegistro.id === undefined)
    if (this.usuarioRegistro.id === undefined) {
      this.actions = this.normalActions;
    }else{
      this.actions = this.editActions;
    }
  
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
        Validators.minLength(10),
        Validators.maxLength(11),
      ]),
      email: new UntypedFormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.email,
      ]),
      dataNasc: new UntypedFormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8),
      ]),
      status: new UntypedFormControl(null, [
        Validators.required,
      ]),
    });
  }


  validarCampos(): boolean {
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

  validarDados(formData: any, isEdicao?: boolean): boolean{
    let telefoneConvertido = Number(formData.telefone);
    let dataNascConvertido = Number(formData.dataNasc);
    if (Number.isNaN(telefoneConvertido) || Number.isNaN(dataNascConvertido)) {
      this.notification.warning('Há campos inválidos!');
      return false
    }

    if (formData.status === null) {
      this.notification.warning('Há campos inválidos!');
      return false
    }

    if(!isValidDate(formData.dataNasc)){
      this.notification.warning('Há campos inválidos!');
      return false
    }

    if(!isEdicao){
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
    }
    return true;
  }

  salvarUsuario(form: any, path: string): void {
    if(this.validarCampos() === false){
      return; 
    }
    if (this.validarDados(form) === false) {
      return
    }else{
      this.poDialog.confirm({
        title: "Salvar usuário",
        message: "Deseja salvar o usuário?",
        confirm: async () => {
          form.nomeCompleto;
          this.usuariosApiService.addUser(form);
          this.notification.success('Usuário incluído com sucesso!'); 
          void this.router.navigate([path], { relativeTo: this.activateRoute });
        }
      });     
    }
  }

  editarUsuario(form: any, path: string): void{
    console.log(form)
   
    if (this.validarDados(form, true) === false) {
      return
    }else{
      this.poDialog.confirm({
        title: "Salvar edição",
        message: "Deseja salvar a edição do usuário?",
        confirm: async () => {
          form.id = this.usuarioRegistro.id;
          form.identificador = this.usuarioRegistro.identificador;  
          this.usuariosApiService.updateUser(form);
          this.notification.success('Edição efetuada com sucesso!'); 
          void this.router.navigate([path], { relativeTo: this.activateRoute });
        }
      });     
    }
  }

  cancelarCadastro(path: string): void {
    void this.router.navigate([path], { relativeTo: this.activateRoute });
  }
}
