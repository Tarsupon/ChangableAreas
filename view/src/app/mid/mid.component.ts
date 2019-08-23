import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-mid',
  templateUrl: './mid.component.html',
  styleUrls: ['./mid.component.scss']
})
export class MidComponent implements AfterViewInit {
  @ViewChild('mid', {static: false })
  midCont: ElementRef;

  @Input() width: number;
  @Input() height: number;

  ngAfterViewInit(): void {
    fromEvent(window, 'resize')
      .subscribe((event) => {
        this.width = this.midCont.nativeElement.clientWidth;
        this.height = this.midCont.nativeElement.clientHeight;
      });
  }
}
