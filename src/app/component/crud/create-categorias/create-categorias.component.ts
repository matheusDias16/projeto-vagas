import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GeralService } from 'src/app/service/geral.service';
import { ActivatedRoute } from '@angular/router';
import { Categorias } from 'src/app/model/categorias/categorias';

@Component({
  selector: 'app-create-categorias',
  templateUrl: './create-categorias.component.html',
  styleUrls: ['./create-categorias.component.scss']
})
export class CreateCategoriasComponent implements OnInit{
  formularioCategoria:FormGroup
  idDaUrl : number = 0
  modalAberto: boolean = false;
  categoria: Categorias[]=[]
  idCategoriaEditada : number = 0
  idDaEdicao: number = 0;
  edicaoCategoria: boolean = false;
  
  constructor(
    private api: GeralService,
    private rotaAtiva: ActivatedRoute,
  ){
    this.formularioCategoria= new FormGroup({
      icone: new FormControl('', [Validators.required]),
      categoria: new FormControl('', [Validators.required]),
    })
  }
  ngOnInit(): void {
    this.idDaUrl = Number(this.rotaAtiva.snapshot.params['id'])
    this.pegaCategorias()
  }
  pegaCategorias(): void{
    this.api.getCategorias().subscribe( (categorias) => {
      this.categoria = categorias
    })
  }
  deletarCategoria(id: number): void {
    this.api.deleteCategoria(id).subscribe((respApi) => {
      this.pegaCategorias()
    })
  }
  editaCategoria():void {
    let categoriaAtualizada = new Categorias()
    categoriaAtualizada.id = this.idDaEdicao
    categoriaAtualizada.icone = this.formularioCategoria.value.icone
    categoriaAtualizada.categoria= this.formularioCategoria.value.categoria

    this.api.putEditacategoria( categoriaAtualizada).subscribe( (data) => {
      alert('Postagem criada!')
      this.modalAberto=false
      this.pegaCategorias()
    })
   }


  criaCategoria():void{
    let categoriaNova = new Categorias()
    categoriaNova.icone = this.formularioCategoria.value.icone
    categoriaNova.categoria= this.formularioCategoria.value.categoria

    this.api.CriarNovaCategoria( categoriaNova ).subscribe( (data) => {
      alert('Postagem criada!')
    }) 
  }

  abreModalEditar(id : number): void {
    this.api.getCategoriaPorId(id).subscribe((respApi) =>{
      this.formularioCategoria.controls['categoria'].setValue(respApi.categoria)
      this.formularioCategoria.controls['icone'].setValue(respApi.icone)
      
      this.idDaEdicao = id
      this.edicaoCategoria = true
      this.modalAberto = true
    })
  }
  fechaModal(): void {
    this.modalAberto = false
  }
}
