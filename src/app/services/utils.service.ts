import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    fileExtension = '.xlsx';

  constructor() { }


  showToast(msg: string, type: 'success' | 'error', time: number = 25000, showConfirmButton: boolean = false) {
    swal.fire({
      position: 'center',
      icon: type,
      title: `${msg}`,
      showConfirmButton,
      timer: 1500
    })
  }

  exportToExcel(excelData: any[], nameFile: string): void {
    console.log({ excelData })
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelData);
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile(excelBuffer, nameFile);
  }

  saveExcelFile(excelData: any, fileName: string): void {
    const data: Blob = new Blob([excelData], { type: this.fileType });
    FileSaver.saveAs(data, fileName + this.fileExtension);
  }

  public getArrayFromObject(object): any[] {
    return Object.keys(object || {}).map(key => object[key]);
  }
}
