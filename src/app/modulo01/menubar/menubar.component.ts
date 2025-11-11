import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SessaoService } from '../servicos/sessao.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-menubar',
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.css'
})
export class MenubarComponent implements OnInit{

  modulo02 : boolean = false

  DS_ENTIDADE : string = ''
  NM_USUARIO  : string = ''
  
  constructor(private sessao: SessaoService){ }

  ngOnInit(): void {
    this.DS_ENTIDADE = this.sessao.DS_ENTIDADE
    this.NM_USUARIO = this.sessao.NM_USUARIO
  }

}
