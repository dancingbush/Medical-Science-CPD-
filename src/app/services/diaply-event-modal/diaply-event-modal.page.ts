import { Component, Input, OnInit } from '@angular/core';
import { cpdEvent } from '../interfaces';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-diaply-event-modal',
  templateUrl: './diaply-event-modal.page.html',
  styleUrls: ['./diaply-event-modal.page.scss'],
})
export class DiaplyEventModalPage implements OnInit {
  /**
   * This class take the test data passed when user taps the event on Tab3.
   * NavParams pass the data to this modal.
   * We can use NavParam to retun data to tab3 if needed.
   * event-modal is used to edit / update / add new evenst to remote DB
   */

  @Input()  event : cpdEvent;
  public imagePathway : string = '';
  public eventData = {
    id: 0,
    title: '',
    description : '',
    hours : 0,
    startdate: '',
    endDate: '',
    eventOrganisers: '',
    CPDPoints: 0,
    compentancyCat: '',
    reflection: '',
    learningPlan : '',
    certificate: ''
  }

  constructor(
    private modalController : ModalController,
    private navParams : NavParams
  ) { 
    this.event = this.eventData;
  }

  ngOnInit() {
    // Assign details passed fork tab3 CPD Event list to local object
    //this.event = this.eventData;
    console.log("display-event-modal: got his form tab3: " + this.eventData.title);
    this.getImageName();
  }

  getImageName () : void {
    // Depdning oin categpory, gte image for assest and display
    
    console.log("dipslay-ev.modal: getting image for catorgorey :"  + this.eventData.compentancyCat);
    switch (this.eventData.compentancyCat){
      case 'Supervision/Mentoring':{
        this.imagePathway = '../../../assets/tests/test6.jpg';
        break;
      }
      case 'Peer Review': {
        this.imagePathway = '../../../assets/cpd/peerreview.jpeg';
        break;
      }
      case 'Professioal Body Member': {
        this.imagePathway = '../../../assets/cpd/professioanlmember.jpeg';
        break;
      }
      case 'Online Acitivty': {
        this.imagePathway = '../../../assets/cpd/onlinelearning.jpeg';
        break;
      }
      case 'Professional Reading / Study' : {
        this.imagePathway = '../../../assets/cpd/onlinelearning.jpeg';
        break;
      }
      case 'Journal Club' : {
        this.imagePathway = '../../../assets/cpd/journalclub.jpeg';
        break;
      }
      case 'Other' :{
        this.imagePathway = '../../../assets/cpd/otherCPD.jpeg';
        break;
      }
      default: {
        this.imagePathway = '../../../assets/cpd/otherCPD.jpeg';
      }
        
    }
  }
  async closeModal() {
    // clsoe modal and pas sback messgae to calling class tab3

    const message = 'dispaly-event-modal - Modal Closed';
    await this.modalController.dismiss(message);
  }



}
