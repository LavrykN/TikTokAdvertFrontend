import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {MainLoyoutComponent} from "./shared/components/main-loyout/main-loyout.component";
import {AddAccountComponent} from "./add-account/add-account.component";
import {HelpMeComponent} from "./help-me/help-me.component";
import {ModalComponent} from "./modal/modal.component";




const routes: Routes = [
  {
    path: '', component: MainLoyoutComponent, children:[
      {path: '', redirectTo: '/account', pathMatch: 'full'},
      {path: 'account', component: HomePageComponent, children: [
          {
            path: 'login',
            component: ModalComponent,
            outlet: 'modal'
          }
        ]},
      {path: 'add-new-account', component: AddAccountComponent},
      {path: 'help', component: HelpMeComponent},
    ]
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
