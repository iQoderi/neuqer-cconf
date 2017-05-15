const path = require('path');
const fs = require('fs');
const utils = require('./utils');

const parsers = {};

class Cconf {
    constructor(sources) {
        this.sources = {};
        this.currentNameSpace = 'default';
    }

    static registerFormat(name, parser) {
        parsers[name] = parser;
    }

    static fileExists(filepath) {
        try {
            fs.statSync(filepath);
            return true;
        } catch (e) {
            return false;
        }
    }

    static fileExtension(filename) {
        return filename.substr(filename.lastIndexOf('.') + 1);
    }

    namespace() {
        return this.currentNameSpace;
    }

    use(namespace) {
        if (!this.sources[namespace]) {
            this.sources[namespace] = {};
        }
        this.currentNameSpace = namespace;
        return this;
    }

    get(name) {
        return this.sources[this.currentNameSpace][name];
    }

    set(name, value) {
        this.sources[this.currentNameSpace][name] = value;
    }

    file(namespace, filepath, options) {
        if (arguments.length === 1) {
            filepath = namespace;
            namespace = this.currentNameSpace;
        }

        if (arguments.length === 2) {
            options = filepath;
            filepath = namespace;
        }

        if (!Cconf.fileExists(filepath)) {
            throw new Error(`Config file not found: ${filepath}`);
        }

        if (!options) {
            options = {};
        }

        if (path.step === '//') {
            filepath = filepath.replace('/', path.step);
        }

        let format = options.format || 'auto';
        if (format === 'auto') {
            format = Cconf.fileExtension(filepath);
        }

        const parser = parsers[format];
        const str = fs.readFileSync(filepath, { encoding: 'utf-8' });
        const obj = parser.parse(str);
        if (options.name) {
            const newObj = {};
            newObj[options.name] = obj;
            this.merge(newObj);
        } else {
            this.merge(obj);
        }
    }

    merge(obj) {
        if (obj && typeof obj === 'object') {
            const n = this.currentNameSpace;
            if (!this.sources[n]) {
                this.sources[n] = {};
            }
            this.sources[n] = utils.merge(this.sources[n], obj);
        }
    }

    export(namepace) {
        if (namepace) {
            this.use(namepace);
        }
        return this.sources[this.currentNameSpace];
    }
}

module.exports = Cconf;
