function WidgetPseudoClassical(width, height) {
  this.width = width || 50;
  this.height = height || 50;
  this.elem = null;
}

WidgetPseudoClassical.prototype.render = function(where) {
  if (this.elem) {
    let cssStyleText = `width: ${this.width}px, height: ${this.height}px;`;
    this.elem.setAttribute('style', cssStyleText);
    where.appendChild(this.elem);
  }
}

function ButtonPseudoClassical(width, height, label) {
    WidgetPseudoClassical.call(this, width, height);
    this.label = label || 'Default';
    this.elem = document.createElement('button');
    let textNode = document.createTextNode(this.label);
    this.elem.appendChild(textNode);
}

ButtonPseudoClassical.prototype = Object.create(WidgetPseudoClassical.prototype);
ButtonPseudoClassical.prototype.render = function(where) {
  WidgetPseudoClassical.render.call(this, where);
  this.elem.onclick = () => { return `Button ${this.label} clicked!` };
  return this.elem.click();
}

export { WidgetPseudoClassical, ButtonPseudoClassical };