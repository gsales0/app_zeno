import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CredoresService } from '../servicos/credores.service';

@Component({
  selector: 'app-credores',
  imports: [CommonModule, FormsModule],
  templateUrl: './credores.component.html',
  styleUrl: './credores.component.css'
})
export class CredoresComponent {

  dataRow = {
    ID_CREDOR:  0   ,
    CD_CREDOR:  ''	,
    NM_CREDOR:  '' 	,
    TP_CREDOR:  ''	,
    CADASTRO:   ''	,
    CONTATO:    ''	,
    EMAIL:      ''	,
    UF_CREDOR:  ''	,
    CIDADE:     ''	,
    ENDERECO:   ''	,
    OBSERVACOES:''  ,
    SN_ATIVO: true
  }

  @ViewChild('modal') modal !: ElementRef

  telaRegistro    : boolean = false
  modoConsulta    : boolean = true
  salvarEditando  : boolean = false

  mensagem     : string = ''

  dataGrid : Array<any> = []

  constructor(private servico: CredoresService){ }

  async buscarGrid(){
    this.dataGrid = await this.servico.dataGrid()
  }

  async novoRegistro(){
    this.dataRow.CD_CREDOR = String(await this.servico.codigo()).padStart(4, '0')

    this.telaRegistro = true
    this.modoConsulta = false
  }

  cancelarRegistro(){
    this.dataRow = {
      ID_CREDOR: this.dataRow.ID_CREDOR,
      CD_CREDOR:  ''	,
      NM_CREDOR:  '' 	,
      TP_CREDOR:  ''	,
      CADASTRO:   ''	,
      CONTATO:    ''	,
      EMAIL:      ''	,
      UF_CREDOR:  ''	,
      CIDADE:     ''	,
      ENDERECO:   ''	,
      OBSERVACOES:''  ,
      SN_ATIVO: true
    }

    this.salvarEditando = false
    this.telaRegistro = false
    this.modoConsulta = true
  }

  async salvarRegistro(){
    let data = await this.servico.incluir(this.dataRow)

    if(data.sucesso){
      this.modal.nativeElement.showModal()
      this.mensagem = data.mensagem
      this.cancelarRegistro()
    }
    else{
      this.modal.nativeElement.showModal()
      this.mensagem = data.mensagem
    }
  }

  async alterarRegistro(){
    this.dataRow = await this.servico.consultar(this.dataRow.ID_CREDOR)
    this.telaRegistro = true
    this.modoConsulta = false
    this.salvarEditando = true
  }

  async editarRegistro(){
    let data = await this.servico.alterar(this.dataRow)

    if(data.sucesso){
      this.modal.nativeElement.showModal()
      this.mensagem = data.mensagem
      this.cancelarRegistro()
    }
    else{
      this.modal.nativeElement.showModal()
      this.mensagem = data.mensagem
    }
  }

  async consultarRegistro(){
    this.dataRow = await this.servico.consultar(this.dataRow.ID_CREDOR)
    this.telaRegistro = true
    this.modoConsulta = true
  }

  async excluirRegistro(){
    let data = await this.servico.excluir(this.dataRow.ID_CREDOR)

    this.dataRow.ID_CREDOR = 0
    this.modal.nativeElement.showModal()
    this.mensagem = data.mensagem

    if(data.sucesso){
      this.cancelarRegistro()
      this.buscarGrid()
    }
  }

  fecharModal(){
    this.modal.nativeElement.close()
    this.mensagem = ""
  }

}
