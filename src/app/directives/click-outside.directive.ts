import { Directive, Output, EventEmitter, Input, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective {

  @Output() clickOutside: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Input() isVisible: boolean = false;
  private showContent: boolean = false;

  constructor(
    private emRef: ElementRef
  ) { }

  @HostListener("document:click", ["$event"])
  onClick(event: MouseEvent): void {
    if(!event.target) return;

    // in case dropdown was closed by a click inside by other means
    if(!this.isVisible) this.showContent = false;

    if(this.showContent) {
      // this part should only be reached when a click outside was done. a click inside of the element shouldn't be able to reach this part.
      if(!this.emRef.nativeElement.contains(event.target)) {
        this.showContent = false;
        this.clickOutside.emit(event);
      }
    } else if (this.isVisible) {
      this.showContent = true;
    }
  }

}
