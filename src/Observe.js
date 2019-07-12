function defineReactive(vm, key, val){
    var dep = new Dep();
    Object.defineProperty(vm, key, {
        get:function(){
            if(Dep.target){
                // js的浏览器单线程特性，保证这个全局变量在同时间内，只会订阅一次
                dep.addSub(Dep.target);
            }
            return val;
        },
        set: function(newVal){
            if(newVal === val){
                return 
            }
            val = newVal;

            // 作为发布者 发布通知
            dep.notify();
        }
    })
}

function Observe(obj, vm){
    // 遍历所有对象 激活
    Object.keys(obj).forEach(function(key){
        defineReactive(vm, key, obj[key]);
    })
}