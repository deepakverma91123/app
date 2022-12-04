import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  form: FormGroup;
  websiteList: any = [
    { id: 1, name: 'It.com' },
    { id: 2, name: 'HDTuto.com' },
    { id: 3, name: 'NiceSnippets.com' }
  ];

   weekdata:any = [
    { id: 0, name: 'Monday', checked: false },
    { id: 1, name: 'Tuesday', checked: false },
    { id: 2, name: 'Wednesday', checked: false },
    { id: 3, name: 'Thursday', checked: false },
    { id: 4, name: 'Friday', checked: false },
    { id: 5, name: 'Satureday', checked: false },
    { id: 6, name: 'Sunday', checked: false },
  ];
  
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      website: this.formBuilder.array([], [Validators.required]),
      address: this.formBuilder.array([this.addAddressGroup()])
    })
  }


    //Append Fields Set
    private addAddressGroup(): FormGroup {
      return this.formBuilder.group({
        street: [],
        city: [],
        state: []
      });
    }

    addAddress(): void {
      this.addressArray.push(this.addAddressGroup());
    }
   
    //Remove Fields
    removeAddress(index: number): void {
      this.addressArray.removeAt(index);
    }
    //Fields Array
    get addressArray(): FormArray {
      return <FormArray>this.form.get('address');
    }
  
    
  onCheckboxChange(e:any) {
    const website: FormArray = this.form.get('website') as FormArray;
  
    if (e.target.checked) {
      website.push(new FormControl(e.target.value));
    } else {
       const index = website.controls.findIndex(x => x.value === e.target.value);
       website.removeAt(index);
    }
  }
    
  submit(){
    console.log(this.form.value);
  }
}
