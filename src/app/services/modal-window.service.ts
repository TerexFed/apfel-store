import { ComponentFactoryResolver, ComponentRef, Inject, Injectable, Injector, TemplateRef } from '@angular/core';

import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';
import { ModalWindowComponent } from '../UI/modal-window/modal-window.component';

@Injectable({
  providedIn: 'root'
})
export class ModalWindowService {
  private modalComponentRef: ComponentRef<ModalWindowComponent> | null = null;
  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document
  ) {}

  open(content: TemplateRef<any>) {
    this.closeModal()
    this.document.body.scrollTop = 0; 
    this.document.documentElement.scrollTop = 0;
    const modalComponentFactory = this.resolver.resolveComponentFactory(
      ModalWindowComponent
    );
    const contentViewRef = content.createEmbeddedView(null);
    const modalComponent = modalComponentFactory.create(this.injector, [
      contentViewRef.rootNodes,
    ]);
    this.document.body.classList.add('modal-open')
    modalComponent.instance.closeEvent.subscribe(() => this.closeModal());

    modalComponent.hostView.detectChanges();

    this.document.body.appendChild(modalComponent.location.nativeElement);
    this.modalComponentRef = modalComponent
  }

  closeModal() {
    if (this.modalComponentRef) {
      this.document.body.classList.remove('modal-open');
      this.modalComponentRef.destroy();
      this.modalComponentRef = null;
    }
  }

}
