import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SessaoService } from '../servicos/sessao.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  dataRow = {
    DS_ENTIDADE : ''  ,
    CD_USUARIO  : ''  ,
    SENHA_HASH  : ''  
  }

  alias : string | null = ''
  mensagem  : string    = ''

  @ViewChild('modal') modal !: ElementRef

  constructor(
    private sessao : SessaoService  ,
    private acRoute : ActivatedRoute,
    private router: Router
  ){ }

  async ngOnInit(){
    this.alias = this.acRoute.snapshot.params['alias']

    let data = await this.sessao.consultarEntidade(this.alias)

    if(data.sucesso){
      this.dataRow.DS_ENTIDADE = data.DS_ENTIDADE
    }
  }

  async loginUsuario(){
    let data = await this.sessao.loginUsuario(this.dataRow)

    if(data.sucesso){
      this.router.navigate([`${this.alias}/dashboard`])
    }
    else{
      this.mensagem = data.mensagem
      this.modal.nativeElement.showModal()
    }
    
    this.dataRow.SENHA_HASH = ''
  }

  confirmarAviso(){
    this.modal.nativeElement.close()
    this.mensagem = ''
  }
}
