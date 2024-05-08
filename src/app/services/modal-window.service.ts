import { ComponentFactoryResolver, Inject, Injectable, Injector, TemplateRef } from '@angular/core';

import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';
import { ModalWindowComponent } from '../UI/modal-window/modal-window.component';

@Injectable({
  providedIn: 'root'
})
export class ModalWindowService {
  private modalNotifier?: Subject<string>;
  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document
  ) {}

  open(content: TemplateRef<any>) {
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
    this.modalNotifier = new Subject();
    return this.modalNotifier?.asObservable();
  }

  closeModal() {
    this.document.body.classList.remove('modal-open')
    this.modalNotifier?.complete();
  }

}
