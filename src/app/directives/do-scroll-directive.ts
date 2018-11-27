import { OnInit, Directive, ElementRef } from "@angular/core";

declare const $: any;

@Directive({
    selector: '[doScroll]'
})
export class DoScrollDirective implements OnInit {
    constructor(
        private el: ElementRef
    ) { }

    ngOnInit() {
        setTimeout(() => {
            $(this.el.nativeElement).doScroll({})
        }, 0);
    }
}
