import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GeralService } from 'src/app/service/geral.service';
import { ActivatedRoute } from '@angular/router';
import { Empresa } from 'src/app/model/empresa/empresa';

@Component({
  selector: 'app-create-empresa',
  templateUrl: './create-empresa.component.html',
  styleUrls: ['./create-empresa.component.scss']
})
export class CreateEmpresaComponent implements OnInit{
  formularioEmpresa:FormGroup
  idDaUrl : number = 0
  empresa: Empresa[]=[]
  idEmpresaEditada : number = 0
  modalAberto: boolean = false;
  idDaEdicao: number = 0;
  edicaoEmpresa: boolean = false;

constructor(
  private api:GeralService,
  private rotaAtiva: ActivatedRoute,
){
  this.formularioEmpresa = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    logo: new FormControl('', [Validators.required]),
  })
}
  ngOnInit(): void {
    this.idDaUrl = Number(this.rotaAtiva.snapshot.params['id'])
    this.pegaEmpresas()
  }
  pegaEmpresas(): void{
    this.api.getEmpresas().subscribe( (empresas) => {
      this.empresa = empresas
    })
  }
  deletarEmpresa(id: number): void {
    this.api.deleteEmpresa(id).subscribe((respApi) => {
      this.pegaEmpresas()
    })
  }
  editarEmpresa():void {
    let empresaAtualizada = new Empresa()
    empresaAtualizada.id = this.idDaEdicao
    empresaAtualizada.nome = this.formularioEmpresa.value.nome
    empresaAtualizada.logo= this.formularioEmpresa.value.logo

    this.api.putEditaEmpresa( empresaAtualizada).subscribe( (data) => {
      alert('Postagem criada!')
      this.modalAberto=false
      this.pegaEmpresas()
    })
   }
   
  criaEmpresa():void{
    let empresaNova = new Empresa()
    empresaNova.nome = this.formularioEmpresa.value.nome
    empresaNova.logo= this.formularioEmpresa.value.logo

    this.api.CriarNovaEmpresa( empresaNova ).subscribe( (data) => {
      alert('Postagem criada!')
    })
   
  }
  abreModalEditar(id : number): void {
    this.api.getEmpresaPorId(id).subscribe((respApi) =>{
      this.formularioEmpresa.controls['nome'].setValue(respApi.nome)
      this.formularioEmpresa.controls['logo'].setValue(respApi.logo)
      
      this.idDaEdicao = id
      this.edicaoEmpresa = true
      this.modalAberto = true
    })
  }
  fechaModal(): void {
    this.modalAberto = false
  }
}
