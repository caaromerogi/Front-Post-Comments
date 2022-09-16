import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { PostComponent } from './components/post/post.component';
import { DetailsPostComponent } from './details-post/details-post.component';

const routes: Routes = [{path:'home', component:MainComponent},
// {path:'**', redirectTo:''},
{path:'login', component:LoginComponent},
{path:'home/post/:id', component:DetailsPostComponent},
{path:'', redirectTo:'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
