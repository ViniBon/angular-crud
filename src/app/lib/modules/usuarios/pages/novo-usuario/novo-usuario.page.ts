import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PoBreadcrumb, PoDialogService, PoInputComponent, PoNotificationService, PoPageAction, PoSearchComponent, PoSelectComponent, PoSelectOption } from '@po-ui/ng-components';
import { UsuariosApiService } from '../../services/usuarios-api.service';
import { checarValidadeData } from '../../../../shared/utils/check-date-validity.utils';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.page.html',
  providers: [UsuariosApiService]
})
export class NovoUsuarioPage implements OnInit {

  @ViewChild('inputNome', { static: true })
  inputNome: PoInputComponent | any;

  @ViewChild('inputSobrenome', { static: true })
  inputSobrenome: PoInputComponent | any;

  @ViewChild('inputEmail', { static: true })
  inputTelefone: PoInputComponent | any;

  @ViewChild('inputTelefone', { static: true })
  inputEmail: PoInputComponent | any;

  @ViewChild('inputDataNasc', { static: true })
  inputDataNasc: PoInputComponent | any;

  @ViewChild('selectStatus', { static: true })
  selectDataNasc: PoSelectComponent | any;

  public form: UntypedFormGroup = this.criarFormulario();
  public usuarioRegistro: any;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private readonly usuariosApiService: UsuariosApiService, 
    private notificacao: PoNotificationService,
    private poDialog: PoDialogService,
  ){
  }

  acoes: Array<PoPageAction> = []
  
  normalAcoes: Array<PoPageAction> = [
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

  editarAcoes: Array<PoPageAction> = [
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
      { label: 'Início', link: '/' },
      { label: 'Usuários', link: '/usuarios' },
      { label: 'Novo usuario', link: '/novo-usuario' },
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
    if (this.usuarioRegistro.id === undefined) {
      this.acoes = this.normalAcoes;
    }else{
      this.acoes = this.editarAcoes ;
      this.breadcrumb.items.pop();
      this.breadcrumb.items.push({ label: 'Editar usuário', link: '/novo-usuario' })
    }
  
  }

  private criarFormulario(): UntypedFormGroup {
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
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      status: new UntypedFormControl(null, [
        Validators.required,
      ]),
    });
  }

  private salvarUsuario(form: any, path: string): void {
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
          this.usuariosApiService.addUsuario(form);
          this.notificacao.success('Usuário incluído com sucesso!'); 
          void this.router.navigate([path], { relativeTo: this.activateRoute });
        }
      });     
    }
  }

  private editarUsuario(form: any, path: string): void{
    if (this.validarDados(form, true) === false) {
      return
    }else{
      this.poDialog.confirm({
        title: "Salvar edição",
        message: "Deseja salvar a edição do usuário?",
        confirm: async () => {
          form.id = this.usuarioRegistro.id;
          form.identificador = this.usuarioRegistro.identificador;  
          this.usuariosApiService.updateUsuario(form);
          this.notificacao.success('Edição efetuada com sucesso!'); 
          void this.router.navigate([path], { relativeTo: this.activateRoute });
        }
      });     
    }
  }

  private cancelarCadastro(path: string): void {
    void this.router.navigate([path], { relativeTo: this.activateRoute });
  }

  public validarCampos(): boolean {
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

  private validarDados(formData: any, isEdicao?: boolean): boolean{
    let telefoneConvertido = Number(formData.telefone);
    if (Number.isNaN(telefoneConvertido)) {
      this.notificacao.warning('Há campos inválidos!');
      return false
    }

    if (formData.status === null) {
      this.notificacao.warning('Há campos inválidos!');
      return false
    }

    if(!checarValidadeData(formData.dataNasc)){
      this.notificacao.warning('Há campos inválidos!');
      return false
    }

    if(!isEdicao){
      let checarDadosIguais = this.usuariosApiService.getUsuarios();
      let isIgual = checarDadosIguais.map(usuario => {
        if(usuario.nome === formData.nome || usuario.email === formData.email){
          return false;
        }
        return;
      });
      if(isIgual.filter( (condicao) =>  condicao === false).length >= 1){
        this.notificacao.warning('Há campos inválidos ou já há registros com esses dados!');
        return false;
      }
    }
    return true;
  }
}
