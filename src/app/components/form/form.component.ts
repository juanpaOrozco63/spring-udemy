import { Component, OnInit } from '@angular/core';
import { Cliente } from '../clientes/cliente';
import { ClienteService } from '../../services/cliente.service';
import {Router, ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  cliente:Cliente =new Cliente()
  constructor(private clienteService:ClienteService,private rout:Router,private routActive:ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente()
  }
  create():void{
    this.clienteService.create(this.cliente).subscribe(rsp=>{   
  swal(
  'Nuevo Cliente',
  `Cliente ${this.cliente.nombre} creado con exito`,
  'success'
)
    this.rout.navigate(['/clientes'])
    console.log(this.cliente);
    })
    }
   cargarCliente():void{
      this.routActive.params.subscribe(resp=>{
        let id = resp['id']
        if(id){
          this.clienteService.getCliente(id).subscribe((cliente)=>{
            this.cliente = cliente
          })
        }

      })
    } 
    updateCliente():void{
      this.clienteService.updateCliente(this.cliente).subscribe(resp=>{
        this.rout.navigate(['/clientes'])
        swal(
          'Cliente Actualizado',
          `Cliente ${this.cliente.nombre} actualizado con exito`,
          'success'
        )
        
      })
    }

}
