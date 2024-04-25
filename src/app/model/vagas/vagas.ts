import { Salario } from "./salario"
import { Local } from "./local"
import { Expediente } from "./expediente"
import { Questionario } from "./questionario"

export class Vagas {
    public id : number
public vaga : string
public categoria : number
public empresa : number
public salario : Salario
public quantidade :number
public local : Local
public publicacao : string
public descricao : string
public expediente : Expediente
public contratacao : string
public infosAdicionais : string 
public questionario : Questionario[]
public vagas : number
public caracteristicas : string[]
public sobre : string 

constructor(){
this.id = 0
this.vaga = ''
this.categoria = 0
this.empresa = 0
this.salario = new Salario()
this.quantidade = 0
this.local = new Local()
this.publicacao = ''
this.descricao = ''
this.expediente = new Expediente()
this.contratacao = ''
this.infosAdicionais = ''
this.questionario = []
this.vagas = 0
this.caracteristicas = []
this.sobre = '' 
}

}
