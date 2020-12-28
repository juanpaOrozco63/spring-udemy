import { Injectable } from '@angular/core';
import { Cliente } from '../components/clientes/cliente';
import {of,Observable,throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import { formatDate, registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint:string = 'http://localhost:8090/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})
  constructor(private http:HttpClient, private router:Router) { }

  getClientes(page:number):Observable <Cliente[]>{
    return this.http.get(this.urlEndPoint+'/page/'+page).pipe(
      tap((response:any)=>{
        (response.content as Cliente[]).forEach(cliente =>{
        })
      }),
      map((response:any) => {
        (response.content as Cliente[]).map(cliente=>{
          cliente.nombre = cliente.nombre.toUpperCase();
          // cliente.createAt = formatDate(cliente.createAt,'EEEE dd, MMMM, yyyy','es');
          return cliente;
        });
        return response;
      }),  tap(response=>{
        (response.content as Cliente[]).forEach(cliente =>{
        })
      }),
    );
  }
  create(cliente:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(this.urlEndPoint,cliente,{headers: this.httpHeaders}).pipe(
      catchError(e=>{
        if(e.status==400){
          return throwError(e);
        }
        Swal(
          'Error al crear el cliente',
           e.error.error,
          'error'    
        )
        return throwError(e);
      })
    )
  }
  getCliente(id):Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e=>{
        this.router.navigate(['/clientes']);
        Swal(
          'Error al editar',
           e.error.mensaje,
          'error'
           
        )
        return throwError(e);
      })
      
      
    )
  }
   updateCliente(cliente:Cliente):Observable<Cliente>{
     return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`,cliente,{headers:this.httpHeaders}).pipe(
       catchError(e=>{
        if(e.status==400){
          return throwError(e);
        }
        Swal(
          'Error al editar el cliente',
           e.error.error,
          'error'    
        )
        return throwError(e);
       })
     )
   }
   deleteCliente(id:number):Observable<Cliente>{
     return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`,{headers:this.httpHeaders}).pipe(
       catchError(e=>{
        Swal(
          'Error al eliminar el cliente',
           e.error.error,
          'error'    
        )
        return throwError(e);
       })
     )
   }
}
