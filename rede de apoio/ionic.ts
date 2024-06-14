// Importações necessárias
import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  shelters: any[] = [
    { name: 'Abrigo 1', location: { latitude: 123, longitude: 456 } },
    { name: 'Abrigo 2', location: { latitude: 789, longitude: 101 } },
    // Adicione mais abrigos conforme necessário
  ];
  userLocation: any = {};

  constructor(private geolocation: Geolocation) {}

  // Função para obter a localização do usuário
  getUserLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.userLocation.latitude = resp.coords.latitude;
      this.userLocation.longitude = resp.coords.longitude;
    }).catch((error) => {
      console.log('Erro ao obter a localização', error);
    });
  }

  // Função para calcular a distância entre dois pontos
  calculateDistance(lat1, lon1, lat2, lon2) {
    var R = 6371; // Raio da Terra em km
    var dLat = this.deg2rad(lat2 - lat1);
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distância em km
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180)
  }
}
