import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Contact } from '../../core/models/contact';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../services/contact.service';
@Component({
  selector: 'app-edit-contact',
  standalone: true,
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css'],
  imports: [ReactiveFormsModule,CommonModule] // Include ReactiveFormsModule here
})
export class EditContactComponent implements OnInit {
  contactForm: FormGroup;
  contactId!: number;

  constructor(private router: Router, private route: ActivatedRoute,private contactService: ContactService, private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    // Retrieve the contact ID from the route parameters
    this.contactId = Number(this.route.snapshot.paramMap.get('id'));
    // Load the contact data (you can replace this with a service call)
    this.loadContactData(this.contactId);
    //console.log("list=",this.contactId)
  }

  // Mock method to simulate loading contact data
  loadContactData(id: number) {
    // In a real application, you'd fetch this data from a service
    this.contactService.getContactById(this.contactId).subscribe(
      (contact: Contact) => {
        // Populate the form with existing contact data
        this.contactForm.patchValue(contact);
      },
      (error) => {
        console.error('Error loading contact:', error);
      }
    );
  }

  // Method to handle editing the contact
  editContact() {
    if (this.contactForm.valid) {
      const updatedContact: Contact = {
        id: this.contactId, // Use the same ID for the updated contact
        ...this.contactForm.value
      };
      this.contactService.updateContact(updatedContact).subscribe(
        () => {
          this.router.navigate(['']); // Navigate to the contact list
              // After adding the contact, navigate back to the contact list
              alert(`${updatedContact.firstName} ${updatedContact.lastName} has been updated.`);
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
