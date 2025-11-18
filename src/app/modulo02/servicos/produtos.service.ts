import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { SessaoService } from '../../modulo01/servicos/sessao.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
    private url = environment.API + "produtos/"
  private headers = {
    token: environment.TOKEN,
    "Content-Type":"application/json"
  }

  constructor(private sessao : SessaoService) { }

  async dataGrid(){

    let request = await fetch(this.url + this.sessao.ID_ENTIDADE + '/datagrid', {
      method: "GET",
      headers: this.headers
    })

    let data = await request.json()

    return data
  }

  async codigo(){

    let request = await fetch(this.url + this.sessao.ID_ENTIDADE + '/codigo', {
      method: "GET",
      headers: this.headers
    })

    let data = await request.json()

    return data[0].CD_PRODUTO
  }

  async incluir(dataRow: object){

    let request = await fetch(this.url + this.sessao.ID_ENTIDADE + '/incluir', {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(dataRow)
    })

    let data = await request.json()

    return data
  }

  async consultar(ID_PRODUTO: number){

    let request = await fetch(this.url + ID_PRODUTO + '/consultar', {
      method: "GET",
      headers: this.headers
    })

    let data = await request.json()

    return data[0]
  }

  async excluir(ID_PRODUTO: number){

    let request = await fetch(this.url + ID_PRODUTO + '/excluir', {
      method: "DELETE",
      headers: this.headers
    })

    let data = await request.json()

    return data
  }

  async alterar(dataRow: any){
    
    let request = await fetch(this.url + dataRow.ID_PRODUTO + '/alterar', {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify(dataRow)
    })

    let data = await request.json()

    return data
  }

  async lookupCredor(){

    let request = await fetch(environment.API + 'credores/' + this.sessao.ID_ENTIDADE + '/lookup', {
      method: "GET",
      headers: this.headers
    })

    let data = await request.json()

    return data
  }
}