import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, RouterLink} from '@angular/router';
import { CategoriesService } from './categories.service';
import { Subject, takeUntil } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { appRoutes ,Routes} from '../../route-paths';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink,
    TranslateModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit, OnDestroy{

  routes: Routes = appRoutes;

  constructor(private service :CategoriesService, private router : ActivatedRoute ){
  }
  categoryName :string = ''; 
  private destroy$ = new Subject<void>(); 
  ngOnInit(): void {
    this.router.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.categoryName = params['id'];
      this.loadCategorisedTicket();
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }



  
  categorisedTickets :any[] = [];
  everyTicketTitle:string = '';
  sendrequsest: boolean = false;
  loadCategorisedTicket() {
    this.service.loadFoundTicket(this.categoryName).subscribe(
      (resp)=>{
        this.categorisedTickets = resp;
      },
      (error)=>{

      }
    )
  }



  topTickets: Set<number> = new Set(); 
  isTopTicket(ticket: any): boolean {
    return this.topTickets.has(ticket.id);
  }

  TicketViewCount(id:number){
    this.service.TicketViewCount(id).subscribe(
      (resp:any)=>{
      },
      (error:any)=>{
      }
    )
  }
}
