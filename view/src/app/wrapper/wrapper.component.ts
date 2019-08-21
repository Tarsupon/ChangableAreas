import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ComponentFactoryResolver, ComponentRef, ContentChild, ContentChildren,
  ElementRef,
  OnInit,
  QueryList, ViewChild,
  ViewChildren, ViewContainerRef,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { mergeMap, takeUntil } from 'rxjs/operators';
import { DevidedComponent } from '../devided/devided.component';
import { InjectDirective } from '../devided/inject.directive';
import { MidComponent } from '../mid/mid.component';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements AfterViewInit, AfterContentInit {
  title = 'view';
  width: number = 0;

  @ViewChild('templ', { static: false, read: ViewContainerRef }) entry;

  @ContentChildren(MidComponent) areas: QueryList<MidComponent>;
  @ContentChildren(DevidedComponent, {read: ElementRef}) deviders: QueryList<ElementRef>;

  newAreas: QueryList<MidComponent>;
  newDeviders: QueryList<ElementRef>;
  constructor(private resolver: ComponentFactoryResolver) {
  }

  createDevider() {
    const factory = this.resolver.resolveComponentFactory(DevidedComponent);
    this.entry.createComponent(factory);
  }

  ngAfterViewInit(): void {
    // this.newAreas.forEach(area => {
    //   this.createDevider()
    // })
    setTimeout(() => {
      this.newAreas.forEach((area: MidComponent) => {
          area.width = window.innerWidth / this.newAreas.length;
        }
      );
    });

    const move$ = fromEvent(window, 'mousemove');
    const up$ = fromEvent(window, 'mouseup');

    this.newDeviders.forEach(devider => {
      fromEvent(devider.nativeElement, 'mousedown').pipe(
        mergeMap(down => move$.pipe(takeUntil(up$)))
      ).subscribe((event: MouseEvent) => this.changeSizeUniversal(event.clientX, devider));
    });
  }

  ngAfterContentInit(): void {
    this.newAreas = this.areas;
    this.newDeviders = this.deviders;
  }

  private changeSizeUniversal(clientX: number, devider: ElementRef<any>) {

    const index = this.newDeviders.toArray().indexOf(devider);
    const beforeResizeWidthFirst = this.newAreas.toArray()[index].width;
    const beforeResizeWidthSecond = this.newAreas.toArray()[index + 1].width;

    if (index === 0) {
      this.newAreas.toArray()[index].width = clientX;
      this.newAreas.toArray()[index + 1].width = beforeResizeWidthFirst + beforeResizeWidthSecond - clientX;
    } else {
      let beforeCommonWidth: number = 0;
      this.newAreas.toArray()
        .filter(area => this.newAreas.toArray().indexOf(area) < index).forEach(area=> {
        beforeCommonWidth = beforeCommonWidth + area.width;
      });
      this.newAreas.toArray()[index].width = clientX - beforeCommonWidth;
      this.newAreas.toArray()[index + 1].width = beforeResizeWidthFirst + beforeResizeWidthSecond - this.newAreas.toArray()[index].width;
    }
  }
}
