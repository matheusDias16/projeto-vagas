import { Component, OnInit } from '@angular/core';
import { GeralService } from 'src/app/service/geral.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Vagas } from 'src/app/model/vagas/vagas';
import { Salario } from 'src/app/model/vagas/salario';
import { Local } from 'src/app/model/vagas/local';
import { Expediente } from 'src/app/model/vagas/expediente';
import { Empresa } from 'src/app/model/empresa/empresa';
import { Categorias } from 'src/app/model/categorias/categorias';
import { Questionario } from 'src/app/model/vagas/questionario';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  formVagas: FormGroup
  salario: Salario[] = [{ min: 0, max: 0 }]
  lugar: Local[] = [{ estado: '', cidade: '' }]
  expediente: Expediente[] = []
  empresa: Empresa[] = []
  categoria: Categorias[] = []

  questionario: Questionario[] = []

  constructor(
    private api: GeralService
  ) {
    this.formVagas = new FormGroup({
      vaga: new FormControl('', [Validators.required]),
      empresa: new FormControl('', [Validators.required]),
      categoria: new FormControl('', [Validators.required]),
      min: new FormControl('', [Validators.required]),
      max: new FormControl('', [Validators.required]),
      quantidade: new FormControl('', [Validators.required]),
      estado: new FormControl('', [Validators.required]),
      cidade: new FormControl('', [Validators.required]),
      publicacao: new FormControl('', [Validators.required]),
      descricao: new FormControl('', [Validators.required]),
      dias: new FormControl('', [Validators.required]),
      inicio: new FormControl('', [Validators.required]),
      fim: new FormControl('', [Validators.required]),
      contratacao: new FormControl('', [Validators.required]),
      infosAdicionais: new FormControl('', [Validators.required]),
    })
  }
  ngOnInit(): void {
    this.pegaEmpresas()
    this.pegaCategorias()
  }
  pegaCategorias(): void {
    this.api.getCategorias().subscribe((categorias) => {
      this.categoria = categorias
    })
  }
  pegaEmpresas(): void {
    this.api.getEmpresas().subscribe((empresas) => {
      this.empresa = empresas
    })
  }
  criaVaga(): void {
    let vagaNova = new Vagas()
    let data = new Date()
    vagaNova.vaga = this.formVagas.value.vaga
    vagaNova.empresa = Number(this.formVagas.value.empresa)
    vagaNova.categoria = Number(this.formVagas.value.categoria)
    vagaNova.salario.min = this.formVagas.value.min
    vagaNova.salario.max = this.formVagas.value.max
    vagaNova.quantidade = this.formVagas.value.quantidade
    vagaNova.publicacao = data.toISOString()
    vagaNova.descricao = this.formVagas.value.descricao
    vagaNova.expediente.dias = this.formVagas.value.dias
    vagaNova.expediente.inicio = this.formVagas.value.inicio
    vagaNova.expediente.fim = this.formVagas.value.fim
    vagaNova.contratacao = this.formVagas.value.contratacao
    vagaNova.infosAdicionais = this.formVagas.value.infosAdicionais
    vagaNova.local.cidade = this.formVagas.value.cidade
    vagaNova.local.estado = this.formVagas.value.estado


    console.log(this.questionario)

    for(let quest of this.questionario){
      let novaPergunta = quest
      novaPergunta.alternativas = novaPergunta.alternativas[0].split(',')
      vagaNova.questionario.push(novaPergunta)
    }

    console.log(vagaNova.questionario)

    this.api.criarVaga(vagaNova).subscribe((data) => {
      alert('Postagem criada!')
    })
  }

  criaPergunta(): void{
    let novaPergunta = new Questionario()
    this.questionario.push(novaPergunta)
  }

}