import { Rule, SchematicContext, Tree, chain, noop, mergeWith, apply, url, template } from "@angular-devkit/schematics";
import { NodePackageInstallTask } from "@angular-devkit/schematics/tasks";

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
// export function ngAdd(_options: any): Rule {
// 	return (tree: Tree, _context: SchematicContext) => {
// 		return tree;
// 	};
// }

export function ngAdd(options: any): Rule {
	return chain([
		options && options.skipPackageJson ? noop() : addPackageJsonDependency(),
		mergeWith(
			apply(url("./files"), [
				template({
					INDEX: options.index,
					name: options.name
				})
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
			const msal_angularVersion = "latest";
			if (!json[type][msal_angularPkg]) {
				json[type][msal_angularPkg] = msal_angularVersion;
			}
			_context.logger.log("info", "@azure/msal-angular was added as dependency");

			const msalBrowserPkg = "@azure/msal-browser";
			const msalBrowserVersion = "latest";
			if (!json[type][msalBrowserPkg]) {
				json[type][msalBrowserPkg] = msalBrowserVersion;
			}
			_context.logger.log("info", "@azure/msal-browser was added as dependency");

			_context.addTask(new NodePackageInstallTask());
		}
		return _host;
	};
}
