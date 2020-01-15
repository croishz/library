// count the number
var checkTextLength = function (obj, count) {
	var max = parseInt(obj.attr('maxlength'));
	/*
	obj.on('keyup, input', function () {
		var type = obj.val().length;
		var remain = max - type;
		count.text(remain);
		var str1 = obj.val();
		var str2 = "";
		if (remain <= 1) {
			str2 = str1.substr(0, max);
		}
	});
	*/
	obj.off('keyup input').on('keyup input', function (e) {
		var tgField = e.currentTarget;
		var byteTotal = 0;
		var tmpByte = 0;
		var strLen = 0;
		var c;
		for (var i = 0; i < tgField.value.length; i++) {
			c = escape(tgField.value.charAt(i));
			if (c.length == 1) {
				tmpByte++;
			} else if (c.indexOf("%u") != -1) {
				tmpByte += 2;
			} else {
				tmpByte++;
			}

			if (tmpByte > max) {
				strLen = i;
				break;
			} else {
				byteTotal = tmpByte;
			}
		}
		if (strLen) {
			tgField.value = tgField.value.substring(0, strLen);
		}
		count.text(Math.max(0, max-byteTotal));
	});
};