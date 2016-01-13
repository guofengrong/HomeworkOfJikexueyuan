        function calculator(x, y, char) {
            var a = x;
            var b = y;
            var c = char;
            var d;
            if (typeof(a) == "number" && typeof(b) == "number" && typeof(c) == "string") {
                if (char == "*") {
                    d = a * b;
                    alert(d);
                } else if (char == "/") {
                    d = a / b;
                    alert(d);
                } else if (char == "+") {
                    d = a + b;
                    alert(d);
                } else if (char == "-") {
                    d = a - b;
                    alert(d);
                }
            } else if (a == undefined && b == undefined && c == undefined) {
                alert("请在控制面板输入需要运算的数字和运算符");
            } else {
                alert("输入有误，请重新输入");
            }
            return d;
        }
        var x, y, char, result;

        result = calculator(x, y, char);
        console.log(result);