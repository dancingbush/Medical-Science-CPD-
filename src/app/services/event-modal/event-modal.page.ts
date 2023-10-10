import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { cpdEvent } from '../interfaces';
import { ModalController } from '@ionic/angular';
import { DataService } from '../dataservice';
import { CameraService } from '../camera.service';

/*

This componment opens a modal when called from TAB3.
TAB3 displays all CPD events, and gives user choice of adding, editing,
or delting an event. This is passed via Modal object to this class via @Inject
decorator.
This modal calls our dataservice to handle trasncation with back CRUD scripst
for adding, editing, removing events.
 */

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.page.html',
  styleUrls: ['./event-modal.page.scss'],
})

/**
 *  Here we present a screen (MODAL) to input a CPD event, and file back to backend DB 
   Use a NgForm to bind to html elemnet and capture submit button 
 * CameraService used to take or pick photo from gallery
   and store in file system of phone, and base64 url in database
 *  
 */

export class EventModalPage implements OnInit {

  @Input() editEvent!: cpdEvent; // event sent form calling class, tabs3
  isEdit = false; // convert to true if we are passed data to edit form calling class (list)
  public selectedDate: string = new Date().toISOString(); //ion date calender
  public selectedEndDate : string = new Date().toISOString();
  public   uploadEvent = {
    id: 0,
    title: '',
    description : '',
    hours : 0,
    startdate: new Date(this.selectedDate),
    endDate: new Date(this.selectedEndDate),
    eventOrganisers: '',
    CPDPoints: 0,
    compentancyCat: '',
    reflection: '',
    learningPlan : '',
    certificate: ''
  }
  
  // the veny to upload to backend
  //uploadEvent! : cpdEvent;

  constructor(
    private modalCtrl : ModalController, 
    private cameraService : CameraService,
    private service : DataService 
    ) { }

  ngOnInit() {
    /*
    If 'cpdEvent is not null it means a cpdEvent has been passed 
    from parnet class (List tab) for editing an event
    */
 
   console.log("evemt modeal ngOnit, event form tab3 = " + this.editEvent.title);
   if (this.editEvent){
    console.log("event-modal NgOnIt: tab3 ADD passed event to edit form List: " + this.editEvent.title)
    this.isEdit = true;
    this.uploadEvent = this.editEvent;
  }else{
    console.log("event-modal: ngOnOt- did not recive a event to edit form tab3 so this is a new event" 
    + " ; isEdit = ", this.isEdit )
  }

  }

  public getCertficatePhoto(){
    // Get photo of certifcate

    this.cameraService.addNewPhotoToDevice();
  }

  closeModal(){
    //Pas cancelled back t calling page 
    console.log("event-modla page: ClosedModal called");
    this.modalCtrl.dismiss(null, "closed");

  }


  onSubmit(form : NgForm) {
    console.log("even-modal onSubmit(): Cpd event form submitted with event: " + JSON.stringify(form.value));
    const event : cpdEvent = form.value;
    //this.modalCtrl.dismiss(this.editEvent,'Updated');

    if (this.editEvent){
      console.log("event-modal: on Submit()- updating CPD Event ID: ", this.editEvent.id);
      this.service.updateEvent(event, this.editEvent.id).subscribe(()=>{
        event.id = this.editEvent.id; 
        this.modalCtrl.dismiss(event,"Updated!");

      });

    }else{
      // Create a Mock event for testing
      console.log("Creating a Mock event dataservice : " + event.title);
      
      this.service.createNewEntMockData(event).subscribe((data : cpdEvent) => {
        console.log("event-modal new Evnet: go this array back form " 
        + "dataservice mockevents:  " + data);
        this.modalCtrl.dismiss(data , "created");
      },
      error=>{
        console.log("event-moal: error creating new mock event: " + JSON.stringify(error));
      },
      ()=>{
        console.log("event-modal- created new mock even, no errors.");
      }
      );
      
      // use this for backend remote DB
      /*
      console.log("Event-modal page: Creating a new event: ", event.name);
      this.service.createEvent(event).subscribe(response => {
        console.log("event-modal: creating new event response from service: " + response);
        this.modalCtrl.dismiss(response, "Created");// pass abck to calling [age]
        
      },
      error=> {
        console.log("event-modal: error creating new test: " + JSON.stringify(error));

      },
      ()=>{
        console.log("evert-modal- create new event, no errors.")
      });
      */
    }
    
  }
  
}//end class

