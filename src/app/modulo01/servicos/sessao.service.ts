import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SessaoService {
  private url = environment.API + "entidades/"
  private headers = {
    token: environment.TOKEN,
    "Content-Type":"application/json"
  }

  private ID_ENTIDADE : number = 0 

  public ID_USUARIO : string = ''
  public NM_USUARIO : string = ''

  constructor() { }

  async consultarEntidade(alias: string | null){
    
    let request = await fetch(this.url + alias + '/consultar', {
      method: "GET",
      headers: this.headers
    })

    let data = await request.json()

    if(data.sucesso){
      this.ID_ENTIDADE = data.ID_ENTIDADE
    }

    return data
  }

  async loginUsuario(dataRow : object){

    let request = await fetch(this.url + this.ID_ENTIDADE + "/login", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(dataRow)
    })

    let data = await request.json()

    if(data.sucesso){
      this.ID_USUARIO = data.ID_USUARIO,
      this.NM_USUARIO = data.NM_USUARIO
    }

    return data
  }
}