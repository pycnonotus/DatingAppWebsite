import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { AccountFillMissingInfoComponent } from './account-fill-missing-info/account-fill-missing-info.component';
import { FindMatchComponent } from './find-match/find-match.component';
import {HomePageComponent} from './home-page/home-page.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  { path: 'complete-register', component: AccountFillMissingInfoComponent },
  {
    path: '',
    component: MainComponent,
    children: [{ path: 'find', component: FindMatchComponent }],
  },
];

@NgModule({
  imports : [RouterModule.forRoot(routes)],
  exports : [RouterModule]
})
export class AppRoutingModule {
}
