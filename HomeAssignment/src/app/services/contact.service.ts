// contact.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Contact } from '../core/models/contact';
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:5010/api/V1'; // Replace with your actual API URL
  private contactsSubject = new BehaviorSubject<Contact[]>([]); // Create a BehaviorSubject for contacts

  constructor(private http: HttpClient) {
    this.fetchContacts(); // Fetch contacts initially
  }

  // Fetch contacts from API
  fetchContacts(): void {
    this.http.get<Contact[]>(`${this.apiUrl}/contact`).subscribe(
      (data) => this.contactsSubject.next(data), // Update BehaviorSubject
      (error) => console.error('Error fetching contacts:', error)
    );
  }

  // Method to get contacts as an observable
getContacts(): Observable<Contact[]> {
  return this.http.get<Contact[]>(`${this.apiUrl}/contact`).pipe(
    tap((data) => this.contactsSubject.next(data)) // Update BehaviorSubject with new data
  );
}

  // Method to get a contact by ID
  getContactById(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/GetContactById/${id}`); // API endpoint for getting a contact by ID
  }

  // Method to add a new contact
  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${this.apiUrl}/contact`, contact).pipe(
      tap(() => this.fetchContacts()) // Re-fetch contacts after adding
    );
  }

   // Method to update a contact
   updateContact(contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiUrl}/contact`, contact).pipe(
      tap(() => this.fetchContacts()) // Re-fetch contacts after adding
    );
  }

  // Method to delete a contact
  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/contact/${id}`); // API endpoint for deleting a contact
  }
  
}
