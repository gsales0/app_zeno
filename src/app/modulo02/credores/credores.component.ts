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
  }

  @ViewChild('modal') modal !: ElementRef

  telaRegistro : boolean = false
  modoConsulta : boolean = true

  mensagem     : string = ''

  constructor(private servico: CredoresService){ }

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
    }

    this.telaRegistro = false
    this.modoConsulta = true
  }

  async salvarRegistro(){
    let data = await this.servico.incluir(this.dataRow)

    this.modal.nativeElement.showModal()
    this.mensagem = data.mensagem
  }

}
