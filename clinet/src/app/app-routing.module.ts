import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { AccountFillMissingInfoComponent } from './account-fill-missing-info/account-fill-missing-info.component';
import { FindMatchComponent } from './find-match/find-match.component';
import {HomePageComponent} from './home-page/home-page.component';
import { MainComponent } from './main/main.component';
import { MatchesComponent } from './matches/matches.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      { path: 'find', component: FindMatchComponent },
      { path: '', component: FindMatchComponent },
      { path: 'match', component: MatchesComponent },
    ],
  },
];

@NgModule({
  imports : [RouterModule.forRoot(routes)],
  exports : [RouterModule]
})
export class AppRoutingModule {
}
