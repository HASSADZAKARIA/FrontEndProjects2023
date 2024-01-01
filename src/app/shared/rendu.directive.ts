import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appBienRendu]'
})
export class RenduDirective {

  constructor(el:ElementRef) {
    const elementStyles = el.nativeElement.style;
    elementStyles.color='black';
    elementStyles.border='2px dashed green';
    elementStyles.backgroundColor='lightyellow';
  
  }

}
