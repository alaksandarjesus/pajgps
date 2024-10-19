import { AfterViewInit, Component, ViewChild, OnInit, inject } from '@angular/core';
import { DevicesService } from '../services/devices.service';
import * as Data from './response.json';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { forkJoin } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { LastPointComponent } from '../modals/last-point/last-point.component';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-all',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatButtonModule, RouterLink],
  templateUrl: './all.component.html',
  styleUrl: './all.component.scss'
})
export class AllComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'imei', 'lastPoint'];
  dataSource: any = [];
  numOfRecords = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  loading:boolean = true;

  constructor(private srv: DevicesService, private dialog:MatDialog) { }

  ngOnInit() {
    this.getDevices();
   

  }

  getDevices() {
    this.srv.get().subscribe({
      next: (res: any) => {
        const devices = res?.success || [];
        const lastPointApis = devices.map((item:any) => this.srv.trackerData(item.id, 1))
        forkJoin(lastPointApis).subscribe({
          next: (lps:any)=>{
            devices.forEach((device:any, index:any)=>{
              device.lastPoint = lps[index]?.success[0] || {}
            })
            this.dataSource = new MatTableDataSource(devices)
            this.numOfRecords = res?.number_of_records || 0;
            setTimeout(()=>{
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            })
        this.loading = false;
          }
        })
        return;
       
      },
      error: (err: any) => {
        alert("Error fetching data");
        this.loading = false;
      }
    })

  }

  showLastPoint(event:any, row:any){
    event.preventDefault();
    event.stopPropagation();
    this.dialog.open(LastPointComponent, {
      data: row.lastPoint,
    });
  }

}
