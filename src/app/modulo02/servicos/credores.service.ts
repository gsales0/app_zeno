import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { SessaoService } from '../../modulo01/servicos/sessao.service';

@Injectable({
  providedIn: 'root'
})
export class CredoresService {
  private url = environment.API + "credores/"
  private headers = {
    token: environment.TOKEN,
    "Content-Type":"application/json"
  }

  constructor(private sessao : SessaoService) { }

  async incluir(dataRow: object){

    let request = await fetch(this.url + this.sessao.ID_ENTIDADE + '/incluir', {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(dataRow)
    })

    let data = await request.json()

    return data
  }


}
