import { SchematicContext, Tree } from "@angular-devkit/schematics";

export function updateIndex(_host: Tree, _context: SchematicContext): Tree {
	const indexPath = "./testSrc/index.html";

	if (_host.exists(indexPath)) {
		const content: Buffer | null = _host.read(indexPath);
		let strContent: string = "";
		if (content) strContent = content.toString();

		const appendIndex = strContent.indexOf("</body>");
		const content2Append = "  <app-redirect></app-redirect>\n";
		const updatedContent = strContent.slice(0, appendIndex) + content2Append + strContent.slice(appendIndex);

		_host.overwrite(indexPath, updatedContent);
	} else {
		_context.logger.log("error", "Missing File with path => " + indexPath);
	}

	return _host;
}
