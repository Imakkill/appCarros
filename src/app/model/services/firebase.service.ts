import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import Carros from '../entities/Carros';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private PATH : string = 'carros';
  constructor(private firestore : AngularFirestore) { }

  read(){
    return this.firestore.collection(this.PATH).snapshotChanges();
  }

  create(carros : Carros){
    return this.firestore.collection(this.PATH).add({modelo: carros.modelo, marca: carros.marca, ano: carros.ano, price: carros.price, carroceria: carros.carroceria});
  }

  update(carros: Carros, id: string){
    return this.firestore.collection(this.PATH).doc(id).update({modelo: carros.modelo, marca: carros.marca, ano: carros.ano, price: carros.price, carroceria: carros.carroceria});
  }

  delete(carros: Carros){
    return this.firestore.collection(this.PATH).doc(carros.id).delete();
  }
}

