       var o = {
         0: 'a',
         1: 'x',
         2: 'b',
         3: 'd',
         4: 'm',
         5: 'a',
         6: 'k',
         7: 'm',
         8: 'p',
         9: 'j',
         10: 'a',
       };
       var sum = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]; //声明一个数组sum用于存放对象中的没一个元素分别出现了几次；
       var charLocation = [//声明一个二维数组charLocation用于记录对象中的每个元素出现的位置；
         [],
         [],
         [],
         [],
         [],
         [],
         [],
         [],
         [],
         [],
         []
       ];
       var max = sum[0],//i,j作为for循环中的参数来使用，max和_max分别用于记录出现次数最多的元素以及出现最多次数的元素的角标；
         _max = [],
         i, j;
       /*双重for循环。内层for循环用于比较o[i]与在其位置之后的元素是否重复，若重复则将重复位置的元素角标放入charLocation二维数组中；外层循环用来变更当前元素的位置*/
       for (i = 0; i <= 10; i++) {
         charLocation[i].push(i);
         for (j = i, k = 0; j < 10; j++) {
           if (o[i] == o[j + 1]) {
             charLocation[i].push(j + 1);
             sum[i] = sum[i] + 1;
           }
         }
       }
       /*采用该for循环来判断出现次数最多的元素出现的次数*/
       for (i = 0; i <= 10; i++) {
         if (sum[i] > max) {
           max = sum[i];
         }
       }
       /*将每个元素出现的次数与最大次数比较，若相等则代表其出现的次数最多，并将其存入_max数组中*/
       for (i = 0; i <= 10; i++) {
         if (sum[i] == max) {
           _max.push(i);
         }
       }
       /*判断字母出现的情况，比如每个字母均出现一次，以及只有一个字母出现了最多次或者有两个字母重复出现的次数一样多，也有可能有三个及以上的字母出现的次数一样多（拥有11个键值的对象中最多可能有5个字母出现的次数一样多），只需要在后面增加if判断语句即可*/
       if (_max.length == 11) {
         alert("每个元素均只出现了一次！");
       } else if (_max.length == 1) {
         alert("出现次数最多的元素为：" + o[_max[0]] + "；出现的次数为：" + max + "；位置分别是：" + charLocation[_max[0]] + "。");
       } else if (_max.length == 2) {
         alert("出现次数最多的元素为：" + o[_max[0]] + o[_max[1]] + "；出现的次数为：" + max + "；位置分别是：" + charLocation[_max[0]] + "和" + charLocation[_max[1]] + "。");
       }
       console.log(o[_max[0]]);
       console.log(sum);
       console.log(max);
       console.log(_max);
       console.log(charLocation[0]);
       console.log(charLocation[1]);
       console.log(charLocation[2]);
       console.log(charLocation[3]);
       console.log(charLocation[4]);
       console.log(charLocation[5]);
       console.log(charLocation[6]);
       console.log(charLocation[7]);
       console.log(charLocation[8]);
       console.log(charLocation[9]);
       console.log(charLocation[10]);