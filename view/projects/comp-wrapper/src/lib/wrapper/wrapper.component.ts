import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren, ElementRef,
  Input,
  QueryList,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { mergeMap, takeUntil } from 'rxjs/operators';
import { MidComponent } from '../../../../../src/app/mid/mid.component';
import { DevidedComponent } from '../devided/devided.component';

@Component({
  selector: 'enl-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css']
})
export class WrapperComponent implements AfterViewInit, AfterContentInit {
  title = 'view';
  width = 0;

  @Input() horizontal: boolean;
  @ViewChild('templ', { static: false, read: ViewContainerRef }) entry: any;

  @ContentChildren(MidComponent) areas: QueryList<MidComponent>;
  @ContentChildren(DevidedComponent, {read: ElementRef}) deviders: QueryList<ElementRef>;

  newAreas: QueryList<MidComponent>;
  newDeviders: QueryList<ElementRef>;

  changeDeviderOrientationToGorizontal(devider: ElementRef<any>) {
    const deviderStyle = devider.nativeElement.style;
    deviderStyle.width = '100%';
    deviderStyle.height = '20px';
  }
  changeDeviderOrientationToVertical(devider: ElementRef<any>) {
    const deviderStyle = devider.nativeElement.style;
    deviderStyle.width = '20px';
    deviderStyle.height = '100%';
  }

  changeAreaOrientationToGorizontal(area: MidComponent) {
    area.width = window.innerWidth;
    area.height = (window.innerHeight - this.newDeviders.first.nativeElement.clientHeight * this.newDeviders.length) / this.newAreas.length;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.newAreas.forEach((area: MidComponent) => {
        if (this.horizontal) {
          this.changeAreaOrientationToGorizontal(area);
        } else {
          area.height = window.innerHeight;
          area.width = (window.innerWidth - this.newDeviders.length
            * this.newDeviders.first.nativeElement.clientWidth) / this.newAreas.length;
        }
      }
      );
    });

    const move$ = fromEvent(window, 'mousemove');
    const up$ = fromEvent(window, 'mouseup');

    this.newDeviders.forEach(devider => {
      if (this.horizontal) {
        this.changeDeviderOrientationToGorizontal(devider);
        fromEvent(devider.nativeElement, 'mousedown').pipe(
          mergeMap(down => move$.pipe(takeUntil(up$)))
        ).subscribe((event: MouseEvent) => this.changeHeight(event.clientY, devider));
      } else {
        this.changeDeviderOrientationToVertical(devider);
        fromEvent(devider.nativeElement, 'mousedown').pipe(
          mergeMap(down => move$.pipe(takeUntil(up$)))
        ).subscribe((event: MouseEvent) => this.changeWidth(event.clientX, devider));
      }
    });
  }

  ngAfterContentInit(): void {
    this.newAreas = this.areas;
    this.newDeviders = this.deviders;
  }

  private changeHeight(clientY: number, devider: ElementRef<any>) {
    const index = this.newDeviders.toArray().indexOf(devider);
    const beforeResizeHeightFirst = this.newAreas.toArray()[index].height;
    const beforeResizeHeightSecond = this.newAreas.toArray()[index + 1].height;
    const areas = this.newAreas.toArray();

    let beforeCommonHeight = 0;
    areas.filter(area => areas.indexOf(area) < index).forEach(area => {
        beforeCommonHeight = beforeCommonHeight + area.height;
      });
    let afterCommonHeight = 0;
    areas.filter(area => areas.indexOf(area) > index + 1).forEach(area => {
        afterCommonHeight = afterCommonHeight + area.height;
      });
    const reversY = window.innerHeight - clientY - (this.newDeviders.length - (index + 1))
      * this.newDeviders.first.nativeElement.clientHeight;
    if (beforeCommonHeight < clientY - (index + 1) * this.newDeviders.first.nativeElement.clientHeight && afterCommonHeight < reversY) {
        areas[index].height = clientY - (index + 1) * this.newDeviders.first.nativeElement.clientHeight - beforeCommonHeight;
        areas[index + 1].height = beforeResizeHeightFirst + beforeResizeHeightSecond - areas[index].height;
      }
  }

  private changeWidth(clientX: number, devider: ElementRef<any>) {

    const index = this.newDeviders.toArray().indexOf(devider);
    const beforeResizeWidthFirst = this.newAreas.toArray()[index].width;
    const beforeResizeWidthSecond = this.newAreas.toArray()[index + 1].width;
    const areas = this.newAreas.toArray();

    let beforeCommonWidth = 0;
    areas.filter(area => areas.indexOf(area) < index).forEach(area => {
          beforeCommonWidth = beforeCommonWidth + area.width;
        });
    let afterCommonWidth = 0;
    areas.filter(area => areas.indexOf(area) > index + 1).forEach(area => {
          afterCommonWidth = afterCommonWidth + area.width;
        });
    const reversX = window.innerWidth - clientX - (this.newDeviders.length - (index + 1))
      * this.newDeviders.first.nativeElement.clientWidth;
    if (beforeCommonWidth < clientX - (index + 1) * this.newDeviders.first.nativeElement.clientWidth && afterCommonWidth < reversX) {
          areas[index].width = clientX - (index + 1) * this.newDeviders.first.nativeElement.clientWidth - beforeCommonWidth;
          areas[index + 1].width = beforeResizeWidthFirst + beforeResizeWidthSecond - areas[index].width;
        }


  }
}
