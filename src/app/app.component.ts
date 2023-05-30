import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  currentPage: any = null;
  parent: any = null;
  contentParentId: string = 'content';
  constructor(private httpClient: HttpClient) {}
  ngOnInit(): void {}

  async sleep(timeout: number): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, timeout);
    });
  }

  async getNewPage(): Promise<HTMLDivElement> {
    return new Promise((resolve, reject) => {
      const pages = document.getElementById('pages');
      const page = document.createElement('div');
      page.className = 'page';
      pages?.appendChild(page);
      resolve(page);
    });
  }

  async splitPages() {
    const content = document.getElementById(this.contentParentId);
    if (content) {
      content.style.display = 'none';
      this.currentPage = await this.getNewPage();
      await this.sleep(20);
      if (content.childElementCount) {
        for (let i = 0; i < content.childElementCount; i++) {
          this.parent = this.currentPage;
          await this.appendChild(content.children[i]);
          await this.sleep(20);
        }
      }
    }
  }

  async appendChild(child: any): Promise<void> {
    return new Promise(async (resolve, reject) => {
      if (!child) resolve();
      const childClone = child.cloneNode(
        !child.childElementCount ||
          child.nodeName.toLowerCase() === 'table' ||
          child.nodeName.toLowerCase() === 'form'
      );
      this.parent.appendChild(childClone);
      // window.scrollTo(0, document.body.scrollHeight);
      console.clear();
      console.log(`file: app.component.ts:53  appendChild  this.currentPage:`, this.currentPage);
      console.log(
        `file: app.component.ts:56  returnnewPromise  childClone.nodeName:`,
        childClone.nodeName
      );
      await this.sleep(20);
      console.log(
        `file: app.component.ts:67  returnnewPromise  childClone.offsetTop:`,
        childClone.offsetTop
      );
      await this.sleep(20);
      console.log(
        `file: app.component.ts:68  returnnewPromise  childClone.offsetHeight:`,
        childClone.offsetHeight
      );
      await this.sleep(20);
      const childTotalHeight = childClone.offsetTop + childClone.offsetHeight;
      console.log(
        `file: app.component.ts:81  returnnewPromise  childTotalHeight:`,
        childTotalHeight
      );
      await this.sleep(20);
      console.log(
        `file: app.component.ts:69  returnnewPromise  currentPage.offsetTop:`,
        this.currentPage.offsetTop
      );
      await this.sleep(20);
      console.log(
        `file: app.component.ts:69  returnnewPromise  currentPage.offsetHeight:`,
        this.currentPage.offsetHeight
      );
      await this.sleep(20);
      const currentPageTotalHeight =
        this.currentPage?.offsetTop + this.currentPage?.offsetHeight + 10;
      console.log(
        `file: app.component.ts:83  returnnewPromise  currentPageTotalHeight:`,
        currentPageTotalHeight
      );
      await this.sleep(20);
      if (childTotalHeight > currentPageTotalHeight) {
        this.parent.removeChild(childClone);
        const node = this.getParentTree(child, childClone);
        await this.sleep(20);
        this.currentPage = await this.getNewPage();
        await this.sleep(20);
        this.parent = this.currentPage;
        await this.appendChild(node);
        this.parent = childClone.parentNode;
        await this.sleep(20);
      }
      if (
        child.childElementCount &&
        child.nodeName.toLowerCase() !== 'table' &&
        child.nodeName.toLowerCase() !== 'form'
      ) {
        this.parent = childClone;
        for (let i = 0; i < child.childElementCount; i++) {
          await this.appendChild(child.children[i]);
          await this.sleep(20);
        }
        if (!childClone.childElementCount) childClone.remove();
      }
      resolve();
    });
  }

  getParentTree(element: any, child: any): any {
    const parent = element.parentNode;
    if (!parent || parent.id === this.contentParentId) {
      return element;
    }
    const parentClone = parent.cloneNode();
    parentClone.appendChild(child);
    return this.getParentTree(parent, parentClone);
  }
}
