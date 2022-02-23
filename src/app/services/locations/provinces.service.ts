import { Injectable } from '@angular/core';
import { prov } from './Province_Cities';

@Injectable({
  providedIn: 'root'
})
export class ProvincesService {

  constructor() { }

  getProvinceList() {
    let province_list = [];
    for (let provinces in prov) {
      for (let y in prov[provinces].province_list) {
        province_list.push({
          name: y,
          data: prov[provinces].province_list[y]
        });
      }
    }
    return province_list;
  }

  changeCityList(list) {
    let city_list = [];
    for (let cities in list) {
      city_list.push(cities);
    }
    return city_list;
  }
}
