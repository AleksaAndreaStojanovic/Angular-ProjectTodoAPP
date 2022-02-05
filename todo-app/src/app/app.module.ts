import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TodosComponent } from './components/todos/todos.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { TodoComponent } from './components/todo/todo.component';
import { appStoreProviders } from './app.store';
import { FilterPipe } from './helpers/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    AboutComponent,
    NotFoundComponent,
    TodosComponent,
    LoginComponent,
    RegisterComponent,
    TodoFormComponent,
    TodoComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [appStoreProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
