import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Contact } from '../../core/models/contact';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css'],
  imports: [ReactiveFormsModule,CommonModule]  // Include ReactiveFormsModule here
})
export class AddContactComponent {
  contactForm: FormGroup;

  constructor(private router: Router,private contactService: ContactService, private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // Method to handle adding a new contact
  addNewContact() {
    if (this.contactForm.valid) {
      const newContact: Contact = this.contactForm.value;

      this.contactService.addContact(newContact).subscribe(
        () => {
          this.router.navigate(['']); // Navigate to the contact list
          // After adding the contact, navigate back to the contact list
          alert(`${newContact.firstName} ${newContact.lastName} has been added.`);
        },
        (error) => {
          console.error('Error adding contact:', error);
        }
      );
      
    }
  }

  Cancel(){
    this.router.navigate(['']); // Navigate to the contact list
  }
}
