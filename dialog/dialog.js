(function(win) {
  'use strict';

  if (!win.dialog) {
    win.dialog = dialog;
  }

  function dialog(q) {
    var node = document.getElementById(q);
    var content = node.children && node.children[0];
    return new Dialog(node, content);
  }

  function Dialog(node, content) {
    this.node = node;
    this.duration = 500;
    this.content = content;
  }

  Dialog.prototype.show = function() {
    this.node.style.display = 'block';

    var self = this;
    setTimeout(function() {
      self.removeClass('hide').addClass('show');
    }, 10);
  };

  Dialog.prototype.hide = function() {
    this.removeClass('show').addClass('hide');

    var self = this;
    setTimeout(function() {
      self.node.style.display = 'none';
    }, this.duration);
  };

  Dialog.prototype.addClass = function(name) {
    this.content.classList.add(name);
    this.node.classList.add(name);
    return this;
  };

  Dialog.prototype.removeClass = function(name) {
    this.content.classList.remove(name);
    this.node.classList.remove(name);
    return this;
  };
}(window));
