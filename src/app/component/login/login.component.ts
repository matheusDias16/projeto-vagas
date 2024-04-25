import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { GeralService } from 'src/app/service/geral.service';
import { Usuarios } from 'src/app/model/login/usuarios';
import { FazerLogin } from 'src/app/model/login/fazer-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  sign: boolean = false

  formLogin = new FormGroup({
    user: new FormControl('', [Validators.required]),
    pass: new FormControl('', [Validators.required])
  })
  formCadastro = new FormGroup({
    user: new FormControl('', [Validators.required]),
    pass: new FormControl('', [Validators.required]),
    nomeCompleto: new FormControl('', [Validators.required]),
  })


  constructor(
    private api: GeralService
  ) { }

  ngOnInit(): void {

  }

  fazLogin(): void {
    if (this.formLogin.value.user && this.formLogin.value.pass) {
      this.api.fazerLogin(this.formLogin.value.user, this.formLogin.value.pass).subscribe((respLogin) => {
        if (respLogin.length > 0) {
          console.log('LOGADO')
          localStorage.setItem('idUser', String(respLogin[0].idUsuario))
          this.api.getUsuarioPorId(respLogin[0].idUsuario).subscribe((respUsuario) => {
            localStorage.setItem('nameUser', String(respUsuario.nomeCompleto))
            localStorage.setItem('typeUser', respUsuario.tipo)
          })
        } else {
          console.log('FALHA NO LOGIN')
        }
      })
    }
  }
  mostraCadastro(): void {
    if (this.sign) {
      this.sign = false
    } else {
      this.sign = true
    }
  }
  criarCadastro(): void {
    let cadastro = new Usuarios()
    if (this.formCadastro.value.user && this.formCadastro.value.pass && this.formCadastro.value.nomeCompleto ) {
      cadastro.username = this.formCadastro.value.user
      cadastro.tipo = 'cliente'
      cadastro.nomeCompleto = this.formCadastro.value.nomeCompleto
      this.api.postCriaUsuario(cadastro).subscribe((usuario) => {
        console.log('Usuario criado')

        let login = new FazerLogin()
        if (this.formCadastro.value.user && this.formCadastro.value.pass) {
          login.username = this.formCadastro.value.user
          login.senha = this.formCadastro.value.pass
          login.idUsuario = usuario.id
          this.api.postCriaLogin(login).subscribe(() => {
            alert('Login criado')
          })
        }
      })
    }
  }



}