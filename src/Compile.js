function Compile(node, vm){
    if(node){ //  <--  外层容器节点(app)
        this.$frag = this.nodeToFragment(node, vm);     // 创建虚拟dom 没有虚拟dom前是文档代码片段
        return this.$frag;
    }
}
// 极致写法 清空原型链
Compile.prototype = {
    nodeToFragment: function(node,vm){
        var that = this;
        var frag = document.createDocumentFragment();
        var child;

        while(child = node.firstChild){
            that.compileElement(child, vm);
            frag.append(child); // 将所有自节点添加到fragment中 
        }

        return frag;
    },
    compileElement: function(node, vm){
        var reg = /\{\{(.*)\}\}/;

        //节点类型为元素
        if(node.nodeType === 1){
            var attr = node.attributes;
            // 解析属性
            for(var i = 0; i< attr.length; i++ ){
                if(attr[i].nodeName == 'v-model'){
                    var name = attr[i].nodeValue; // 获取v-model绑定的属性名
                    node.addEventListener('input', function(e){
                        // 给响应的data属性赋值，进而触发该属性的set方法
                        // 再批处理 渲染元素
                        vm[name] = e.target.value;
                    });

                    new Watcher(vm, node, name, 'value');
                }
            }
        }

        //节点类型为文本节点
        if(node.nodeType === 3){
            if(reg.test(node.nodeValue)){
                var name = RegExp.$1; // 获取匹配到的字符串
                name = name.trim();

                //node.nodeValue = vm[name]; // 将data的值赋给该node
                new Watcher(vm, node, name, 'nodeValue');

            }
        }

    }
}
// // 极致写法
// Compile.prototype = {
//     nodeToFragment: function(node, vm){
//         var that = this;
//         var frag = document.createDocumentFragment();
//         var child;

//         while(child = node.firstChild){
//             that.compileElement(child, vm);
//             frag.append(child);         // 将所有子节点添加到fragment中
//         }

//         return frag;
//     },
//     compileElement: function(node, vm){
//         var reg = /\{\{(.*)\}\}/;

//         if(node.nodeType === 1){
//             var attr = node.attributes;
//             // 解析属性
//             // 节点类型为元素
//             for(var i = 0; i < attr.length; i++){
//                 if(attr[i].nodeName == 'v-model'){
//                     var name = attr[i].nodeValue;   // 获取v-model绑定的属性名
//                     node.addEventListener('input', function(e){
//                         // 给响应的data属性赋值 进而触发该属性的set方法
//                         // 再批处理，渲染元素
//                         vm[name] = e.target.value;
//                     })

//                     new Watcher(vm, node, name, 'value');
//                 }
//             }
//         }

//         // 节点类型为文本节点
//         if(node.nodeType === 3){
//             if(reg.test(node.nodeType)){
//                 var name = RegExp.$1;   // 获取匹配到的字符串
//                 name = name.trim();

//                 new Watcher(vm, node, name, 'nodeValue');
//             }
//         }
//     }
// }