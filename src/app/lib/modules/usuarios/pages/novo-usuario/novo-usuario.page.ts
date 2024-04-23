import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PoBreadcrumb, PoInputComponent, PoPageAction } from '@po-ui/ng-components';

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
    private activateRoute: ActivatedRoute
  ){
  }
  
  actions: Array<PoPageAction> = [
    {
      label: 'Salvar',
      type: 'primary',
      action: () => this.salvarUsuario(this.form.value)
    },
    {
      label: 'Cancelar',
      type: 'Default',
      action: () => this.cancelarCadastro()
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

  novoUsuario() {
    void this.router.navigate(['novo-usuario'], { relativeTo: this.activateRoute });
  }

  salvarUsuario(form: UntypedFormGroup): void {
    if(this.validateFields() === false){
      return
    }
    console.log(form)
  }

  cancelarCadastro(): void {

  }

}
