import { SchematicContext, Tree } from "@angular-devkit/schematics";

export function updateFile(_host: Tree, _context: SchematicContext, path: string, newUpdatedRoute: string): Tree {
	if (_host.exists(path)) {
		_host.overwrite(path, newUpdatedRoute);
	} else {
		_context.logger.log("error", "Missing File with path => " + path);
	}
	return _host;
}
