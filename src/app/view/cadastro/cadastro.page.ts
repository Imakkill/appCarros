import { Component, OnInit } from '@angular/core';
import Carros from 'src/app/model/entities/Carros';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from 'src/app/model/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  modelo: string
  marca: string
  ano: number
  price: number
  carroceria: string
  carros: Carros;
  constructor(private alertController: AlertController, private router: Router, private firebase: FirebaseService){ }

  ngOnInit() {
  }
  cadastrar(){
    if(this.modelo){
      let novo: Carros = new Carros(this.modelo,this.marca, this.ano, this.price, this.carroceria);
      this.firebase.create(novo);
      this.presentAlert("Salvo", "Contato Salvo!");
      this.router.navigate(['/home']);
    }
    else{
      this.presentAlert("Erro", "Campos Obrigatórios!");
    }
  }
  async presentAlert(header: string, message: string){
    const alert = await this.alertController.create({
      header: header,
      subHeader: 'Agenda de Contatos',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
