import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from '../../services/cliente.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes:Cliente[];
  constructor(private clienteService:ClienteService) { }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes =clientes
    )
  }
  deleteCliente(cliente:Cliente):void{
  Swal.fire({
    title: 'Estas seguro?',
    text: `Estas seguro de eliminar el cliente ${cliente.nombre}`,
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText:'Cancelar',
    confirmButtonText: 'Si, seguro!'
  }).then((result) => {
    if (result.value) {
      this.clienteService.deleteCliente(cliente.id).subscribe(resp=>{
        this.clientes= this.clientes.filter(cli=>
          cli !== cliente
        )
        Swal.fire(
          'Cliente Eliminado!',
          `Cliente ${cliente.nombre} Eliminado con exito`,
          'success'
        )
      })
      
    }
  })
}

}
