import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { ActivatedRoute, OnSameUrlNavigation, Router } from '@angular/router';
import { CrudService } from './crud.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.scss'
})
export class CrudComponent implements OnInit{
  id:number = 0
  TicketToedit: any = null;
  constructor(private router : ActivatedRoute, private service: CrudService){

  }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.MatchingTicket();
  }

  MatchingTicket(){
    this.service.getMatchingTicket(this.id).subscribe(
      (resp)=> {
        this.TicketToedit = resp;
        console.log(resp)
      },
      (error)=>{
        console.log(error)
      }

    )
  } 


  
}
