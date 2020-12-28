import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from '../../services/cliente.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes:Cliente[];
  paginator:any;
  constructor(private clienteService:ClienteService, private activatedRoute:ActivatedRoute) { }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( params => {
      let page:number = +params.get('number');
      if(!page){
        page=0;
      }
      this.clienteService.getClientes(page)
      .pipe(
        tap((response:any)=>{
          (response.content as Cliente[]).forEach(cliente =>{
          })
        })
        )
        .subscribe(
          response => {
            this.clientes =response.content as Cliente[]
            this.paginator =response;
          });
        }
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
