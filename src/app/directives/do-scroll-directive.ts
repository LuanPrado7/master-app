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
            $(this.el.nativeElement).doScroll({
                // scrollbar: $('<div></div>').css({
                //     backgroundColor: '#fff',
                //     border: '2px solid #000',
                //     width: '10px',
                //     height: '75px',
                //     borderRadius: '5px',
                //     marginLeft: '-13px'
                })
            });
        }, 0);
    }
}
