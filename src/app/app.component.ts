import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Exame } from './exame';
import { ExameService } from './exame.service';

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
    this.createForm(new Exame());
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
    this.formCliente.get('medico_codigo').setValue((event.target as HTMLInputElement).value);
  }

  setPaciente($event) {
    // tslint:disable-next-line: deprecation
    this.formCliente.get('paciente_codigo').setValue((event.target as HTMLInputElement).value);
  }

  setTipoExame($event) {
    // tslint:disable-next-line: deprecation
    this.formCliente.get('tipo_exame_codigo').setValue((event.target as HTMLInputElement).value);
  }

  setRiscoOcupacional($event) {
    // tslint:disable-next-line: deprecation
    this.formCliente.get('risco_ocupacional').setValue((event.target as HTMLInputElement).value);
  }

  buildDTO() {
    return {
      medicoCodigo: this.formCliente.get('medico_codigo').value,
      pacienteCodigo: this.formCliente.get('paciente_codigo').value,
      tipoExame: this.formCliente.get('tipo_exame_codigo').value,
      riscoOcupacional: this.formCliente.get('risco_ocupacional').value
    };
  }

  salvar() {
    this.exameService.addExame(this.buildDTO()).subscribe(data => {
      this.sucesso = 'Sucesso ao salvar Exame';
    });
  }
}
