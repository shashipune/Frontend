import { Routes } from '@angular/router';
import { ContactlistComponent } from './contactlist/contactlist.component';
import { AddContactComponent } from './AddContact/add-contact/add-contact.component';
import { EditContactComponent } from './EditContact/edit-contact/edit-contact.component';

export const routes: Routes = [
    { path: '', component: ContactlistComponent }, // Set default path
    { path: 'add-contact', component: AddContactComponent },
    { path: 'edit-contact/:id', component: EditContactComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' } // Redirect unknown paths to default
]
