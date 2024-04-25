export class RespostasQuestionario {
   public id: number
   public idDaVaga: number
   public idDoUsuario: number
   public respostas: string[][]

   constructor(){
    this.id = 0
    this.idDaVaga = 0 
    this.idDoUsuario = 0 
    this.respostas = []

    
   }
}
