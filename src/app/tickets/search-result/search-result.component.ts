import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SearchService } from './search.service';
import { Routes, appRoutes } from '../../route-paths';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [MatIcon, CommonModule, RouterLink, TranslateModule],
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit, OnDestroy {
  searchTerm: string = '';
  searchResult: any[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private service: SearchService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.searchTerm = params['id'];
      this.loadResult();
      this.scrollToTop();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadResult(): void {
    this.searchResult = []; 
    
    if (this.searchTerm) {
      this.service.search(this.searchTerm).subscribe(
        (resp) => {
          if (resp && resp.length > 0) {
            this.searchResult = resp;
          } else {
            console.log('No results found for:', this.searchTerm);
          }
        },
        (error) => {
          console.error('Error fetching search results:', error);
        }
      );
    }
  }
  

  private scrollToTop(): void {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  }

  public TicketViewCount(id: number): void {
    this.service.TicketViewCount(id).subscribe(
      (resp: any) => {
      },
      (error: any) => {
        console.error('Error updating ticket view count:', error);
      }
    );
  }

  routes: Routes = appRoutes;
}
