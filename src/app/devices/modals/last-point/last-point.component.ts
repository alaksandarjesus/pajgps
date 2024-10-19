import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

@Component({
  selector: 'app-last-point',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  templateUrl: './last-point.component.html',
  styleUrl: './last-point.component.scss'
})
export class LastPointComponent implements OnInit{

  data:any = inject(MAT_DIALOG_DATA);

  @ViewChild('map') map !:ElementRef;

  constructor(private dialog:MatDialog){}

  ngOnInit(): void {
    
  }

  ngAfterViewInit(){
    const map = new maplibregl.Map({
      container: 'map', // container id
      style: 'https://demotiles.maplibre.org/style.json', // style URL
      center: [this.data?.lng, this.data?.lat], // starting position [lng, lat]
      zoom: 5 // starting zoom
  });
  let marker = new maplibregl.Marker()
  .setLngLat([this.data?.lng, this.data?.lat])
  .addTo(map);
  }
}