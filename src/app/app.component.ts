import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Exame } from './exame';
import { ExameService } from './exame.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  formCliente: FormGroup;
  sucesso;
  
  constructor(private formBuilder: FormBuilder, private exameService: ExameService) { }

  ngOnInit() {
    this.createForm(new Exame())
  }

  createForm(exame: Exame) {
    this.formCliente = this.formBuilder.group({
      risco_ocupacional: [exame.risco_ocupacional],
      tipo_exame_codigo: [exame.tipo_exame_codigo],
      paciente_codigo: [exame.paciente_codigo],
      medico_codigo: [exame.medico_codigo],
    });
  }

  setMedico($event) {
    // tslint:disable-next-line: deprecation
    this.formCliente.get('medico_codigo').setValue(($event.target as HTMLInputElement).value);
  }

  setPaciente($event) {
    // tslint:disable-next-line: deprecation
    this.formCliente.get('paciente_codigo').setValue(($event.target as HTMLInputElement).value);
  }

  setTipoExame($event) {
    // tslint:disable-next-line: deprecation
    this.formCliente.get('tipo_exame_codigo').setValue(($event.target as HTMLInputElement).value);
  }

  setRiscoOcupacional($event) {
    // tslint:disable-next-line: deprecation
    this.formCliente.get('risco_ocupacional').setValue(($event.target as HTMLInputElement).value);
  }

  buildDTO() {
    return {
      medicoCodigo: this.formCliente.get('medico_codigo').value,
      pacienteCodigo: this.formCliente.get('paciente_codigo').value,
      tipoExameCodigo: this.formCliente.get('tipo_exame_codigo').value,
      riscoOcupacional: this.formCliente.get('risco_ocupacional').value
    };
  }

  salvar() {
    console.log(this.buildDTO())
    this.exameService.addExame(this.buildDTO()).subscribe(data => {
      this.sucesso = 'Sucesso ao salvar Exame';
    });
  }

  get() {
    console.log('getExames\n')
    var exames = this.exameService.getExames().subscribe(data => {
      console.log(data)
    });
    console.log(exames)
  }

  getId(id) {
    console.log('getExames\n')
    this.exameService.getExame(id).subscribe(data => {
      console.log(data.codigo + '|' + data.medico_codigo + '|' + data.paciente_codigo + '|' + data.risco_ocupacional + '|' + data.tipo_exame_codigo)
    });
  }  
  
}
