import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import Carros from '../entities/Carros';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private PATH : string = 'carros';

  constructor(private firestore : AngularFirestore, private storage: AngularFireStorage) { }

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

  createWithAvatar(carros: Carros){
    return this.firestore.collection(this.PATH)
    .add({nome: carros.modelo, modelo: carros.modelo, downloadURL : carros.downloadURL});
  }

    

  uploadImage(imagem: any, carros: Carros){
    const file = imagem.item(0)
    if (file.type.split('/')[0] !== 'image') {
     console.error('Tipo Não Suportado!')
     return;
    }
    const path = `images/${carros.id}_${file.name}`;
    const fileRef = this.storage.ref(path);
    let task = this.storage.upload(path, file)
    task.snapshotChanges().pipe(
      finalize(()=>{
        let uploadedFileURL = fileRef.getDownloadURL();
        uploadedFileURL.subscribe(resp=>{
          carros.downloadURL = resp;
          if(!carros.id){
            this.create(carros);
          }else{
            this.update(carros, carros.id);
          }

      })
    })).subscribe()
    return task;
  }


  }



