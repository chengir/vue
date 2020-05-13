const data = {
    name: "chengcheng",
    age: 18,
    chen: {
        name: "chenpeng",
        age: 20,
        obj: {}
    },
    arr: [2, 4, 6]
}

const arrayProto = Array.prototype; //克隆数据原型
const arrayMethods = Object.create(arrayProto);

//arrayMethods的原型上改变'push','pop','shift','unshift','sort','splice','reverse'后重新渲染页面
['push', 'pop', 'shift', 'unshift', 'sort', 'splice', 'reverse'].forEach(method => {
    arrayMethods[method] = function () {
        arrayProto[method].call(this, ...arguments);
        render();
    }
})

function defineReactive(data, key, value) {
    observer(value); //递归调用,监听对象中对象
    Object.defineProperty(data, key, { //监听data的key值变化  
        //数组没有用Object.defineProperty来监听是因为观察数组性能消耗比较大.性能付出的代价与用户体验不能形成正比

        get() { //获取 读
            console.log("du");
            return value;
        },
        set(newVal) { //设置 写
            console.log("xie");
            if (newVal === value) { //没有改变时什么也不做
                return;
            }
            value = newVal;
            render();
        }

    })
}

function observer(data) {
    if (Array.isArray(data)) {
        data.__proto__ = arrayMethods; //让data原型指向修改的数据原型.即可以处理push等7个方法后并渲染
        return;
    }
    if (typeof data === 'object') {
        for (let key in data) {
            defineReactive(data, key, data[key]);
        }
    }
}

function render() {
    console.log("页面渲染了!");
}

function $set(data, key, value) {
    if (Array.isArray(data)) {
        data.splice(key, 1, value); //把key的值设为value
        return value;
    }

    defineReactive(data, key, value);
    render();
    return value;
}

function $delete(data, key) {
    if (Array.isArray()) {
        data.splice(key, 1);
        return;
    }
    delete data[key];
    render();
}

observer(data);

const value = $set(data, 'school', 'zhangdian');