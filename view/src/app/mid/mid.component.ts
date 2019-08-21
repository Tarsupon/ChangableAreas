import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-mid',
  templateUrl: './mid.component.html',
  styleUrls: ['./mid.component.scss']
})
export class MidComponent implements OnInit, AfterViewInit {
  @ViewChild('mid', {static: false })
  midCont: ElementRef;

  @Input() width: number;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    fromEvent(window, 'resize')
      .subscribe((event) => {
        this.width = this.midCont.nativeElement.clientWidth;
      });
  }
}
