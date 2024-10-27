import { Component, Input } from '@angular/core';
import { Contact } from '../core/models/contact';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { ContactService } from '../services/contact.service';
import { TableComponent } from '../table/table.component';


@Component({
  selector: 'app-contactlist',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './contactlist.component.html',
  styleUrl: './contactlist.component.css'
})
export class ContactlistComponent {
  constructor(private contactService: ContactService,private router: Router) {}
  contacts: Contact[] = [];
  styleName:string="";

  ngOnInit(): void {
    this.fetchContacts(); // Call the fetchContacts method when the component initializes

        // Subscribe to router events and refresh contacts on navigation
        this.router.events.subscribe(event => {
          if (event instanceof NavigationEnd) {
            this.fetchContacts();  // Refresh data on every route navigation
          }
        });
  }

  OpenPopup():void{
    this.styleName="block"
}

ClosePopup():void{
  this.styleName="none"
}

  

  // Fetch contacts from the service
  fetchContacts(): void {
    this.contactService.getContacts().subscribe(
      (data: Contact[]) => {
        this.contacts = data.sort((a, b) => a.id - b.id); // Assign the fetched data to the contacts array
      },
      (error) => {
        console.error('Error fetching contacts:', error); // Handle any errors
      }
    );
  }

  // Method to handle edit action
  onEditContact(contactId: number) {
    console.log("list=",contactId)
    this.router.navigate(['/edit-contact', contactId]);
  }
  
  // Method to handle delete action
  onDeleteContact(contact: Contact) {
    if (confirm(`Are you sure you want to delete ${contact.firstName} ${contact.lastName}?`)) {
      this.contacts = this.contacts.filter(c => c.id !== contact.id);
      this.contactService.deleteContact(contact.id).subscribe(
        () => {
         this.router.navigate(['']); // Navigate to the contact list
        },
        (error) => {
          console.error('Error adding contact:', error);
        }
      );
      alert(`${contact.firstName} ${contact.lastName} has been deleted.`);
    }
  }
  navigateToAddContact(){
    this.router.navigate(['/add-contact']);
  }
  }

  

  
  
