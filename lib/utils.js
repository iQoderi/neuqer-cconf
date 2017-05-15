const scalarTypes = ['undefined', 'boolean', 'number', 'string'];

module.exports = {
    isScalar(value) {
        if (value === null) {
            return true;
        }

        return scalarTypes.indexOf(typeof value) > -1;
    },
    isObject(value) {
        return Object.prototype.toString.call(value) === '[object Object]';
    },
    isArray: Array.isArray,
    deepCopy(obj) {
        const me = this;
        if (me.isScalar(obj)) {
            return obj;
        }

        if (me.isArray(obj)) {
            const newArr = [];
            obj.forEach((v, index) => {
                newArr[index] = me.deepCopy(v);
            });
            return newArr;
        }

        const newObj = {};
        Object.keys(obj).forEach((key) => {
            const v = obj[key];
            newObj[key] = me.deepCopy(v);
        });
        return newObj;
    },
    deepMerge(obj1, obj2) {
        const me = this;
        if (!me.isObject(obj1) || !me.isObject(obj2)) {
            return me.deepCopy(obj2);
        }
        const base = me.deepCopy(obj1);
        Object.keys(obj2).forEach((key) => {
            const v = obj2[key];
            base[key] = me.deepMerge(base[key], v);
        });
        return base;
    },
    merge(...args) {
        const me = this;
        if (args.length === 1) {
            return this.deepCopy(args[0]);
        }
        let base = args[0];
        args.forEach((arg) => {
            base = me.deepMerge(base, arg);
        });
        return base;
    },
};

