import { Rule, SchematicContext, Tree, chain, noop, mergeWith, apply, url, template, move } from "@angular-devkit/schematics";
import { NodePackageInstallTask } from "@angular-devkit/schematics/tasks";
import { updateAppModule } from "./update-module";
import { updateAppRouting } from "./update-routing";
import { updateIndex } from "./update-index";
import { updateAppHtml, updateAppTs } from "./update-app.component.files";

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngAdd(options: MsalSchematicOption): Rule {
  return chain([
    options && options.skipPackageJson ? noop() : addPackageJsonDependency(),
    updateAppTs(options),
    updateAppHtml(options),
    updateIndex(options),
    updateAppModule(options),
    updateAppRouting(options),

    mergeWith(
      apply(url("./files"), [
        template({
          clientId: options.clientId,
          tenantId: options.tenantId
        }),
        move(options.appDir)
      ])
    )
  ]);
}

// install dependency to package.json and install
function addPackageJsonDependency() {
  return (_host: Tree, _context: SchematicContext) => {
    if (_host.exists("package.json")) {
      const jsonStr = _host.read("package.json")!.toString("utf-8");
      const json = JSON.parse(jsonStr);

      const type = "dependencies";
      if (!json[type]) {
        json[type] = {};
      }

      const globalPkg = "@tchitos/azure-msal";
      const version = "latest";
      if (!json[type][globalPkg]) {
        json[type][globalPkg] = version;
      }
      _context.logger.log("info", "@tchitos/azure-msal was added as dependency");

      const msal_angularPkg = "@azure/msal-angular";
      const msal_angularVersion = "^2.1.0";
      if (!json[type][msal_angularPkg]) {
        json[type][msal_angularPkg] = msal_angularVersion;
      }
      _context.logger.log("info", "@azure/msal-angular was added as dependency");

      const msalBrowserPkg = "@azure/msal-browser";
      const msalBrowserVersion = "^2.21.0";
      if (!json[type][msalBrowserPkg]) {
        json[type][msalBrowserPkg] = msalBrowserVersion;
      }
      _context.logger.log("info", "@azure/msal-browser was added as dependency");

      _host.overwrite("package.json", JSON.stringify(json, null, 2));

      _context.addTask(new NodePackageInstallTask());
    }
    return _host;
  };
}

export interface MsalSchematicOption {
  srcDir: string;
  appDir: string;
  clientId: string;
  tenantId: string;
  [key: string]: any;
}
