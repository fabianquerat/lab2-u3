import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

//agregar el servicio
import { FormularioService } from '../servicios/formulario.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  formulario:any;

  constructor(private fb:FormBuilder, private serviceFormulario: FormularioService) { }
  datos:any;

  ngOnInit(): void {
    this.formulario = this.fb.group({
      campo1:['',[Validators.required,]],
      campo2:[''],
    });
  }

  get formularioReactivo(){
    return this.formulario.controls;
  }

  botonEnviar(){
    console.log(this.formulario);
  }

  obtener(){
    console.log("hola");
    this.serviceFormulario.obtener_datosFormulario().subscribe(
      (response:any)=>{
        {
          this.datos = response.registros
          console.log(this.datos)
        }
      },
      error=>{
        alert("error al registrar")
      }
    )
  }

  enviarDatos(){
    //subcribe: es un observable, permite transmitir datos asincróna y sincrónica
    this.serviceFormulario.crear_datosFormulario(this.formulario.value).subscribe(
      (response:any)=>{
        if(response.registro){
          alert("Datos guardados exitosamente");
          console.log(response)
        }else{
          alert("Datos no registrados")
        }
      },
      error=>{
        alert("error al registrar")
      }
    )
  }
}
