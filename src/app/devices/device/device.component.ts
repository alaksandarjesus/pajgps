import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DevicesService } from '../services/devices.service';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

@Component({
  selector: 'app-device',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  templateUrl: './device.component.html',
  styleUrl: './device.component.scss'
})
export class DeviceComponent implements OnInit{

  deviceId:any = '';
  coordinates = [];
  constructor(private srv:DevicesService, private ar:ActivatedRoute){}

  ngOnInit(): void {
    this.ar.params.subscribe((params:any)=>{
      this.deviceId = params.id;
      this.getTrackerData();
    })
  }

  getTrackerData(){
    this.srv.trackerData(this.deviceId, 50).subscribe({
      next: (res:any)=>{
        this.coordinates = res.success.map((item:any) => {
          return  [item.lng, item.lat]
        })
         this.drawMap();
      }
    })
  }

  drawMap(){
    const map = new maplibregl.Map({
      container: 'map',
        style:
            'https://api.maptiler.com/maps/streets/style.json?key=oxH8cHccrHo5ApAHVxYN',
        center: this.coordinates[0],
        zoom: 8
  });
  map.on('load', () => {
    map.addSource('route', {
        'type': 'geojson',
        'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
                'type': 'LineString',
                'coordinates': this.coordinates
            }
        }
    });
    map.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'route',
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
            'line-color': '#888',
            'line-width': 8
        }
    });
});
  }
}
