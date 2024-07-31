import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, MinLengthValidator, ReactiveFormsModule, Validators } from '@angular/forms';
import { Creator, CreatorService } from './service.service';

@Component({
  selector: 'app-creator-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './creator-registration.component.html',
  styleUrl: './creator-registration.component.scss'
})
export class CreatorRegistrationComponent {
  RegForm:FormGroup;
  constructor(private fb :FormBuilder, private service :CreatorService,private el: ElementRef){
    this.RegForm = this.fb.group(
      {
        PersonalID: new FormControl('', [Validators.required, Validators.minLength(12)]),
        PhoneNumber: new FormControl('', [
          Validators.required,
          Validators.minLength(9),
        ]),
        IdCardPhoto:['', Validators.required],
      }
    )
  }
  Server_response :string = "";
  modalVisible = false;
  showModal() {
    this.modalVisible = true;
      setTimeout(() => {
      this.modalVisible = false;
    }, 10000); 
  }
  hideModal() {
    this.modalVisible = false;
  }

  RegisterCreator(){
    if(this.RegForm.valid){
      console.log(this.RegForm.value);
      const newcreator : Creator = {
        PersonalID : this.RegForm.value.PersonalID,
        PhoneNumber : this.RegForm.value.PhoneNumber,
        IdCardPhoto : "asads",
        UserID: 0,
        Verified: false,
      };
      this.service.CreatorRegistration(newcreator).subscribe(
        (resp)=>{
          console.log(resp.message);
          this.showModal();
          this.Server_response = (resp.message);
        },
        (error)=>{
          console.log(error.message);
          this.showModal();
          this.Server_response = (error.message);
        }
      )
    }
  }

}
