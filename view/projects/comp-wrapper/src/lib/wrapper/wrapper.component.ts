import {
  AfterContentInit,
  AfterViewInit,
  Component, ComponentFactoryResolver,
  ContentChildren, ElementRef,
  Input,
  OnInit, QueryList,
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
  width: number = 0;

  @Input() gorizontal: boolean;
  @ViewChild('templ', { static: false, read: ViewContainerRef }) entry;

  @ContentChildren(MidComponent) areas: QueryList<MidComponent>;
  @ContentChildren(DevidedComponent, {read: ElementRef}) deviders: QueryList<ElementRef>;

  newAreas: QueryList<MidComponent>;
  newDeviders: QueryList<ElementRef>;
  constructor(private resolver: ComponentFactoryResolver) {
  }

  // createDevider() {
  //   const factory = this.resolver.resolveComponentFactory(DevidedComponent);
  //   this.entry.createComponent(factory);
  // }

  changeDeviderOrientationToGorizontal(devider: ElementRef<any>) {
    let deviderStyle = devider.nativeElement.style;
    deviderStyle.width = '100%';
    deviderStyle.height = '20px';
  }
  changeDeviderOrientationToVertical(devider: ElementRef<any>) {
    let deviderStyle = devider.nativeElement.style;
    deviderStyle.width = '20px';
    deviderStyle.height = '100%';
  }

  changeAreaOrientationToGorizontal(area: MidComponent) {
    area.width = window.innerWidth;
    area.height = (window.innerHeight - this.newDeviders.first.nativeElement.clientHeight * this.newDeviders.length) / this.newAreas.length;
  }

  ngAfterViewInit(): void {
    // this.newAreas.forEach(area => {
    //   this.createDevider()
    // })
    setTimeout(() => {
      this.newAreas.forEach((area: MidComponent) => {
        if (this.gorizontal) {
          this.changeAreaOrientationToGorizontal(area);
        } else {
          area.height = window.innerHeight;
          area.width = (window.innerWidth - this.newDeviders.length * this.newDeviders.first.nativeElement.clientWidth) / this.newAreas.length;
        }
      }
      );
    });

    const move$ = fromEvent(window, 'mousemove');
    const up$ = fromEvent(window, 'mouseup');

    this.newDeviders.forEach(devider => {
      if (this.gorizontal) {
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

    if (index === 0) {
      areas[index].height = clientY;
      areas[index + 1].height = beforeResizeHeightFirst + beforeResizeHeightSecond - clientY;
    } else {
      let beforeCommonHeight: number = 0;
      areas.filter(area => areas.indexOf(area) < index).forEach(area=> {
        beforeCommonHeight = beforeCommonHeight + area.height;
      });
      areas[index].height = clientY - beforeCommonHeight;
      areas[index + 1].height = beforeResizeHeightFirst + beforeResizeHeightSecond - areas[index].height;
    }
  }

  private changeWidth(clientX: number, devider: ElementRef<any>) {

    const index = this.newDeviders.toArray().indexOf(devider);
    const beforeResizeWidthFirst = this.newAreas.toArray()[index].width;
    const beforeResizeWidthSecond = this.newAreas.toArray()[index + 1].width;
    const areas = this.newAreas.toArray();

    if (index === 0) {
      areas[index].width = clientX;
      areas[index + 1].width = beforeResizeWidthFirst + beforeResizeWidthSecond - clientX;
    } else {
      let beforeCommonWidth: number = 0;
      areas.filter(area => areas.indexOf(area) < index).forEach(area => {
        beforeCommonWidth = beforeCommonWidth + area.width;
      });
      areas[index].width = clientX - (index + 1) * this.newDeviders.first.nativeElement.clientWidth - beforeCommonWidth;
      areas[index + 1].width = beforeResizeWidthFirst + beforeResizeWidthSecond - areas[index].width;
    }
  }
}
