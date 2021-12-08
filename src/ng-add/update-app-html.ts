import { SchematicContext, Tree } from "@angular-devkit/schematics";
import { updateFile } from "./update-file";

const updatdContent = `<router-outlet *ngIf="!isIframe"></router-outlet>`;

export function updateAppHtml(_host: Tree, _context: SchematicContext): Tree {
  return updateFile(_host, _context, "./testSrc/app/app.component.html", updatdContent);
}
