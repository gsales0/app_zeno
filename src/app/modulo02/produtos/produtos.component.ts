import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProdutosService } from '../servicos/produtos.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produtos',
  imports: [FormsModule, CommonModule],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css'
})
export class ProdutosComponent {
  dataRow = {
    ID_PRODUTO: 0   ,
    CD_PRODUTO: ''  ,
    NM_PRODUTO: '' 	,
    TP_PRODUTO: ''	,
    CD_BARRAS:  ''	,
    VL_CUSTO:   ''	,
    VL_DESCONTO:''	,
    VL_PRECO:   ''	,
    UN_MEDIDA:  ''	,
    ID_CREDOR:  0 	,
    OBSERVACOES:''  ,
    SN_ATIVO:   true
  }


  @ViewChild('modal') modal !: ElementRef

  telaRegistro    : boolean = false
  modoConsulta    : boolean = true
  salvarEditando  : boolean = false

  mensagem     : string = ''

  dataGrid : Array<any> = []
  dataLook : Array<any> = []

  constructor(private servico: ProdutosService){ }

  async buscarGrid(){
    this.dataGrid = await this.servico.dataGrid()
    this.dataLook = await this.servico.lookupCredor()
  }

  async novoRegistro(){
    this.dataRow.CD_PRODUTO = String(await this.servico.codigo()).padStart(4, '0')

    this.telaRegistro = true
    this.modoConsulta = false
  }

  cancelarRegistro(){
    this.dataRow = {
    ID_PRODUTO: 0   ,
    CD_PRODUTO: ''  ,
    NM_PRODUTO: '' 	,
    TP_PRODUTO: ''	,
    CD_BARRAS:  ''	,
    VL_CUSTO:   ''	,
    VL_DESCONTO:''	,
    VL_PRECO:   ''	,
    UN_MEDIDA:  ''	,
    ID_CREDOR:  0 	,
    OBSERVACOES:''  ,
    SN_ATIVO:   true
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
    this.dataRow = await this.servico.consultar(this.dataRow.ID_PRODUTO)
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
    this.dataRow = await this.servico.consultar(this.dataRow.ID_PRODUTO)
    this.telaRegistro = true
    this.modoConsulta = true
  }

  async excluirRegistro(){
    let data = await this.servico.excluir(this.dataRow.ID_PRODUTO)

    this.dataRow.ID_PRODUTO = 0
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

  str : string = ''
  teste(i:Event){
    console.log(i)
  }
}