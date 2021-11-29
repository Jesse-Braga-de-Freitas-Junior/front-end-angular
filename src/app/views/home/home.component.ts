import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  modelo: string;
  marca: string;
  ano: string;
  cor: string
};

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'npc-1032', weight: 96953049683969, symbol: '193585022', modelo: 'RENEGADE', marca: 'FIAT', ano: '2021', cor: 'branco' },
  {position: 2, name: 'Hel-3040', weight: 42342423340026, symbol: '123113123', modelo: 'RENEGADE', marca: 'FIAT', ano: '2021', cor: 'branco' },
  {position: 3, name: 'Lit-5060', weight: 62212554332941, symbol: '123142423', modelo: 'RENEGADE', marca: 'FIAT', ano: '2021', cor: 'branco' },
  {position: 4, name: 'Bem-8970', weight: 91234123440122, symbol: '345356347', modelo: 'RENEGADE', marca: 'FIAT', ano: '2021', cor: 'branco' },
  {position: 5, name: 'Bor-6074', weight: 10234524355811, symbol: '343673345', modelo: 'RENEGADE', marca: 'FIAT', ano: '2021', cor: 'branco' },
  {position: 6, name: 'Car-5667', weight: 12534523450107, symbol: '474674567', modelo: 'RENEGADE', marca: 'FIAT', ano: '2021', cor: 'branco' },
  {position: 7, name: 'Nit-6078', weight: 14245212440067, symbol: '456745674', modelo: 'RENEGADE', marca: 'FIAT', ano: '2021', cor: 'branco' },
  {position: 8, name: 'Oxy-8090', weight: 15556356349994, symbol: '467456754', modelo: 'RENEGADE', marca: 'FIAT', ano: '2021', cor: 'branco' },
  {position: 9, name: 'Flu-6543', weight: 18456345639984, symbol: '234523265', modelo: 'RENEGADE', marca: 'FIAT', ano: '2021', cor: 'branco' },
  {position: 10, name: 'Neo-1243', weight: 20335633451797, symbol: '456346777', modelo: 'RENEGADE', marca: 'FIAT', ano: '2021', cor: 'branco' },
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'modelo', 'marca', 'ano', 'cor', 'actions'];
  dataSource = ELEMENT_DATA;

  constructor( public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  openDialog(element: PeriodicElement |null ): void {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data: element === null ? {
        position: null,
        name:'',
        weight:null,
        symbol: ''
      } : {
        position: element.position,
        name: element.name,
        weight:element.weight,
        symbol: element.symbol,
        modelo: element.modelo,
        marca: element.marca,
        ano: element.ano,
        cor: element.cor
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined) {
        if (this.dataSource.map(p => p.position).includes(result.position)) {
          this.dataSource[result.position - 1] = result;
          this.table.renderRows();
        } else {
          this.dataSource.push(result);
          this.table.renderRows();
        }

        this.dataSource.push(result);
        this.table.renderRows();
      }
    });

  }
  editElement(element: PeriodicElement): void {
    this.openDialog(element);
  }

  deleteElement(position: number): void {
    this.dataSource = this.dataSource.filter(p => p.position !== position);
  }

}
