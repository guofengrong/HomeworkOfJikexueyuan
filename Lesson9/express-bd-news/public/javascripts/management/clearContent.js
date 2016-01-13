define(function(require, exports, module) {
	// 通过 require 引入依赖
    require('../jquery-1.11.3.min');
	function clearContent() {
        $('#update-newstitle').val('');
        $('#update-newscontent').val('');
        $('#update-newsimg').val('');
        $('#update-addtime').val('');
        $('#newstitle').val('');
        $('#newscontent').val('');
        $('#newsimg').val('');
        $('#addtime').val('');
        $('.masking').fadeOut();
        $('#success').fadeOut();
        $('.confirm-delete').fadeOut();
    }
    // 通过 exports 对外提供接口
    // exports.doSomething = ...

    // 或者通过 module.exports 提供整个接口
    module.exports = clearContent;
});