import { AfterViewInit, Component, ContentChild, ContentChildren, ElementRef, QueryList } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent {

  @ContentChild('headerContent', { static: false })
  header: ElementRef;
  @ContentChildren(ChildComponent, { descendants: true })
  headers: QueryList<ChildComponent>;

  change() {
    console.log(this.header);
    this.header.nativeElement.textContent = 'Yeah right!';
  }

}
