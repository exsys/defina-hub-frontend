import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  showAlert: boolean = false;
  showError: boolean = false;
  errorMsg: string = "";

  suggestionForm = new FormGroup({
    discordName: new FormControl(""),
    suggestionText: new FormControl("", Validators.required)
  });

  constructor(
    private backend: BackendService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    // if nothing has been written don't send the empty suggestion to backend. (I'm ignoring angular validators with that tho.. lol)
    if(this.suggestionForm.controls["suggestionText"].value === "") return;
    
    const suggestionObj = {
      username: this.suggestionForm.controls["discordName"].value,
      suggestion: this.suggestionForm.controls["suggestionText"].value
    };

    this.backend.sendSuggestion(suggestionObj).subscribe(res => {
      if(res.status === 200) {
        this.suggestionForm.controls["suggestionText"].setValue("");
        this.showAlert = true;
      }
    }, error => {
      if (error.error.msg) {
        this.errorMsg = error.error.msg;
        this.showError = true;
      }
    });
  }

  hideAlert(): void {
    this.showAlert = false;
  }

  hideError(): void {
    this.errorMsg = "";
    this.showError = false;
  }

}
