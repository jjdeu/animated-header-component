import {Component, ContentChild, Input, NgZone, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'animated-header',
  templateUrl: 'animated-header.component.html'
})
export class AnimatedHeaderComponentClass implements OnInit {

  // How much opacity should be applied to the upper-parallax.
  // 0 = no opacity animation
  // 1 = 1 to 0 opacity
  // 2 = 1 to 0.5 opacity
  // 3 = 1. to 0.333 opacity
  // etc
  @Input('opacityFactor') opacityFactor: number = 1;

  @ContentChild('ionHeader') ionHeader: any;
  @ContentChild('ionContent') ionContent: any;
  @ContentChild('fixedMenuButton') fixedMenuButton:any;
  @ContentChild('secondHeader') secondHeader:any;

  // The normal ionic-header at the top of the page. Starts not-visible (opacity 0)
  private _ionHeaderTitle: any;
  // This is element that contains the fading background-image
  private _fixedContent: any;

  // Height of the ionic header at the top.
  private _ionHeaderHeight: number = 56; // TODO: maybe better to calculate this in case ionic changes the height in the future
  // How far down does the scroll-content start. Used to start animation and the changing of the opacity of the background image
  private _scrollPaddingTop: number;

  constructor(public renderer: Renderer2) {

  }

  ngOnInit() {

    // TODO: check if all necessary elements are present, otherwise throw error

    let theIonContentElementRef = this.ionContent._elementRef;
    let theScrollContent = theIonContentElementRef.nativeElement.querySelector('.scroll-content');
    this._fixedContent = theIonContentElementRef.nativeElement.querySelector('.fixed-content');

    let thePaddingTopString = window.getComputedStyle(theScrollContent)['padding-top'];
    this._scrollPaddingTop = Number(thePaddingTopString.substring(0, thePaddingTopString.length - 2));


    this._ionHeaderTitle = this.ionHeader.nativeElement.querySelector('ion-title');

    // The fixed content contains the fading background image.
    // This needs to have the height of the top-padding + the the height of  so the image is visible
    // TODO: this should be more flexible. Should be working without the secondHeader
    let theSecondHeaderElementRef = this.secondHeader._elementRef;
    let theSecondHeaderHeightString = window.getComputedStyle(theSecondHeaderElementRef.nativeElement)['height'];
    let theSecondHeaderHeightAsNumber = Number(theSecondHeaderHeightString.substring(0, theSecondHeaderHeightString.length - 2));
    this.renderer.setStyle(this._fixedContent, 'height', this._scrollPaddingTop + theSecondHeaderHeightAsNumber + 'px');

    // Subscribe to the scroll-event
    this.ionContent.ionScroll.subscribe((event) => {
      this._setOpacityFactor(event.scrollTop);
      this._setTransitionClasses(event.scrollTop);
    });
  }

  /**
   * Set the opacity of the background-image based on the scroll-position
   * @param {number} scrollTop
   * @private
   */
  private _setOpacityFactor(scrollTop:number) {
    if(this.opacityFactor > 0) {
      let theNewHeaderHeight = this._scrollPaddingTop - (scrollTop / this.opacityFactor);
      if(theNewHeaderHeight < 0) {
        theNewHeaderHeight = 0;
      }
      let theNewOpacity = theNewHeaderHeight / this._scrollPaddingTop;
      this.renderer.setStyle(this._fixedContent, 'opacity', theNewOpacity.toString());
    }
  }

  /**
   * Add or remove the css-classes that trigger the transitions
   * @param {number} scrollTop
   * @private
   */
  private _setTransitionClasses(scrollTop:number) {

      // 2 steps in the animation-process of the header:
      // 1. Make the header visible when top of parallax-bottom touches it
      if (scrollTop + this._ionHeaderHeight > this._scrollPaddingTop) {
        this.renderer.addClass(this.ionHeader.nativeElement, 'visible');
        this.renderer.addClass(this.fixedMenuButton.nativeElement, 'visible');
      } else if(scrollTop + this._ionHeaderHeight < this._scrollPaddingTop) {
        this.renderer.removeClass(this.ionHeader.nativeElement, 'visible');
        this.renderer.removeClass(this.fixedMenuButton.nativeElement, 'visible');
      }
      // 2. Show the the title in the header when the Parallax-bottom is no longer visible
      if (scrollTop > this._scrollPaddingTop) {
        this.renderer.addClass(this._ionHeaderTitle, 'animate');
      } else if(scrollTop < this._scrollPaddingTop) {
        this.renderer.removeClass(this._ionHeaderTitle, 'animate');
      }

  }


}
