import { Component, OnInit } from '@angular/core';
import { GeralService } from 'src/app/service/geral.service';
import { Vagas } from 'src/app/model/vagas/vagas';
import { ActivatedRoute } from '@angular/router';
import { Empresa } from 'src/app/model/empresa/empresa';
import { RespostasQuestionario } from 'src/app/model/respostaQuestionario/respostas-questionario';

@Component({
  selector: 'app-interna',
  templateUrl: './interna.component.html',
  styleUrls: ['./interna.component.scss']
})
export class InternaComponent  implements OnInit{
  vaga: Vagas = new Vagas()
  idDaUrl : number = 0
  empresa : Empresa[] = []
  modalAberto: boolean = false;
  modalQuestionario: boolean = false;
  resposta : RespostasQuestionario = new RespostasQuestionario()



  constructor(
    private api:GeralService,
    private rotaAtiva: ActivatedRoute,
  ){}
  ngOnInit(): void {
    this.idDaUrl = Number(this.rotaAtiva.snapshot.params['id'])

    this.pegaVagaId()
    this.pegaEmpresa()
  }

  pegaVagaId(): void{
    this.api.getVagaPorId(this.idDaUrl).subscribe( (vagas) => {
      this.vaga = vagas 
      for(let i = 0; i<this.vaga.questionario.length; i++){
        this.resposta.respostas[i]= []
      }
    })
  }

  converteHoras(isoData: string): string{
    let data = new Date(isoData)
    // 10/07/2023 10h45
    return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()} `
  }

  pegaEmpresa(): void{
    this.api.getEmpresas().subscribe( (empresas) => {
      this.empresa = empresas
    })
  }

  responderQuestionario(): void{
    this.resposta.idDaVaga = this.vaga.id
    this.resposta.idDoUsuario = Number(localStorage.getItem('idUser'))
  this.api.postRespostaQuestionario(this.resposta).subscribe((respostas) => {
    alert('criou resposta')
  })
  }

  mudancaDeValor(valor:string,index:number):void{
  if(this.resposta.respostas[index].indexOf(valor) >=0){
    this.resposta.respostas.splice(this.resposta.respostas[index].indexOf(valor),1)
  }else{
    this.resposta.respostas[index].push(valor)
  }
  }

  findEmpresa(id: number): Empresa {
    let emp = this.empresa.find((obj) => obj.id == id)
    if(emp){
      return emp
    } else {
      return new Empresa()
    }
  }
  fecharModal(): void{
    this.modalQuestionario = false

  }

  abrirModalQuest(): void{
    this.modalAberto = true
    this.modalQuestionario = true
  }
}
