import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-credores',
  imports: [CommonModule],
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

  telaRegistro : boolean = false
  modoConsulta : boolean = true

}
