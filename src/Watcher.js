let uid = 0;
function Watcher(vm, node, name, type){
    // new Watcher(vm, node, name, nodeValue)

    Dep.target = this;
    this.name = name;
    this.id = ++uid;
    this.node = node; // 当前节点
    this.vm = vm;
    this.type = type;
    this.update();

    Dep.target = null; 

}

Watcher.prototype = {
    update:function(){
        this.get();
        if(!batcher){
            batcher = new Batcher();
        }

        batcher.push(this);

        // this.node[this.type] = this.value; // 订阅者执行相应操作
    },
    cb:function(){
        // 最终实际虚拟dom处理的结果 只处理一次
        console.log("dom update");
        // 虚拟dom -> diff(虚拟dom)局部更新 -> createElement(vNode) -> render
        this.node[this.type] = this.value; // 订阅者执行相应操作
    },
    get:function(){
        this.value = this.vm[this.name]; // 触发相应属性的get 激活流程
    }
}