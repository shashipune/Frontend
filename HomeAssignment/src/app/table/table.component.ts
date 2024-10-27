import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { Contact } from '../core/models/contact';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  @Input() contactDetails!: Contact[];

   // Output events to notify parent component
   @Output() contactEdit = new EventEmitter<number>();
   @Output() contactDelete = new EventEmitter<Contact>();

     // Method to handle edit button click
   editContact(contactId: number) {
    this.contactEdit.emit(contactId);  // Emit contact id to parent component
  }

  // Method to handle delete button click
  deleteContact(contact: Contact) {
    this.contactDelete.emit(contact);  // Emit contact object to parent component
  }
}
